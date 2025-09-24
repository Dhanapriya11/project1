import React, { useState, useEffect } from 'react';
import { getUsers, getCourses } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    teachersAssigned: 0,
    coursesUploaded: 0,
    pendingTasks: 5, // placeholder
  });

  const [recentActivities, setRecentActivities] = useState([
    "3 students enrolled in Physics",
    "New course uploaded: Modern History",
    "Admin updated timetable",
    "Teacher John assigned to Math",
    "2 support messages received"
  ]);

  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        const coursesData = await getCourses();
        const students = usersData.filter(user => user.role === 'Student');
        const teachers = usersData.filter(user => user.role === 'Teacher');
        setStats({
          totalStudents: students.length,
          teachersAssigned: teachers.length,
          coursesUploaded: coursesData.length,
          pendingTasks: 5, // static placeholder
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminRole');
    navigate('/login');
  };

  // Navigation
  const goTo = (path) => navigate(path);

  const adminUsername = localStorage.getItem('adminUsername') || 'Admin';

  return (
    <div className="admin-dashboard-content">
      {/* Header */}
      <header className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {adminUsername}!</p>
        </div>
        <button onClick={handleLogout} className="admin-logout-button">
          Logout
        </button>
      </header>

      {/* Stats */}
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

      {/* Sections */}
      <div className="admin-sections">
        <div className="admin-section">
          <h2>Class Management</h2>
          <p>Manage classes, students, and assignments</p>
          <button className="admin-action-button" onClick={() => goTo('/admin/user-management')}>
            Manage Classes
          </button>
        </div>

        <div className="admin-section">
          <h2>Reports</h2>
          <p>View detailed reports and analytics</p>
          <button className="admin-action-button" onClick={() => goTo('/admin/reports-tracking-scheduling')}>
            View Reports
          </button>
        </div>

        <div className="admin-section">
          <h2>Calendar</h2>
          <Calendar value={date} onChange={setDate} />
        </div>

        <div className="admin-section">
          <h2>Communication</h2>
          <p>Send messages and announcements</p>
          <button className="admin-action-button" onClick={() => goTo('/admin/communication')}>
            Send Message
          </button>
        </div>

        <div className="admin-section">
          <h2>Content Management</h2>
          <p>Manage and upload course content</p>
          <button className="admin-action-button" onClick={() => goTo('/admin/academic-content-control')}>
            Manage Content
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="admin-recent-activity">
        <h3>Recent Activity</h3>
        <ul>
          {recentActivities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
