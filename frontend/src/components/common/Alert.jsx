// src/components/common/Alert.js

import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ message, type = 'info', onClose }) => (
  <div className={`alert alert-${type}`} role="alert">
    <span>{message}</span>
    {onClose && (
      <button
        type="button"
        className="alert-close"
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
    )}
  </div>
);

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  onClose: PropTypes.func,
};

export default Alert;
