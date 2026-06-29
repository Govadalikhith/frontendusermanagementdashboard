import React, { useState, useEffect } from 'react';
import { DEPARTMENTS } from '../utils/constants.js';
import { validateUserForm } from '../utils/validators.js';

export default function UserForm({ isOpen, onClose, onSubmit, user, loading }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  });

  const [errors, setErrors] = useState({});

  // Reset or pre-populate form on user change
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        department: user.department || ''
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        department: ''
      });
    }
    setErrors({});
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error message in real-time as user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation check
    const validationErrors = validateUserForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Call submit handler
    const response = await onSubmit(formData);
    if (response && !response.success && response.errors) {
      // Map server-side validation errors back to inputs
      setErrors(response.errors);
    } else if (response && response.success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#0f172a] border-l-4 border-brand-primary border-y border-r border-white/5 rounded-2xl shadow-2xl w-full max-w-[550px] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#060913]/40">
          <h3 className="text-lg font-bold text-slate-200">
            {user ? 'Edit Member Details' : 'Add New Member'}
          </h3>
          <button 
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/5 transition-all duration-150" 
            onClick={onClose} 
            aria-label="Close form"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="p-6 flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400" htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full bg-white/5 border focus:bg-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 ${
                  errors.firstName 
                    ? 'border-brand-error focus:border-brand-error focus:shadow-[0_0_10px_rgba(239,68,68,0.2)]' 
                    : 'border-white/5 focus:border-brand-primary'
                }`}
                placeholder="e.g. Eleanor"
                disabled={loading}
              />
              {errors.firstName && (
                <span className="text-xs text-brand-error mt-1 flex items-center gap-1">
                  {errors.firstName}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400" htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full bg-white/5 border focus:bg-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 ${
                  errors.lastName 
                    ? 'border-brand-error focus:border-brand-error focus:shadow-[0_0_10px_rgba(239,68,68,0.2)]' 
                    : 'border-white/5 focus:border-brand-primary'
                }`}
                placeholder="e.g. Vance"
                disabled={loading}
              />
              {errors.lastName && (
                <span className="text-xs text-brand-error mt-1 flex items-center gap-1">
                  {errors.lastName}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-400" htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-white/5 border focus:bg-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 ${
                errors.email 
                  ? 'border-brand-error focus:border-brand-error focus:shadow-[0_0_10px_rgba(239,68,68,0.2)]' 
                  : 'border-white/5 focus:border-brand-primary'
              }`}
              placeholder="e.g. eleanor.vance@company.com"
              disabled={loading}
            />
            {errors.email && (
              <span className="text-xs text-brand-error mt-1 flex items-center gap-1">
                {errors.email}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-400" htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`w-full bg-[#0f172a] border focus:bg-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-200 appearance-none ${
                errors.department 
                  ? 'border-brand-error focus:border-brand-error' 
                  : 'border-white/5 focus:border-brand-primary'
              }`}
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1.25rem'
              }}
              disabled={loading}
            >
              <option value="">-- Select Department --</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <span className="text-xs text-brand-error mt-1 flex items-center gap-1">
                {errors.department}
              </span>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button 
              type="button" 
              className="bg-white/5 border border-white/5 hover:bg-white/10 text-slate-100 font-semibold py-2.5 px-5 rounded-xl text-sm transition-all duration-200" 
              onClick={onClose} 
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-2.5 px-5 rounded-xl text-sm shadow-lg hover:shadow-violet-600/20 transition-all duration-200 min-w-[120px] flex items-center justify-center" 
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 rounded-full border-t-white animate-spin"></div>
              ) : user ? (
                'Save Changes'
              ) : (
                'Add Member'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
