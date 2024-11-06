// src/components/FormInput.js

import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({
  label,
  type = 'text',
  value,
  onChange,
  name,
  placeholder,
  error,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || `form-input-${name}`;
  return (
    <div className={`form-group ${className}`}>
      {label && <label htmlFor={inputId}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        id={inputId}
        placeholder={placeholder}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        {...props}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
};

export default FormInput;
