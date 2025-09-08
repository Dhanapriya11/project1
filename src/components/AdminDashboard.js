import React, { useState, useEffect } from 'react';
import { getUsers, getCourses } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    teachersAssigned: 0,
    coursesUploaded: 0,
    pendingTasks: 12, // Placeholder
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        const coursesData = await getCourses();
        const students = usersData.filter(user => user.role === 'Student');
        const teachers = usersData.filter(user => user.role === 'Teacher');
        setStats(prevStats => ({
          ...prevStats,
          totalStudents: students.length,
          teachersAssigned: teachers.length,
          coursesUploaded: coursesData.length,
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
  const handleClassManagement = () => {
    // For now, we'll navigate to user management as an example
    // In a real app, this would go to a dedicated class management page
    navigate('/admin/user-management');
  };

  const handleReports = () => {
    navigate('/admin/reports-tracking-scheduling');
  };

  const handleCalendar = () => {
    // For now, we'll navigate to analytics insights as an example
    // In a real app, this would go to a dedicated calendar page
    navigate('/admin/analytics-insights');
  };

  const handleCommunication = () => {
    navigate('/admin/communication');
  };

  const handleUserManagement = () => {
    navigate('/admin/user-management');
  };

  const handleContentManagement = () => {
    navigate('/admin/academic-content-control');
  };

  const handleRolePermissions = () => {
    navigate('/admin/role-permission-management');
  };

  const handleAISupport = () => {
    navigate('/admin/ai-support-tools');
  };

  // Get admin info from localStorage
  const adminUsername = localStorage.getItem('adminUsername') || 'Admin';

  return (
    <div className="admin-dashboard-content">
        <header className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {adminUsername}!</p>
          </div>
          <button onClick={handleLogout} className="admin-logout-button">
            Logout
          </button>
        </header>

        <div className="admin-stats">
          <div className="admin-stat-card">
            <h3>Total Students</h3>
            <p className="admin-stat-number">{stats.totalStudents}</p>
          </div>
          <div className="admin-stat-card">
            <h3>Teachers Assigned</h3>
            <p className="admin-stat-number">{stats.teachersAssigned}</p>
          </div>
          <div className="admin-stat-card">
            <h3>Courses Uploaded</h3>
            <p className="admin-stat-number">{stats.coursesUploaded}</p>
          </div>
          <div className="admin-stat-card">
            <h3>Pending Tasks</h3>
            <p className="admin-stat-number">{stats.pendingTasks}</p>
          </div>
        </div>
        
        <div className="admin-sections">
          <div className="admin-section">
            <h2>Class Management</h2>
            <div className="admin-section-content">
              <p>Manage classes, students, and assignments</p>
              <button className="admin-action-button" onClick={handleClassManagement}>Manage Classes</button>
            </div>
          </div>
          
          <div className="admin-section">
            <h2>Reports</h2>
            <div className="admin-section-content">
              <p>View detailed reports and analytics</p>
              <button className="admin-action-button" onClick={handleReports}>View Reports</button>
            </div>
          </div>
          
          <div className="admin-section">
            <h2>Calendar</h2>
            <div className="admin-section-content">
              <p>Manage schedules and events</p>
              <button className="admin-action-button" onClick={handleCalendar}>View Calendar</button>
            </div>
          </div>
          
          <div className="admin-section">
            <h2>Communication</h2>
            <div className="admin-section-content">
              <p>Send messages and announcements</p>
              <button className="admin-action-button" onClick={handleCommunication}>Send Message</button>
            </div>
          </div>
          
          <div className="admin-section">
            <h2>User Management</h2>
            <div className="admin-section-content">
              <p>Manage users, teachers, and parents</p>
              <button className="admin-action-button" onClick={handleUserManagement}>Manage Users</button>
            </div>
          </div>
          
          <div className="admin-section">
            <h2>Content Management</h2>
            <div className="admin-section-content">
              <p>Manage and upload course content</p>
              <button className="admin-action-button" onClick={handleContentManagement}>Manage Content</button>
            </div>
          </div>
          
          <div className="admin-section">
            <h2>Role & Permissions</h2>
            <div className="admin-section-content">
              <p>Manage user roles and permissions</p>
              <button className="admin-action-button" onClick={handleRolePermissions}>Manage Roles</button>
            </div>
          </div>
          
          <div className="admin-section">
            <h2>AI Support Tools</h2>
            <div className="admin-section-content">
              <p>Access AI-powered educational tools</p>
              <button className="admin-action-button" onClick={handleAISupport}>Access AI Tools</button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default AdminDashboard;