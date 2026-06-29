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
    <div className="bg-brand-surface backdrop-blur-md border border-white/5 rounded-2xl shadow-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span>Show</span>
        <div className="relative">
          <select
            id="pageSizeSelect"
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="bg-white/5 border border-white/5 focus:border-brand-primary rounded-xl pl-3 pr-8 py-1.5 text-xs text-white outline-none cursor-pointer appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '0.85rem'
            }}
          >
            {PAGE_SIZE_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="bg-[#0f172a] text-white">
                {opt}
              </option>
            ))}
          </select>
        </div>
        <span>members per page</span>
      </div>

      <div className="text-sm text-slate-400">
        {totalCount > 0 ? (
          <span>Showing <strong className="text-slate-100 font-semibold">{startRecord}</strong> - <strong className="text-slate-100 font-semibold">{endRecord}</strong> of <strong className="text-slate-100 font-semibold">{totalCount}</strong> members</span>
        ) : (
          <span>No members to display</span>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <button
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
            className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-semibold transition-all duration-200 ${
              page === pNum 
                ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white border-transparent font-bold shadow-md shadow-violet-600/10' 
                : 'bg-white/5 border border-white/5 text-slate-300 hover:bg-white/10'
            }`}
            onClick={() => onPageChange(pNum)}
          >
            {pNum}
          </button>
        ))}

        <button
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          disabled={page === totalPages || totalCount === 0}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}
