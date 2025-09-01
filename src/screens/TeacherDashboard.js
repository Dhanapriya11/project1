import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers, getCourses } from '../services/api';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Progress, 
  Avatar, 
  Badge, 
  Tabs, 
  List, 
  Button, 
  Space,
  Divider,
  Tag
} from 'antd';
import { 
  UserOutlined, 
  BookOutlined, 
  ScheduleOutlined, 
  BarChartOutlined, 
  BellOutlined,
  PlusOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  MessageOutlined,
  FileTextOutlined,
  StarOutlined,
  ExclamationCircleOutlined,
  NotificationOutlined,
  FileOutlined
} from '@ant-design/icons';
import './TeacherDashboard.css';

// Import new components
import ClassPerformance from './ClassPerformance';
import TeacherMessaging from './TeacherMessaging';
import Notifications from './Notifications';
import Leaderboard from './Leaderboard';
import StudyMaterial from './StudyMaterial';
import HomeworkReminders from './HomeworkReminders';

const { TabPane } = Tabs;

const TeacherDashboard = () => {
  const navigate = useNavigate();
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
  const [notifications, setNotifications] = useState([]);
  const [teacherProfile, setTeacherProfile] = useState({
    name: '',
    qualifications: '',
    contact: '',
    subjects: [],
    timetable: {}
  });
  
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
        setStats(prevStats => ({ 
          ...prevStats,
          studentCount: students.length, 
          courseCount: myCourses.length,
          myCourses,
          averageScores: prevStats.averageScores || { overall: 0 }
        }));
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

  // Sample upcoming deadlines
  const upcomingDeadlines = [
    { id: 1, title: 'Math Assignment 1', course: 'Mathematics', dueDate: '2023-06-25', priority: 'high' },
    { id: 2, title: 'Physics Quiz', course: 'Physics', dueDate: '2023-06-28', priority: 'medium' }
  ];

  return (
    <div className="teacher-dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {teacherProfile.name || 'Teacher'}</h1>
        <div className="header-actions">
          <Button type="primary" icon={<PlusOutlined />}>
            New
          </Button>
          <Button onClick={handleLogout} className="logout-button">
            Logout
          </Button>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="stats-container">
        <Card className="stat-card">
          <Statistic 
            title="Total Students" 
            value={stats.studentCount || 0} 
            prefix={<UserOutlined />} 
          />
          <div className="stat-trend">+12% from last month</div>
        </Card>
        
        <Card className="stat-card">
          <Statistic 
            title="My Courses" 
            value={stats.courseCount || 0} 
            prefix={<BookOutlined />} 
          />
          <div className="stat-trend">Active: {stats.courseCount || 0}</div>
        </Card>
        
        <Card className="stat-card">
          <Statistic 
            title="Pending Grading" 
            value={stats.pendingAssignments || 0} 
            prefix={<ScheduleOutlined />} 
          />
          <div className="stat-trend">
            {stats.pendingAssignments > 0 ? 'Needs attention' : 'All caught up'}
          </div>
        </Card>
        
        <Card className="stat-card">
          <Statistic 
            title="Avg. Class Score" 
            value={stats.averageScores?.overall || 0} 
            suffix="%" 
            prefix={<BarChartOutlined />} 
          />
          <div className="stat-trend">+5% from last term</div>
        </Card>
      </div>
      
      {/* Main Content Tabs */}
      <Tabs defaultActiveKey="1" className="dashboard-tabs">
        <TabPane tab={
          <span>
            <BookOutlined /> Overview
          </span>
        } key="1">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card title="Class Performance">
                <ClassPerformance />
              </Card>
              
              <Card title="Upcoming Deadlines" className="deadlines-card">
                <List
                  itemLayout="horizontal"
                  dataSource={upcomingDeadlines}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Badge status={item.priority === 'high' ? 'error' : 'warning'} />
                        }
                        title={item.title}
                        description={`${item.course} • Due: ${new Date(item.dueDate).toLocaleDateString()}`}
                      />
                      <Tag color={item.priority === 'high' ? 'red' : 'orange'}>
                        {item.priority}
                      </Tag>
                    </List.Item>
                  )}
                  locale={{ emptyText: 'No upcoming deadlines' }}
                />
                <div className="view-all">
                  <Link to="/assignments">View All Assignments <ArrowRightOutlined /></Link>
                </div>
              </Card>
              
              <Card title="Recent Notifications" className="notifications-card">
                <Notifications isWidget={true} />
                <div className="view-all">
                  <Link to="/notifications">View All Notifications <ArrowRightOutlined /></Link>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} lg={8}>
              <Card title="Quick Actions" className="quick-actions">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button block icon={<PlusOutlined />} onClick={() => navigate('/assignments/new')}>
                    Create Assignment
                  </Button>
                  <Button block icon={<PlusOutlined />} onClick={() => navigate('/materials/new')}>
                    Add Study Material
                  </Button>
                  <Button block icon={<PlusOutlined />} onClick={() => navigate('/announcements/new')}>
                    Post Announcement
                  </Button>
                  <Divider />
                  <Button block onClick={() => navigate('/analytics')}>
                    View Analytics
                  </Button>
                </Space>
              </Card>
              
              <Card title="Homework Reminders" className="homework-widget">
                <HomeworkReminders isWidget={true} />
                <div className="view-all">
                  <Link to="/homework">View All Homework <ArrowRightOutlined /></Link>
                </div>
              </Card>
              
              <Card title="Leaderboard" className="leaderboard-widget">
                <Leaderboard isWidget={true} />
                <div className="view-all">
                  <Link to="/leaderboard">View Full Leaderboard <ArrowRightOutlined /></Link>
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>
        
        <TabPane tab={
          <span>
            <MessageOutlined /> Messaging
          </span>
        } key="2">
          <TeacherMessaging />
        </TabPane>
        
        <TabPane tab={
          <span>
            <FileTextOutlined /> Study Materials
          </span>
        } key="3">
          <StudyMaterial />
        </TabPane>
        
        <TabPane tab={
          <span>
            <BarChartOutlined /> Analytics
          </span>
        } key="4">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title="Class Performance Analytics">
                <ClassPerformance detailedView={true} />
              </Card>
            </Col>
          </Row>
        </TabPane>
        
        <TabPane tab={
          <span>
            <BookOutlined /> Leaderboard
          </span>
        } key="5">
          <Leaderboard />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TeacherDashboard;
