import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faUsers, faBook, faChartLine, 
  faSearch, faComments, faRobot, 
  faUser, faComment, faBars, faTimes
} from '@fortawesome/free-solid-svg-icons';
import './AdminSidebarNew.css';

const AdminSidebarNew = ({ onToggle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: faHome },
    { name: 'User Management', path: '/admin/user-management', icon: faUsers },
    { name: 'Academic Content', path: '/admin/academic-content-control  ', icon: faBook },
    { name: 'Reports & Tracking', path: '/admin/reports-tracking-scheduling', icon: faChartLine },
    { name: 'Analytics', path: '/admin/analytics-insights', icon: faSearch },
    { name: 'Communication', path: '/admin/communication', icon: faComments },
    { name: 'AI Tools', path: '/admin/ai-support-tools', icon: faRobot },
    { name: 'Profile', path: '/admin/profile', icon: faUser },
    { name: 'Feedback', path: '/admin/feedback', icon: faComment }
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
      {/* Hamburger Menu */}
      <button className="admin-hamburger-menu" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
      </button>

      {/* Sidebar */}
      <div className={`admin-sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="admin-sidebar-header">
          {isSidebarOpen && (
            <>
              <h2>Admin Panel</h2>
              <p>Learning Management System</p>
            </>
          )}
        </div>

        <nav className="admin-sidebar-nav">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path} 
                  className={location.pathname === item.path ? 'active' : ''}
                  data-tooltip={!isSidebarOpen ? item.name : ''}
                >
                  <FontAwesomeIcon icon={item.icon} className="menu-icon" />
                  {isSidebarOpen && <span className="menu-text">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {isSidebarOpen && (
          <div className="admin-sidebar-footer">
            <p>© {new Date().getFullYear()} LMS Admin Panel</p>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminSidebarNew;
