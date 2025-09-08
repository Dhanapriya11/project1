import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the LMS Admin Panel Dashboard</p>
      
      <div className="dashboard-stats">
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
      
      <div className="dashboard-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-button">Manage Users</button>
          <button className="action-button">View Reports</button>
          <button className="action-button">Content Approval</button>
          <button className="action-button">System Settings</button>
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
  );
};

export default Dashboard;