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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h3>{user ? 'Edit Member Details' : 'Add New Member'}</h3>
          <button className="close-form-btn" onClick={onClose} aria-label="Close form">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="form-body-wrapper">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className={`form-input ${errors.firstName ? 'is-invalid' : ''}`}
                placeholder="e.g. Eleanor"
                disabled={loading}
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className={`form-input ${errors.lastName ? 'is-invalid' : ''}`}
                placeholder="e.g. Vance"
                disabled={loading}
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'is-invalid' : ''}`}
              placeholder="e.g. eleanor.vance@company.com"
              disabled={loading}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`form-input ${errors.department ? 'is-invalid' : ''}`}
              disabled={loading}
            >
              <option value="">-- Select Department --</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && <span className="error-message">{errors.department}</span>}
          </div>

          <div className="form-actions-wrapper">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
              {loading ? (
                <div className="spinner"></div>
              ) : user ? (
                'Save Changes'
              ) : (
                'Add Member'
              )}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .form-modal {
          max-width: 550px;
          border-left: 4px solid var(--primary);
        }

        .form-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          background: rgba(6, 9, 19, 0.4);
        }

        .form-header h3 {
          font-size: 1.25rem;
          color: var(--text-primary);
        }

        .close-form-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          border-radius: 50%;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-form-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .form-body-wrapper {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        select.form-input {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1.25rem;
          padding-right: 2.5rem;
        }

        .form-actions-wrapper {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .submit-btn {
          min-width: 120px;
        }

        /* Loading Spinner */
        .spinner {
          width: 20px;
          height: 20px;
          border: 2.5px solid rgba(255,255,255, 0.2);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 576px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          .form-modal {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
