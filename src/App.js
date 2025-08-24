import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate,useLocation } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import AdminSidebarNew from './components/AdminSidebarNew';
import SuperAdminSidebar from './components/SuperAdminSidebar';
import TeacherSidebar from './components/TeacherSidebar';
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
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import TeacherDashboard from './screens/TeacherDashboard';
import ParentDashboard from './screens/ParentDashboard';
import StudentDashboard from './screens/StudentDashboard';
import Profile from './screens/Profile';
import ContentLibrary from './screens/ContentLibrary';
import Assignments from './screens/Assignments';
import ClassPerformance from './screens/ClassPerformance';
import Messages from './screens/Messages';
import Leaderboard from './screens/Leaderboard';
import JEENEETMaterial from './screens/JEENEETMaterial';
import ParentSidebar from './components/ParentSidebar';
import Attendance from './screens/Attendance';
import Grades from './screens/Grades';
import SchoolEvents from './screens/SchoolEvents';
import ParentMessages from './screens/ParentMessages';
import StudentSidebar from './components/StudentSidebar';
import StudentCourses from './screens/StudentCourses';
import StudentAssignments from './screens/StudentAssignments';
import StudentGrades from './screens/StudentGrades';
import StudentCalendar from './screens/StudentCalendar';
import StudentMessages from './screens/StudentMessages';
import StudentProfile from './screens/StudentProfile';
import HomeworkReminders from './screens/HomeworkReminders';
import AIAssistant from './screens/AIAssistant';
import ParentMessaging from './screens/ParentMessaging';

import { getUsers, createUser, loginUser } from './services/api';

