import React, { useState, useEffect } from 'react';
import './profile.css';

const ProfileCard = () => {
  const [user, setUser] = useState(null); // State to hold user data
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user'); // Replace with your actual API endpoint
        const data = await response.json();
        setUser(data); // Set the user data to state
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Display loading or error message if data is not fetched yet
  if (!user) {
    return <div className="profile-card">Loading user data...</div>;
  }

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-image-container">
          <img
            src={user.profilePicture ? `${PF}${user.profilePicture}` : `${PF}default-profile.jpg`}
            alt={`Profile of ${user.name}`}
            className="profile-image"
          />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">
            {user.name}
            <span className="profile-username"> / @{user.username}</span>
          </h2>
          <p className="profile-job">{user.jobTitle || 'No Job Title'}</p>
        </div>

        <div className="profile-stats">
          <div className="profile-stat">
            <span className="stat-count">{user.posts || 0}</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="profile-stat">
            <span className="stat-count">{user.followers || 0}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="profile-stat">
            <span className="stat-count">{user.following || 0}</span>
            <span className="stat-label">Following</span>
          </div>
        </div>
      </div>
      <div className="profile-tabs">
        <span className="tab">My Posts</span>
        <span className="tab">Saved Posts</span>
        <span className="tab">Settings</span>
      </div>
    </div>
  );
};

export default ProfileCard;
