import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell, FaCalendarAlt, FaGraduationCap, FaClipboardCheck, FaEnvelope, FaUserGraduate, FaChartLine, FaExclamationTriangle } from 'react-icons/fa';
import './ParentDashboard.css';

// Mock data - Replace with actual API calls
const mockChildren = [
  { id: 1, name: 'Alex Johnson', grade: '5th Grade', attendance: 92, averageGrade: 'A-', recentActivity: 'Math Test: 95%' },
  { id: 2, name: 'Sam Johnson', grade: '3rd Grade', attendance: 88, averageGrade: 'B+', recentActivity: 'Science Project Submitted' },
];

const mockNotifications = [
  { id: 1, type: 'fee', message: 'Tuition fee due on Sep 15', date: '2025-09-01', read: false },
  { id: 2, type: 'grade', message: 'New grade posted for Math', date: '2025-08-30', read: true },
  { id: 3, type: 'event', message: 'Parent-Teacher meeting scheduled', date: '2025-08-28', read: false },
];

const mockUpcomingAssignments = [
  { id: 1, subject: 'Math', title: 'Chapter 5 Homework', dueDate: '2025-09-10', childId: 1 },
  { id: 2, subject: 'Science', title: 'Lab Report', dueDate: '2025-09-12', childId: 1 },
  { id: 3, subject: 'English', title: 'Book Report', dueDate: '2025-09-15', childId: 2 },
];

const mockRecentActivities = [
  { id: 1, type: 'grade', message: 'Math Test: 95%', date: '2025-09-05', childId: 1 },
  { id: 2, type: 'attendance', message: 'Absent on Aug 30', date: '2025-08-30', childId: 2 },
  { id: 3, type: 'assignment', message: 'Science Project Submitted', date: '2025-08-28', childId: 1 },
];

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState(null);
  const [children, setChildren] = useState(mockChildren);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [upcomingAssignments, setUpcomingAssignments] = useState(mockUpcomingAssignments);
  const [recentActivities, setRecentActivities] = useState(mockRecentActivities);
  const parentUsername = localStorage.getItem('username') || 'Parent';

  useEffect(() => {
    // In a real app, fetch data from your API here
    // For now, we're using mock data
    if (children.length > 0 && !selectedChild) {
      setSelectedChild(children[0].id);
    }
  }, [children, selectedChild]);

  const getChildStats = (childId) => {
    const child = children.find(c => c.id === childId);
    if (!child) return null;
    
    const childAssignments = upcomingAssignments.filter(a => a.childId === childId);
    const childActivities = recentActivities.filter(a => a.childId === childId);
    
    return {
      ...child,
      assignmentCount: childAssignments.length,
      recentActivity: childActivities[0]?.message || 'No recent activity',
    };
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    localStorage.removeItem('isParentLoggedIn');
    localStorage.removeItem('parentUsername');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const currentChild = selectedChild ? getChildStats(selectedChild) : null;

  return (
    <div className="parent-dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Parent Dashboard</h1>
          <p>Welcome back, {parentUsername}!</p>
        </div>
        <div className="header-actions">
          <div className="notification-bell">
            <FaBell />
            {unreadNotifications > 0 && (
              <span className="notification-badge">{unreadNotifications}</span>
            )}
          </div>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </header>

      {/* Child Selection */}
      {children.length > 1 && (
        <div className="child-selector">
          <label>Viewing: </label>
          <select 
            value={selectedChild || ''} 
            onChange={(e) => setSelectedChild(Number(e.target.value))}
            className="child-dropdown"
          >
            {children.map(child => (
              <option key={child.id} value={child.id}>
                {child.name} - {child.grade}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Quick Stats */}
      {currentChild && (
        <div className="quick-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <FaClipboardCheck />
            </div>
            <div className="stat-content">
              <h3>Attendance</h3>
              <p className="stat-value">{currentChild.attendance}%</p>
              <p className="stat-trend">Class avg: 89%</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaGraduationCap />
            </div>
            <div className="stat-content">
              <h3>Average Grade</h3>
              <p className="stat-value">{currentChild.averageGrade}</p>
              <p className="stat-trend">+2% from last term</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaCalendarAlt />
            </div>
            <div className="stat-content">
              <h3>Upcoming Assignments</h3>
              <p className="stat-value">{currentChild.assignmentCount}</p>
              <p className="stat-trend">Next due in 3 days</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Left Column */}
        <div className="dashboard-column">
          {/* Recent Activity */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3><FaChartLine /> Recent Activity</h3>
              <Link to="/parent/activities">View All</Link>
            </div>
            <div className="activity-list">
              {recentActivities
                .filter(a => !selectedChild || a.childId === selectedChild)
                .slice(0, 5)
                .map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      {activity.type === 'grade' && <FaGraduationCap />}
                      {activity.type === 'attendance' && <FaClipboardCheck />}
                      {activity.type === 'assignment' && <FaClipboardCheck />}
                    </div>
                    <div className="activity-details">
                      <p className="activity-message">{activity.message}</p>
                      <p className="activity-date">{new Date(activity.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Upcoming Assignments */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3><FaClipboardCheck /> Upcoming Assignments</h3>
              <Link to="/parent/assignments">View All</Link>
            </div>
            <div className="assignments-list">
              {upcomingAssignments
                .filter(a => !selectedChild || a.childId === selectedChild)
                .slice(0, 3)
                .map(assignment => (
                  <div key={assignment.id} className="assignment-item">
                    <div className="assignment-subject">{assignment.subject}</div>
                    <div className="assignment-title">{assignment.title}</div>
                    <div className="assignment-due">
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="dashboard-column">
          {/* Notifications */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3><FaBell /> Notifications</h3>
              <Link to="/parent/notifications">View All</Link>
            </div>
            <div className="notifications-list">
              {notifications.slice(0, 4).map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${notification.read ? '' : 'unread'}`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="notification-icon">
                    {notification.type === 'fee' && <FaExclamationTriangle />}
                    {notification.type === 'grade' && <FaGraduationCap />}
                    {notification.type === 'event' && <FaCalendarAlt />}
                  </div>
                  <div className="notification-details">
                    <p className="notification-message">{notification.message}</p>
                    <p className="notification-date">
                      {new Date(notification.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="dashboard-card quick-links">
            <h3>Quick Links</h3>
            <div className="quick-links-grid">
              <Link to="/parent/attendance" className="quick-link">
                <FaClipboardCheck />
                <span>Attendance</span>
              </Link>
              <Link to="/parent/grades" className="quick-link">
                <FaGraduationCap />
                <span>Grades</span>
              </Link>
              <Link to="/parent/calendar" className="quick-link">
                <FaCalendarAlt />
                <span>School Calendar</span>
              </Link>
              <Link to="/parent/messages" className="quick-link">
                <FaEnvelope />
                <span>Messages</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
