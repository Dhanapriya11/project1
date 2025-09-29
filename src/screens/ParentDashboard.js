
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell, Calendar, GraduationCap, ClipboardCheck,
  Mail, User, TrendingUp, AlertTriangle,
  BookOpen, Clock, Award, MessageCircle,
  ArrowRight, Plus, Settings, Home
} from 'lucide-react';
import { Card, Button } from '../components/ui/PremiumComponents';
import { useTheme } from '../contexts/PremiumContexts';

// Mock data - Replace with actual API calls
const mockChildren = [
  { id: 1, name: 'Alex Johnson', grade: '5th Grade', attendance: 92, averageGrade: 'A-', recentActivity: 'Math Test: 95%' },
  { id: 2, name: 'Sam Johnson', grade: '3rd Grade', attendance: 88, averageGrade: 'B+', recentActivity: 'Science Project Submitted' },
];

const mockNotifications = [
  { id: 1, type: 'fee', message: 'Tuition fee due on Sep 15', date: '2025-09-01', read: false },
  { id: 2, type: 'grade', message: 'New grade posted for Math', date: '2025-08-30', read: true },
  { id: 3, type: 'event', message: 'Parent-Teacher meeting scheduled', date: '2025-08-28', read: false },
];

const mockUpcomingAssignments = [
  { id: 1, subject: 'Math', title: 'Chapter 5 Homework', dueDate: '2025-09-10', childId: 1 },
  { id: 2, subject: 'Science', title: 'Lab Report', dueDate: '2025-09-12', childId: 1 },
  { id: 3, subject: 'English', title: 'Book Report', dueDate: '2025-09-15', childId: 2 },
];

const mockRecentActivities = [
  { id: 1, type: 'grade', message: 'Math Test: 95%', date: '2025-09-05', childId: 1 },
  { id: 2, type: 'attendance', message: 'Absent on Aug 30', date: '2025-08-30', childId: 2 },
  { id: 3, type: 'assignment', message: 'Science Project Submitted', date: '2025-08-28', childId: 1 },
];

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [selectedChild, setSelectedChild] = useState(null);
  const [children, setChildren] = useState(mockChildren);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [upcomingAssignments, setUpcomingAssignments] = useState(mockUpcomingAssignments);
  const [recentActivities, setRecentActivities] = useState(mockRecentActivities);
  const [stats, setStats] = useState({
    upcomingAssignments: 3,
    recentGrades: 'A-',
    schoolAlerts: 1,
    unreadMessages: 2,
  });
  const parentUsername = localStorage.getItem('username') || 'Parent';

  useEffect(() => {
    if (children.length > 0 && !selectedChild) {
      setSelectedChild(children[0].id);
    }
  }, [children, selectedChild]);

  const getChildStats = (childId) => {
    const child = children.find(c => c.id === childId);
    if (!child) return null;

    const childAssignments = upcomingAssignments.filter(a => a.childId === childId);
    const childActivities = recentActivities.filter(a => a.childId === childId);

    return {
      ...child,
      assignmentCount: childAssignments.length,
      recentActivity: childActivities[0]?.message || 'No recent activity',
    };
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    localStorage.removeItem('isParentLoggedIn');
    localStorage.removeItem('parentUsername');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const currentChild = selectedChild ? getChildStats(selectedChild) : null;

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
