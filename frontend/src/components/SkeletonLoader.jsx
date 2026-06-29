import React from 'react';

export default function SkeletonLoader({ rows = 5, cols = 5 }) {
  const dummyRows = Array(rows).fill(0);
  const dummyCols = Array(cols).fill(0);

  return (
    <>
      {dummyRows.map((_, rIdx) => (
        <tr key={`skeleton-row-${rIdx}`} className="border-b border-white/5">
          {dummyCols.map((_, cIdx) => (
            <td key={`skeleton-col-${cIdx}`} className="px-6 py-5 align-middle">
              <div 
                className="h-4 rounded-md animate-shimmer" 
                style={{ width: cIdx === 1 ? '70%' : cIdx === 4 ? '50%' : '45%' }}
              ></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
