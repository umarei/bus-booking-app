// src/components/Footer.js

import React from 'react';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <p>&copy; {new Date().getFullYear()} Bus Booking App. All rights reserved.</p>
      <ul className="footer-links">
        <li>
          <a href="/terms" rel="noopener noreferrer">
            Terms of Service
          </a>
        </li>
        <li>
          <a href="/privacy" rel="noopener noreferrer">
            Privacy Policy
          </a>
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;
