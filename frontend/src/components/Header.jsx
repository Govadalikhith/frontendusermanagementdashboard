import React from 'react';

export default function Header({ totalUsers, onAddClick }) {
  return (
    <header className="flex items-center justify-between p-5 md:px-8 border-l-4 border-brand-primary flex-wrap gap-6 bg-brand-surface backdrop-blur-md border border-white/5 rounded-2xl shadow-2xl">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(139,92,246,0.3)]">
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
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Tacnique Dashboard
          </h1>
          <p className="text-xs md:text-sm text-slate-400">
            User Management System Hub
          </p>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Total Administrators</span>
          <span className="text-xl md:text-2xl font-bold text-brand-primary drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]">
            {totalUsers}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Active Departments</span>
          <span className="text-xl md:text-2xl font-bold text-brand-secondary drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            7
          </span>
        </div>
      </div>

      <button 
        className="w-full md:w-auto bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-[#a78bfa] hover:to-[#22d3ee] text-white font-semibold text-sm py-2.5 px-5 rounded-xl shadow-lg hover:shadow-violet-600/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
        onClick={onAddClick}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add Member
      </button>
    </header>
  );
}
