import React from 'react';
import './Dashboard.css';

const Dashboard = ({ username, onLogout }) => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {username}!</span>
          <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-number">1,248</p>
          </div>
          <div className="stat-card">
            <h3>Active Courses</h3>
            <p className="stat-number">42</p>
          </div>
          <div className="stat-card">
            <h3>Assignments</h3>
            <p className="stat-number">126</p>
          </div>
          <div className="stat-card">
            <h3>Pending Reviews</h3>
            <p className="stat-number">24</p>
          </div>
        </div>
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <ul>
            <li>New user registered: John Doe</li>
            <li>Assignment submitted: Mathematics Quiz</li>
            <li>Content uploaded: Physics Chapter 5</li>
            <li>Feedback received: Chemistry Lab Report</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;