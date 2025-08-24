import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt, faUser, faBook, faTasks, faChartBar, 
  faEnvelope, faTrophy, faFlask, faBell, faRobot, faUsers, faBars, faTimes
} from '@fortawesome/free-solid-svg-icons';
import './TeacherSidebar.css';

const TeacherSidebar = ({ onToggle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/teacher/dashboard', icon: faTachometerAlt },
    { name: 'Profile', path: '/teacher/profile', icon: faUser },
    { name: 'Content Library', path: '/teacher/content-library', icon: faBook },
    { name: 'Assignments', path: '/teacher/assignments', icon: faTasks },
    { name: 'Class Performance', path: '/teacher/class-performance', icon: faChartBar },
    { name: 'Messages', path: '/teacher/messages', icon: faEnvelope },
    { name: 'Leaderboard', path: '/teacher/leaderboard', icon: faTrophy },
    { name: 'JEE/NEET Material', path: '/teacher/jee-neet-material', icon: faFlask },
    { name: 'Homework Reminders', path: '/teacher/homework-reminders', icon: faBell },
    { name: 'AI Assistant', path: '/teacher/ai-assistant', icon: faRobot },
    { name: 'Parent Messaging', path: '/teacher/parent-messaging', icon: faUsers }
  ];

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    if (onToggle) {
      onToggle(!newState);
    }
  };

  return (
    <>
      <button className="teacher-hamburger-menu" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
      </button>
      <div className={`teacher-sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="teacher-sidebar-header">
          {isSidebarOpen && (
            <>
              <h2>Teacher Panel</h2>
              <p>LMS</p>
            </>
          )}
        </div>
        <nav className="teacher-sidebar-nav">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path} 
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  <FontAwesomeIcon icon={item.icon} className="menu-icon" />
                  {isSidebarOpen && <span className="menu-text">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default TeacherSidebar;
