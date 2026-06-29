import React from 'react';
import { getInitials, getDepartmentColor } from '../utils/helpers.js';

export default function UserRow({ user, onEdit, onDelete }) {
  const badgeStyle = getDepartmentColor(user.department);
  const initials = getInitials(user.firstName, user.lastName);

  // Generate an avatar color based on the first letter of first name
  const getAvatarGradient = (char) => {
    const code = char.charCodeAt(0) || 0;
    const hue = (code * 37) % 360;
    return `linear-gradient(135deg, hsl(${hue}, 80%, 60%) 0%, hsl(${(hue + 60) % 360}, 80%, 40%) 100%)`;
  };

  const avatarBackground = user.firstName ? getAvatarGradient(user.firstName.charAt(0)) : 'var(--gradient-brand)';

  return (
    <tr className="border-b border-white/5 hover:bg-white/[0.04] transition-all duration-150">
      <td className="px-6 py-4 align-middle hidden md:table-cell font-heading text-slate-500 font-semibold text-sm w-20">
        #{user.id}
      </td>
      <td className="px-6 py-4 align-middle">
        <div className="flex items-center gap-3">
          <div 
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white tracking-wider shadow-md shrink-0" 
            style={{ background: avatarBackground }}
          >
            {initials}
          </div>
          <div>
            <div className="font-semibold text-slate-200 text-sm">{user.firstName} {user.lastName}</div>
            <div className="text-[10px] text-slate-500 md:hidden">ID #{user.id} • {user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 align-middle hidden md:table-cell text-slate-400 text-sm">
        {user.email}
      </td>
      <td className="px-6 py-4 align-middle">
        <span 
          className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border"
          style={{
            backgroundColor: badgeStyle.background,
            color: badgeStyle.color,
            borderColor: `${badgeStyle.color}25`
          }}
        >
          {user.department}
        </span>
      </td>
      <td className="px-6 py-4 align-middle text-right">
        <div className="flex items-center justify-end gap-2">
          <button 
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/5 bg-white/5 hover:bg-white/10 hover:border-brand-secondary hover:text-brand-secondary hover:shadow-[0_0_8px_rgba(6,182,212,0.2)] text-slate-400 transition-all duration-150" 
            onClick={() => onEdit(user)}
            title="Edit Member"
            aria-label={`Edit ${user.firstName}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          
          <button 
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-red-500/10 bg-red-500/10 hover:bg-red-600 hover:text-white text-red-400 transition-all duration-150" 
            onClick={() => onDelete(user.id)}
            title="Remove Member"
            aria-label={`Delete ${user.firstName}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}
