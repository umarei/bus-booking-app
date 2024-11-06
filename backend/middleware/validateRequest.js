// validateRequest.js

const { validationResult } = require('express-validator');

const validateRequest = (schemas) => {
  return async (req, res, next) => {
    // Run validation chains
    await Promise.all(schemas.map((schema) => schema.run(req)));

    // Collect errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array().map((err) => ({
          field: err.param,
          message: err.msg,
        })),
      });
    }

    next();
  };
};

module.exports = validateRequest;
