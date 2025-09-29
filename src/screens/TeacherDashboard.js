import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers, getCourses } from '../services/api';
import {
  Users, BookOpen, Clock, BarChart3,
  Bell, Plus, ArrowRight, CheckCircle,
  MessageCircle, FileText, Star,
  AlertCircle, Calendar, File,
  TrendingUp, Award, Target,
  Activity, Zap, Settings
} from 'lucide-react';
import { Card, Button } from '../components/ui/PremiumComponents';
import { useTheme } from '../contexts/PremiumContexts';

// Import new components
import ClassPerformance from './ClassPerformance';
import TeacherMessaging from './TeacherMessaging';
import Notifications from './Notifications';
import Leaderboard from './Leaderboard';
import StudyMaterial from './StudyMaterial';
import HomeworkReminders from './HomeworkReminders';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    studentCount: 0,
    courseCount: 0,
    myCourses: [],
    pendingAssignments: 0,
    averageScores: { overall: 0 },
    attendanceRate: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [teacherUsername, setTeacherUsername] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Welcome to Your Dashboard',
      description: 'You have successfully logged in to the teacher portal',
      time: 'Just now',
      type: 'system',
      read: false
    },
    {
      id: 2,
      title: 'New Assignment Submitted',
      description: 'Student John Doe has submitted the Math assignment',
      time: '10 minutes ago',
      type: 'submission',
      read: false
    },
    {
      id: 3,
      title: 'Upcoming Deadline',
      description: 'Science project submission is due in 2 days',
      time: '1 hour ago',
      type: 'deadline',
      read: true
    }
  ]);

  const [teacherProfile, setTeacherProfile] = useState({
    name: '',
    qualifications: '',
    contact: '',
    subjects: [],
    timetable: {}
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setTeacherUsername(currentUser.username || '');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isTeacherLoggedIn');
    localStorage.removeItem('teacherUsername');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/login');
  };

  useEffect(() => {
    if (!teacherUsername) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [usersResponse, coursesResponse] = await Promise.allSettled([
          getUsers(),
          getCourses()
        ]);

        let users = [];
        if (usersResponse.status === 'fulfilled') {
          users = Array.isArray(usersResponse.value) ? usersResponse.value : [];
        }

        let courses = [];
        if (coursesResponse.status === 'fulfilled') {
          courses = Array.isArray(coursesResponse.value) ? coursesResponse.value : [];
        }

        const students = users.filter(user => {
          const userRole = String(user.role || '').toLowerCase();
          return userRole === 'student';
        });

        const myCourses = courses.filter(course => {
          const instructorMatch = String(course.instructor || '').toLowerCase() ===
            teacherUsername.toLowerCase();
          return instructorMatch;
        });

        setStats(prevStats => ({
          ...prevStats,
          studentCount: students.length,
          courseCount: myCourses.length,
          myCourses,
          averageScores: prevStats.averageScores || { overall: 0 }
        }));
        setError('');

      } catch (error) {
        setError(`Failed to load dashboard data: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [teacherUsername]);

  const upcomingDeadlines = [
    { id: 1, title: 'Math Assignment 1', course: 'Mathematics', dueDate: '2025-06-25', priority: 'high' },
    { id: 2, title: 'Physics Quiz', course: 'Physics', dueDate: '2025-06-28', priority: 'medium' }
  ];

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

  const statCards = [
    {
      title: 'Total Students',
      value: stats.studentCount || 0,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'My Courses',
      value: stats.courseCount || 0,
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      change: 'Active',
      changeType: 'neutral'
    },
    {
      title: 'Pending Grading',
      value: stats.pendingAssignments || 0,
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      change: stats.pendingAssignments > 0 ? 'Needs attention' : 'All caught up',
      changeType: stats.pendingAssignments > 0 ? 'negative' : 'positive'
    },
    {
      title: 'Avg. Class Score',
      value: stats.averageScores?.overall || 0,
      icon: BarChart3,
      color: 'from-purple-500 to-purple-600',
      change: '+5%',
      changeType: 'positive',
      suffix: '%'
    }
  ];

  const quickActions = [
    {
      title: 'Create Assignment',
      description: 'Create new assignments for your students',
      icon: Plus,
      color: 'from-blue-500 to-blue-600',
      path: '/assignments/new'
    },
    {
      title: 'Add Study Material',
      description: 'Upload study materials and resources',
      icon: FileText,
      color: 'from-green-500 to-green-600',
      path: '/materials/new'
    },
    {
      title: 'Post Announcement',
      description: 'Share important announcements',
      icon: Bell,
      color: 'from-purple-500 to-purple-600',
      path: '/announcements/new'
    },
    {
      title: 'View Analytics',
      description: 'Analyze student performance',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      path: '/analytics'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading dashboard...</p>
        </motion.div>
      </div>
    );
  }

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
                Welcome back, Teacher! 👨‍🏫
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your classes and track student progress
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                onClick={() => navigate('/assignments/new')}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Assignment
              </Button>
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

        {/* Stats Cards */}
        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Card className="p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' :
                        stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                        {stat.change}
                      </span>
                      <p className="text-xs text-gray-500">vs last month</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}{stat.suffix || ''}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Card
                  className="p-6 cursor-pointer group hover:shadow-xl transition-all duration-300"
                  onClick={() => navigate(action.path)}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 group-hover:text-gray-700 transition-colors">
                    {action.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Deadlines */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Deadlines</h2>
            <Card className="p-6">
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <motion.div
                    key={deadline.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-3 h-3 rounded-full ${deadline.priority === 'high' ? 'bg-red-500' : 'bg-orange-500'
                      }`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{deadline.title}</p>
                      <p className="text-sm text-gray-600">
                        {deadline.course} • Due: {new Date(deadline.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${deadline.priority === 'high'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-orange-100 text-orange-700'
                      }`}>
                      {deadline.priority}
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link
                  to="/assignments"
                  className="flex items-center text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors"
                >
                  View All Assignments
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </Card>
          </motion.section>

          {/* Recent Notifications */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Notifications</h2>
            <Card className="p-6">
              <div className="space-y-4">
                {notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${notification.type === 'system' ? 'bg-blue-100' :
                      notification.type === 'submission' ? 'bg-green-100' :
                        'bg-orange-100'
                      }`}>
                      {notification.type === 'system' ? <Bell className="w-4 h-4 text-blue-600" /> :
                        notification.type === 'submission' ? <CheckCircle className="w-4 h-4 text-green-600" /> :
                          <AlertCircle className="w-4 h-4 text-orange-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{notification.title}</p>
                      <p className="text-sm text-gray-600">{notification.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link
                  to="/notifications"
                  className="flex items-center text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors"
                >
                  View All Notifications
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </Card>
          </motion.section>

          {/* Class Performance */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Class Performance</h2>
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Overall Progress</span>
                  <span className="text-sm font-bold text-gray-900">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">92%</div>
                    <div className="text-sm text-gray-600">Attendance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">78%</div>
                    <div className="text-sm text-gray-600">Assignments</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
};

export default TeacherDashboard;
