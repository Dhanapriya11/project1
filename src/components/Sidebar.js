import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faUsers, faLock, faBook, faChartLine, 
  faSearch, faComments, faRobot, faUniversalAccess, 
  faShieldAlt, faUser, faComment, faBars, faTimes
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = ({ onToggle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', path: '/super-admin-dashboard', icon: faHome },
    { name: 'User Management', path: '/user-management', icon: faUsers },
    { name: 'Role & Permission Management', path: '/role-permission-management', icon: faLock },
    { name: 'Academic Content Control', path: '/academic-content-control', icon: faBook },
    { name: 'Reports, Tracking & Scheduling', path: '/reports-tracking-scheduling', icon: faChartLine },
    { name: 'Analytics & Insights', path: '/analytics-insights', icon: faSearch },
    { name: 'Communication', path: '/communication', icon: faComments },
    { name: 'AI & Support Tools', path: '/ai-support-tools', icon: faRobot },
    { name: 'Enhancements & Accessibility', path: '/enhancements-accessibility', icon: faUniversalAccess },
    { name: 'Security & Maintenance', path: '/security-maintenance', icon: faShieldAlt },
    { name: 'Authentication & Profile', path: '/authentication-profile', icon: faUser },
    { name: 'Feedback', path: '/feedback', icon: faComment }
  ];

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    if (onToggle) {
      onToggle(!newState); // Pass the collapsed state (opposite of isOpen)
    }
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <button className="hamburger-menu" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="sidebar-header">
          {isSidebarOpen && (
            <>
              <h2> LMS </h2>
              <p>Learning Management System</p>
            </>
          )}
        </div>
        <nav className="sidebar-nav">
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
        {isSidebarOpen && (
          <div className="sidebar-footer">
            <p>© 2023 LMS Admin Panel</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;