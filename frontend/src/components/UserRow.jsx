import React from 'react';
import { getInitials, getDepartmentColor } from '../utils/helpers.js';

export default function UserRow({ user, onEdit, onDelete }) {
  const badgeStyle = getDepartmentColor(user.department);
  const initials = getInitials(user.firstName, user.lastName);

  // Generate an avatar color based on the first letter of first name
  const getAvatarGradient = (char) => {
    const code = char.charCodeAt(0) || 0;
    const hue = (code * 37) % 360;
    return `linear-gradient(135deg, hsl(${hue}, 80%, 60%) 0%, hsl(${(hue + 60) % 360}, 80%, 40%) 100%)`;
  };

  const avatarBackground = user.firstName ? getAvatarGradient(user.firstName.charAt(0)) : 'var(--gradient-brand)';

  return (
    <tr className="user-row-tr">
      <td className="cell-id">#{user.id}</td>
      <td className="cell-name">
        <div className="avatar-info-wrapper">
          <div className="user-avatar" style={{ background: avatarBackground }}>
            {initials}
          </div>
          <div>
            <div className="full-name">{user.firstName} {user.lastName}</div>
            <div className="user-metadata-sub">Admin ID {user.id}</div>
          </div>
        </div>
      </td>
      <td className="cell-email">{user.email}</td>
      <td className="cell-dept">
        <span 
          className="dept-badge"
          style={{
            backgroundColor: badgeStyle.background,
            color: badgeStyle.color,
            border: `1px solid ${badgeStyle.color}25`
          }}
        >
          {user.department}
        </span>
      </td>
      <td className="cell-actions">
        <div className="actions-button-wrapper">
          <button 
            className="btn btn-secondary action-icon-btn edit-btn" 
            onClick={() => onEdit(user)}
            title="Edit Member"
            aria-label={`Edit ${user.firstName}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          
          <button 
            className="btn btn-danger action-icon-btn delete-btn" 
            onClick={() => onDelete(user.id)}
            title="Remove Member"
            aria-label={`Delete ${user.firstName}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </td>

      <style>{`
        .user-row-tr {
          border-bottom: 1px solid var(--border-color);
          transition: background-color var(--transition-fast);
        }

        .user-row-tr:hover {
          background-color: var(--bg-hover);
        }

        .user-row-tr td {
          padding: 1rem 1.5rem;
          vertical-align: middle;
        }

        .cell-id {
          font-family: var(--font-heading);
          color: var(--text-muted);
          font-weight: 500;
          font-size: 0.9rem;
          width: 80px;
        }

        .avatar-info-wrapper {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .user-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.85rem;
          color: #fff;
          font-family: var(--font-heading);
          letter-spacing: 0.05em;
          box-shadow: 0 4px 10px rgba(0,0,0,0.25);
        }

        .full-name {
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .user-metadata-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .cell-email {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .dept-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .actions-button-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .action-icon-btn {
          width: 32px;
          height: 32px;
          padding: 0;
          border-radius: var(--radius-sm);
        }

        .edit-btn:hover {
          color: var(--secondary);
          border-color: var(--secondary);
          box-shadow: 0 0 8px var(--secondary-glow);
        }

        @media (max-width: 768px) {
          .cell-email, .cell-id {
            display: none; /* Hide on small viewports to allow card-like table */
          }
        }
      `}</style>
    </tr>
  );
}
