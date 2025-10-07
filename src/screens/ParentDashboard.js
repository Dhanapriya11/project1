
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import ParentSidebar from '../components/ParentSidebar';
import {
  Bell, Calendar, GraduationCap, ClipboardCheck,
  Mail, User, TrendingUp, AlertTriangle,
  BookOpen, Clock, Award, MessageCircle,
  ArrowRight, Plus, Settings, Home, ChevronRight,
  Sparkles, Zap, Brain, Users, Target, BarChart3
} from 'lucide-react';
import { Card, Button, Badge } from '../components/ui/PremiumComponents';
import { useTheme } from '../contexts/PremiumContexts';
import ThemeToggle from '../components/ThemeToggle';

// Simple alert system to replace toast notifications
const showAlert = (message, type = 'info') => {
  const alertDiv = document.createElement('div');
  alertDiv.style.position = 'fixed';
  alertDiv.style.top = '20px';
  alertDiv.style.right = '20px';
  alertDiv.style.padding = '15px 20px';
  alertDiv.style.borderRadius = '4px';
  alertDiv.style.color = 'white';
  alertDiv.style.zIndex = '1000';

  switch (type) {
    case 'success':
      alertDiv.style.backgroundColor = '#28a745';
      break;
    case 'error':
      alertDiv.style.backgroundColor = '#dc3545';
      break;
    case 'warning':
      alertDiv.style.backgroundColor = '#ffc107';
      alertDiv.style.color = '#212529';
      break;
    default:
      alertDiv.style.backgroundColor = '#17a2b8';
  }

  alertDiv.textContent = message;
  document.body.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.style.opacity = '0';
    alertDiv.style.transition = 'opacity 0.5s';
    setTimeout(() => document.body.removeChild(alertDiv), 500);
  }, 3000);
};

// Enhanced mock data for two children with comprehensive tracking
const mockChildren = [
  {
    id: 1,
    name: 'Alex Johnson',
    grade: '5th Grade',
    age: 10,
    avatar: '👧',
    attendance: 95,
    averageGrade: 'A-',
    gpa: 3.7,
    behavior: 'Excellent',
    subjects: [
      { name: 'Mathematics', grade: 'A', progress: 92, teacher: 'Mrs. Smith' },
      { name: 'Science', grade: 'A-', progress: 88, teacher: 'Mr. Brown' },
      { name: 'English', grade: 'B+', progress: 85, teacher: 'Ms. Davis' },
      { name: 'History', grade: 'A', progress: 90, teacher: 'Mr. Wilson' },
    ],
    recentActivities: [
      { type: 'assignment', message: 'Math homework submitted', date: '2024-02-08', score: '95%' },
      { type: 'test', message: 'Science test completed', date: '2024-02-07', score: '88%' },
      { type: 'attendance', message: 'Perfect attendance this week', date: '2024-02-05', score: '100%' }
    ],
    upcomingTests: [
      { subject: 'Mathematics', date: '2024-02-15', topic: 'Fractions and Decimals' },
      { subject: 'Science', date: '2024-02-18', topic: 'Plant Biology' }
    ],
    achievements: ['Honor Roll', 'Math Competition Winner', 'Perfect Attendance']
  },
  {
    id: 2,
    name: 'Sam Johnson',
    grade: '3rd Grade',
    age: 8,
    avatar: '👦',
    attendance: 88,
    averageGrade: 'B+',
    gpa: 3.3,
    behavior: 'Good',
    subjects: [
      { name: 'Mathematics', grade: 'B+', progress: 82, teacher: 'Mrs. Johnson' },
      { name: 'Science', grade: 'A-', progress: 90, teacher: 'Mr. Green' },
      { name: 'English', grade: 'B', progress: 78, teacher: 'Ms. Parker' },
      { name: 'Art', grade: 'A', progress: 95, teacher: 'Mrs. Lee' },
    ],
    recentActivities: [
      { type: 'project', message: 'Science project submitted', date: '2024-02-06', score: '92%' },
      { type: 'assignment', message: 'Reading assignment completed', date: '2024-02-05', score: '85%' },
      { type: 'participation', message: 'Active in class discussion', date: '2024-02-04', score: 'Excellent' }
    ],
    upcomingTests: [
      { subject: 'English', date: '2024-02-16', topic: 'Reading Comprehension' },
      { subject: 'Mathematics', date: '2024-02-20', topic: 'Addition and Subtraction' }
    ],
    achievements: ['Art Competition Winner', 'Reading Club Member', 'Good Citizen Award']
  }
];

