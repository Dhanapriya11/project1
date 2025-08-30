import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import StudentSidebar from '../components/StudentSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faClipboardList, faGraduationCap, faCalendarAlt, faSpinner, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import './StudentDashboard.css';
// Simple alert system to replace toast notifications
const showAlert = (message, type = 'info') => {
  const alertDiv = document.createElement('div');
  alertDiv.style.position = 'fixed';
  alertDiv.style.top = '20px';
  alertDiv.style.right = '20px';
  alertDiv.style.padding = '15px 20px';
  alertDiv.style.borderRadius = '4px';
  alertDiv.style.color = 'white';
  alertDiv.style.zIndex = '1000';
  
  switch(type) {
    case 'success':
      alertDiv.style.backgroundColor = '#28a745';
      break;
    case 'error':
      alertDiv.style.backgroundColor = '#dc3545';
      break;
    case 'warning':
      alertDiv.style.backgroundColor = '#ffc107';
      alertDiv.style.color = '#212529';
      break;
    default:
      alertDiv.style.backgroundColor = '#17a2b8';
  }
  
  alertDiv.textContent = message;
  document.body.appendChild(alertDiv);
  
  setTimeout(() => {
    alertDiv.style.opacity = '0';
    alertDiv.style.transition = 'opacity 0.5s';
    setTimeout(() => document.body.removeChild(alertDiv), 500);
  }, 3000);
};

const StudentDashboard = ({ isSidebarCollapsed, onSidebarToggle }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    coursesEnrolled: 0,
    assignmentsDue: 0,
    overallGrade: 'N/A',
    upcomingAssignments: [],
    recentGrades: [],
    schedule: []
  });
  
  const studentUsername = localStorage.getItem('username') || 'Student';
  const studentId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch this from your API
        // const response = await fetch(`/api/students/${studentId}/dashboard`);
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockData = {
          coursesEnrolled: 5,
          assignmentsDue: 3,
          overallGrade: 'B+',
          upcomingAssignments: [
            { id: 1, title: 'Math Homework', dueDate: '2023-12-15', course: 'Mathematics' },
            { id: 2, title: 'Science Project', dueDate: '2023-12-20', course: 'Science' },
          ],
          recentGrades: [
            { id: 1, assignment: 'Math Quiz', grade: 'A-', subject: 'Mathematics' },
            { id: 2, assignment: 'Science Test', grade: 'B+', subject: 'Science' },
          ],
          schedule: [
            { id: 1, time: '09:00 AM', subject: 'Mathematics', room: 'Room 101' },
            { id: 2, time: '11:00 AM', subject: 'Science', room: 'Lab 201' },
          ]
        };
        
        setStats(mockData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching student data:', err);
        setError('Failed to load dashboard data');
        showAlert('Failed to load dashboard data', 'error');
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  const handleLogout = () => {
    localStorage.removeItem('isStudentLoggedIn');
    localStorage.removeItem('studentUsername');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userId');
    sessionStorage.clear();
    navigate('/login');
    showAlert('Successfully logged out', 'success');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <FontAwesomeIcon icon={faExclamationCircle} size="3x" color="#dc3545" />
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="student-dashboard-container">
      <main className={`main-content ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <header className="dashboard-header">
          <div className="header-content">
            <div>
              <h1>Student Dashboard</h1>
              <p>Welcome back, {studentUsername}!</p>
            </div>
          </div>
          <div className="header-actions">
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </header>
        
        <div className="dashboard-content">
          <section className="stats-section">
            <h2>Quick Overview</h2>
            <div className="student-dashboard-stats">
              <div className="student-stat-card">
                <div className="stat-icon">
                  <FontAwesomeIcon icon={faBook} />
                </div>
                <div className="stat-info">
                  <h3>Courses Enrolled</h3>
                  <p className="stat-value">{stats.coursesEnrolled}</p>
                </div>
              </div>
              
              <div className="student-stat-card">
                <div className="stat-icon">
                  <FontAwesomeIcon icon={faClipboardList} />
                </div>
                <div className="stat-info">
                  <h3>Assignments Due</h3>
                  <p className="stat-value">{stats.assignmentsDue}</p>
                </div>
              </div>
              
              <div className="student-stat-card">
                <div className="stat-icon">
                  <FontAwesomeIcon icon={faGraduationCap} />
                </div>
                <div className="stat-info">
                  <h3>Overall Grade</h3>
                  <p className="stat-value">{stats.overallGrade}</p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="upcoming-section">
            <h2>Upcoming Assignments</h2>
            <div className="assignments-grid">
              {stats.upcomingAssignments.map(assignment => (
                <div key={assignment.id} className="assignment-card">
                  <h4>{assignment.title}</h4>
                  <p className="course-name">{assignment.course}</p>
                  <p className="due-date">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                  <Link to={`/student/assignments/${assignment.id}`} className="view-assignment">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </section>
          
          <div className="dashboard-grid">
            <section className="recent-grades">
              <h2>Recent Grades</h2>
              <div className="grades-list">
                {stats.recentGrades.map(grade => (
                  <div key={grade.id} className="grade-item">
                    <div className="grade-info">
                      <span className="assignment-name">{grade.assignment}</span>
                      <span className="subject">{grade.subject}</span>
                    </div>
                    <span className={`grade-badge ${grade.grade[0].toLowerCase()}`}>
                      {grade.grade}
                    </span>
                  </div>
                ))}
              </div>
              <Link to="/student/grades" className="view-all">View All Grades</Link>
            </section>
            
            <section className="today-schedule">
              <h2>Today's Schedule</h2>
              <div className="schedule-list">
                {stats.schedule.map((item, index) => (
                  <div key={index} className="schedule-item">
                    <span className="time">{item.time}</span>
                    <div className="class-details">
                      <span className="subject">{item.subject}</span>
                      <span className="room">{item.room}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/student/schedule" className="view-all">View Full Schedule</Link>
            </section>
          </div>
        </div>
      </main>
      <Outlet />
    </div>
  );
};

export default StudentDashboard;
