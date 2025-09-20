import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Outlet } from 'react-router-dom';
import './App.css';

import Sidebar from './components/Sidebar';
import AdminSidebarNew from './components/AdminSidebarNew';
import SuperAdminSidebar from './components/SuperAdminSidebar';
import TeacherSidebar from './components/TeacherSidebar';
import ParentSidebar from './components/ParentSidebar';
import StudentSidebar from './components/StudentSidebar';

import RouteGuard from './components/RouteGuard';
import Dashboard from './screens/Dashboard';
import UserManagement from './screens/UserManagement';
import RolePermissionManagement from './screens/RolePermissionManagement';
import AcademicContentControl from './screens/AcademicContentControl';
import ReportsTrackingScheduling from './screens/ReportsTrackingScheduling';
import AnalyticsInsights from './screens/AnalyticsInsights';
import Communication from './screens/Communication';
import AISupportTools from './screens/AISupportTools';
import EnhancementsAccessibility from './screens/EnhancementsAccessibility';
import SecurityMaintenance from './screens/SecurityMaintenance';
import AuthenticationProfile from './screens/AuthenticationProfile';
import Feedback from './screens/Feedback';

import AdminDashboard from './components/AdminDashboard';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import TeacherDashboard from './screens/TeacherDashboard';
import ParentDashboard from './screens/ParentDashboard';
import StudentDashboard from './screens/StudentDashboard';

import LandingPage from './components/LandingPage';
import LoginPageNew from './components/LoginPageNew';

import Profile from './screens/Profile';
import ContentLibrary from './screens/ContentLibrary';
import Assignments from './screens/Assignments';
import ClassPerformance from './screens/ClassPerformance';
import Messages from './screens/Messages';
import Leaderboard from './screens/Leaderboard';
import JEENEETMaterial from './screens/JEENEETMaterial';
import Attendance from './screens/Attendance';
import Grades from './screens/Grades';
import SchoolEvents from './screens/SchoolEvents';
import ParentMessages from './screens/ParentMessages';
import StudentCourses from './screens/StudentCourses';
import StudentAssignments from './screens/StudentAssignments';
import StudentGrades from './screens/StudentGrades';
import StudentCalendar from './screens/StudentCalendar';
import StudentMessages from './screens/StudentMessages';
import StudentProfile from './screens/StudentProfile';
import TeacherProfile from './screens/TeacherProfile';
import HomeworkReminders from './screens/HomeworkReminders';
import AIAssistant from './screens/AIAssistant';
import ParentMessaging from './screens/ParentMessaging';


import ParentAttendance from './screens/ParentAttendance';
import ParentEvents from './screens/ParentEvents';
import ParentGrades from './screens/ParentGrades';


import { getUsers, createUser, loginUser } from './services/api';

