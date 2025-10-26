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
        <header className="premium-header">
          <div className="header-content">
            <div className="header-title-section">
              <h1>Student Dashboard</h1>
              <p>Welcome back, {studentUsername}!</p>
            </div>
            <div className="header-stats">
              <div className="quick-stat">
                <span className="stat-label">Active Courses</span>
                <span className="stat-value">{stats.coursesEnrolled}</span>
              </div>
              <div className="quick-stat">
                <span className="stat-label">Due Soon</span>
                <span className="stat-value">{stats.assignmentsDue}</span>
              </div>
            </div>
          </div>
          <div className="header-actions">
            <button onClick={handleLogout} className="premium-button">
              <FontAwesomeIcon icon={faExclamationCircle} />
              Logout
            </button>
          </div>
        </header>
        
        <div className="dashboard-content">
          <section className="stats-section">
            <div className="premium-section-header">
              <h2>Quick Overview</h2>
              <div className="section-actions">
                <button className="premium-button secondary">
                  <FontAwesomeIcon icon={faSpinner} />
                  Refresh
                </button>
              </div>
            </div>
            <div className="premium-grid premium-grid-3">
              <div className="premium-stat-card animate-fade-in">
                <div className="stat-icon">
                  <FontAwesomeIcon icon={faBook} />
                </div>
                <div className="stat-content">
                  <div className="stat-label">Courses Enrolled</div>
                  <div className="stat-value">{stats.coursesEnrolled}</div>
                  <div className="stat-trend">
                    <span className="trend-indicator positive">+2 this month</span>
                  </div>
                </div>
              </div>
              
              <div className="premium-stat-card animate-fade-in" style={{animationDelay: '0.1s'}}>
                <div className="stat-icon">
                  <FontAwesomeIcon icon={faClipboardList} />
                </div>
                <div className="stat-content">
                  <div className="stat-label">Assignments Due</div>
                  <div className="stat-value">{stats.assignmentsDue}</div>
                  <div className="stat-trend">
                    <span className="trend-indicator negative">Due this week</span>
                  </div>
                </div>
              </div>
              
              <div className="premium-stat-card animate-fade-in" style={{animationDelay: '0.2s'}}>
                <div className="stat-icon">
                  <FontAwesomeIcon icon={faGraduationCap} />
                </div>
                <div className="stat-content">
                  <div className="stat-label">Overall Grade</div>
                  <div className="stat-value">{stats.overallGrade}</div>
                  <div className="stat-trend">
                    <span className="trend-indicator positive">Maintained</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="upcoming-section">
            <div className="premium-section-header">
              <h2>Upcoming Assignments</h2>
              <Link to="/student/assignments" className="premium-button secondary">
                View All Assignments
                <FontAwesomeIcon icon={faCalendarAlt} />
              </Link>
            </div>
            <div className="premium-grid premium-grid-auto">
              {stats.upcomingAssignments.length > 0 ? (
                stats.upcomingAssignments.map((assignment, index) => (
                  <div key={assignment.id} className="premium-assignment-card animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="assignment-header">
                      <h4 className="assignment-title">{assignment.title}</h4>
                      <span className="priority-badge">High Priority</span>
                    </div>
                    <div className="assignment-details">
                      <p className="course-name">
                        <FontAwesomeIcon icon={faBook} />
                        {assignment.course}
                      </p>
                      <p className="due-date">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="assignment-actions">
                      <Link to={`/student/assignments/${assignment.id}`} className="premium-button secondary">
                        View Details
                      </Link>
                      <button className="premium-button gold">Start Now</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="premium-empty-state">
                  <div className="empty-icon">
                    <FontAwesomeIcon icon={faClipboardList} />
                  </div>
                  <h3>No Upcoming Assignments</h3>
                  <p>You're all caught up! Check back later for new assignments.</p>
                </div>
              )}
            </div>
          </section>
          
          <div className="premium-grid premium-grid-2">
            <section className="recent-grades">
              <div className="premium-section-header">
                <h2>Recent Grades</h2>
                <Link to="/student/grades" className="premium-button secondary">
                  View All Grades
                  <FontAwesomeIcon icon={faGraduationCap} />
                </Link>
              </div>
              <div className="premium-card">
                {stats.recentGrades.length > 0 ? (
                  <div className="grades-list">
                    {stats.recentGrades.map((grade, index) => (
                      <div key={grade.id} className="grade-item animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
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
                ) : (
                  <div className="premium-empty-state">
                    <div className="empty-icon">
                      <FontAwesomeIcon icon={faGraduationCap} />
                    </div>
                    <h3>No Recent Grades</h3>
                    <p>No recent grades available</p>
                  </div>
                )}
              </div>
            </section>
            
            <section className="today-schedule">
              <div className="premium-section-header">
                <h2>Today's Schedule</h2>
                <Link to="/student/schedule" className="premium-button secondary">
                  View Full Schedule
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </Link>
              </div>
              <div className="premium-card">
                {stats.schedule.length > 0 ? (
                  <div className="schedule-list">
                    {stats.schedule.map((item, index) => (
                      <div key={index} className="schedule-item animate-slide-in" style={{animationDelay: `${index * 0.1}s`}}>
                        <div className="time-badge">
                          <span className="time">{item.time}</span>
                        </div>
                        <div className="class-details">
                          <span className="subject">{item.subject}</span>
                          <span className="room">{item.room}</span>
                        </div>
                        <div className="class-status">
                          <span className="status-indicator upcoming">Upcoming</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="premium-empty-state">
                    <div className="empty-icon">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </div>
                    <h3>No Classes Today</h3>
                    <p>No classes scheduled for today</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Outlet />
    </div>
  );
};

export default StudentDashboard;
