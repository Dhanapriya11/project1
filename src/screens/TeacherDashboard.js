import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers, getCourses } from '../services/api';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ 
    studentCount: 0, 
    courseCount: 0,
    myCourses: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [teacherUsername, setTeacherUsername] = useState('');
  
  // Get user data from localStorage on component mount
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log('Current user from localStorage:', currentUser);
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
    if (!teacherUsername) {
      console.log('No teacher username available yet, skipping data fetch');
      return;
    }
    
    const fetchData = async () => {
      console.group('Fetching dashboard data');
      console.log('Teacher username:', teacherUsername);
      setIsLoading(true);
      
      try {
        // Fetch data in parallel
        const [usersResponse, coursesResponse] = await Promise.allSettled([
          getUsers(),
          getCourses()
        ]);
        
        // Handle users response
        let users = [];
        if (usersResponse.status === 'fulfilled') {
          users = Array.isArray(usersResponse.value) ? usersResponse.value : [];
          console.log(`Fetched ${users.length} users`);
        } else {
          console.error('Error fetching users:', usersResponse.reason);
        }
        
        // Handle courses response
        let courses = [];
        if (coursesResponse.status === 'fulfilled') {
          courses = Array.isArray(coursesResponse.value) ? coursesResponse.value : [];
          console.log(`Fetched ${courses.length} courses`);
        } else {
          console.error('Error fetching courses:', coursesResponse.reason);
        }
        
        // Filter students
        const students = users.filter(user => {
          const userRole = String(user.role || '').toLowerCase();
          const isStudent = userRole === 'student';
          return isStudent;
        });
        
        console.log(`Found ${students.length} students`);
        
        // Filter teacher's courses
        console.log('Filtering courses for instructor:', teacherUsername);
        const myCourses = courses.filter(course => {
          const instructorMatch = String(course.instructor || '').toLowerCase() === 
                               teacherUsername.toLowerCase();
          console.log(`Course: "${course.title}" (ID: ${course._id}), ` +
                     `Instructor: "${course.instructor}", Match: ${instructorMatch}`);
          return instructorMatch;
        });
        
        console.log(`Found ${myCourses.length} courses for teacher ${teacherUsername}`);
        
        // Update state
        setStats({ 
          studentCount: students.length, 
          courseCount: myCourses.length,
          myCourses
        });
        setError('');
        
      } catch (error) {
        console.error('Unexpected error in fetchData:', error);
        setError(`Failed to load dashboard data: ${error.message}`);
      } finally {
        console.groupEnd();
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [teacherUsername]); // This effect runs when teacherUsername changes

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="teacher-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Teacher Dashboard</h1>
          <p>Welcome back, {teacherUsername}!</p>
        </div>
        <button onClick={handleLogout} className="logout-button">
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-info">
            <h3>Total Students</h3>
            <p className="stat-number">{stats.studentCount}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-book"></i>
          </div>
          <div className="stat-info">
            <h3>My Courses</h3>
            <p className="stat-number">{stats.courseCount}</p>
          </div>
        </div>
      </div>

      <div className="courses-section">
        <h2>My Courses</h2>
        {stats.myCourses.length > 0 ? (
          <div className="courses-grid">
            {stats.myCourses.map(course => (
              <div key={course._id} className="course-card">
                <h3>{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <div className="course-meta">
                  <span className="duration">
                    <i className="far fa-clock"></i> {course.duration}
                  </span>
                  <Link 
                    to={`/teacher/course/${course._id}`} 
                    className="view-course"
                  >
                    View Course <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-courses">
            <p>You don't have any courses yet.</p>
            <Link to="/teacher/create-course" className="create-course-btn">
              Create Your First Course
            </Link>
          </div>
        )}
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/teacher/create-course" className="action-btn primary">
            <i className="fas fa-plus"></i> Create New Course
          </Link>
          <Link to="/teacher/content-library" className="action-btn">
            <i className="fas fa-book-open"></i> Content Library
          </Link>
          <Link to="/teacher/assignments" className="action-btn">
            <i className="fas fa-tasks"></i> Assignments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
