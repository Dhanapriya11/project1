import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    coursesEnrolled: 5, // Placeholder
    assignmentsDue: 3, // Placeholder
    overallGrade: 'B+', // Placeholder
  });
  const studentUsername = localStorage.getItem('username') || 'Student';

  const handleLogout = () => {
    localStorage.removeItem('isStudentLoggedIn');
    localStorage.removeItem('studentUsername');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="student-dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Student Dashboard</h1>
          <p>Welcome, {studentUsername}!</p>
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
      <div className="student-dashboard-stats">
        <div className="student-stat-card">
          <h3>Courses Enrolled</h3>
          <p>{stats.coursesEnrolled}</p>
        </div>
        <div className="student-stat-card">
          <h3>Assignments Due</h3>
          <p>{stats.assignmentsDue}</p>
        </div>
        <div className="student-stat-card">
          <h3>Overall Grade</h3>
          <p>{stats.overallGrade}</p>
        </div>
      </div>
      <div className="dashboard-quick-links">
        <Link to="/student/courses" className="dashboard-card">
          <h3>My Courses</h3>
          <p>View your enrolled courses and materials.</p>
        </Link>
        <Link to="/student/assignments" className="dashboard-card">
          <h3>Assignments</h3>
          <p>Check upcoming and submitted assignments.</p>
        </Link>
        <Link to="/student/grades" className="dashboard-card">
          <h3>Grades</h3>
          <p>View your academic performance.</p>
        </Link>
        <Link to="/student/calendar" className="dashboard-card">
          <h3>Calendar</h3>
          <p>Keep track of important dates and events.</p>
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
