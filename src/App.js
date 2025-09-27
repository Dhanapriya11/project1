import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import SuperAdminLayout from './components/SuperAdminLayout';
import Sidebar from './components/Sidebar';
import AdminSidebarNew from './components/AdminSidebarNew';
import SuperAdminSidebar from './components/SuperAdminSidebar';
import TeacherSidebar from './components/TeacherSidebar';
import ParentSidebar from './components/ParentSidebar';
import StudentSidebar from './components/StudentSidebar';
import TeacherSubjectAssignment from './components/TeacherSubjectAssignment';
import CourseManagement from './screens/CourseManagement';

import RouteGuard from './components/RouteGuard';
import Dashboard from './screens/Dashboard';
import UserManagement from './screens/UserManagement';
import RolePermissionManagement from './screens/RolePermissionManagement';
import AcademicContentControl from './screens/AcademicContentControl';
import ViewContent from './screens/ViewContent';
import EditContent from './screens/EditContent';
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
      {/* SuperAdminSidebar is handled within SuperAdminLayout */}

      <div className={
        showSidebar && !isSuperAdminRoute // Don't add sidebar classes for super admin routes (handled in layout)
          ? isSidebarCollapsed
            ? `${isStudentRoute ? 'student-main-content' : isParentRoute ? 'parent-main-content' : isTeacherRoute ? 'teacher-main-content' : 'admin-new-main-content'} sidebar-collapsed`
            : `${isStudentRoute ? 'student-main-content' : isParentRoute ? 'parent-main-content' : isTeacherRoute ? 'teacher-main-content' : 'admin-new-main-content'}`
          : 'main-content-full'
      }>

        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage onLMSClick={handleLMSClick} onMapClick={handleMapClick} onLeaveFormClick={handleLeaveFormClick} />} />
          <Route path="/login" element={<LoginPageNew onLogin={handleLogin} onBack={handleBackToLanding} />} />
          <Route path="/dashboard" element={<Dashboard username={currentUser?.username} onLogout={handleLogout} />} />

          {/* Super Admin Routes */}
          <Route element={<RouteGuard allowedRoles={["superadmin"]}><SuperAdminLayout /></RouteGuard>}>
            <Route index path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
            
            {/* User Management */}
            <Route path="/superadmin/user-management" element={<UserManagement />} />
            <Route path="/superadmin/user-management/roles" element={<RolePermissionManagement />} />
            
            {/* Academic */}
            <Route path="/superadmin/academic/courses" element={<CourseManagement />} />
            <Route path="/superadmin/academic/subjects" element={<AcademicContentControl />} />
            <Route path="/superadmin/academic/batches" element={<div>Batches Management</div>} />
            
            {/* Reports */}
            <Route path="/superadmin/reports/student-progress" element={<ReportsTrackingScheduling />} />
            <Route path="/superadmin/reports/teacher-performance" element={<AnalyticsInsights />} />
            <Route path="/superadmin/reports/system-usage" element={<div>System Usage Reports</div>} />
            
            {/* System */}
            <Route path="/superadmin/system/settings" element={<EnhancementsAccessibility />} />
            <Route path="/superadmin/system/backup" element={<div>Backup & Restore</div>} />
            <Route path="/superadmin/system/logs" element={<div>System Logs</div>} />
            
            {/* Security */}
            <Route path="/superadmin/security/audit-logs" element={<SecurityMaintenance />} />
            <Route path="/superadmin/security/login-history" element={<div>Login History</div>} />
            <Route path="/superadmin/security/settings" element={<AuthenticationProfile />} />
            
            {/* Other */}
            <Route path="/superadmin/notifications" element={<Communication />} />
            <Route path="/superadmin/settings" element={<Feedback />} />
            <Route path="/superadmin/teacher-assignments" element={<TeacherSubjectAssignment />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin/teacher-assignments" element={
            <RouteGuard allowedRoles={["admin"]}>
              <TeacherSubjectAssignment />
            </RouteGuard>} />

          {/* Admin */}
          <Route path="/admin/dashboard" element={<RouteGuard allowedRoles={["admin"]}><AdminDashboard /></RouteGuard>} />
          <Route path="/admin/user-management" element={<RouteGuard allowedRoles={["admin"]}><UserManagement /></RouteGuard>} />
          <Route path="/admin/role-permission-management" element={<RouteGuard allowedRoles={["admin"]}><RolePermissionManagement /></RouteGuard>} />
          <Route path="/admin/academic-content-control" element={<RouteGuard allowedRoles={["admin"]}><AcademicContentControl /></RouteGuard>} />
          <Route path="/content/:id" element={<RouteGuard allowedRoles={["admin", "teacher"]}><ViewContent /></RouteGuard>} />
          <Route path="/edit-content/:id" element={<RouteGuard allowedRoles={["admin", "teacher"]}><EditContent /></RouteGuard>} />
          <Route path="/admin/course-management" element={<RouteGuard allowedRoles={["admin"]}><CourseManagement /></RouteGuard>} />
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
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
