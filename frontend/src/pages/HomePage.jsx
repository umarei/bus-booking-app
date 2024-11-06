// src/pages/HomePage.js

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => (
  <div className="home-page">
    <Navbar />
    <main>
      <h1>Welcome to the Bus Booking App</h1>
      <p>Book your bus tickets quickly and easily.</p>
    </main>
    <Footer />
  </div>
);

export default HomePage;
