import { useState, useEffect, useCallback } from 'react';
import * as userService from '../api/userService.js';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter, Sorting, and Pagination states
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Fetch users with current query states
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getUsers({
        search,
        department,
        sortField,
        sortOrder,
        page,
        limit
      });
      setUsers(data.users || []);
      setTotalCount(data.totalCount || 0);
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to fetch users from database. Please verify your connection status and try again.');
    } finally {
      setLoading(false);
    }
  }, [search, department, sortField, sortOrder, page, limit]);

  // Fetch users on filter or page change
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Reset page to 1 when filters change to avoid empty page bounds
  useEffect(() => {
    setPage(1);
  }, [search, department]);

  const addUser = async (userData) => {
    setLoading(true);
    try {
      await userService.createUser(userData);
      await fetchUsers(); // Refresh list to show newly added user (which appears at top)
      return { success: true };
    } catch (err) {
      const serverErrors = err.response?.data?.errors;
      const errorMsg = err.response?.data?.error || 'Failed to add user. Please check form details.';
      return { success: false, errors: serverErrors, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const editUser = async (id, userData) => {
    setLoading(true);
    try {
      await userService.updateUser(id, userData);
      await fetchUsers(); // Refresh list
      return { success: true };
    } catch (err) {
      const serverErrors = err.response?.data?.errors;
      const errorMsg = err.response?.data?.error || 'Failed to update user. Please check form details.';
      return { success: false, errors: serverErrors, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async (id) => {
    setLoading(true);
    try {
      await userService.deleteUser(id);
      await fetchUsers(); // Refresh list
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to delete user.';
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    totalCount,
    loading,
    error,
    search,
    setSearch,
    department,
    setDepartment,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    page,
    setPage,
    limit,
    setLimit,
    refresh: fetchUsers,
    addUser,
    editUser,
    removeUser
  };
};
export default useUsers;
