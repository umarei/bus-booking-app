// src/utils/formatters.js

/**
 * Formats a date to a readable string
 * @param {Date|string} date - Date object or ISO string
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} - Formatted date string (e.g., 'March 5, 2023')
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, { ...defaultOptions, ...options });
};

/**
 * Formats a number to currency format
 * @param {number} amount - Amount to format
 * @param {string} locale - Locale code, e.g., 'en-US'
 * @param {string} currency - Currency code, e.g., 'USD'
 * @returns {string} - Formatted currency string (e.g., '$1,000.00')
 */
export const formatCurrency = (amount, locale = 'en-US', currency = 'USD') => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
};

/**
 * Truncates text to a specified length and adds ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} - Truncated text with ellipsis
 */
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};
