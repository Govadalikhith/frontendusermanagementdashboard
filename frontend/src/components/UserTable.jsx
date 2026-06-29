import React from 'react';
import UserRow from './UserRow.jsx';
import SkeletonLoader from './SkeletonLoader.jsx';

export default function UserTable({ users, loading, sortField, sortOrder, onSort, onEdit, onDelete }) {
  const renderSortIndicator = (field) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? (
      <svg className="text-brand-secondary shrink-0 animate-[scaleIn_0.15s_ease]" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
      </svg>
    ) : (
      <svg className="text-brand-secondary shrink-0 animate-[scaleIn_0.15s_ease]" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <polyline points="19 12 12 19 5 12"></polyline>
      </svg>
    );
  };

  return (
    <div className="bg-brand-surface backdrop-blur-md border border-white/5 rounded-2xl shadow-2xl w-full overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              <th 
                className="px-6 py-4.5 font-heading text-xs font-bold text-slate-500 uppercase tracking-wider border-b-2 border-white/5 bg-[#060913]/40 select-none cursor-pointer hover:text-slate-200 transition-colors duration-150 hidden md:table-cell" 
                onClick={() => onSort('id')}
              >
                <div className="flex items-center gap-1.5">
                  ID {renderSortIndicator('id')}
                </div>
              </th>
              <th 
                className="px-6 py-4.5 font-heading text-xs font-bold text-slate-500 uppercase tracking-wider border-b-2 border-white/5 bg-[#060913]/40 select-none cursor-pointer hover:text-slate-200 transition-colors duration-150" 
                onClick={() => onSort('firstName')}
              >
                <div className="flex items-center gap-1.5">
                  Name {renderSortIndicator('firstName')}
                </div>
              </th>
              <th 
                className="px-6 py-4.5 font-heading text-xs font-bold text-slate-500 uppercase tracking-wider border-b-2 border-white/5 bg-[#060913]/40 select-none cursor-pointer hover:text-slate-200 transition-colors duration-150 hidden md:table-cell" 
                onClick={() => onSort('email')}
              >
                <div className="flex items-center gap-1.5">
                  Email {renderSortIndicator('email')}
                </div>
              </th>
              <th 
                className="px-6 py-4.5 font-heading text-xs font-bold text-slate-500 uppercase tracking-wider border-b-2 border-white/5 bg-[#060913]/40 select-none cursor-pointer hover:text-slate-200 transition-colors duration-150" 
                onClick={() => onSort('department')}
              >
                <div className="flex items-center gap-1.5">
                  Department {renderSortIndicator('department')}
                </div>
              </th>
              <th className="px-6 py-4.5 font-heading text-xs font-bold text-slate-500 uppercase tracking-wider border-b-2 border-white/5 bg-[#060913]/40 select-none text-right pr-10">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <SkeletonLoader rows={5} cols={5} />
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-20 px-4">
                  <div className="flex flex-col items-center gap-3 max-w-[320px] mx-auto">
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    <h4 className="text-base font-bold text-slate-300">No Members Found</h4>
                    <p className="text-xs text-slate-500">No records match your active search terms or filters.</p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <UserRow 
                  key={user.id} 
                  user={user} 
                  onEdit={onEdit} 
                  onDelete={onDelete} 
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
