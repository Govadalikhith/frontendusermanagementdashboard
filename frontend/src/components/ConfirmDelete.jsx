import React from 'react';

export default function ConfirmDelete({ isOpen, onClose, onConfirm, userName, loading }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#0f172a] border-l-4 border-brand-error border-y border-r border-white/5 rounded-2xl shadow-2xl w-full max-w-[420px] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 p-6 border-b border-white/5 bg-[#060913]/40">
          <div className="text-brand-error bg-brand-error/10 w-9 h-9 rounded-full flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h3 className="text-base font-bold text-slate-200">Confirm Delete</h3>
        </div>

        <div className="p-6 text-slate-400 text-sm leading-relaxed flex flex-col gap-3">
          <p>Are you sure you want to remove <strong className="text-slate-100 font-semibold">{userName}</strong> from the organization directory?</p>
          <p className="text-xs text-red-400 font-medium">This action is permanent and cannot be undone.</p>
        </div>

        <div className="flex justify-end gap-3 p-5 border-t border-white/5 bg-[#060913]/40">
          <button className="bg-white/5 border border-white/5 hover:bg-white/10 text-slate-100 font-semibold py-2 px-4 rounded-xl text-sm transition-all duration-200" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button className="bg-brand-error hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-xl text-sm shadow-lg hover:shadow-red-600/10 transition-all duration-200 min-w-[140px] flex items-center justify-center" onClick={onConfirm} disabled={loading}>
            {loading ? <div className="w-5 h-5 border-2 border-white/20 rounded-full border-t-white animate-spin"></div> : 'Confirm Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
