import { seedUsers } from '../utils/userSeeder.js';

class DataStore {
  constructor() {
    this.users = [];
    this.isInitialized = false;
    this.nextId = 11; // JSONPlaceholder returns IDs 1-10, so new IDs will start from 11
  }

  async initialize() {
    if (this.isInitialized) return;
    this.users = await seedUsers();
    // Set nextId to be max existing ID + 1
    if (this.users.length > 0) {
      this.nextId = Math.max(...this.users.map(u => u.id)) + 1;
    }
    this.isInitialized = true;
    console.log(`DataStore initialized with ${this.users.length} users. Next ID: ${this.nextId}`);
  }

  getAll({ search = '', department = '', sortField = 'id', sortOrder = 'asc', page = 1, limit = 10 } = {}) {
    let result = [...this.users];

    // 1. Search filter (match first name, last name, or email)
    if (search) {
      const query = search.toLowerCase();
      result = result.filter(
        user =>
          user.firstName.toLowerCase().includes(query) ||
          user.lastName.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
    }

    // 2. Department filter
    if (department) {
      result = result.filter(
        user => user.department.toLowerCase() === department.toLowerCase()
      );
    }

    // 3. Sorting
    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      // Handle null/undefined
      if (valA === undefined || valA === null) valA = '';
      if (valB === undefined || valB === null) valB = '';

      // Convert to string for uniform comparison
      valA = valA.toString().toLowerCase();
      valB = valB.toString().toLowerCase();

      // Check if they are numeric
      const numA = Number(valA);
      const numB = Number(valB);
      if (!isNaN(numA) && !isNaN(numB)) {
        return sortOrder === 'asc' ? numA - numB : numB - numA;
      }

      return sortOrder === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });

    // 4. Pagination math
    const totalCount = result.length;
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedUsers = result.slice(startIndex, startIndex + limitNum);

    return {
      users: paginatedUsers,
      totalCount,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(totalCount / limitNum)
    };
  }

  getById(id) {
    const numericId = parseInt(id, 10);
    return this.users.find(user => user.id === numericId);
  }

  create(userData) {
    const newUser = {
      id: this.nextId++,
      firstName: userData.firstName?.trim() || '',
      lastName: userData.lastName?.trim() || '',
      email: userData.email?.trim() || '',
      department: userData.department?.trim() || 'Engineering',
      phone: userData.phone?.trim() || 'N/A',
      website: userData.website?.trim() || 'N/A',
      company: userData.company?.trim() || 'N/A'
    };

    // Prepend new user so they appear first in lists
    this.users = [newUser, ...this.users];
    return newUser;
  }

  update(id, userData) {
    const numericId = parseInt(id, 10);
    const index = this.users.findIndex(user => user.id === numericId);

    if (index === -1) return null;

    const updatedUser = {
      ...this.users[index],
      firstName: userData.firstName !== undefined ? userData.firstName.trim() : this.users[index].firstName,
      lastName: userData.lastName !== undefined ? userData.lastName.trim() : this.users[index].lastName,
      email: userData.email !== undefined ? userData.email.trim() : this.users[index].email,
      department: userData.department !== undefined ? userData.department.trim() : this.users[index].department,
      phone: userData.phone !== undefined ? userData.phone.trim() : this.users[index].phone,
      website: userData.website !== undefined ? userData.website.trim() : this.users[index].website,
      company: userData.company !== undefined ? userData.company.trim() : this.users[index].company
    };

    this.users[index] = updatedUser;
    return updatedUser;
  }

  delete(id) {
    const numericId = parseInt(id, 10);
    const index = this.users.findIndex(user => user.id === numericId);

    if (index === -1) return false;

    this.users.splice(index, 1);
    return true;
  }
}

export const db = new DataStore();
