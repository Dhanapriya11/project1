import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBook, faClipboardList, faGraduationCap, faCalendarAlt, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import './AdminSidebarNew.css'; // Reusing styles for consistency

const StudentSidebar = ({ isSidebarCollapsed }) => {
  return (
    <div className={`admin-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="admin-sidebar-header">
        <h2>Student Portal</h2>
      </div>
      <nav className="admin-sidebar-nav">
        <ul>
          <li>
            <NavLink to="/student/dashboard">
              <FontAwesomeIcon icon={faTachometerAlt} className="menu-icon" />
              <span className="menu-text">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/student/courses">
              <FontAwesomeIcon icon={faBook} className="menu-icon" />
              <span className="menu-text">Courses</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/student/assignments">
              <FontAwesomeIcon icon={faClipboardList} className="menu-icon" />
              <span className="menu-text">Assignments</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/student/grades">
              <FontAwesomeIcon icon={faGraduationCap} className="menu-icon" />
              <span className="menu-text">Grades</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/student/calendar">
              <FontAwesomeIcon icon={faCalendarAlt} className="menu-icon" />
              <span className="menu-text">Calendar</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/student/messages">
              <FontAwesomeIcon icon={faEnvelope} className="menu-icon" />
              <span className="menu-text">Messages</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/student/profile">
              <FontAwesomeIcon icon={faUser} className="menu-icon" />
              <span className="menu-text">Profile</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default StudentSidebar;
