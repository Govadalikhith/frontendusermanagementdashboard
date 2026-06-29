import React from 'react';

export default function Header({ totalUsers, onAddClick }) {
  // We can calculate/display stats
  return (
    <header className="glass-panel header-container">
      <div className="header-branding">
        <div className="branding-logo">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="url(#brand-grad)" />
            <path d="M12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6ZM12 15.5C9.33 15.5 4 16.84 4 19.5V21H20V19.5C20 16.84 14.67 15.5 12 15.5Z" fill="white" />
            <defs>
              <linearGradient id="brand-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8b5cf6" />
                <stop offset="1" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div>
          <h1>Tacnique Dashboard</h1>
          <p className="subtitle">User Management System Hub</p>
        </div>
      </div>

      <div className="header-stats">
        <div className="stat-card">
          <span className="stat-label">Total Administrators</span>
          <span className="stat-value glow-text-primary">{totalUsers}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Active Departments</span>
          <span className="stat-value glow-text-secondary">7</span>
        </div>
      </div>

      <button className="btn btn-primary" onClick={onAddClick}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add Member
      </button>

      <style>{`
        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 2rem;
          flex-wrap: wrap;
          gap: 1.5rem;
          border-left: 4px solid var(--primary);
        }

        .header-branding {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .branding-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 0 8px var(--primary-glow));
        }

        .header-branding h1 {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(to right, #ffffff, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .header-stats {
          display: flex;
          gap: 2rem;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .stat-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          font-family: var(--font-heading);
        }

        @media (max-width: 768px) {
          .header-container {
            flex-direction: column;
            align-items: stretch;
            padding: 1.25rem;
          }
          .header-stats {
            justify-content: space-between;
            gap: 1rem;
          }
          .btn-primary {
            width: 100%;
          }
        }
      `}</style>
    </header>
  );
}
