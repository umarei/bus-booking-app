// src/hooks/useBooking.js

import { useState, useEffect } from 'react';
import { getUserBookings, createBooking, cancelBooking } from '../services/bookingService';

const useBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getUserBookings();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Add a new booking
  const addBooking = async (bookingData) => {
    try {
      const newBooking = await createBooking(bookingData);
      setBookings((prevBookings) => [...prevBookings, newBooking]);
      return newBooking;
    } catch (error) {
      throw error;
    }
  };

  // Remove (cancel) a booking
  const removeBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      throw error;
    }
  };

  return {
    bookings,
    loading,
    addBooking,
    removeBooking,
  };
};

export default useBooking;
