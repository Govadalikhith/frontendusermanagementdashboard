import React, { useEffect } from 'react';

export default function Notification({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4500);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div 
      className={`fixed bottom-8 right-8 flex items-center gap-4 p-4 z-50 min-w-[320px] max-w-[420px] border-l-4 rounded-xl shadow-2xl bg-[#090d1a] border-y border-r border-white/5 ${
        isSuccess ? 'border-l-brand-success' : 'border-l-brand-error'
      } animate-[slideInUp_0.35s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
        isSuccess ? 'text-brand-success bg-brand-success/10' : 'text-brand-error bg-brand-error/10'
      }`}>
        {isSuccess ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        )}
      </div>
      <div className="flex-1 flex flex-col items-start">
        <p className="font-bold text-xs uppercase tracking-wider text-slate-200">
          {isSuccess ? 'System Alert' : 'Error Alert'}
        </p>
        <p className="text-xs text-slate-400 mt-0.5 text-left">{message}</p>
      </div>
      <button 
        className="text-slate-500 hover:text-white p-0.5 rounded-full hover:bg-white/5 transition-all duration-150" 
        onClick={onClose} 
        aria-label="Dismiss alert"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
}
