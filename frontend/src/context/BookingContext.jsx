// src/context/BookingContext.js

import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

BookingContext.displayName = 'BookingContext';

export default BookingContext;
