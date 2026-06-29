import React from 'react';

export default function SearchBar({ search, onSearchChange, department, onClearDepartment, onOpenFilter }) {
  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by first name, last name, or email..."
          className="form-input search-field"
        />
        {search && (
          <button className="clear-search-btn" onClick={() => onSearchChange('')} aria-label="Clear search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      <div className="filters-row">
        {department && (
          <div className="active-filter-badge">
            <span>Dept: {department}</span>
            <button className="clear-badge-btn" onClick={onClearDepartment} aria-label={`Clear department ${department}`}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        )}

        <button className="btn btn-secondary filter-toggle-btn" onClick={onOpenFilter}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Filters
        </button>
      </div>

      <style>{`
        .search-bar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          width: 100%;
        }

        .search-input-wrapper {
          position: relative;
          flex: 1;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-muted);
          pointer-events: none;
        }

        .search-field {
          padding-left: 2.75rem;
          padding-right: 2.5rem;
        }

        .clear-search-btn {
          position: absolute;
          right: 1rem;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px;
          border-radius: 50%;
        }

        .clear-search-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .filters-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .active-filter-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--primary-glow);
          border: 1px solid rgba(139, 92, 246, 0.3);
          color: var(--primary);
          padding: 0.5rem 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 600;
          animation: scaleIn var(--transition-fast) forwards;
        }

        .clear-badge-btn {
          background: none;
          border: none;
          color: var(--primary);
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 1px;
          border-radius: 50%;
        }

        .clear-badge-btn:hover {
          background: rgba(139, 92, 246, 0.2);
        }

        @media (max-width: 768px) {
          .search-bar-container {
            flex-direction: column;
            align-items: stretch;
          }
          .filters-row {
            justify-content: flex-end;
          }
        }
      `}</style>
    </div>
  );
}
