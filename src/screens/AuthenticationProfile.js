import React, { useState } from 'react';
import './AuthenticationProfile.css';

const AuthenticationProfile = () => {
  const [profile, setProfile] = useState({
    username: 'admin',
    email: 'admin@lms.com',
    firstName: 'System',
    lastName: 'Administrator'
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to a server
    alert('Profile updated successfully!');
  };

  return (
    <div className="authentication-profile">
      <h1>Authentication & Profile</h1>
      <p>Update your profile details and password</p>
      
      <div className="profile-section">
        <h2>Profile Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={profile.username}
              onChange={handleProfileChange}
              disabled
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={profile.firstName}
              onChange={handleProfileChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={profile.lastName}
              onChange={handleProfileChange}
            />
          </div>
          
          <button type="submit" className="primary-button">Update Profile</button>
        </form>
      </div>
      
      <div className="password-section">
        <h2>Change Password</h2>
        <form>
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
            />
          </div>
          
          <button type="submit" className="primary-button">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default AuthenticationProfile;