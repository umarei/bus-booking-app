// src/hooks/useAuth.js

import { useState, useEffect } from 'react';
import { login as loginService, logout as logoutService, getUserProfile } from '../services/authService';

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user on initial load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserProfile();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const { user } = await loginService(email, password);
      setCurrentUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await logoutService();
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return {
    currentUser,
    isAuthenticated: !!currentUser,
    loading,
    login,
    logout,
  };
};

export default useAuth;
