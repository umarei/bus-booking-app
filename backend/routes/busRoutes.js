// routes/busRoutes.js

const express = require('express');
const { busController } = require('../controllers');
const authMiddleware = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { param, body } = require('express-validator');

const router = express.Router();

// Validation rules for bus ID parameter
const busIdValidation = [
  param('busId').isMongoId().withMessage('Valid bus ID is required'),
];

// Validation rules for adding/updating a bus (admin)
const busValidation = [
  body('busName').notEmpty().withMessage('Bus name is required').trim(),
  body('route.source').notEmpty().withMessage('Source is required').trim(),
  body('route.destination').notEmpty().withMessage('Destination is required').trim(),
  body('totalSeats')
    .isInt({ min: 1 })
    .withMessage('Total seats must be an integer greater than 0'),
  body('availableSeats')
    .isInt({ min: 0 })
    .withMessage('Available seats cannot be negative'),
  body('departureTime').isISO8601().withMessage('Valid departure time is required'),
  body('arrivalTime').isISO8601().withMessage('Valid arrival time is required'),
  body('fare').isFloat({ min: 0 }).withMessage('Fare cannot be negative'),
];

// Route to get all available buses
router.get('/', busController.getBuses);

// Route to get details of a specific bus
router.get(
  '/:busId',
  validateRequest(busIdValidation),
  busController.getBusById
);

// Routes below are for admin users; apply authMiddleware and admin check
// Middleware to check for admin role (assumes req.userRole is set)
const adminMiddleware = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

// Route to add a new bus (admin only)
router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  validateRequest(busValidation),
  busController.addBus
);

// Route to update bus details (admin only)
router.put(
  '/:busId',
  authMiddleware,
  adminMiddleware,
  validateRequest([...busIdValidation, ...busValidation]),
  busController.updateBus
);

// Route to delete a bus (admin only)
router.delete(
  '/:busId',
  authMiddleware,
  adminMiddleware,
  validateRequest(busIdValidation),
  busController.deleteBus
);

module.exports = router;
