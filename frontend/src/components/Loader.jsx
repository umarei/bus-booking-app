// src/components/Loader.js

import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ size = 'medium', color = '#333' }) => (
  <div className={`loader loader-${size}`} role="status" aria-label="Loading">
    <svg
      className="spinner"
      width="50"
      height="50"
      viewBox="0 0 50 50"
      style={{ stroke: color }}
    >
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      />
    </svg>
  </div>
);

Loader.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.string,
};

export default Loader;
