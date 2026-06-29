import React from 'react';

export default function SearchBar({ search, onSearchChange, department, onClearDepartment, onOpenFilter }) {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 w-full">
      <div className="relative flex-1 flex items-center">
        <svg className="absolute left-4 text-slate-500 pointer-events-none" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by first name, last name, or email..."
          className="w-full bg-white/5 border border-white/5 focus:border-brand-primary focus:bg-white/10 rounded-xl pl-11 pr-10 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200"
        />
        {search && (
          <button 
            className="absolute right-3 text-slate-500 hover:text-white p-1 rounded-full hover:bg-white/5 transition-all duration-150" 
            onClick={() => onSearchChange('')} 
            aria-label="Clear search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      <div className="flex items-center justify-end gap-3">
        {department && (
          <div className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/30 text-brand-primary px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wide">
            <span>Dept: {department}</span>
            <button 
              className="hover:bg-brand-primary/20 p-0.5 rounded-full transition-all duration-150" 
              onClick={onClearDepartment} 
              aria-label={`Clear department ${department}`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        )}

        <button 
          className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-slate-100 font-semibold text-sm py-3 px-5 rounded-xl transition-all duration-200"
          onClick={onOpenFilter}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Filters
        </button>
      </div>
    </div>
  );
}
