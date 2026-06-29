import React, { useEffect } from 'react';

export default function Notification({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4500);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div className={`toast-notification glass-panel ${type}`}>
      <div className="toast-icon-wrapper">
        {isSuccess ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        )}
      </div>
      <div className="toast-message-content">
        <p className="toast-title">{isSuccess ? 'System Alert' : 'Error Alert'}</p>
        <p className="toast-body-text">{message}</p>
      </div>
      <button className="toast-close-btn" onClick={onClose} aria-label="Dismiss alert">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <style>{`
        .toast-notification {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          z-index: 110;
          min-width: 320px;
          max-width: 420px;
          border-left: 4px solid var(--success);
          animation: slideInUp 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          background: #090d1a;
        }

        .toast-notification.error {
          border-left-color: var(--error);
        }

        .toast-icon-wrapper {
          color: var(--success);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--success-glow);
          border-radius: 50%;
          width: 30px;
          height: 30px;
          flex-shrink: 0;
        }

        .toast-notification.error .toast-icon-wrapper {
          color: var(--error);
          background: var(--error-glow);
        }

        .toast-message-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .toast-title {
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-primary);
        }

        .toast-body-text {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-top: 0.15rem;
          text-align: left;
        }

        .toast-close-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          border-radius: 50%;
          padding: 2px;
          display: flex;
        }

        .toast-close-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        @media (max-width: 576px) {
          .toast-notification {
            bottom: 1rem;
            left: 1rem;
            right: 1rem;
            min-width: calc(100% - 2rem);
          }
        }
      `}</style>
    </div>
  );
}
