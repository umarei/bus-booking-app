// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import AuthProvider from './context/AuthProvider';
import BookingProvider from './context/BookingProvider';
import ThemeProvider from './context/ThemeProvider';
import reportWebVitals from './reportWebVitals';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BookingProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BookingProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
