// src/pages/BusListPage.js

import React, { useEffect, useState } from 'react';
import { getAllBuses } from '../services/busService';
import Loader from '../components/Loader';
import Alert from '../components/common/Alert';

const BusListPage = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) return <Loader />;
  if (error) return <Alert message={error} type="error" />;

  return (
    <div className="bus-list-page">
      <h2>Available Buses</h2>
      <ul>
        {buses.map((bus) => (
          <li key={bus._id}>
            <strong>{bus.name}</strong> - {bus.route} - ${bus.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusListPage;
