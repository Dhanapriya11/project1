import React, { useCallback, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faSignOutAlt, faCog, faBell, faUserCog, 
  faGraduationCap, faChartLine, faServer, faShieldAlt 
} from '@fortawesome/free-solid-svg-icons';

import './SuperAdminSidebar.css';

const SuperAdminSidebar = ({ 
  onToggle, 
  onLogout, 
  currentPath: propPath, 
  isCollapsed = false, 
  isMobile = false, 
  isOpen = true 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = propPath || location.pathname;

  const menuItems = useMemo(() => [
    // Dashboard
    { 
      key: 'dashboard', 
      name: 'Dashboard', 
      path: '/superadmin/dashboard', 
      icon: faHome 
    },
    // User Management
    { 
      key: 'user-management', 
      name: 'User Management', 
      path: '/superadmin/user-management', 
      icon: faUserCog,
      submenu: [
        { key: 'user-roles', name: 'Roles & Permissions', path: '/superadmin/user-management/roles' }
      ]
    },
    // Academic
    { 
      key: 'academic', 
      name: 'Academic', 
      path: '/superadmin/academic/courses', 
      icon: faGraduationCap,
      submenu: [
        { key: 'courses', name: 'Courses', path: '/superadmin/academic/courses' },
        { key: 'subjects', name: 'Subjects', path: '/superadmin/academic/subjects' },
        { key: 'batches', name: 'Batches', path: '/superadmin/academic/batches' },
        { key: 'teacher-assignments', name: 'Teacher Assignments', path: '/superadmin/teacher-assignments' }
      ]
    },
    // Reports
    { 
      key: 'reports', 
      name: 'Reports', 
      path: '/superadmin/reports/student-progress', 
      icon: faChartLine,
      submenu: [
        { key: 'student-progress', name: 'Student Progress', path: '/superadmin/reports/student-progress' },
        { key: 'teacher-performance', name: 'Teacher Performance', path: '/superadmin/reports/teacher-performance' },
        { key: 'system-usage', name: 'System Usage', path: '/superadmin/reports/system-usage' }
      ]
    },
    // System
    { 
      key: 'system', 
      name: 'System', 
      path: '/superadmin/system/settings', 
      icon: faServer,
      submenu: [
        { key: 'system-settings', name: 'System Settings', path: '/superadmin/system/settings' },
        { key: 'backup', name: 'Backup & Restore', path: '/superadmin/system/backup' },
        { key: 'logs', name: 'System Logs', path: '/superadmin/system/logs' }
      ]
    },
    // Security
    { 
      key: 'security', 
      name: 'Security', 
      path: '/superadmin/security/audit-logs', 
      icon: faShieldAlt,
      submenu: [
        { key: 'audit-logs', name: 'Audit Logs', path: '/superadmin/security/audit-logs' },
        { key: 'login-history', name: 'Login History', path: '/superadmin/security/login-history' },
        { key: 'security-settings', name: 'Security Settings', path: '/superadmin/security/settings' }
      ]
    },
    // Other
    { 
      key: 'notifications', 
      name: 'Notifications', 
      path: '/superadmin/notifications', 
      icon: faBell, 
      badge: '3' 
    },
    { 
      key: 'settings', 
      name: 'Settings', 
      path: '/superadmin/settings', 
      icon: faCog 
    }
  ], []);

  const handleItemClick = useCallback(() => {
    if (isMobile) {
      onToggle?.(false);
    }
  }, [isMobile, onToggle]);

  const handleLogout = useCallback((e) => {
    e?.preventDefault();
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('isAdminLoggedIn');
      localStorage.removeItem('adminUsername');
      localStorage.removeItem('adminRole');
      localStorage.removeItem('currentUser');
      navigate('/login');
    }
  }, [navigate, onLogout]);

  const isSidebarCollapsed = isMobile ? !isOpen : isCollapsed;

  useEffect(() => {
    const sidebar = document.querySelector('.super-admin-sidebar');
    if (!sidebar) return;

    if (isOpen) {
      sidebar.classList.add('open');
      if (isMobile) {
        document.body.style.overflow = 'hidden';
        document.body.classList.add('sidebar-open');
      }
    } else {
      sidebar.classList.remove('open');
      if (isMobile) {
        document.body.style.overflow = 'auto';
        document.body.classList.remove('sidebar-open');
      }
    }

    return () => {
      if (isMobile) {
        document.body.style.overflow = 'auto';
        document.body.classList.remove('sidebar-open');
      }
    };
  }, [isOpen, isMobile]);

  return (
    <aside 
      className={`super-admin-sidebar ${isSidebarCollapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''} ${isOpen ? 'open' : ''}`}
      aria-label="Sidebar"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="super-admin-sidebar-header">
        {!isSidebarCollapsed ? (
          <>
            <h2>Super Admin</h2>
            <p>Learning Management System</p>
          </>
        ) : (
          <div className="sidebar-logo-collapsed">
            <span>SA</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="super-admin-sidebar-nav">
        <ul>
          {menuItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <li key={item.key} className={isActive ? 'active' : ''}>
                <Link 
                  to={item.path} 
                  className={`menu-item ${isActive ? 'active' : ''}`}
                  data-tooltip={isSidebarCollapsed ? item.name : ''}
                  onClick={handleItemClick}
                >
                  <FontAwesomeIcon icon={item.icon} className="menu-icon" />
                  {!isSidebarCollapsed && (
                    <>
                      <span className="menu-text">{item.name}</span>
                      {item.badge && (
                        <span className="menu-badge">{item.badge}</span>
                      )}
                    </>
                  )}
                </Link>
              </li>
            );
          })}

          {/* Logout */}
          <li className="mt-auto">
            <button 
              onClick={handleLogout}
              className="logout-button"
              data-tooltip={isSidebarCollapsed ? 'Logout' : ''}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
              {!isSidebarCollapsed && <span>Logout</span>}
            </button>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="super-admin-sidebar-footer">
        <p>© {new Date().getFullYear()} LMS Super Admin</p>
        <p className="version">v1.0.0</p>
      </div>
    </aside>
  );
};

export default SuperAdminSidebar;
