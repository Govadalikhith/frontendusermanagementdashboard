import axios from 'axios';
import { API_BASE_URL } from '../utils/constants.js';

/**
 * Fetch all users with filters, sorting, and pagination options.
 */
export const getUsers = async (params = {}) => {
  const response = await axios.get(API_BASE_URL, { params });
  return response.data;
};

/**
 * Fetch a single user by ID.
 */
export const getUserById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

/**
 * Create a new user.
 */
export const createUser = async (userData) => {
  const response = await axios.post(API_BASE_URL, userData);
  return response.data;
};

/**
 * Update an existing user's data.
 */
export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, userData);
  return response.data;
};

/**
 * Delete a user.
 */
export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};
