import React from 'react';
import UserRow from './UserRow.jsx';
import SkeletonLoader from './SkeletonLoader.jsx';

export default function UserTable({ users, loading, sortField, sortOrder, onSort, onEdit, onDelete }) {
  const renderSortIndicator = (field) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? (
      <svg className="sort-arrow asc" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
      </svg>
    ) : (
      <svg className="sort-arrow desc" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <polyline points="19 12 12 19 5 12"></polyline>
      </svg>
    );
  };

  return (
    <div className="glass-panel table-panel">
      <div className="table-responsive-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th className="sortable-th cell-id" onClick={() => onSort('id')}>
                <div className="th-content">
                  ID {renderSortIndicator('id')}
                </div>
              </th>
              <th className="sortable-th" onClick={() => onSort('firstName')}>
                <div className="th-content">
                  Name {renderSortIndicator('firstName')}
                </div>
              </th>
              <th className="sortable-th cell-email" onClick={() => onSort('email')}>
                <div className="th-content">
                  Email {renderSortIndicator('email')}
                </div>
              </th>
              <th className="sortable-th" onClick={() => onSort('department')}>
                <div className="th-content">
                  Department {renderSortIndicator('department')}
                </div>
              </th>
              <th className="cell-actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <SkeletonLoader rows={5} cols={5} />
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-state-cell">
                  <div className="empty-state-wrapper">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="empty-icon">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    <h4>No Members Found</h4>
                    <p>No records match your filters or search term.</p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <UserRow 
                  key={user.id} 
                  user={user} 
                  onEdit={onEdit} 
                  onDelete={onDelete} 
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .table-panel {
          border-radius: var(--radius-lg);
          overflow: hidden;
          width: 100%;
        }

        .table-responsive-wrapper {
          overflow-x: auto;
          width: 100%;
        }

        .user-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .user-table th {
          padding: 1.25rem 1.5rem;
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 2px solid var(--border-color);
          background: rgba(6, 9, 19, 0.4);
          user-select: none;
        }

        .sortable-th {
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .sortable-th:hover {
          color: var(--text-primary);
        }

        .th-content {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .sort-arrow {
          color: var(--secondary);
          animation: scaleIn 0.2s ease;
        }

        .cell-actions-header {
          text-align: right;
          padding-right: 2.5rem !important;
        }

        .empty-state-cell {
          text-align: center;
          padding: 5rem 2rem !important;
        }

        .empty-state-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          max-width: 300px;
          margin: 0 auto;
        }

        .empty-icon {
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }

        .empty-state-wrapper h4 {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .empty-state-wrapper p {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .cell-email {
            display: none;
          }
          .cell-id {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
