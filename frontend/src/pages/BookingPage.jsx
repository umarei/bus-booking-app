// src/pages/BookingPage.js

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useBooking } from '../context/BookingContext';
import { getAllBuses } from '../services/busService';
import Loader from '../components/Loader';
import Alert from '../components/common/Alert';

const BookingPage = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addBooking } = useBooking();

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const data = await getAllBuses();
        setBuses(data);
      } catch (err) {
        setError('Failed to load buses.');
      } finally {
        setLoading(false);
      }
    };
    fetchBuses();
  }, []);

  const handleBook = async (busId) => {
    try {
      await addBooking({ busId });
      alert('Booking successful!');
    } catch (err) {
      alert('Booking failed.');
    }
  };

  if (loading) return <Loader />;
  if (error) return <Alert message={error} type="error" />;

  return (
    <div className="booking-page">
      <h2>Book a Bus</h2>
      <ul>
        {buses.map((bus) => (
          <li key={bus._id}>
            <strong>{bus.name}</strong> - {bus.route} - ${bus.price}
            <button onClick={() => handleBook(bus._id)}>Book Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingPage;
