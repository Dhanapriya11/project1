import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, Users, BookOpen, BarChart3,
  Search, MessageCircle, Bot,
  User, MessageSquare, Menu, X, Settings, Shield, Zap
} from 'lucide-react';
import { useTheme } from '../contexts/PremiumContexts';

const AdminSidebarNew = ({ onToggle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: Home, color: 'from-blue-500 to-blue-600' },
    { name: 'User Management', path: '/admin/user-management', icon: Users, color: 'from-green-500 to-green-600' },
    { name: 'Academic Content', path: '/admin/academic-content-control', icon: BookOpen, color: 'from-purple-500 to-purple-600' },
    { name: 'Course Management', path: '/admin/course-management', icon: BookOpen, color: 'from-indigo-500 to-indigo-600' },
    { name: 'Reports & Tracking', path: '/admin/reports-tracking-scheduling', icon: BarChart3, color: 'from-orange-500 to-orange-600' },
    { name: 'Analytics', path: '/admin/analytics-insights', icon: Search, color: 'from-pink-500 to-pink-600' },
    { name: 'Communication', path: '/admin/communication', icon: MessageCircle, color: 'from-teal-500 to-teal-600' },
    { name: 'AI Tools', path: '/admin/ai-support-tools', icon: Bot, color: 'from-cyan-500 to-cyan-600' },
    { name: 'Security', path: '/admin/security-maintenance', icon: Shield, color: 'from-red-500 to-red-600' },
    { name: 'Settings', path: '/admin/enhancements-accessibility', icon: Settings, color: 'from-gray-500 to-gray-600' },
    { name: 'Feedback', path: '/admin/feedback', icon: MessageSquare, color: 'from-yellow-500 to-yellow-600' }
  ];

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    if (onToggle) {
      onToggle(!newState);
    }
  };

  const sidebarVariants = {
    open: { width: 280 },
    closed: { width: 80 }
  };

  const itemVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -20 }
  };

  return (
    <>
      {/* Hamburger Menu */}
      <motion.button
        className="fixed top-4 left-4 z-50 p-3 bg-white/10 backdrop-blur-md rounded-xl shadow-lg hover:bg-white/20 transition-all duration-200 lg:hidden"
        onClick={toggleSidebar}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSidebarOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
      </motion.button>

      {/* Sidebar */}
      <motion.aside
        className="fixed inset-y-0 left-0 z-40 flex flex-col bg-white/10 backdrop-blur-md border-r border-white/20"
        variants={sidebarVariants}
        animate={isSidebarOpen ? 'open' : 'closed'}
        initial={false}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-xl font-bold text-white">Admin Portal</h2>
                <p className="text-white/70 text-sm">Learning Management</p>
              </motion.div>
            )}

            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle sidebar"
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <div className={`w-4 h-0.5 bg-white transition-all duration-200 ${isSidebarOpen ? 'rotate-45 translate-y-1' : 'mb-1'}`}></div>
                <div className={`w-4 h-0.5 bg-white transition-all duration-200 ${isSidebarOpen ? 'opacity-0' : 'mb-1'}`}></div>
                <div className={`w-4 h-0.5 bg-white transition-all duration-200 ${isSidebarOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
              </div>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  {isSidebarOpen && (
                    <motion.span
                      variants={itemVariants}
                      animate={isSidebarOpen ? 'open' : 'closed'}
                      className="font-medium"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                  {theme === 'light' ? <Zap className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                </div>
                <span className="font-medium">
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </span>
              </button>

              <div className="text-center">
                <p className="text-xs text-white/50">
                  © {new Date().getFullYear()} LMS Admin
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.aside>
    </>
  );
};

export default AdminSidebarNew;
