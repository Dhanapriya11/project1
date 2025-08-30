import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faBook, 
  faClipboardList, 
  faGraduationCap, 
  faCalendarAlt, 
  faEnvelope, 
  faUser, 
  faChevronDown, 
  faChevronRight,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import './StudentSidebar.css';

const StudentSidebar = ({ isSidebarCollapsed, onLogout }) => {
  const location = useLocation();
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [pendingAssignments, setPendingAssignments] = useState(0);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Fetch unread messages count
    // fetch('/api/student/unread-messages')
    //   .then(res => res.json())
    //   .then(data => setUnreadMessages(data.count));
    
    // Fetch pending assignments
    // fetch('/api/student/pending-assignments')
    //   .then(res => res.json())
    //   .then(data => setPendingAssignments(data.count));
    
    // For demo purposes
    setUnreadMessages(3);
    setPendingAssignments(2);
  }, []);

  const toggleSubmenu = (menu) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    // Clear all authentication related data from localStorage
    localStorage.removeItem('isStudentLoggedIn');
    localStorage.removeItem('studentUsername');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    
    // Clear any session data
    sessionStorage.clear();
    
    // If there's a parent component handling logout (like App.js), call it
    if (onLogout && typeof onLogout === 'function') {
      onLogout();
    } else {
      // If no parent handler, redirect to login
      window.location.href = '/login';
    }
  };
  return (
    <div className={`student-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="student-sidebar-header">
        <h2>Student Portal</h2>
      </div>
      <nav className="student-sidebar-nav">
        <ul>
          <li className={isActive('/student/dashboard') ? 'active' : ''}>
            <NavLink to="/student/dashboard" className="sidebar-link">
              <FontAwesomeIcon icon={faTachometerAlt} className="menu-icon" />
              <span className="menu-text">Dashboard</span>
            </NavLink>
          </li>
          
          <li className={`has-submenu ${activeSubmenu === 'courses' ? 'open' : ''}`}>
            <div className="submenu-header" onClick={() => toggleSubmenu('courses')}>
              <div className="submenu-title">
                <FontAwesomeIcon icon={faBook} className="menu-icon" />
                <span className="menu-text">Courses</span>
              </div>
              <FontAwesomeIcon 
                icon={activeSubmenu === 'courses' ? faChevronDown : faChevronRight} 
                className="submenu-arrow" 
              />
            </div>
            {activeSubmenu === 'courses' && (
              <ul className="submenu">
                <li><NavLink to="/student/courses/all">All Courses</NavLink></li>
                <li><NavLink to="/student/courses/enrolled">My Courses</NavLink></li>
                <li><NavLink to="/student/courses/recommended">Recommended</NavLink></li>
              </ul>
            )}
          </li>

          <li className={`${isActive('/student/assignments') ? 'active' : ''} ${pendingAssignments > 0 ? 'has-badge' : ''}`}>
            <NavLink to="/student/assignments" className="sidebar-link">
              <div className="menu-item-content">
                <FontAwesomeIcon icon={faClipboardList} className="menu-icon" />
                <span className="menu-text">Assignments</span>
                {pendingAssignments > 0 && (
                  <span className="badge">{pendingAssignments}</span>
                )}
              </div>
            </NavLink>
          </li>

          <li className={isActive('/student/grades') ? 'active' : ''}>
            <NavLink to="/student/grades" className="sidebar-link">
              <FontAwesomeIcon icon={faGraduationCap} className="menu-icon" />
              <span className="menu-text">Grades</span>
            </NavLink>
          </li>

          <li className={isActive('/student/calendar') ? 'active' : ''}>
            <NavLink to="/student/calendar" className="sidebar-link">
              <FontAwesomeIcon icon={faCalendarAlt} className="menu-icon" />
              <span className="menu-text">Calendar</span>
            </NavLink>
          </li>

          <li className={`${isActive('/student/messages') ? 'active' : ''} ${unreadMessages > 0 ? 'has-badge' : ''}`}>
            <NavLink to="/student/messages" className="sidebar-link">
              <div className="menu-item-content">
                <FontAwesomeIcon icon={faEnvelope} className="menu-icon" />
                <span className="menu-text">Messages</span>
                {unreadMessages > 0 && (
                  <span className="badge">{unreadMessages}</span>
                )}
              </div>
            </NavLink>
          </li>

          <li className={isActive('/student/profile') ? 'active' : ''}>
            <NavLink to="/student/profile" className="sidebar-link">
              <FontAwesomeIcon icon={faUser} className="menu-icon" />
              <span className="menu-text">Profile</span>
            </NavLink>
          </li>

          <li className="logout-item">
            <button 
              onClick={(e) => {
                e.preventDefault();
                if (window.confirm('Are you sure you want to logout?')) {
                  handleLogout();
                }
              }} 
              className="logout-button"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
              <span className="menu-text">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default StudentSidebar;
