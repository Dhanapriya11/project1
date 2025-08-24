import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faCalendarCheck, faGraduationCap, faCalendarAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './AdminSidebarNew.css'; // Reusing styles for consistency

const ParentSidebar = ({ isSidebarCollapsed }) => {
  return (
    <div className={`admin-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="admin-sidebar-header">
        <h2>Parent Portal</h2>
      </div>
      <nav className="admin-sidebar-nav">
        <ul>
          <li>
            <NavLink to="/parent/dashboard">
              <FontAwesomeIcon icon={faTachometerAlt} className="menu-icon" />
              <span className="menu-text">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/parent/attendance">
              <FontAwesomeIcon icon={faCalendarCheck} className="menu-icon" />
              <span className="menu-text">Attendance</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/parent/grades">
              <FontAwesomeIcon icon={faGraduationCap} className="menu-icon" />
              <span className="menu-text">Grades</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/parent/events">
              <FontAwesomeIcon icon={faCalendarAlt} className="menu-icon" />
              <span className="menu-text">School Events</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/parent/messages">
              <FontAwesomeIcon icon={faEnvelope} className="menu-icon" />
              <span className="menu-text">Messages</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ParentSidebar;
