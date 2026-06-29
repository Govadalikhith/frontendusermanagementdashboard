import React from 'react';
import { PAGE_SIZE_OPTIONS } from '../utils/constants.js';

export default function Pagination({ page, limit, totalCount, onPageChange, onLimitChange }) {
  const totalPages = Math.ceil(totalCount / limit) || 1;

  const startRecord = (page - 1) * limit + 1;
  const endRecord = Math.min(page * limit, totalCount);

  // Generate range of page numbers to render (e.g., page 1, 2, 3...)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="glass-panel pagination-container">
      <div className="limit-selector-wrapper">
        <label htmlFor="pageSizeSelect">Show</label>
        <div className="select-dropdown-wrapper">
          <select
            id="pageSizeSelect"
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="form-input size-select"
          >
            {PAGE_SIZE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <span>members per page</span>
      </div>

      <div className="range-indicator">
        {totalCount > 0 ? (
          <span>Showing <strong>{startRecord}</strong> - <strong>{endRecord}</strong> of <strong>{totalCount}</strong> members</span>
        ) : (
          <span>No members to display</span>
        )}
      </div>

      <div className="page-buttons-wrapper">
        <button
          className="btn btn-secondary pagination-btn prev-btn"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {getPageNumbers().map((pNum) => (
          <button
            key={pNum}
            className={`btn p-number-btn ${page === pNum ? 'active-p-btn' : 'btn-secondary'}`}
            onClick={() => onPageChange(pNum)}
          >
            {pNum}
          </button>
        ))}

        <button
          className="btn btn-secondary pagination-btn next-btn"
          disabled={page === totalPages || totalCount === 0}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <style>{`
        .pagination-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          flex-wrap: wrap;
          gap: 1.25rem;
          border-radius: var(--radius-lg);
        }

        .limit-selector-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .select-dropdown-wrapper {
          position: relative;
        }

        .size-select {
          padding: 0.4rem 2rem 0.4rem 0.75rem;
          font-size: 0.85rem;
          background: rgba(255, 255, 255, 0.03);
          border-color: var(--border-color);
          width: auto;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.5rem center;
          background-size: 1rem;
        }

        .range-indicator {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .range-indicator strong {
          color: var(--text-primary);
        }

        .page-buttons-wrapper {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .pagination-btn {
          width: 34px;
          height: 34px;
          padding: 0;
        }

        .p-number-btn {
          width: 34px;
          height: 34px;
          padding: 0;
          font-size: 0.85rem;
          border-radius: var(--radius-sm);
        }

        .active-p-btn {
          background: var(--gradient-brand);
          color: #fff;
          border-color: transparent;
          font-weight: 700;
          box-shadow: 0 4px 10px var(--primary-glow);
        }

        @media (max-width: 768px) {
          .pagination-container {
            flex-direction: column;
            align-items: stretch;
            padding: 1.25rem;
          }
          .range-indicator {
            text-align: center;
          }
          .page-buttons-wrapper {
            justify-content: center;
          }
          .limit-selector-wrapper {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
