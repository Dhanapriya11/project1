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
        <header className="premium-header">
          <div className="admin-header-content">
            <div className="admin-title-section">
              <h1>Admin Dashboard</h1>
              <p>Welcome back, {adminUsername}!</p>
            </div>
            <div className="admin-quick-stats">
              <div className="quick-stat">
                <span className="stat-label">Total Users</span>
                <span className="stat-value">{stats.totalStudents + stats.teachersAssigned}</span>
              </div>
              <div className="quick-stat">
                <span className="stat-label">Active Courses</span>
                <span className="stat-value">{stats.coursesUploaded}</span>
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="premium-button">
            Logout
          </button>
        </header>

        <div className="premium-grid premium-grid-4">
          <div className="premium-stat-card animate-fade-in">
            <div className="stat-icon">
              <span>👥</span>
            </div>
            <div className="stat-content">
              <div className="stat-label">Total Students</div>
              <div className="stat-value">{stats.totalStudents}</div>
              <div className="stat-trend">
                <span className="trend-indicator positive">+12 this month</span>
              </div>
            </div>
          </div>
          <div className="premium-stat-card animate-fade-in" style={{animationDelay: '0.1s'}}>
            <div className="stat-icon">
              <span>👨‍🏫</span>
            </div>
            <div className="stat-content">
              <div className="stat-label">Teachers Assigned</div>
              <div className="stat-value">{stats.teachersAssigned}</div>
              <div className="stat-trend">
                <span className="trend-indicator positive">Active</span>
              </div>
            </div>
          </div>
          <div className="premium-stat-card animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="stat-icon">
              <span>📚</span>
            </div>
            <div className="stat-content">
              <div className="stat-label">Courses Uploaded</div>
              <div className="stat-value">{stats.coursesUploaded}</div>
              <div className="stat-trend">
                <span className="trend-indicator positive">+5 this week</span>
              </div>
            </div>
          </div>
          <div className="premium-stat-card animate-fade-in" style={{animationDelay: '0.3s'}}>
            <div className="stat-icon">
              <span>⏰</span>
            </div>
            <div className="stat-content">
              <div className="stat-label">Pending Tasks</div>
              <div className="stat-value">{stats.pendingTasks}</div>
              <div className="stat-trend">
                <span className="trend-indicator negative">Needs attention</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="premium-grid premium-grid-2">
          <div className="premium-card animate-slide-up">
            <div className="premium-section-header">
              <h2>Class Management</h2>
            </div>
            <div className="admin-section-content">
              <p>Manage classes, students, and assignments with advanced tools and analytics.</p>
              <button className="premium-button" onClick={handleClassManagement}>Manage Classes</button>
            </div>
          </div>
          
          <div className="premium-card animate-slide-up" style={{animationDelay: '0.1s'}}>
            <div className="premium-section-header">
              <h2>Reports</h2>
            </div>
            <div className="admin-section-content">
              <p>View detailed reports and analytics with comprehensive insights and data visualization.</p>
              <button className="premium-button" onClick={handleReports}>View Reports</button>
            </div>
          </div>
          
          <div className="premium-card animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="premium-section-header">
              <h2>Calendar</h2>
            </div>
            <div className="admin-section-content">
              <p>Manage schedules and events with intelligent scheduling and conflict detection.</p>
              <button className="premium-button" onClick={handleCalendar}>View Calendar</button>
            </div>
          </div>
          
          <div className="premium-card animate-slide-up" style={{animationDelay: '0.3s'}}>
            <div className="premium-section-header">
              <h2>Communication</h2>
            </div>
            <div className="admin-section-content">
              <p>Send messages and announcements with advanced targeting and delivery tracking.</p>
              <button className="premium-button" onClick={handleCommunication}>Send Message</button>
            </div>
          </div>
          
          <div className="premium-card animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="premium-section-header">
              <h2>User Management</h2>
            </div>
            <div className="admin-section-content">
              <p>Manage users, teachers, and parents with role-based access control and permissions.</p>
              <button className="premium-button gold" onClick={handleUserManagement}>Manage Users</button>
            </div>
          </div>
          
          <div className="premium-card animate-slide-up" style={{animationDelay: '0.5s'}}>
            <div className="premium-section-header">
              <h2>Content Management</h2>
            </div>
            <div className="admin-section-content">
              <p>Manage and upload course content with intelligent organization and search capabilities.</p>
              <button className="premium-button" onClick={handleContentManagement}>Manage Content</button>
            </div>
          </div>
          
          <div className="premium-card animate-slide-up" style={{animationDelay: '0.6s'}}>
            <div className="premium-section-header">
              <h2>Role & Permissions</h2>
            </div>
            <div className="admin-section-content">
              <p>Manage user roles and permissions with granular access control and security policies.</p>
              <button className="premium-button" onClick={handleRolePermissions}>Manage Roles</button>
            </div>
          </div>
          
          <div className="premium-card animate-slide-up" style={{animationDelay: '0.7s'}}>
            <div className="premium-section-header">
              <h2>AI Support Tools</h2>
            </div>
            <div className="admin-section-content">
              <p>Access AI-powered educational tools with machine learning and intelligent automation.</p>
              <button className="premium-button gold" onClick={handleAISupport}>Access AI Tools</button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default AdminDashboard;