import { db } from '../services/dataStore.js';

// Regex for standard email formatting
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

/**
 * Get users list with optional search, sorting, filtering, and pagination.
 */
export const getUsers = async (req, res) => {
  try {
    const { search, department, sortField, sortOrder, page, limit } = req.query;
    const result = await db.getAll({
      search,
      department,
      sortField,
      sortOrder,
      page,
      limit
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Server error: Failed to fetch users.' });
  }
};

/**
 * Get a user by ID.
 */
export const getUserById = async (req, res) => {
  try {
    const user = await db.getById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error: Failed to fetch user details.' });
  }
};

/**
 * Create a new user.
 */
export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, department } = req.body;

    // Simple validation engine
    const errors = {};
    if (!firstName || !firstName.trim()) errors.firstName = 'First Name is required.';
    if (!lastName || !lastName.trim()) errors.lastName = 'Last Name is required.';
    if (!email || !email.trim()) {
      errors.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(email.trim())) {
      errors.email = 'Invalid Email format.';
    }
    if (!department || !department.trim()) errors.department = 'Department is required.';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const newUser = await db.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Server error: Failed to create user.' });
  }
};

/**
 * Update an existing user.
 */
export const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email, department } = req.body;
    const { id } = req.params;

    const existingUser = await db.getById(id);
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Validation engine
    const errors = {};
    if (firstName !== undefined && !firstName.trim()) errors.firstName = 'First Name cannot be empty.';
    if (lastName !== undefined && !lastName.trim()) errors.lastName = 'Last Name cannot be empty.';
    if (email !== undefined) {
      if (!email.trim()) {
        errors.email = 'Email cannot be empty.';
      } else if (!EMAIL_REGEX.test(email.trim())) {
        errors.email = 'Invalid Email format.';
      }
    }
    if (department !== undefined && !department.trim()) errors.department = 'Department cannot be empty.';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const updated = await db.update(id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Server error: Failed to update user.' });
  }
};

/**
 * Delete a user.
 */
export const deleteUser = async (req, res) => {
  try {
    const success = await db.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json({ message: 'User deleted successfully.', id: parseInt(req.params.id, 10) });
  } catch (error) {
    res.status(500).json({ error: 'Server error: Failed to delete user.' });
  }
};