// Log when the app starts
console.log('App starting');

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State for users
  const [users, setUsers] = useState([]);
  
  // State for currently logged in user
  const [currentUser, setCurrentUser] = useState(null);
  
  // Fetch users from the backend when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching users in App.js');
        const userData = await getUsers();
        console.log('Users fetched in App.js:', userData);
        setUsers(userData);
      } catch (err) {
        console.error('Failed to fetch users in App.js:', err);
      }
    };
    
    fetchUsers();
  }, []);
  
  // Define routes where sidebar should be shown
  // Define routes where sidebar should be shown
  const showSidebar = !['/', '/login'].includes(location.pathname);
  const isAdminRoute = location.pathname.startsWith('/admin/');
  const isTeacherRoute = location.pathname.startsWith('/teacher/');
  const isParentRoute = location.pathname.startsWith('/parent/');
  const isStudentRoute = location.pathname.startsWith('/student/');
  // Updated logic to correctly identify super admin routes
  const isSuperAdminRoute = !isAdminRoute && !isTeacherRoute && !isParentRoute && !isStudentRoute && location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/dashboard';
  
  // State for sidebar collapsed status
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Function to handle sidebar toggle
  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };
  
  const handleLMSClick = () => {
    navigate('/login');
  };
  
  const handleMapClick = () => {
    // For now, we'll just show an alert since no specific page was mentioned
    alert('Map feature is not implemented yet');
  };
  
  const handleLeaveFormClick = () => {
    // For now, we'll just show an alert since no specific page was mentioned
    alert('Leave Form feature is not implemented yet');
  };
  
  const handleLogin = async (username, password) => {
    console.log('Login attempt in App.js with:', { username, password });
    try {
      // Try to authenticate user against database
      const user = await loginUser({ username, password });
      console.log('User authenticated:', user);
      setCurrentUser(user);
      // Store user info in localStorage for persistence
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Redirect based on role
      switch (user.role) {
        case 'Admin':
          navigate('/admin/dashboard');
          break;
        case 'Super Admin':
          navigate('/super-admin-dashboard');
          break;
        case 'Teacher':
          navigate('/teacher/dashboard');
          break;
        case 'Parent':
          navigate('/parent/dashboard');
          break;
        case 'Student':
          navigate('/student/dashboard');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error in App.js:', err);
      // If database authentication fails, check if it's an admin user (hardcoded for now)
      const adminCredentials = [
        { username: 'superadmin', password: 'superadmin123', role: 'superadmin' },
        { username: 'admin', password: 'admin123', role: 'admin' }
      ];
      
      const admin = adminCredentials.find(
        admin => admin.username === username && admin.password === password
      );
      
      if (admin) {
        // Store login status and role in localStorage
        localStorage.setItem('isAdminLoggedIn', 'true');
        localStorage.setItem('adminUsername', username);
        localStorage.setItem('adminRole', admin.role);
        // Redirect to appropriate dashboard based on role
        if (admin.role === 'superadmin') {
          navigate('/super-admin-dashboard');
        } else {
          navigate('/admin/dashboard');
        }
      } else {
        // Check if this is a network error or a server error
        if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
          alert('Unable to connect to the server. Please check your internet connection and try again.');
        } else if (err.message.includes('HTTP error! status: 401')) {
          alert('Invalid username or password');
        } else {
          alert('An error occurred during login. Please try again.');
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
  
  const handleBackToLanding = () => {
    navigate('/');
  };
  
  const handleAddUser = async (newUser) => {
    try {
      console.log('Creating user in App.js with data:', newUser);
      const createdUser = await createUser(newUser);
      console.log('User created in App.js:', createdUser);
      setUsers([...users, createdUser]);
    } catch (err) {
      console.error('Failed to create user in App.js:', err);
      alert('Failed to create user');
    }
  };

  return (
    <div className="app">
      {showSidebar && isAdminRoute && <AdminSidebarNew onToggle={handleSidebarToggle} />}
      {showSidebar && isTeacherRoute && <TeacherSidebar onToggle={handleSidebarToggle} />}
      {showSidebar && isParentRoute && <ParentSidebar isSidebarOpen={!isSidebarCollapsed} />}
      {showSidebar && isStudentRoute && <StudentSidebar isSidebarCollapsed={isSidebarCollapsed} />}
      {showSidebar && isSuperAdminRoute && <SuperAdminSidebar onToggle={handleSidebarToggle} />}
      <div
        className={showSidebar
          ? isSidebarCollapsed
            ? `${isStudentRoute ? 'student-main-content' : isParentRoute ? 'parent-main-content' : isTeacherRoute ? 'teacher-main-content' : isAdminRoute ? 'admin-new-main-content' : 'main-content'} sidebar-collapsed`
            : `${isStudentRoute ? 'student-main-content' : isParentRoute ? 'parent-main-content' : isTeacherRoute ? 'teacher-main-content' : isAdminRoute ? 'admin-new-main-content' : 'main-content'}`
          : 'main-content-full'
        }>


        <Routes>
          <Route path="/" element={<LandingPage onLMSClick={handleLMSClick} onMapClick={handleMapClick} onLeaveFormClick={handleLeaveFormClick} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} onBack={handleBackToLanding} />} />
          <Route path="/dashboard" element={<Dashboard username={currentUser?.username} onLogout={handleLogout} />} />
          {/* Super Admin Routes */}
          <Route path="/user-management" element={<RouteGuard allowedRole="superadmin"><UserManagement /></RouteGuard>} />
          <Route path="/role-permission-management" element={<RouteGuard allowedRole="superadmin"><RolePermissionManagement /></RouteGuard>} />
          <Route path="/academic-content-control" element={<RouteGuard allowedRole="superadmin"><AcademicContentControl /></RouteGuard>} />
          <Route path="/reports-tracking-scheduling" element={<RouteGuard allowedRole="superadmin"><ReportsTrackingScheduling /></RouteGuard>} />
          <Route path="/analytics-insights" element={<RouteGuard allowedRole="superadmin"><AnalyticsInsights /></RouteGuard>} />
          <Route path="/communication" element={<RouteGuard allowedRole="superadmin"><Communication /></RouteGuard>} />
          <Route path="/ai-support-tools" element={<RouteGuard allowedRole="superadmin"><AISupportTools /></RouteGuard>} />
          <Route path="/enhancements-accessibility" element={<RouteGuard allowedRole="superadmin"><EnhancementsAccessibility /></RouteGuard>} />
          <Route path="/security-maintenance" element={<RouteGuard allowedRole="superadmin"><SecurityMaintenance /></RouteGuard>} />
          <Route path="/authentication-profile" element={<RouteGuard allowedRole="superadmin"><AuthenticationProfile /></RouteGuard>} />
          <Route path="/feedback" element={<RouteGuard allowedRole="superadmin"><Feedback /></RouteGuard>} />
          {/* Admin Routes */}
          <Route path="/admin/user-management" element={<RouteGuard allowedRole="admin"><UserManagement /></RouteGuard>} />
          <Route path="/admin/role-permission-management" element={<RouteGuard allowedRole="admin"><RolePermissionManagement /></RouteGuard>} />
          <Route path="/admin/academic-content-control" element={<RouteGuard allowedRole="admin"><AcademicContentControl /></RouteGuard>} />
          <Route path="/admin/reports-tracking-scheduling" element={<RouteGuard allowedRole="admin"><ReportsTrackingScheduling /></RouteGuard>} />
          <Route path="/admin/analytics-insights" element={<RouteGuard allowedRole="admin"><AnalyticsInsights /></RouteGuard>} />
          <Route path="/admin/communication" element={<RouteGuard allowedRole="admin"><Communication /></RouteGuard>} />
          <Route path="/admin/ai-support-tools" element={<RouteGuard allowedRole="admin"><AISupportTools /></RouteGuard>} />
          <Route path="/admin/enhancements-accessibility" element={<RouteGuard allowedRole="admin"><EnhancementsAccessibility /></RouteGuard>} />
          <Route path="/admin/security-maintenance" element={<RouteGuard allowedRole="admin"><SecurityMaintenance /></RouteGuard>} />
          <Route path="/admin/authentication-profile" element={<RouteGuard allowedRole="admin"><AuthenticationProfile /></RouteGuard>} />
          <Route path="/admin/feedback" element={<RouteGuard allowedRole="admin"><Feedback /></RouteGuard>} />
          <Route path="/admin/dashboard" element={<RouteGuard allowedRole="admin"><AdminDashboard /></RouteGuard>} />
          <Route path="/super-admin-dashboard" element={<RouteGuard allowedRole="superadmin"><SuperAdminDashboard /></RouteGuard>} />

          {/* Teacher, Parent, and Student Routes */}
          <Route path="/teacher/dashboard" element={<RouteGuard allowedRole="Teacher"><TeacherDashboard /></RouteGuard>} />
          <Route path="/teacher/profile" element={<RouteGuard allowedRole="Teacher"><Profile /></RouteGuard>} />
          <Route path="/teacher/content-library" element={<RouteGuard allowedRole="Teacher"><ContentLibrary /></RouteGuard>} />
          <Route path="/teacher/assignments" element={<RouteGuard allowedRole="Teacher"><Assignments /></RouteGuard>} />
          <Route path="/teacher/class-performance" element={<RouteGuard allowedRole="Teacher"><ClassPerformance /></RouteGuard>} />
          <Route path="/teacher/messages" element={<RouteGuard allowedRole="Teacher"><Messages /></RouteGuard>} />
          <Route path="/teacher/leaderboard" element={<RouteGuard allowedRole="Teacher"><Leaderboard /></RouteGuard>} />
          <Route path="/teacher/jee-neet-material" element={<RouteGuard allowedRole="Teacher"><JEENEETMaterial /></RouteGuard>} />
          <Route path="/teacher/homework-reminders" element={<RouteGuard allowedRole="Teacher"><HomeworkReminders /></RouteGuard>} />
          <Route path="/teacher/ai-assistant" element={<RouteGuard allowedRole="Teacher"><AIAssistant /></RouteGuard>} />
          <Route path="/teacher/parent-messaging" element={<RouteGuard allowedRole="Teacher"><ParentMessaging /></RouteGuard>} />
          <Route path="/parent/dashboard" element={<RouteGuard allowedRole="Parent"><ParentDashboard /></RouteGuard>} />
          <Route path="/parent/attendance" element={<RouteGuard allowedRole="Parent"><Attendance /></RouteGuard>} />
          <Route path="/parent/grades" element={<RouteGuard allowedRole="Parent"><Grades /></RouteGuard>} />
          <Route path="/parent/events" element={<RouteGuard allowedRole="Parent"><SchoolEvents /></RouteGuard>} />
          <Route path="/parent/messages" element={<RouteGuard allowedRole="Parent"><ParentMessages /></RouteGuard>} />
          <Route path="/student/dashboard" element={<RouteGuard allowedRole="Student"><StudentDashboard /></RouteGuard>} />
          <Route path="/student/courses" element={<RouteGuard allowedRole="Student"><StudentCourses /></RouteGuard>} />
          <Route path="/student/assignments" element={<RouteGuard allowedRole="Student"><StudentAssignments /></RouteGuard>} />
          <Route path="/student/grades" element={<RouteGuard allowedRole="Student"><StudentGrades /></RouteGuard>} />
          <Route path="/student/calendar" element={<RouteGuard allowedRole="Student"><StudentCalendar /></RouteGuard>} />
          <Route path="/student/messages" element={<RouteGuard allowedRole="Student"><StudentMessages /></RouteGuard>} />
          <Route path="/student/profile" element={<RouteGuard allowedRole="Student"><StudentProfile /></RouteGuard>} />
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
