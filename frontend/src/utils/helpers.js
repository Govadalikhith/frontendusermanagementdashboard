/**
 * Extracts initials from first and last names (e.g. John Doe -> JD)
 * @param {string} firstName 
 * @param {string} lastName 
 * @returns {string}
 */
export const getInitials = (firstName = '', lastName = '') => {
  const first = firstName.trim().charAt(0) || '';
  const last = lastName.trim().charAt(0) || '';
  return `${first}${last}`.toUpperCase();
};

/**
 * Truncates text if it exceeds a maximum length.
 * @param {string} text 
 * @param {number} maxLength 
 * @returns {string}
 */
export const truncateText = (text = '', maxLength = 30) => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Returns a CSS class name or custom color mapping for departments
 * so that badges look distinct and attractive.
 * @param {string} department 
 * @returns {Object} { background, color } style settings
 */
export const getDepartmentColor = (department = '') => {
  const dept = department.toLowerCase();
  switch (dept) {
    case 'engineering':
      return { background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa' }; // purple
    case 'marketing':
      return { background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6' }; // pink
    case 'sales':
      return { background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }; // amber
    case 'design':
      return { background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee' }; // cyan
    case 'product':
      return { background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }; // emerald
    case 'human resources':
      return { background: 'rgba(244, 63, 94, 0.15)', color: '#fb7185' }; // rose
    case 'finance':
      return { background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }; // blue
    default:
      return { background: 'rgba(148, 163, 184, 0.15)', color: '#cbd5e1' }; // slate
  }
};
