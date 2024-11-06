// src/components/common/Card.js

import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ title, children, className = '', ...props }) => (
  <div className={`card ${className}`} {...props}>
    {title && <h3 className="card-title">{title}</h3>}
    <div className="card-content">{children}</div>
  </div>
);

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
