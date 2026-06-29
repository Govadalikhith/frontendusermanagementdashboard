import React, { useState, useEffect } from 'react';
import useUsers from './hooks/useUsers.js';

// Components
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import FilterPopup from './components/FilterPopup.jsx';
import UserTable from './components/UserTable.jsx';
import Pagination from './components/Pagination.jsx';
import UserForm from './components/UserForm.jsx';
import ConfirmDelete from './components/ConfirmDelete.jsx';
import Notification from './components/Notification.jsx';

export default function App() {
  const {
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
    addUser,
    editUser,
    removeUser
  } = useUsers();

  // Modals Open/Close States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Selected entities
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);

  // Toast Notification States
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Handle system error from backend
  useEffect(() => {
    if (error) {
      setToast({ message: error, type: 'error' });
    }
  }, [error]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const clearToast = () => {
    setToast({ message: '', type: 'success' });
  };

  const handleAddClick = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteUserId(id);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    if (selectedUser) {
      // Edit User mode
      const res = await editUser(selectedUser.id, formData);
      if (res.success) {
        showToast(`Member details updated successfully!`);
        return { success: true };
      } else {
        showToast(res.message, 'error');
        return { success: false, errors: res.errors };
      }
    } else {
      // Add User mode
      const res = await addUser(formData);
      if (res.success) {
        showToast(`New member added to directory!`);
        return { success: true };
      } else {
        showToast(res.message, 'error');
        return { success: false, errors: res.errors };
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteUserId) return;
    
    // Find the username for toast message feedback
    const deletedUser = users.find(u => u.id === deleteUserId);
    const userName = deletedUser ? `${deletedUser.firstName} ${deletedUser.lastName}` : 'Member';

    const res = await removeUser(deleteUserId);
    setIsDeleteOpen(false);
    setDeleteUserId(null);

    if (res.success) {
      showToast(`Removed "${userName}" from the directory.`);
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to asc
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Find the username to display in the delete modal
  const userToDelete = users.find(u => u.id === deleteUserId);
  const userNameToDelete = userToDelete ? `${userToDelete.firstName} ${userToDelete.lastName}` : '';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6 animate-[fadeIn_0.5s_ease]">
      {/* 1. Header Branding & Global Stats */}
      <Header totalUsers={totalCount} onAddClick={handleAddClick} />

      {/* 2. Controls Area (Search bar and Filters trigger button) */}
      <div className="p-5 bg-brand-surface backdrop-blur-md border border-white/5 rounded-2xl shadow-2xl">
        <SearchBar
          search={search}
          onSearchChange={setSearch}
          department={department}
          onClearDepartment={() => setDepartment('')}
          onOpenFilter={() => setIsFilterOpen(true)}
        />
      </div>

      {/* 3. Core Users Data Grid */}
      <UserTable
        users={users}
        loading={loading}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {/* 4. Pagination panel */}
      <Pagination
        page={page}
        limit={limit}
        totalCount={totalCount}
        onPageChange={setPage}
        onLimitChange={setLimit}
      />

      {/* Popups & Drawers */}
      <FilterPopup
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedDepartment={department}
        onSelectDepartment={setDepartment}
      />

      <UserForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        user={selectedUser}
        loading={loading}
      />

      <ConfirmDelete
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setDeleteUserId(null);
        }}
        onConfirm={handleDeleteConfirm}
        userName={userNameToDelete}
        loading={loading}
      />

      <Notification
        message={toast.message}
        type={toast.type}
        onClose={clearToast}
      />
    </div>
  );
}
