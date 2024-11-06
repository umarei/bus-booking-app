// src/utils/constants.js

// API base URL (update according to environment)
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Endpoints (if needed)
export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/signup',
  GET_USER: '/users/profile',
  GET_BUSES: '/buses',
  CREATE_BOOKING: '/bookings',
};

// Theme constants
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

// Date and time formats
export const DATE_FORMAT = 'MM/DD/YYYY';
export const TIME_FORMAT = 'HH:mm';

// Other constants
export const DEFAULT_LANGUAGE = 'en';
export const ITEMS_PER_PAGE = 10;
export const MAX_BOOKING_ATTEMPTS = 5;
