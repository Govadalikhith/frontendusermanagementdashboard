import React from 'react';

export default function SkeletonLoader({ rows = 5, cols = 5 }) {
  const dummyRows = Array(rows).fill(0);
  const dummyCols = Array(cols).fill(0);

  return (
    <>
      {dummyRows.map((_, rIdx) => (
        <tr key={`skeleton-row-${rIdx}`} className="skeleton-row-tr">
          {dummyCols.map((_, cIdx) => (
            <td key={`skeleton-col-${cIdx}`}>
              <div className="skeleton-pulse-block" style={{ width: cIdx === 1 ? '70%' : '45%' }}></div>
            </td>
          ))}
        </tr>
      ))}

      <style>{`
        .skeleton-row-tr td {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .skeleton-pulse-block {
          height: 1rem;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.03) 25%,
            rgba(255, 255, 255, 0.08) 50%,
            rgba(255, 255, 255, 0.03) 75%
          );
          background-size: 200% 100%;
          border-radius: var(--radius-sm);
          animation: skeletonShimmer 1.5s infinite linear;
        }

        @keyframes skeletonShimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </>
  );
}
