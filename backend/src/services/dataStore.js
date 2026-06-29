import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { seedUsers } from '../utils/userSeeder.js';
import path from 'path';

class DataStore {
  constructor() {
    this.db = null;
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) return;

    // Open SQLite database connection
    this.db = await open({
      filename: path.join(process.cwd(), 'userdata.db'),
      driver: sqlite3.Database
    });

    // Create users table if it doesn't exist
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT NOT NULL,
        department TEXT NOT NULL,
        phone TEXT,
        website TEXT,
        company TEXT
      )
    `);

    // Check if we need to seed the database
    const countResult = await this.db.get('SELECT COUNT(*) as count FROM users');
    
    if (countResult.count === 0) {
      console.log('Database is empty, seeding with initial data...');
      const initialUsers = await seedUsers();
      
      const stmt = await this.db.prepare(`
        INSERT INTO users (id, firstName, lastName, email, department, phone, website, company)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      for (const user of initialUsers) {
        await stmt.run(
          user.id,
          user.firstName,
          user.lastName,
          user.email,
          user.department,
          user.phone,
          user.website,
          user.company
        );
      }
      await stmt.finalize();
      console.log(`DataStore seeded with ${initialUsers.length} users.`);
    } else {
      console.log(`DataStore connected. Found ${countResult.count} existing users.`);
    }

    this.isInitialized = true;
  }

  async getAll({ search = '', department = '', sortField = 'id', sortOrder = 'asc', page = 1, limit = 10 } = {}) {
    let baseQuery = `FROM users WHERE 1=1`;
    const params = [];

    // 1. Search filter
    if (search) {
      baseQuery += ` AND (firstName LIKE ? OR lastName LIKE ? OR email LIKE ?)`;
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam);
    }

    // 2. Department filter
    if (department) {
      baseQuery += ` AND department = ?`;
      params.push(department);
    }

    // 3. Count Total (for pagination)
    const countResult = await this.db.get(`SELECT COUNT(*) as totalCount ${baseQuery}`, ...params);
    const totalCount = countResult.totalCount;

    // 4. Sorting
    // Sanitize sort variables to prevent SQL injection
    const allowedSortFields = ['id', 'firstName', 'lastName', 'email', 'department'];
    const safeSortField = allowedSortFields.includes(sortField) ? sortField : 'id';
    const safeSortOrder = sortOrder.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
    
    // 5. Pagination
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const offset = (pageNum - 1) * limitNum;

    // Final Query
    const query = `
      SELECT * ${baseQuery}
      ORDER BY ${safeSortField} ${safeSortOrder}
      LIMIT ? OFFSET ?
    `;
    params.push(limitNum, offset);

    const users = await this.db.all(query, ...params);

    return {
      users,
      totalCount,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(totalCount / limitNum)
    };
  }

  async getById(id) {
    const numericId = parseInt(id, 10);
    return await this.db.get('SELECT * FROM users WHERE id = ?', numericId);
  }

  async create(userData) {
    const result = await this.db.run(`
      INSERT INTO users (firstName, lastName, email, department, phone, website, company)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      userData.firstName?.trim() || '',
      userData.lastName?.trim() || '',
      userData.email?.trim() || '',
      userData.department?.trim() || 'Engineering',
      userData.phone?.trim() || 'N/A',
      userData.website?.trim() || 'N/A',
      userData.company?.trim() || 'N/A'
    ]);

    return await this.getById(result.lastID);
  }

  async update(id, userData) {
    const numericId = parseInt(id, 10);
    
    // Get existing to fallback missing fields
    const existingUser = await this.getById(numericId);
    if (!existingUser) return null;

    const firstName = userData.firstName !== undefined ? userData.firstName.trim() : existingUser.firstName;
    const lastName = userData.lastName !== undefined ? userData.lastName.trim() : existingUser.lastName;
    const email = userData.email !== undefined ? userData.email.trim() : existingUser.email;
    const department = userData.department !== undefined ? userData.department.trim() : existingUser.department;
    const phone = userData.phone !== undefined ? userData.phone.trim() : existingUser.phone;
    const website = userData.website !== undefined ? userData.website.trim() : existingUser.website;
    const company = userData.company !== undefined ? userData.company.trim() : existingUser.company;

    await this.db.run(`
      UPDATE users 
      SET firstName = ?, lastName = ?, email = ?, department = ?, phone = ?, website = ?, company = ?
      WHERE id = ?
    `, [firstName, lastName, email, department, phone, website, company, numericId]);

    return await this.getById(numericId);
  }

  async delete(id) {
    const numericId = parseInt(id, 10);
    const result = await this.db.run('DELETE FROM users WHERE id = ?', numericId);
    return result.changes > 0;
  }
}

export const db = new DataStore();
