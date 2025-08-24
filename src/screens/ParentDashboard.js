import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ParentDashboard.css';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    upcomingAssignments: 3, // Placeholder
    recentGrades: 'A-', // Placeholder
    schoolAlerts: 1, // Placeholder
    unreadMessages: 2, // Placeholder
  });
  const parentUsername = localStorage.getItem('username') || 'Parent';

  const handleLogout = () => {
    localStorage.removeItem('isParentLoggedIn');
    localStorage.removeItem('parentUsername');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="parent-dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Parent Dashboard</h1>
          <p>Welcome, {parentUsername}!</p>
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
      <div className="parent-dashboard-stats">
        <div className="parent-stat-card">
          <h3>Upcoming Assignments</h3>
          <p>{stats.upcomingAssignments}</p>
        </div>
        <div className="parent-stat-card">
          <h3>Recent Grades</h3>
          <p>{stats.recentGrades}</p>
        </div>
        <div className="parent-stat-card">
          <h3>School Alerts</h3>
          <p>{stats.schoolAlerts}</p>
        </div>
        <div className="parent-stat-card">
          <h3>Unread Messages</h3>
          <p>{stats.unreadMessages}</p>
        </div>
      </div>
      <div className="dashboard-grid">
        <Link to="/parent/attendance" className="dashboard-card">
          <h3>View Attendance</h3>
          <p>Check your child's attendance records.</p>
        </Link>
        <Link to="/parent/grades" className="dashboard-card">
          <h3>Check Grades</h3>
          <p>Review recent grades and performance.</p>
        </Link>
        <Link to="/parent/events" className="dashboard-card">
          <h3>School Events</h3>
          <p>Stay updated on upcoming school events.</p>
        </Link>
        <Link to="/parent/messages" className="dashboard-card">
          <h3>Messages</h3>
          <p>Communicate with teachers.</p>
        </Link>
      </div>
    </div>
  );
};

export default ParentDashboard;
