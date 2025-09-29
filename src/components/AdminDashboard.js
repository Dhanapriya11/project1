import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getUsers, getCourses } from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
  Users, GraduationCap, BookOpen, Clock,
  Calendar, MessageCircle, BarChart3,
  Settings, ArrowRight, TrendingUp,
  Activity, AlertCircle, CheckCircle
} from 'lucide-react';
import { Card, Button } from './ui/PremiumComponents';
import { useTheme } from '../contexts/PremiumContexts';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    teachersAssigned: 0,
    coursesUploaded: 0,
    pendingTasks: 5,
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, text: "3 students enrolled in Physics", type: "success", time: "2 min ago" },
    { id: 2, text: "New course uploaded: Modern History", type: "info", time: "15 min ago" },
    { id: 3, text: "Admin updated timetable", type: "warning", time: "1 hour ago" },
    { id: 4, text: "Teacher John assigned to Math", type: "success", time: "2 hours ago" },
    { id: 5, text: "2 support messages received", type: "alert", time: "3 hours ago" }
  ]);

  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        const coursesData = await getCourses();
        const students = usersData.filter(user => user.role === 'Student');
        const teachers = usersData.filter(user => user.role === 'Teacher');
        setStats({
          totalStudents: students.length,
          teachersAssigned: teachers.length,
          coursesUploaded: coursesData.length,
          pendingTasks: 5,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminRole');
    navigate('/login');
  };

  const goTo = (path) => navigate(path);
  const adminUsername = localStorage.getItem('adminUsername') || 'Admin';

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
      value: stats.totalStudents,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Teachers Assigned',
      value: stats.teachersAssigned,
      icon: GraduationCap,
      color: 'from-green-500 to-green-600',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Courses Uploaded',
      value: stats.coursesUploaded,
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Pending Tasks',
      value: stats.pendingTasks,
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      change: '-2',
      changeType: 'negative'
    }
  ];

  const quickActions = [
    {
      title: 'Class Management',
      description: 'Manage classes, students, and assignments',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      path: '/admin/user-management'
    },
    {
      title: 'Reports & Analytics',
      description: 'View detailed reports and analytics',
      icon: BarChart3,
      color: 'from-green-500 to-green-600',
      path: '/admin/reports-tracking-scheduling'
    },
    {
      title: 'Communication',
      description: 'Send messages and announcements',
      icon: MessageCircle,
      color: 'from-purple-500 to-purple-600',
      path: '/admin/communication'
    },
    {
      title: 'Content Management',
      description: 'Manage and upload course content',
      icon: BookOpen,
      color: 'from-orange-500 to-orange-600',
      path: '/admin/academic-content-control'
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
        <motion.header className="mb-8" variants={itemVariants}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 style={{ color: '#000000', fontSize: '2.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                Welcome back, {adminUsername}! 👋
              </h1>
              <p style={{ color: '#000000', fontSize: '1.125rem', fontWeight: '700' }}>
                Here's what's happening in your admin panel today
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={handleLogout}
                style={{ color: '#000000', fontWeight: '600' }}
                className="hover:text-red-600"
              >
                Logout
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Stats Cards */}
        <motion.section className="mb-8" variants={itemVariants}>
          <h2 style={{ color: '#000000', fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Overview</h2>
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
                      <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {stat.change}
                      </span>
                      <p style={{ color: '#000000', fontSize: '0.75rem', fontWeight: '700' }}>vs last month</p>
                    </div>
                  </div>
                  <div>
                    <p style={{ color: '#000000', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.25rem' }}>{stat.title}</p>
                    <p style={{ color: '#000000', fontSize: '1.875rem', fontWeight: '700' }}>{stat.value}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section className="mb-8" variants={itemVariants}>
          <h2 style={{ color: '#000000', fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Quick Actions</h2>
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
                  onClick={() => goTo(action.path)}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 style={{ color: '#000000', fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                    {action.title}
                  </h3>
                  <p style={{ color: '#000000', fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem' }}>
                    {action.description}
                  </p>
                  <div className="flex items-center font-medium text-sm transition-colors">
                    <span style={{ color: '#000000', fontWeight: '600' }}>Explore</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" style={{ color: '#000000' }} />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Recent Activity & Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.section variants={itemVariants}>
            <h2 style={{ color: '#000000', fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Recent Activity</h2>
            <Card className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${activity.type === 'success' ? 'bg-green-100' :
                      activity.type === 'warning' ? 'bg-yellow-100' :
                        activity.type === 'alert' ? 'bg-red-100' :
                          'bg-blue-100'
                      }`}>
                      {activity.type === 'success' ? <CheckCircle className="w-4 h-4 text-green-600" /> :
                        activity.type === 'warning' ? <AlertCircle className="w-4 h-4 text-yellow-600" /> :
                          activity.type === 'alert' ? <AlertCircle className="w-4 h-4 text-red-600" /> :
                            <Activity className="w-4 h-4 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <p style={{ color: '#000000', fontWeight: '700' }}>{activity.text}</p>
                      <p style={{ color: '#000000', fontSize: '0.875rem', fontWeight: '600' }}>{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.section>

          {/* Calendar */}
          <motion.section variants={itemVariants}>
            <h2 style={{ color: '#000000', fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Calendar</h2>
            <Card className="p-6">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <h3 className="font-semibold">Today's Schedule</h3>
                  <p className="text-blue-100 text-sm">September 28, 2024</p>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div>
                        <p style={{ color: '#000000', fontWeight: '700' }}>Staff Meeting</p>
                        <p style={{ color: '#000000', fontSize: '0.875rem', fontWeight: '600' }}>10:00 AM - 11:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p style={{ color: '#000000', fontWeight: '700' }}>Course Review</p>
                        <p style={{ color: '#000000', fontSize: '0.875rem', fontWeight: '600' }}>2:00 PM - 3:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <div>
                        <p style={{ color: '#000000', fontWeight: '700' }}>Parent Conference</p>
                        <p style={{ color: '#000000', fontSize: '0.875rem', fontWeight: '600' }}>4:00 PM - 5:00 PM</p>
                      </div>
                    </div>
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

export default AdminDashboard;
