import React from 'react';

export default function ConfirmDelete({ isOpen, onClose, onConfirm, userName, loading }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="delete-header">
          <div className="warning-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h3>Confirm Delete</h3>
        </div>

        <div className="delete-body">
          <p>Are you sure you want to remove <strong className="highlight-delete-name">{userName}</strong> from the organization directory?</p>
          <p className="danger-notice">This action is permanent and cannot be undone.</p>
        </div>

        <div className="delete-actions">
          <button className="btn btn-secondary" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button className="btn btn-danger confirm-delete-btn" onClick={onConfirm} disabled={loading}>
            {loading ? <div className="spinner"></div> : 'Confirm Delete'}
          </button>
        </div>
      </div>

      <style>{`
        .delete-modal {
          max-width: 420px;
          border-left: 4px solid var(--error);
        }

        .delete-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          background: rgba(6, 9, 19, 0.4);
        }

        .warning-icon-wrapper {
          color: var(--error);
          background: var(--error-glow);
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.1);
        }

        .delete-header h3 {
          font-size: 1.15rem;
          color: var(--text-primary);
        }

        .delete-body {
          padding: 1.5rem;
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.5;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .highlight-delete-name {
          color: var(--text-primary);
        }

        .danger-notice {
          font-size: 0.8rem;
          color: #f87171;
          font-weight: 500;
        }

        .delete-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          padding: 1.25rem 1.5rem;
          border-top: 1px solid var(--border-color);
          background: rgba(6, 9, 19, 0.4);
        }

        .confirm-delete-btn {
          min-width: 140px;
        }

        /* Form spinner reused */
        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 0.8s linear infinite;
        }
      `}</style>
    </div>
  );
}
