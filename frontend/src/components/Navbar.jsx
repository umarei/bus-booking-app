// src/components/Navbar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" className="navbar-logo">
          BusBooking
        </NavLink>
      </div>
      <nav className="navbar-nav">
        <ul>
          <li>
            <NavLink to="/" end activeClassName="active">
              Home
            </NavLink>
          </li>
          {currentUser ? (
            <>
              <li>
                <NavLink to="/bookings" activeClassName="active">
                  My Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" activeClassName="active">
                  Profile
                </NavLink>
              </li>
              <li>
                <button onClick={logout} className="logout-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" activeClassName="active">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" activeClassName="active">
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
