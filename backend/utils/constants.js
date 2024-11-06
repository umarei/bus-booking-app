// utils/constants.js

module.exports = {
  USER_ROLES: {
    ADMIN: 'admin',
    USER: 'user',
  },
  BOOKING_STATUS: {
    BOOKED: 'booked',
    CANCELLED: 'cancelled',
  },
  PAYMENT_STATUS: {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
  },
  ERROR_MESSAGES: {
    USER_NOT_FOUND: 'User not found',
    BUS_NOT_FOUND: 'Bus not found',
    BOOKING_NOT_FOUND: 'Booking not found',
    INVALID_CREDENTIALS: 'Invalid email or password',
    SEAT_ALREADY_BOOKED: 'Seat already booked',
    INVALID_TOKEN: 'Invalid or expired token',
  },
};
