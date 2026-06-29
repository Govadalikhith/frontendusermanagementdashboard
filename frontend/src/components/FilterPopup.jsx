import React from 'react';
import { DEPARTMENTS } from '../utils/constants.js';

export default function FilterPopup({ isOpen, onClose, selectedDepartment, onSelectDepartment }) {
  if (!isOpen) return null;

  return (
    <div className="filter-drawer-overlay" onClick={onClose}>
      <div className="filter-drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h3>Filter Directory</h3>
          <button className="close-drawer-btn" onClick={onClose} aria-label="Close filters">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="drawer-body">
          <div className="filter-section">
            <h4>By Department</h4>
            <div className="department-grid">
              {DEPARTMENTS.map((dept) => {
                const isActive = selectedDepartment === dept;
                return (
                  <button
                    key={dept}
                    className={`dept-filter-card ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      onSelectDepartment(isActive ? '' : dept);
                    }}
                  >
                    <span className="dept-dot"></span>
                    {dept}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="drawer-footer">
          <button
            className="btn btn-secondary clear-filters-btn"
            disabled={!selectedDepartment}
            onClick={() => {
              onSelectDepartment('');
              onClose();
            }}
          >
            Reset Filters
          </button>
          <button className="btn btn-primary apply-filters-btn" onClick={onClose}>
            Apply Filters
          </button>
        </div>
      </div>

      <style>{`
        .filter-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(3, 5, 10, 0.5);
          backdrop-filter: blur(4px);
          z-index: 90;
          display: flex;
          justify-content: flex-end;
          animation: fadeIn var(--transition-fast) forwards;
        }

        .filter-drawer-content {
          background: #0d1224;
          border-left: 1px solid var(--border-color);
          width: 100%;
          max-width: 380px;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.4);
          animation: slideInRight var(--transition-normal) forwards;
        }

        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .drawer-header h3 {
          font-size: 1.2rem;
          background: linear-gradient(to right, #fff, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .close-drawer-btn {
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

        .close-drawer-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .drawer-body {
          flex: 1;
          padding: 1.5rem;
          overflow-y: auto;
        }

        .filter-section h4 {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .department-grid {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .dept-filter-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 1rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
          transition: all var(--transition-fast);
        }

        .dept-filter-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
          color: var(--text-primary);
        }

        .dept-filter-card.active {
          background: var(--primary-glow);
          border-color: var(--primary);
          color: var(--text-primary);
        }

        .dept-filter-card .dept-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--text-muted);
          transition: all var(--transition-fast);
        }

        .dept-filter-card.active .dept-dot {
          background: var(--secondary);
          box-shadow: 0 0 8px var(--secondary-glow);
        }

        .drawer-footer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          padding: 1.5rem;
          border-top: 1px solid var(--border-color);
          background: rgba(6, 9, 19, 0.5);
        }

        .clear-filters-btn {
          width: 100%;
        }

        .apply-filters-btn {
          width: 100%;
        }
      `}</style>
    </div>
  );
}
