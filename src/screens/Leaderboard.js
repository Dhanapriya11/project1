import React, { useState, useEffect } from 'react';
import { 
  Table, Card, Select, Avatar, Tag, Progress, Tooltip, Badge, Button, Tabs, Input, Row, Col 
} from 'antd';
import { 
  TrophyOutlined, CrownOutlined, SearchOutlined, FilterOutlined, DownloadOutlined,
  FireOutlined, ArrowUpOutlined, ArrowDownOutlined, MinusOutlined 
} from '@ant-design/icons';
import './Leaderboard.css';

const { Option } = Select;
const { TabPane } = Tabs;

// Mock data for leaderboard
const mockLeaderboardData = [
  {
    key: '1',
    rank: 1,
    student: { name: 'Alex Johnson', avatar: 'AJ', class: '12A' },
    points: 985,
    progress: 98,
    subjects: { math: 95, physics: 97, chemistry: 96, biology: 94 },
    streak: 12,
    change: 2,
    attendance: 98
  },
  {
    key: '2',
    rank: 2,
    student: { name: 'Priya Patel', avatar: 'PP', class: '12B' },
    points: 972,
    progress: 97,
    subjects: { math: 96, physics: 94, chemistry: 95, biology: 93 },
    streak: 8,
    change: 0,
    attendance: 96
  },
  {
    key: '3',
    rank: 3,
    student: { name: 'Michael Chen', avatar: 'MC', class: '12A' },
    points: 958,
    progress: 96,
    subjects: { math: 94, physics: 95, chemistry: 93, biology: 92 },
    streak: 15,
    change: 3,
    attendance: 97
  },
  {
    key: '4',
    rank: 4,
    student: { name: 'Sarah Williams', avatar: 'SW', class: '12C' },
    points: 942,
    progress: 94,
    subjects: { math: 92, physics: 93, chemistry: 94, biology: 91 },
    streak: 5,
    change: -1,
    attendance: 95
  },
  {
    key: '5',
    rank: 5,
    student: { name: 'David Kim', avatar: 'DK', class: '12B' },
    points: 928,
    progress: 93,
    subjects: { math: 91, physics: 92, chemistry: 90, biology: 93 },
    streak: 10,
    change: 1,
    attendance: 94
  }
];

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('overall');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('monthly');

  // Simulate data loading
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLeaderboardData(mockLeaderboardData);
      setLoading(false);
    }, 800);
  }, []);

  // Filter and sort data based on filters
  const getFilteredData = () => {
    let filtered = [...leaderboardData];
    
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(item => 
        item.student.name.toLowerCase().includes(searchLower) ||
        item.student.class.toLowerCase().includes(searchLower)
      );
    }
    
    if (subjectFilter !== 'all') {
      filtered = filtered.sort((a, b) => 
        b.subjects[subjectFilter] - a.subjects[subjectFilter]
      );
      
      return filtered.map((item, index) => ({
        ...item,
        rank: index + 1,
        points: item.subjects[subjectFilter] * 10,
        progress: item.subjects[subjectFilter]
      }));
    }
    
    if (classFilter !== 'all') {
      filtered = filtered.filter(item => item.student.class === classFilter);
    }
    
    return filtered;
  };

  const filteredData = getFilteredData();

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      width: 80,
      render: (rank) => {
        if (rank === 1) {
          return <div className="rank-badge gold"><CrownOutlined /> {rank}</div>;
        } else if (rank === 2) {
          return <div className="rank-badge silver"><TrophyOutlined /> {rank}</div>;
        } else if (rank === 3) {
          return <div className="rank-badge bronze"><TrophyOutlined /> {rank}</div>;
        }
        return <div className="rank-badge">{rank}</div>;
      },
      sorter: (a, b) => a.rank - b.rank,
      defaultSortOrder: 'ascend'
    },
    {
      title: 'Student',
      dataIndex: 'student',
      key: 'student',
      render: (student) => (
        <div className="student-cell">
          <Avatar className="student-avatar" size="large">
            {student.avatar}
          </Avatar>
          <div className="student-info">
            <div className="student-name">{student.name}</div>
            <div className="student-class">Class {student.class}</div>
          </div>
        </div>
      ),
      sorter: (a, b) => a.student.name.localeCompare(b.student.name)
    },
    {
      title: 'Points',
      dataIndex: 'points',
      key: 'points',
      width: 120,
      render: (points) => (
        <div className="points-cell">
          <div className="points-value">{points}</div>
          <Progress 
            percent={points / 10} 
            showInfo={false} 
            strokeColor={
              points >= 950 ? '#52c41a' : 
              points >= 900 ? '#1890ff' : 
              points >= 850 ? '#722ed1' : '#faad14'
            }
            strokeWidth={4}
          />
        </div>
      ),
      sorter: (a, b) => b.points - a.points
    },
    {
      title: 'Subject Scores',
      key: 'subjects',
      render: (record) => (
        <div className="subjects-cell">
          {Object.entries(record.subjects).map(([subject, score]) => (
            <Tooltip title={`${subject.charAt(0).toUpperCase() + subject.slice(1)}: ${score}%`} key={subject}>
              <div className="subject-score">
                <div className="subject-label">{subject.charAt(0).toUpperCase()}</div>
                <Progress 
                  type="circle" 
                  percent={score} 
                  width={36} 
                  strokeWidth={12}
                  format={() => score}
                  strokeColor={
                    score >= 95 ? '#52c41a' : 
                    score >= 85 ? '#1890ff' : 
                    score >= 75 ? '#722ed1' : 
                    score >= 65 ? '#faad14' : '#ff4d4f'
                  }
                />
              </div>
            </Tooltip>
          ))}
        </div>
      )
    },
    {
      title: 'Streak',
      dataIndex: 'streak',
      key: 'streak',
      width: 100,
      render: (streak) => (
        <div className="streak-cell">
          <FireOutlined style={{ color: '#ff4d4f', marginRight: 4 }} />
          {streak} days
        </div>
      ),
      sorter: (a, b) => b.streak - a.streak
    },
    {
      title: 'Change',
      dataIndex: 'change',
      key: 'change',
      width: 100,
      render: (change) => {
        if (change > 0) {
          return (
            <div className="change positive">
              <ArrowUpOutlined /> {change}
            </div>
          );
        } else if (change < 0) {
          return (
            <div className="change negative">
              <ArrowDownOutlined /> {Math.abs(change)}
            </div>
          );
        } else {
          return (
            <div className="change neutral">
              <MinusOutlined />
            </div>
          );
        }
      },
      sorter: (a, b) => b.change - a.change
    },
    {
      title: 'Attendance',
      dataIndex: 'attendance',
      key: 'attendance',
      width: 120,
      render: (attendance) => (
        <div className="attendance-cell">
          <Progress 
            type="circle" 
            percent={attendance} 
            width={36} 
            strokeWidth={10}
            format={() => `${attendance}%`}
            strokeColor={
              attendance >= 95 ? '#52c41a' : 
              attendance >= 90 ? '#1890ff' : 
              attendance >= 85 ? '#722ed1' : '#ff4d4f'
            }
          />
        </div>
      ),
      sorter: (a, b) => b.attendance - a.attendance
    }
  ];

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h1>Class Leaderboard</h1>
        <div className="header-actions">
          <Button type="primary" icon={<DownloadOutlined />}>
            Export
          </Button>
        </div>
      </div>

      <Card className="filters-card">
        <div className="filters-row">
          <div className="filter-group">
            <span className="filter-label">Time Range:</span>
            <Select 
              value={timeRange}
              onChange={setTimeRange}
              style={{ width: 120 }}
            >
              <Option value="weekly">This Week</Option>
              <Option value="monthly">This Month</Option>
              <Option value="all">All Time</Option>
            </Select>
          </div>
          
          <div className="filter-group">
            <span className="filter-label">Subject:</span>
            <Select 
              value={subjectFilter}
              onChange={setSubjectFilter}
              style={{ width: 120 }}
            >
              <Option value="all">All Subjects</Option>
              <Option value="math">Mathematics</Option>
              <Option value="physics">Physics</Option>
              <Option value="chemistry">Chemistry</Option>
              <Option value="biology">Biology</Option>
            </Select>
          </div>
          
          <div className="filter-group">
            <span className="filter-label">Class:</span>
            <Select 
              value={classFilter}
              onChange={setClassFilter}
              style={{ width: 100 }}
            >
              <Option value="all">All Classes</Option>
              <Option value="12A">12A</Option>
              <Option value="12B">12B</Option>
              <Option value="12C">12C</Option>
            </Select>
          </div>
          
          <Input
            placeholder="Search students..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
            allowClear
          />
        </div>
      </Card>

      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        className="leaderboard-tabs"
      >
        <TabPane tab="Overall Ranking" key="overall">
          <Table
            columns={columns}
            dataSource={filteredData}
            loading={loading}
            pagination={false}
            rowClassName={(record) => record.rank <= 3 ? `top-${record.rank}` : ''}
            scroll={{ x: 'max-content' }}
          />
        </TabPane>
        <TabPane tab="Subject Wise" key="subject">
          <div className="subject-tabs">
            <Tabs defaultActiveKey="math" type="card">
              <TabPane tab="Mathematics" key="math">
                <Table
                  columns={columns}
                  dataSource={filteredData}
                  loading={loading}
                  pagination={false}
                  rowClassName={(record) => record.rank <= 3 ? `top-${record.rank}` : ''}
                  scroll={{ x: 'max-content' }}
                />
              </TabPane>
              <TabPane tab="Physics" key="physics">
                <Table
                  columns={columns}
                  dataSource={filteredData}
                  loading={loading}
                  pagination={false}
                  rowClassName={(record) => record.rank <= 3 ? `top-${record.rank}` : ''}
                  scroll={{ x: 'max-content' }}
                />
              </TabPane>
              <TabPane tab="Chemistry" key="chemistry">
                <Table
                  columns={columns}
                  dataSource={filteredData}
                  loading={loading}
                  pagination={false}
                  rowClassName={(record) => record.rank <= 3 ? `top-${record.rank}` : ''}
                  scroll={{ x: 'max-content' }}
                />
              </TabPane>
              <TabPane tab="Biology" key="biology">
                <Table
                  columns={columns}
                  dataSource={filteredData}
                  loading={loading}
                  pagination={false}
                  rowClassName={(record) => record.rank <= 3 ? `top-${record.rank}` : ''}
                  scroll={{ x: 'max-content' }}
                />
              </TabPane>
            </Tabs>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Leaderboard;
