import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import Premium Contexts
import {
  ThemeProvider,
  AIProvider,
  ToastProvider,
  LoadingProvider,
  UserProvider,
  AnalyticsProvider,
  ErrorBoundary
} from './contexts/PremiumContexts';

// Import Premium Components
import { Loading } from './components/ui/PremiumComponents';
import ThemeToggle from './components/ThemeToggle';
import { useLocation } from 'react-router-dom';

// Import Premium Design System
import './styles/premium-design-system.css';

// Lazy load components for better performance
const LandingPage = lazy(() => import('./components/LandingPage'));
const LoginPage = lazy(() => import('./components/LoginPageNew'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const TeacherDashboard = lazy(() => import('./screens/TeacherDashboard'));
const ParentDashboard = lazy(() => import('./screens/ParentDashboard'));
const StudentDashboard = lazy(() => import('./screens/StudentDashboard'));
const StudentCourses = lazy(() => import('./screens/StudentCourses'));
const StudentAssignments = lazy(() => import('./screens/StudentAssignments'));
const StudentGrades = lazy(() => import('./screens/StudentGrades'));
const StudentCalendar = lazy(() => import('./screens/StudentCalendar'));
const StudentMessages = lazy(() => import('./screens/StudentMessages'));
const StudentProfile = lazy(() => import('./screens/StudentProfile'));
const UserManagement = lazy(() => import('./screens/UserManagement'));
const CourseManagement = lazy(() => import('./screens/CourseManagement'));
const Communication = lazy(() => import('./screens/Communication'));
const ReportsTracking = lazy(() => import('./screens/ReportsTrackingScheduling'));
const AnalyticsInsights = lazy(() => import('./screens/AnalyticsInsights'));

// Premium Loading Component
const PageLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-background-secondary to-background-tertiary dark:from-dark-background-primary dark:to-dark-background-secondary flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-text-secondary dark:text-dark-text-secondary text-lg font-medium">
        Loading Premium Experience...
      </p>
    </motion.div>
  </div>
);

// Premium Route Component with Animations
const AnimatedRoute = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="min-h-screen"
  >
    {children}
  </motion.div>
);

// Conditional Theme Toggle Component
const ConditionalThemeToggle = () => {
  const location = useLocation();
  
  // Hide theme toggle on admin routes and login page
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/login';
  
  if (isAdminRoute || isLoginPage) {
    return null;
  }
  
  return <ThemeToggle />;
};

// Premium App Component
const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <UserProvider>
          <AIProvider>
            <AnalyticsProvider>
              <ToastProvider>
                <LoadingProvider>
                  <Router>
                    <ConditionalThemeToggle />
                    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 transition-all duration-300">
                      <Suspense fallback={<PageLoader />}>
                        <Routes>
                          {/* Public Routes */}
                          <Route
                            path="/"
                            element={
                              <AnimatedRoute>
                                <LandingPage />
                              </AnimatedRoute>
                            }
                          />
                          <Route
                            path="/login"
                            element={
                              <AnimatedRoute>
                                <LoginPage />
                              </AnimatedRoute>
                            }
                          />

                          {/* Admin Routes */}
                          <Route
                            path="/admin/dashboard"
                            element={
                              <AnimatedRoute>
                                <AdminDashboard />
                              </AnimatedRoute>
                            }
                          />
                          <Route
                            path="/admin/user-management"
                            element={
                              <AnimatedRoute>
                                <UserManagement />
                              </AnimatedRoute>
                            }
                          />
                          <Route
                            path="/admin/course-management"
                            element={
                              <AnimatedRoute>
                                <CourseManagement />
                              </AnimatedRoute>
                            }
                          />
                          <Route
                            path="/admin/communication"
                            element={
                              <AnimatedRoute>
                                <Communication />
                              </AnimatedRoute>
                            }
                          />
                          <Route
                            path="/admin/reports-tracking-scheduling"
                            element={
                              <AnimatedRoute>
                                <ReportsTracking />
                              </AnimatedRoute>
                            }
                          />
                          <Route
                            path="/admin/analytics-insights"
                            element={
                              <AnimatedRoute>
                                <AnalyticsInsights />
                              </AnimatedRoute>
                            }
                          />

                          {/* Teacher Routes */}
                          <Route
                            path="/teacher/dashboard"
                            element={
                              <AnimatedRoute>
                                <TeacherDashboard />
                              </AnimatedRoute>
                            }
                          />

                          {/* Parent Routes */}
                          <Route
                            path="/parent/dashboard"
                            element={
                              <AnimatedRoute>
                                <ParentDashboard />
                              </AnimatedRoute>
                            }
                          />

                          {/* Student Routes */}
                          <Route
                            path="/student/dashboard"
                            element={
                              <AnimatedRoute>
                                <StudentDashboard />
                              </AnimatedRoute>
                            }
                          />
                          <Route
                            path="/student/courses"
                            element={
                              <AnimatedRoute>
                                <StudentCourses />
                              </AnimatedRoute>
                            }
                          />
                          <Route
                            path="/student/assignments"
                            element={
                              <AnimatedRoute>
                                <StudentAssignments />
                              </AnimatedRoute>
                            }
                          />
                          <Route
                            path="/student/grades"
                            element={
                              <AnimatedRoute>
                                <StudentGrades />
                              </AnimatedRoute>
                            }
                          />
                          <Route
                            path="/student/calendar"
                            element={
                              <AnimatedRoute>
                                <StudentCalendar />
                              </AnimatedRoute>
                            }
                          />
                          <Route
                            path="/student/messages"
                            element={
                              <AnimatedRoute>
                                <StudentMessages />
                              </AnimatedRoute>
                            }
                          />
                          <Route
                            path="/student/profile"
                            element={
                              <AnimatedRoute>
                                <StudentProfile />
                              </AnimatedRoute>
                            }
                          />

                          {/* Catch all route */}
                          <Route
                            path="*"
                            element={
                              <AnimatedRoute>
                                <Navigate to="/" replace />
                              </AnimatedRoute>
                            }
                          />
                        </Routes>
                      </Suspense>
                    </div>
                  </Router>
                </LoadingProvider>
              </ToastProvider>
            </AnalyticsProvider>
          </AIProvider>
        </UserProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;