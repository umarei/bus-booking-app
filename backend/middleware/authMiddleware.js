// authMiddleware.js

const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/authConfig');

const authMiddleware = (req, res, next) => {
  try {
    // Retrieve token from Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Ensure the token is a Bearer token
    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Access denied. Invalid token format.' });
    }

    // Verify token
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId; // Attach user ID to the request object

    // Optionally, attach user role for role-based access control (RBAC)
    // req.userRole = decoded.role;

    next();
  } catch (error) {
    console.error('Authentication Error:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session expired. Please log in again.' });
    }
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
  


