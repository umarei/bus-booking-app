// src/pages/ProfilePage.js

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import Alert from '../components/common/Alert';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // Assume getUserProfile is a function that fetches user profile data

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Replace with actual service call
        setUserProfile(currentUser);
      } catch (err) {
        setError('Failed to load user profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [currentUser]);

  if (loading) return <Loader />;
  if (error) return <Alert message={error} type="error" />;

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <p>
        <strong>Name:</strong> {userProfile.name}
      </p>
      <p>
        <strong>Email:</strong> {userProfile.email}
      </p>
      <button>Edit Profile</button>
    </div>
  );
};

export default ProfilePage;
