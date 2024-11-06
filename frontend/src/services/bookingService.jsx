// src/services/bookingService.js

import api from './api';

// Function to create a new booking
export const createBooking = async (bookingData) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

// Function to retrieve all bookings for a user
export const getUserBookings = async () => {
  const response = await api.get('/bookings');
  return response.data;
};

// Function to update an existing booking
export const updateBooking = async (bookingId, bookingData) => {
  const response = await api.put(`/bookings/${bookingId}`, bookingData);
  return response.data;
};

// Function to cancel a booking
export const cancelBooking = async (bookingId) => {
  const response = await api.delete(`/bookings/${bookingId}`);
  return response.data;
};
