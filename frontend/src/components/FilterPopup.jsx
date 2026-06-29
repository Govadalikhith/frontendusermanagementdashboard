import React from 'react';
import { DEPARTMENTS } from '../utils/constants.js';

export default function FilterPopup({ isOpen, onClose, selectedDepartment, onSelectDepartment }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end" onClick={onClose}>
      <div className="bg-[#0d1224] border-l border-white/5 w-full max-w-[380px] h-full flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h3 className="text-lg font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Filter Directory
          </h3>
          <button 
            className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-white/5 transition-all duration-150" 
            onClick={onClose} 
            aria-label="Close filters"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 block">By Department</span>
            <div className="flex flex-col gap-2">
              {DEPARTMENTS.map((dept) => {
                const isActive = selectedDepartment === dept;
                return (
                  <button
                    key={dept}
                    className={`flex items-center gap-3 p-3.5 rounded-xl text-sm font-semibold text-left transition-all duration-200 border ${
                      isActive 
                        ? 'bg-brand-primary/10 border-brand-primary text-white' 
                        : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/5 hover:border-white/10 hover:text-white'
                    }`}
                    onClick={() => {
                      onSelectDepartment(isActive ? '' : dept);
                    }}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                      isActive 
                        ? 'bg-brand-secondary shadow-[0_0_8px_rgba(6,182,212,0.8)]' 
                        : 'bg-slate-600'
                    }`}></span>
                    {dept}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-6 border-t border-white/5 bg-[#060919]/50">
          <button
            className="w-full bg-white/5 border border-white/5 hover:bg-white/10 text-slate-100 font-semibold py-2.5 px-4 rounded-xl text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedDepartment}
            onClick={() => {
              onSelectDepartment('');
              onClose();
            }}
          >
            Reset Filters
          </button>
          <button 
            className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-2.5 px-4 rounded-xl text-sm shadow-lg hover:shadow-violet-600/20 transition-all duration-200" 
            onClick={onClose}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
