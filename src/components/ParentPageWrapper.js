import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ParentSidebar from './ParentSidebar';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../contexts/PremiumContexts';

const ParentPageWrapper = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const { theme } = useTheme();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobileView(mobileView);
      // Auto-collapse sidebar on mobile when resizing to desktop
      if (!mobileView && isSidebarCollapsed) {
        setIsSidebarCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarCollapsed]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-secondary to-background-tertiary dark:from-dark-background-primary dark:to-dark-background-secondary">
      <button
        className="fixed top-4 left-4 z-50 p-3 bg-surface-primary dark:bg-dark-surface-primary rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 lg:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <div className="w-5 h-0.5 bg-text-secondary dark:bg-dark-text-secondary mb-1"></div>
          <div className="w-5 h-0.5 bg-text-secondary dark:bg-dark-text-secondary mb-1"></div>
          <div className="w-5 h-0.5 bg-text-secondary dark:bg-dark-text-secondary"></div>
        </div>
      </button>

      <div className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ${
        isSidebarCollapsed ? '-translate-x-full' : 'translate-x-0'
      } lg:translate-x-0`}>
        <ParentSidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-80'
      }`}>
        {children}
      </div>
    </div>
  );
};

export default ParentPageWrapper;