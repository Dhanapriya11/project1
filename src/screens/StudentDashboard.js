import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import StudentSidebar from '../components/StudentSidebar';
import { BookOpen, ClipboardList, GraduationCap, Calendar, TrendingUp, Award, Clock, ChevronRight, Sparkles, Zap, Brain } from 'lucide-react';
import { Button, Card } from '../components/ui/PremiumComponents';
import { useTheme } from '../contexts/PremiumContexts';
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

const StudentDashboard = () => {
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

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    coursesEnrolled: 0,
    assignmentsDue: 0,
    overallGrade: 'N/A',
    upcomingAssignments: [],
    recentGrades: [],
    schedule: []
  });

  const studentUsername = localStorage.getItem('username') || 'Student';
  const studentId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch this from your API
        // const response = await fetch(`/api/students/${studentId}/dashboard`);
        // const data = await response.json();

        // Mock data for demonstration
        const mockData = {
          coursesEnrolled: 5,
          assignmentsDue: 3,
          overallGrade: 'B+',
          upcomingAssignments: [
            { id: 1, title: 'Math Homework', dueDate: '2025-12-15', course: 'Mathematics' },
            { id: 2, title: 'Science Project', dueDate: '2025-12-20', course: 'Science' },
          ],
          recentGrades: [
            { id: 1, assignment: 'Math Quiz', grade: 'A-', subject: 'Mathematics' },
            { id: 2, assignment: 'Science Test', grade: 'B+', subject: 'Science' },
          ],
          schedule: [
            { id: 1, time: '09:00 AM', subject: 'Mathematics', room: 'Room 101' },
            { id: 2, time: '11:00 AM', subject: 'Science', room: 'Lab 201' },
          ]
        };

        setStats(mockData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching student data:', err);
        setError('Failed to load dashboard data');
        showAlert('Failed to load dashboard data', 'error');
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  const handleLogout = () => {
    localStorage.removeItem('isStudentLoggedIn');
    localStorage.removeItem('studentUsername');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userId');
    sessionStorage.clear();
    navigate('/login');
    showAlert('Successfully logged out', 'success');
  };

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <p className="text-gray-600 text-lg mb-4">{error}</p>
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
        <StudentSidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
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
                  Welcome back, {studentUsername}! 👋
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Here's what's happening with your studies today
                </p>
              </div>
              <div className="flex items-center gap-3">
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

          {/* Stats Cards */}
          <motion.section className="mb-8" variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Courses Enrolled</p>
                    <p className="text-3xl font-bold mt-1">{stats.coursesEnrolled}</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">Assignments Due</p>
                    <p className="text-3xl font-bold mt-1">{stats.assignmentsDue}</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <ClipboardList className="w-6 h-6" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Overall Grade</p>
                    <p className="text-3xl font-bold mt-1">{stats.overallGrade}</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            </div>
          </motion.section>

          {/* Upcoming Assignments */}
          <motion.section className="mb-8" variants={itemVariants}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upcoming Assignments</h2>
              <Link to="/student/assignments" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.upcomingAssignments.map((assignment, index) => (
                <motion.div
                  key={assignment.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Card className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/20 transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full font-medium">
                        Due {new Date(assignment.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{assignment.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{assignment.course}</p>
                    <Button variant="ghost" size="sm" className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
                      View Details
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Recent Grades & Schedule */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.section variants={itemVariants}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Grades</h2>
                <Link to="/student/grades" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-700 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/20 transition-all duration-300 backdrop-blur-sm">
                <div className="space-y-4">
                  {stats.recentGrades.map((grade, index) => (
                    <div key={grade.id} className="flex items-center justify-between py-3 border-b border-emerald-200 dark:border-emerald-700 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{grade.assignment}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{grade.subject}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${grade.grade[0] === 'A' ? 'bg-green-100 text-green-800' :
                        grade.grade[0] === 'B' ? 'bg-blue-100 text-blue-800' :
                          grade.grade[0] === 'C' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                        {grade.grade}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.section>

            <motion.section variants={itemVariants}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Today's Schedule</h2>
                <Link to="/student/calendar" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-700 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/20 transition-all duration-300 backdrop-blur-sm">
                <div className="space-y-4">
                  {stats.schedule.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 py-3 border-b border-purple-200 dark:border-purple-700 last:border-b-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{item.subject}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{item.room}</p>
                      </div>
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-md">{item.time}</span>
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

export default StudentDashboard;
