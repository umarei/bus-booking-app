// src/services/busService.js

import api from './api';

// Function to retrieve all available buses
export const getAllBuses = async () => {
  const response = await api.get('/buses');
  return response.data;
};

// Function to get details of a specific bus
export const getBusDetails = async (busId) => {
  const response = await api.get(`/buses/${busId}`);
  return response.data;
};
