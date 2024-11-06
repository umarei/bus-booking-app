// src/components/Button.js

import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`button ${className}`}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
};

export default Button;
