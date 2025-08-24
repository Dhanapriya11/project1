import React, { useState, useEffect } from 'react';
import { getUsers, getCourses } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './SuperAdminDashboard.css';

const SuperAdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeCourses: 0,
    systemAlerts: 3, // Placeholder
    serverUptime: '99.9%', // Placeholder
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        const coursesData = await getCourses();
        setStats(prevStats => ({
          ...prevStats,
          totalUsers: usersData.length,
          activeCourses: coursesData.length,
        }));
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchData();
  }, []);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove admin login status from localStorage
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminRole');
    // Redirect to login page
    navigate('/login');
  };

  // Navigation handlers for each section
  const handleUserManagement = () => {
    navigate('/user-management');
  };

  const handleContentApproval = () => {
    navigate('/academic-content-control');
  };

  const handleSystemMonitoring = () => {
    navigate('/reports-tracking-scheduling');
  };

  const handleSecurityManagement = () => {
    navigate('/security-maintenance');
  };

  const handleBackupRecovery = () => {
    navigate('/enhancements-accessibility');
  };

  const handleSystemReports = () => {
    navigate('/analytics-insights');
  };

  // Get admin info from localStorage
  const adminUsername = localStorage.getItem('adminUsername') || 'Super Admin';

  return (
    <div className="super-admin-dashboard">
      <header className="super-admin-header">
        <div>
          <h1>Super Admin Dashboard</h1>
          <p>Role: Super Administrator</p>
        </div>
        <div className="super-admin-user-info">
          <span>Welcome, {adminUsername}!</span>
          <button onClick={handleLogout} className="super-admin-logout-button">
            Logout
          </button>
        </div>
      </header>
      
      <div className="super-admin-dashboard-content">
        <div className="super-admin-stats">
          <div className="super-admin-stat-card">
            <h3>Total Users</h3>
            <p className="super-admin-stat-number">{stats.totalUsers}</p>
          </div>
          <div className="super-admin-stat-card">
            <h3>Active Courses</h3>
            <p className="super-admin-stat-number">{stats.activeCourses}</p>
          </div>
          <div className="super-admin-stat-card">
            <h3>System Alerts</h3>
            <p className="super-admin-stat-number">{stats.systemAlerts}</p>
          </div>
          <div className="super-admin-stat-card">
            <h3>Server Uptime</h3>
            <p className="super-admin-stat-number">{stats.serverUptime}</p>
          </div>
        </div>
        
        <div className="super-admin-sections">
          <div className="super-admin-section">
            <h2>User Management</h2>
            <div className="super-admin-section-content">
              <p>Manage all users, roles, and permissions across the system</p>
              <button className="super-admin-action-button" onClick={handleUserManagement}>Manage Users</button>
            </div>
          </div>
          
          <div className="super-admin-section">
            <h2>Content Approval</h2>
            <div className="super-admin-section-content">
              <p>Review and approve all course content submissions</p>
              <button className="super-admin-action-button" onClick={handleContentApproval}>Review Content</button>
            </div>
          </div>
          
          <div className="super-admin-section">
            <h2>System Monitoring</h2>
            <div className="super-admin-section-content">
              <p>Monitor system performance, health, and resource usage</p>
              <button className="super-admin-action-button" onClick={handleSystemMonitoring}>View Monitoring</button>
            </div>
          </div>
          
          <div className="super-admin-section">
            <h2>Security Management</h2>
            <div className="super-admin-section-content">
              <p>Configure security settings and access controls</p>
              <button className="super-admin-action-button" onClick={handleSecurityManagement}>Security Settings</button>
            </div>
          </div>
          
          <div className="super-admin-section">
            <h2>Backup & Recovery</h2>
            <div className="super-admin-section-content">
              <p>Manage system backups and data recovery procedures</p>
              <button className="super-admin-action-button" onClick={handleBackupRecovery}>Backup Management</button>
            </div>
          </div>
          
          <div className="super-admin-section">
            <h2>System Reports</h2>
            <div className="super-admin-section-content">
              <p>Generate and view comprehensive system analytics</p>
              <button className="super-admin-action-button" onClick={handleSystemReports}>View Reports</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;