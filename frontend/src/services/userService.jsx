// src/services/userService.js

import api from './api';

// Function to fetch the current user's profile data
export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

// Function to update the user's profile
export const updateUserProfile = async (profileData) => {
  const response = await api.put('/users/profile', profileData);
  return response.data;
};
