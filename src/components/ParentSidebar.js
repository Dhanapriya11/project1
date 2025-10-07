import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  ClipboardCheck,
  Calendar,
  Mail,
  User,
  Bell,
  MessageCircle,
  Award,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import './StudentSidebar.css'; // Reusing the same styles for consistency

const ParentSidebar = ({ isCollapsed, onLogout, onToggle }) => {
  const location = useLocation();
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [pendingAlerts, setPendingAlerts] = useState(0);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Fetch unread messages count
    // fetch('/api/parent/unread-messages')
    //   .then(res => res.json())
    //   .then(data => setUnreadMessages(data.count));

    // Fetch pending alerts
    // fetch('/api/parent/pending-alerts')
    //   .then(res => res.json())
    //   .then(data => setPendingAlerts(data.count));

    // For demo purposes
    setUnreadMessages(2);
    setPendingAlerts(3);
  }, []);

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    // Clear all authentication related data from localStorage
    localStorage.removeItem('isParentLoggedIn');
    localStorage.removeItem('parentUsername');
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

  const toggleSidebar = () => {
    if (onToggle && typeof onToggle === 'function') {
      onToggle(!isCollapsed);
    }
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <button className="student-hamburger-menu" onClick={toggleSidebar}>
        {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <div className={`student-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="student-sidebar-header">
          {isCollapsed ? (
            <h2>PP</h2>
          ) : (
            <>
              <h2>Parent Portal</h2>
              <p>Learning Management System</p>
            </>
          )}
        </div>
        <nav className="student-sidebar-nav">
          <ul>
            <li className={isActive('/parent/dashboard') ? 'active' : ''}>
              <NavLink to="/parent/dashboard" className="sidebar-link">
                <LayoutDashboard className="menu-icon w-5 h-5" />
                {!isCollapsed && <span className="menu-text">Dashboard</span>}
              </NavLink>
            </li>

            <li className={isActive('/parent/children') ? 'active' : ''}>
              <NavLink to="/parent/children" className="sidebar-link">
                <Users className="menu-icon w-5 h-5" />
                {!isCollapsed && <span className="menu-text">Children</span>}
              </NavLink>
            </li>

            <li className={isActive('/parent/attendance') ? 'active' : ''}>
              <NavLink to="/parent/attendance" className="sidebar-link">
                <ClipboardCheck className="menu-icon w-5 h-5" />
                {!isCollapsed && <span className="menu-text">Attendance</span>}
              </NavLink>
            </li>

            <li className={isActive('/parent/grades') ? 'active' : ''}>
              <NavLink to="/parent/grades" className="sidebar-link">
                <GraduationCap className="menu-icon w-5 h-5" />
                {!isCollapsed && <span className="menu-text">Grades</span>}
              </NavLink>
            </li>

            <li className={isActive('/parent/calendar') ? 'active' : ''}>
              <NavLink to="/parent/calendar" className="sidebar-link">
                <Calendar className="menu-icon w-5 h-5" />
                {!isCollapsed && <span className="menu-text">School Calendar</span>}
              </NavLink>
            </li>

            <li className={`${isActive('/parent/messages') ? 'active' : ''} ${unreadMessages > 0 ? 'has-badge' : ''}`}>
              <NavLink to="/parent/messages" className="sidebar-link">
                <div className="menu-item-content">
                  <div className="menu-item-left">
                    <Mail className="menu-icon w-5 h-5" />
                    {!isCollapsed && <span className="menu-text">Messages</span>}
                  </div>
                  {!isCollapsed && unreadMessages > 0 && (
                    <span className="badge">{unreadMessages}</span>
                  )}
                </div>
              </NavLink>
            </li>

            <li className={`${isActive('/parent/alerts') ? 'active' : ''} ${pendingAlerts > 0 ? 'has-badge' : ''}`}>
              <NavLink to="/parent/alerts" className="sidebar-link">
                <div className="menu-item-content">
                  <div className="menu-item-left">
                    <Bell className="menu-icon w-5 h-5" />
                    {!isCollapsed && <span className="menu-text">Alerts</span>}
                  </div>
                  {!isCollapsed && pendingAlerts > 0 && (
                    <span className="badge">{pendingAlerts}</span>
                  )}
                </div>
              </NavLink>
            </li>

            <li className={isActive('/parent/profile') ? 'active' : ''}>
              <NavLink to="/parent/profile" className="sidebar-link">
                <User className="menu-icon w-5 h-5" />
                {!isCollapsed && <span className="menu-text">Profile</span>}
              </NavLink>
            </li>
          </ul>
          
          {/* Logout Section */}
          <div className="logout-section">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (window.confirm('Are you sure you want to logout?')) {
                  handleLogout();
                }
              }}
              className="logout-button"
            >
              <LogOut className="menu-icon w-5 h-5" />
              {!isCollapsed && <span className="menu-text">Logout</span>}
            </button>
          </div>
        </nav>
        {!isCollapsed && (
          <div className="student-sidebar-footer">
            <p>© 2024 LMS Parent Portal</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ParentSidebar;
