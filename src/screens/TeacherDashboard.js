import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers, getCourses } from '../services/api';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ studentCount: 0, courseCount: 0 });
  const teacherUsername = localStorage.getItem('username') || 'Teacher';

  const handleLogout = () => {
    localStorage.removeItem('isTeacherLoggedIn');
    localStorage.removeItem('teacherUsername');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/login');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsers();
        const courses = await getCourses();
        const students = users.filter(user => user.role === 'Student');
        setStats({ studentCount: students.length, courseCount: courses.length });
      } catch (error) {
        console.error("Failed to fetch teacher dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="teacher-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Teacher Dashboard</h1>
          <p>Welcome, {teacherUsername}!</p>
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p>{stats.studentCount}</p>
        </div>
        <div className="stat-card">
          <h3>My Courses</h3>
          <p>{stats.courseCount}</p>
        </div>
      </div>
      <div className="quick-links">
        <Link to="/teacher/content-library" className="quick-link-card">
          <h4>Content Library</h4>
        </Link>
        <Link to="/teacher/assignments" className="quick-link-card">
          <h4>Assignments</h4>
        </Link>
        <Link to="/teacher/class-performance" className="quick-link-card">
          <h4>Class Performance</h4>
        </Link>
        <Link to="/teacher/messages" className="quick-link-card">
          <h4>Messages</h4>
        </Link>
      </div>
    </div>
  );
};

export default TeacherDashboard;
