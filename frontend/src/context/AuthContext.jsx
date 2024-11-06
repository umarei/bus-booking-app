// src/context/AuthContext.js

import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

AuthContext.displayName = 'AuthContext';

export default AuthContext;