// Log when the app starts
console.log('App starting');

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching users in App.js');
        const userData = await getUsers();
        setUsers(userData);
      } catch (err) {
        console.error('Failed to fetch users in App.js:', err);
      }
    };
    fetchUsers();
  }, []);

  // Sidebar logic
  const showSidebar = !['/', '/login'].includes(location.pathname);
  const isAdminRoute = location.pathname.startsWith('/admin/');
  const isTeacherRoute = location.pathname.startsWith('/teacher/');
  const isParentRoute = location.pathname.startsWith('/parent/');
  const isStudentRoute = location.pathname.startsWith('/student/');
  const isSuperAdminRoute = !isAdminRoute && !isTeacherRoute && !isParentRoute && !isStudentRoute 
    && location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/dashboard';

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const handleSidebarToggle = (collapsed) => setIsSidebarCollapsed(collapsed);

  // Navigation helpers
  const handleLMSClick = () => navigate('/login');
  const handleMapClick = () => alert('Map feature is not implemented yet');
  const handleLeaveFormClick = () => alert('Leave Form feature is not implemented yet');

  // Login
  const handleLogin = async (username, password) => {
    console.log('Login attempt in App.js with:', { username, password });
    try {
      const user = await loginUser({ username, password });
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));

      const role = user.role?.toLowerCase() || '';
      switch (role) {
        case 'admin': navigate('/admin/dashboard'); break;
        case 'superadmin': navigate('/superadmin/dashboard'); break;
        case 'teacher': navigate('/teacher/dashboard'); break;
        case 'parent': navigate('/parent/dashboard'); break;
        case 'student': navigate('/student/dashboard'); break;
        default: navigate('/');
      }
    } catch (err) {
      console.error('Login error in App.js:', err);
      const adminCredentials = [
        { username: 'superadmin', password: 'superadmin123', role: 'superadmin' },
        { username: 'admin', password: 'admin123', role: 'admin' }
      ];
      const admin = adminCredentials.find(
        a => a.username === username && a.password === password
      );
      if (admin) {
        localStorage.setItem('isAdminLoggedIn', 'true');
        localStorage.setItem('adminUsername', username);
        localStorage.setItem('adminRole', admin.role);
        navigate(admin.role === 'superadmin' ? '/superadmin/dashboard' : '/admin/dashboard');
      } else {
        if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
          alert('Unable to connect to the server.');
        } else if (err.message.includes('401')) {
          alert('Invalid username or password');
        } else {
          alert('An error occurred during login.');
        }
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminRole');
    navigate('/login');
  };

  const handleBackToLanding = () => navigate('/');
  const handleAddUser = async (newUser) => {
    try {
      const createdUser = await createUser(newUser);
      setUsers([...users, createdUser]);
    } catch (err) {
      console.error('Failed to create user:', err);
      alert('Failed to create user');
    }
  };

  return (
    <div className="app">
      {showSidebar && isAdminRoute && <AdminSidebarNew onToggle={handleSidebarToggle} />}
      {showSidebar && isTeacherRoute && <TeacherSidebar onToggle={handleSidebarToggle} />}
      {showSidebar && isParentRoute && <ParentSidebar isSidebarOpen={!isSidebarCollapsed} />}
      {showSidebar && isStudentRoute && <StudentSidebar isSidebarCollapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} />}
      {showSidebar && isSuperAdminRoute && <SuperAdminSidebar onToggle={handleSidebarToggle} />}

      <div className={
        showSidebar
          ? isSidebarCollapsed
            ? `${isStudentRoute ? 'student-main-content' : isParentRoute ? 'parent-main-content' : isTeacherRoute ? 'teacher-main-content' : isAdminRoute ? 'admin-new-main-content' : 'main-content'} sidebar-collapsed`
            : `${isStudentRoute ? 'student-main-content' : isParentRoute ? 'parent-main-content' : isTeacherRoute ? 'teacher-main-content' : isAdminRoute ? 'admin-new-main-content' : 'main-content'}`
          : 'main-content-full'
      }>

        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage onLMSClick={handleLMSClick} onMapClick={handleMapClick} onLeaveFormClick={handleLeaveFormClick} />} />
          <Route path="/login" element={<LoginPageNew onLogin={handleLogin} onBack={handleBackToLanding} />} />
          <Route path="/dashboard" element={<Dashboard username={currentUser?.username} onLogout={handleLogout} />} />

          {/* Super Admin */}
          <Route path="/superadmin/dashboard" element={<RouteGuard allowedRoles={["superadmin"]}><SuperAdminDashboard /></RouteGuard>} />
          <Route path="/user-management" element={<RouteGuard allowedRoles={["superadmin"]}><UserManagement /></RouteGuard>} />
          <Route path="/role-permission-management" element={<RouteGuard allowedRoles={["superadmin"]}><RolePermissionManagement /></RouteGuard>} />
          <Route path="/academic-content-control" element={<RouteGuard allowedRoles={["superadmin"]}><AcademicContentControl /></RouteGuard>} />
          <Route path="/reports-tracking-scheduling" element={<RouteGuard allowedRoles={["superadmin"]}><ReportsTrackingScheduling /></RouteGuard>} />
          <Route path="/analytics-insights" element={<RouteGuard allowedRoles={["superadmin"]}><AnalyticsInsights /></RouteGuard>} />
          <Route path="/communication" element={<RouteGuard allowedRoles={["superadmin"]}><Communication /></RouteGuard>} />
          <Route path="/ai-support-tools" element={<RouteGuard allowedRoles={["superadmin"]}><AISupportTools /></RouteGuard>} />
          <Route path="/enhancements-accessibility" element={<RouteGuard allowedRoles={["superadmin"]}><EnhancementsAccessibility /></RouteGuard>} />
          <Route path="/security-maintenance" element={<RouteGuard allowedRoles={["superadmin"]}><SecurityMaintenance /></RouteGuard>} />
          <Route path="/authentication-profile" element={<RouteGuard allowedRoles={["superadmin"]}><AuthenticationProfile /></RouteGuard>} />
          <Route path="/feedback" element={<RouteGuard allowedRoles={["superadmin"]}><Feedback /></RouteGuard>} />

          {/* Admin */}
          <Route path="/admin/dashboard" element={<RouteGuard allowedRoles={["admin"]}><AdminDashboard /></RouteGuard>} />
          <Route path="/admin/user-management" element={<RouteGuard allowedRoles={["admin"]}><UserManagement /></RouteGuard>} />
          <Route path="/admin/role-permission-management" element={<RouteGuard allowedRoles={["admin"]}><RolePermissionManagement /></RouteGuard>} />
          <Route path="/admin/academic-content-control" element={<RouteGuard allowedRoles={["admin"]}><AcademicContentControl /></RouteGuard>} />
          <Route path="/admin/reports-tracking-scheduling" element={<RouteGuard allowedRoles={["admin"]}><ReportsTrackingScheduling /></RouteGuard>} />
          <Route path="/admin/analytics-insights" element={<RouteGuard allowedRoles={["admin"]}><AnalyticsInsights /></RouteGuard>} />
          <Route path="/admin/communication" element={<RouteGuard allowedRoles={["admin"]}><Communication /></RouteGuard>} />
          <Route path="/admin/ai-support-tools" element={<RouteGuard allowedRoles={["admin"]}><AISupportTools /></RouteGuard>} />
          <Route path="/admin/enhancements-accessibility" element={<RouteGuard allowedRoles={["admin"]}><EnhancementsAccessibility /></RouteGuard>} />
          <Route path="/admin/security-maintenance" element={<RouteGuard allowedRoles={["admin"]}><SecurityMaintenance /></RouteGuard>} />
          <Route path="/admin/authentication-profile" element={<RouteGuard allowedRoles={["admin"]}><AuthenticationProfile /></RouteGuard>} />
          <Route path="/admin/feedback" element={<RouteGuard allowedRoles={["admin"]}><Feedback /></RouteGuard>} />

          {/* Teacher */}
          <Route path="/teacher/dashboard" element={<RouteGuard allowedRoles={["teacher"]}><TeacherDashboard /></RouteGuard>} />
          <Route path="/teacher/profile" element={<RouteGuard allowedRoles={["teacher"]}><TeacherProfile /></RouteGuard>} />
          <Route path="/teacher/content-library" element={<RouteGuard allowedRoles={["teacher"]}><ContentLibrary /></RouteGuard>} />
          <Route path="/teacher/assignments" element={<RouteGuard allowedRoles={["teacher"]}><Assignments /></RouteGuard>} />
          <Route path="/teacher/class-performance" element={<RouteGuard allowedRoles={["teacher"]}><ClassPerformance /></RouteGuard>} />
          <Route path="/teacher/messages" element={<RouteGuard allowedRoles={["teacher"]}><Messages /></RouteGuard>} />
          <Route path="/teacher/leaderboard" element={<RouteGuard allowedRoles={["teacher"]}><Leaderboard /></RouteGuard>} />
          <Route path="/teacher/jee-neet-material" element={<RouteGuard allowedRoles={["teacher"]}><JEENEETMaterial /></RouteGuard>} />
          <Route path="/teacher/homework-reminders" element={<RouteGuard allowedRoles={["teacher"]}><HomeworkReminders /></RouteGuard>} />
          <Route path="/teacher/ai-assistant" element={<RouteGuard allowedRoles={["teacher"]}><AIAssistant /></RouteGuard>} />
          <Route path="/teacher/parent-messaging" element={<RouteGuard allowedRoles={["teacher"]}><ParentMessaging /></RouteGuard>} />

          {/* Parent */}
          <Route path="/parent/dashboard" element={<RouteGuard allowedRoles={["parent"]}><ParentDashboard /></RouteGuard>} />

    

          <Route path="/parent/attendance" element={<RouteGuard allowedRoles={["parent"]}><ParentAttendance /></RouteGuard>} />
          <Route path="/parent/grades" element={<RouteGuard allowedRoles={["parent"]}><ParentGrades /></RouteGuard>} />
          <Route path="/parent/events" element={<RouteGuard allowedRoles={["parent"]}><ParentEvents /></RouteGuard>} />

          <Route path="/parent/messages" element={<RouteGuard allowedRoles={["parent"]}><ParentMessages /></RouteGuard>} />

          {/* Student */}
          <Route path="/student/dashboard" element={<RouteGuard allowedRoles={["student"]}><StudentDashboard isSidebarCollapsed={isSidebarCollapsed} onSidebarToggle={handleSidebarToggle} /></RouteGuard>} />
          <Route path="/student/courses" element={<RouteGuard allowedRoles={["student"]}><Outlet /></RouteGuard>}>
            <Route index element={<StudentCourses tab="all" />} />
            <Route path="all" element={<StudentCourses tab="all" />} />
            <Route path="enrolled" element={<StudentCourses tab="enrolled" />} />
            <Route path="recommended" element={<StudentCourses tab="recommended" />} />
          </Route>
          <Route path="/student/assignments" element={<RouteGuard allowedRoles={["student"]}><StudentAssignments /></RouteGuard>} />
          <Route path="/student/grades" element={<RouteGuard allowedRoles={["student"]}><StudentGrades /></RouteGuard>} />
          <Route path="/student/calendar" element={<RouteGuard allowedRoles={["student"]}><StudentCalendar /></RouteGuard>} />
          <Route path="/student/messages" element={<RouteGuard allowedRoles={["student"]}><StudentMessages /></RouteGuard>} />
          <Route path="/student/profile" element={<RouteGuard allowedRoles={["student"]}><StudentProfile /></RouteGuard>} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