const mockNotifications = [
  { id: 1, type: 'fee', message: 'Tuition fee reminder for February', date: '2024-02-10', read: false, childId: null },
  { id: 2, type: 'grade', message: 'New grade posted for Alex - Math Test', date: '2024-02-08', read: false, childId: 1 },
  { id: 3, type: 'event', message: 'Parent-Teacher conference scheduled', date: '2024-02-15', read: true, childId: null },
  { id: 4, type: 'attendance', message: 'Sam was absent yesterday', date: '2024-02-07', read: false, childId: 2 },
  { id: 5, type: 'achievement', message: 'Alex made Honor Roll!', date: '2024-02-05', read: true, childId: 1 },
];

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [selectedChild, setSelectedChild] = useState(1);
  const [children, setChildren] = useState(mockChildren);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const parentUsername = localStorage.getItem('username') || 'Parent';
  const parentId = localStorage.getItem('userId');

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobileView(mobileView);
      if (!mobileView && isSidebarCollapsed) {
        setIsSidebarCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarCollapsed]);

  // Fetch parent and children data
  useEffect(() => {
    const fetchParentData = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch this from your API
        // const response = await fetch(`/api/parents/${parentId}/dashboard`);
        // const data = await response.json();
        
        // Using mock data for demonstration
        setChildren(mockChildren);
        setNotifications(mockNotifications);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching parent data:', err);
        setError('Failed to load dashboard data');
        showAlert('Failed to load dashboard data', 'error');
        setLoading(false);
      }
    };

    fetchParentData();
  }, [parentId]);

  const handleLogout = () => {
    localStorage.removeItem('isParentLoggedIn');
    localStorage.removeItem('parentUsername');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userId');
    sessionStorage.clear();
    navigate('/login');
    showAlert('Successfully logged out', 'success');
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
    showAlert('Notification marked as read', 'success');
  };

  const handleChildSwitch = (childId) => {
    setSelectedChild(childId);
    showAlert(`Switched to ${children.find(c => c.id === childId)?.name}'s data`, 'info');
  };

  const currentChild = children.find(c => c.id === selectedChild);
  const unreadNotifications = notifications.filter(n => !n.read).length;
  const childNotifications = notifications.filter(n => !n.childId || n.childId === selectedChild);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background-secondary to-background-tertiary dark:from-dark-background-primary dark:to-dark-background-secondary flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Loading your children's data...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background-secondary to-background-tertiary dark:from-dark-background-primary dark:to-dark-background-secondary flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="primary">
            Retry
          </Button>
        </motion.div>
      </div>
    );
  }

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

      <div className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ${isSidebarCollapsed ? '-translate-x-full' : 'translate-x-0'
        } lg:translate-x-0`}>
        <ParentSidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-80'
        }`}>
        <motion.div
          className="p-6 lg:p-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.header className="mb-8 pr-20" variants={itemVariants}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome back, {parentUsername}! 👨‍👩‍👧‍👦
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Track your children's academic progress and stay connected
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Button
                    variant="ghost"
                    className="relative p-3"
                    onClick={() => showAlert('Notifications panel coming soon!', 'info')}
                  >
                    <Bell className="w-5 h-5" />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {unreadNotifications}
                      </span>
                    )}
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 dark:text-gray-300"
                >
                  Logout
                </Button>
              </div>
            </div>
          </motion.header>

          {/* Children Selector */}
          <motion.section className="mb-8" variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Children</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {children.map((child) => (
                <motion.div
                  key={child.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className={`cursor-pointer ${selectedChild === child.id ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => handleChildSwitch(child.id)}
                >
                  <Card className={`p-6 bg-gradient-to-br ${selectedChild === child.id 
                    ? 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700' 
                    : 'from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700'
                  } hover:shadow-xl transition-all duration-300`}>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{child.avatar}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {child.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {child.grade} • Age {child.age}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">
                              {child.averageGrade}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ClipboardCheck className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                              {child.attendance}%
                            </span>
                          </div>
                        </div>
                      </div>
                      {selectedChild === child.id && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Current Child Overview */}
          {currentChild && (
            <motion.section className="mb-8" variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {currentChild.name}'s Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Attendance</p>
                      <p className="text-3xl font-bold mt-1">{currentChild.attendance}%</p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <ClipboardCheck className="w-6 h-6" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">Average Grade</p>
                      <p className="text-3xl font-bold mt-1">{currentChild.averageGrade}</p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">GPA</p>
                      <p className="text-3xl font-bold mt-1">{currentChild.gpa}</p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-medium">Behavior</p>
                      <p className="text-2xl font-bold mt-1">{currentChild.behavior}</p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6" />
                    </div>
                  </div>
                </Card>
              </div>
            </motion.section>
          )}

          {/* Subjects Performance */}
          {currentChild && (
            <motion.section className="mb-8" variants={itemVariants}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Subject Performance</h2>
                <Button variant="ghost" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  View Details
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentChild.subjects.map((subject, index) => (
                  <motion.div
                    key={subject.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Card className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{subject.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Teacher: {subject.teacher}</p>
                        </div>
                        <Badge variant={subject.grade.startsWith('A') ? 'success' : subject.grade.startsWith('B') ? 'warning' : 'default'}>
                          {subject.grade}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Progress</span>
                          <span className="font-medium">{subject.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${subject.progress}%` }}
                          />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Recent Activities & Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activities */}
            <motion.section variants={itemVariants}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Activities</h2>
                <Link to="/parent/activities" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-700">
                <div className="space-y-4">
                  {currentChild?.recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 py-3 border-b border-emerald-200 dark:border-emerald-700 last:border-b-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        {activity.type === 'assignment' && <BookOpen className="w-5 h-5 text-white" />}
                        {activity.type === 'test' && <GraduationCap className="w-5 h-5 text-white" />}
                        {activity.type === 'attendance' && <ClipboardCheck className="w-5 h-5 text-white" />}
                        {activity.type === 'project' && <Award className="w-5 h-5 text-white" />}
                        {activity.type === 'participation' && <Users className="w-5 h-5 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{activity.message}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(activity.date).toLocaleDateString()}</p>
                          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{activity.score}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.section>

            {/* Notifications */}
            <motion.section variants={itemVariants}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h2>
                <Link to="/parent/notifications" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-700">
                <div className="space-y-4">
                  {childNotifications.slice(0, 4).map((notification, index) => (
                    <div 
                      key={notification.id} 
                      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        !notification.read 
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        notification.type === 'fee' ? 'bg-red-100 dark:bg-red-900/20' :
                        notification.type === 'grade' ? 'bg-green-100 dark:bg-green-900/20' :
                        notification.type === 'attendance' ? 'bg-orange-100 dark:bg-orange-900/20' :
                        notification.type === 'achievement' ? 'bg-purple-100 dark:bg-purple-900/20' :
                        'bg-blue-100 dark:bg-blue-900/20'
                      }`}>
                        {notification.type === 'fee' && <AlertTriangle className="w-4 h-4 text-red-600" />}
                        {notification.type === 'grade' && <GraduationCap className="w-4 h-4 text-green-600" />}
                        {notification.type === 'attendance' && <ClipboardCheck className="w-4 h-4 text-orange-600" />}
                        {notification.type === 'achievement' && <Award className="w-4 h-4 text-purple-600" />}
                        {notification.type === 'event' && <Calendar className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{notification.message}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(notification.date).toLocaleDateString()}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.section>
          </div>

          {/* Upcoming Tests & Achievements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Upcoming Tests */}
            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Tests</h2>
              <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-700">
                <div className="space-y-4">
                  {currentChild?.upcomingTests.map((test, index) => (
                    <div key={index} className="flex items-center gap-4 py-3 border-b border-orange-200 dark:border-orange-700 last:border-b-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{test.subject}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{test.topic}</p>
                      </div>
                      <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                        {new Date(test.date).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.section>

            {/* Achievements */}
            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Achievements</h2>
              <Card className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-700">
                <div className="space-y-3">
                  {currentChild?.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 py-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{achievement}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.section>
          </div>
        </motion.div>
      </div>
      <Outlet />
    </div>
  );
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const quickLinks = [
    {
      title: 'Attendance',
      icon: ClipboardCheck,
      color: 'from-blue-500 to-blue-600',
      path: '/parent/attendance'
    },
    {
      title: 'Grades',
      icon: GraduationCap,
      color: 'from-green-500 to-green-600',
      path: '/parent/grades'
    },
    {
      title: 'School Calendar',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      path: '/parent/calendar'
    },
    {
      title: 'Messages',
      icon: MessageCircle,
      color: 'from-orange-500 to-orange-600',
      path: '/parent/messages'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <motion.div
        className="p-6 lg:p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.header className="mb-8 pr-20" variants={itemVariants}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Parent Dashboard 👨‍👩‍👧‍👦
              </h1>
              <p style={{ color: '#1f2937', fontSize: '1.125rem', fontWeight: '600' }}>
                Welcome back, {parentUsername}! Track your child's progress
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Button
                  variant="ghost"
                  className="relative p-3"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </Button>
              </div>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600"
              >
                Logout
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Child Selection */}
        {children.length > 1 && (
          <motion.div className="mb-8" variants={itemVariants}>
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <label style={{ color: '#111827', fontSize: '0.875rem', fontWeight: '700' }}>Viewing:</label>
                <select
                  value={selectedChild || ''}
                  onChange={(e) => setSelectedChild(Number(e.target.value))}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {children.map(child => (
                    <option key={child.id} value={child.id}>
                      {child.name} - {child.grade}
                    </option>
                  ))}
                </select>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Quick Stats */}
        {currentChild && (
          <motion.section className="mb-8" variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview - {currentChild.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Card className="p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <ClipboardCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p style={{ color: '#111827', fontSize: '0.875rem', fontWeight: '700' }}>Attendance</p>
                      <p className="text-3xl font-bold text-gray-900">{currentChild.attendance}%</p>
                      <p style={{ color: '#374151', fontSize: '0.75rem', fontWeight: '600' }}>Class avg: 89%</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Card className="p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p style={{ color: '#111827', fontSize: '0.875rem', fontWeight: '700' }}>Average Grade</p>
                      <p className="text-3xl font-bold text-gray-900">{currentChild.averageGrade}</p>
                      <p style={{ color: '#374151', fontSize: '0.75rem', fontWeight: '600' }}>+2% from last term</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Card className="p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p style={{ color: '#111827', fontSize: '0.875rem', fontWeight: '700' }}>Upcoming Assignments</p>
                      <p className="text-3xl font-bold text-gray-900">{currentChild.assignmentCount}</p>
                      <p style={{ color: '#374151', fontSize: '0.75rem', fontWeight: '600' }}>Next due in 3 days</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <motion.section variants={itemVariants}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
                <Link
                  to="/parent/activities"
                  className="flex items-center text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors"
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <Card className="p-6">
                <div className="space-y-4">
                  {recentActivities
                    .filter(a => !selectedChild || a.childId === selectedChild)
                    .slice(0, 5)
                    .map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          {activity.type === 'grade' && <GraduationCap className="w-4 h-4 text-blue-600" />}
                          {activity.type === 'attendance' && <ClipboardCheck className="w-4 h-4 text-blue-600" />}
                          {activity.type === 'assignment' && <BookOpen className="w-4 h-4 text-blue-600" />}
                        </div>
                        <div className="flex-1">
                          <p style={{ color: '#111827', fontWeight: '700' }}>{activity.message}</p>
                          <p style={{ color: '#374151', fontSize: '0.875rem', fontWeight: '600' }}>{new Date(activity.date).toLocaleDateString()}</p>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </Card>
            </motion.section>

            {/* Upcoming Assignments */}
            <motion.section variants={itemVariants}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Upcoming Assignments</h2>
                <Link
                  to="/parent/assignments"
                  className="flex items-center text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors"
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <Card className="p-6">
                <div className="space-y-4">
                  {upcomingAssignments
                    .filter(a => !selectedChild || a.childId === selectedChild)
                    .slice(0, 3)
                    .map((assignment, index) => (
                      <motion.div
                        key={assignment.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                            {assignment.subject}
                          </span>
                          <span style={{ color: '#374151', fontSize: '0.875rem', fontWeight: '600' }}>
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                        <p style={{ color: '#111827', fontWeight: '700' }}>{assignment.title}</p>
                      </motion.div>
                    ))}
                </div>
              </Card>
            </motion.section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Notifications */}
            <motion.section variants={itemVariants}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                <Link
                  to="/parent/notifications"
                  className="flex items-center text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors"
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <Card className="p-6">
                <div className="space-y-4">
                  {notifications.slice(0, 4).map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${!notification.read ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                        }`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${notification.type === 'fee' ? 'bg-red-100' :
                        notification.type === 'grade' ? 'bg-green-100' :
                          'bg-blue-100'
                        }`}>
                        {notification.type === 'fee' && <AlertTriangle className="w-4 h-4 text-red-600" />}
                        {notification.type === 'grade' && <GraduationCap className="w-4 h-4 text-green-600" />}
                        {notification.type === 'event' && <Calendar className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <p style={{ color: '#111827', fontWeight: '700' }}>{notification.message}</p>
                        <p style={{ color: '#374151', fontSize: '0.875rem', fontWeight: '600' }}>{new Date(notification.date).toLocaleDateString()}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.section>

            {/* Quick Links */}
            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h2>
              <Card className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {quickLinks.map((link, index) => (
                    <motion.div
                      key={link.title}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={link.path}
                        className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${link.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <link.icon className="w-6 h-6 text-white" />
                        </div>
                        <span style={{ color: '#111827', fontSize: '0.875rem', fontWeight: '700' }} className="group-hover:text-blue-600 transition-colors">
                          {link.title}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.section>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ParentDashboard;