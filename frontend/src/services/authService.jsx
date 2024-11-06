// src/services/authService.js

import api from './api';

// Function to log in a user
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  const { token, user } = response.data;
  if (token) localStorage.setItem('token', token); // Store token in local storage
  return { token, user };
};

// Function to sign up a new user
export const signup = async (userData) => {
  const response = await api.post('/auth/signup', userData);
  return response.data;
};

// Function to log out the user
export const logout = () => {
  localStorage.removeItem('token'); // Clear token from local storage
};

// Function to get the current user's profile
export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};
