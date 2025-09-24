import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import SuperAdminSidebar from './SuperAdminSidebar';
import './SuperAdminSidebar.css';
import './SuperAdminDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const SuperAdminLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle window resize with debounce
  const handleResize = useCallback(() => {
    const mobile = window.innerWidth < 768;
    const tablet = window.innerWidth < 1024;
    
    setIsMobile(mobile);
    
    if (mobile) {
      setIsSidebarOpen(false);
      document.body.style.overflow = 'auto';
    } else if (tablet) {
      setIsSidebarOpen(true);
      setIsSidebarCollapsed(true);
    } else {
      setIsSidebarOpen(true);
      setIsSidebarCollapsed(false);
    }
  }, []);

  useEffect(() => {
    // Initial setup
    handleResize();
    
    // Debounce resize handler
    let resizeTimer;
    const resizeListener = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    };
    
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
      clearTimeout(resizeTimer);
    };
  }, [handleResize]);

  // Handle sidebar toggle
  const handleSidebarToggle = useCallback((collapsed) => {
    if (isMobile) {
      const newState = !isSidebarOpen;
      setIsSidebarOpen(newState);
      document.body.style.overflow = newState ? 'hidden' : 'auto';
      
      // Add/remove class to body to prevent scrolling when sidebar is open
      if (newState) {
        document.body.classList.add('sidebar-open');
      } else {
        document.body.classList.remove('sidebar-open');
      }
    } else {
      setIsSidebarCollapsed(collapsed);
    }
  }, [isMobile, isSidebarOpen]);

  // Close sidebar on mobile when clicking outside
  const handleClickOutside = useCallback((e) => {
    if (isMobile && isSidebarOpen && !e.target.closest('.super-admin-sidebar')) {
      setIsSidebarOpen(false);
      document.body.style.overflow = 'auto';
      document.body.classList.remove('sidebar-open');
    }
  }, [isMobile, isSidebarOpen]);

  // Handle logout
  const handleLogout = useCallback(() => {
    // Reset body styles
    document.body.style.overflow = 'auto';
    document.body.classList.remove('sidebar-open');
    
    // Clear auth data
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminRole');
    localStorage.removeItem('currentUser');
    
    // Navigate to login
    navigate('/login');
  }, [navigate]);

  return (
    <div className="super-admin-layout" onClick={handleClickOutside}>
      <SuperAdminSidebar 
        isCollapsed={isSidebarCollapsed}
        isMobile={isMobile}
        isOpen={isSidebarOpen}
        onToggle={handleSidebarToggle}
        currentPath={location.pathname}
        onLogout={handleLogout}
      />
      
      {/* Main Content */}
      <main 
        className={`superadmin-main-content ${
          !isMobile && isSidebarCollapsed ? 'sidebar-collapsed' : ''
        } ${isSidebarOpen ? 'sidebar-open' : ''}`}
      >
        <Outlet />
      </main>
      
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button 
          className="mobile-sidebar-toggle"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
        </button>
      )}
      
      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className="super-admin-sidebar-overlay visible"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default SuperAdminLayout;
