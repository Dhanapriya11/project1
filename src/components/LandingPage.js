import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = ({ onLMSClick, onMapClick, onLeaveFormClick }) => {
  const navigate = useNavigate();
  
  const handleAdminLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="landing-container">
      <div className="landing-header">
        <h1>LMS PLATFORM</h1>
      </div>
      <div className="options-container">
        <div className="option-card" onClick={onLMSClick}>
          <div className="option-icon">📚</div>
          <h2>LMS</h2>
        </div>
        <div className="option-card" onClick={onMapClick}>
          <div className="option-icon">📱</div>
          <h2>MAP</h2>
        </div>
        <div className="option-card" onClick={onLeaveFormClick}>
          <div className="option-icon">📝</div>
          <h2>LEAVE FORM</h2>
        </div>
      </div>
      <div className="admin-login-link" onClick={handleAdminLoginClick}>
        Admin Login
      </div>
    </div>
  );
};

export default LandingPage;