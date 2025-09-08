import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Tabs, Table, Button, Modal, Input, Select } from 'antd';
import { SearchOutlined, FilterOutlined, DownloadOutlined } from '@ant-design/icons';
import './ClassPerformance.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const mockStudents = [
  { id: 1, name: 'Alice Johnson', score: 95, attendance: 98, weakAreas: ['Algebra', 'Trigonometry'], aiSuggestions: ['Practice more word problems', 'Focus on trigonometric identities'] },
  { id: 2, name: 'Bob Smith', score: 88, attendance: 92, weakAreas: ['Geometry', 'Calculus'], aiSuggestions: ['Review geometric proofs', 'Practice derivative problems'] },
  { id: 3, name: 'Charlie Brown', score: 76, attendance: 85, weakAreas: ['Probability', 'Statistics'], aiSuggestions: ['Focus on probability distributions', 'Practice statistical analysis'] },
  { id: 4, name: 'Diana Prince', score: 92, attendance: 96, weakAreas: ['Trigonometry'], aiSuggestions: ['Practice trigonometric functions'] },
  { id: 5, name: 'Ethan Hunt', score: 68, attendance: 78, weakAreas: ['Calculus', 'Algebra'], aiSuggestions: ['Basic algebra review needed', 'Start with differentiation basics'] },
];

const mockPerformanceData = {
  averageScore: 82,
  passRate: 93,
  topPerformer: 'Alice Johnson',
  attendanceCorrelation: 0.78,
  gradeDistribution: {
    'A (90-100)': 8,
    'B (80-89)': 12,
    'C (70-79)': 6,
    'D (60-69)': 2,
    'F (<60)': 2,
  },
  subjectPerformance: {
    'Mathematics': 85,
    'Physics': 78,
    'Chemistry': 82,
    'Biology': 88,
  },
  attendancePerformance: mockStudents.map(student => ({
    name: student.name,
    attendance: student.attendance,
    score: student.score
  }))
};

const chartData = {
  labels: Object.keys(mockPerformanceData.gradeDistribution),
  datasets: [
    {
      label: 'Number of Students',
      data: Object.values(mockPerformanceData.gradeDistribution),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};

const gradeChartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Overall Grade Distribution' },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: 'Number of Students' }
    }
  }
};

const subjectChartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Subject-wise Performance' },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      title: { display: true, text: 'Average Score (%)' }
    }
  }
};

const attendanceChartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Attendance vs Performance' },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      title: { display: true, text: 'Score (%)' }
    },
    x: {
      title: { display: true, text: 'Attendance (%)' }
    }
  }
};

const studentColumns = [
  {
    title: 'Student Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Score (%)',
    dataIndex: 'score',
    key: 'score',
    sorter: (a, b) => a.score - b.score,
  },
  {
    title: 'Attendance (%)',
    dataIndex: 'attendance',
    key: 'attendance',
    sorter: (a, b) => a.attendance - b.attendance,
  },
  {
    title: 'Weak Areas',
    dataIndex: 'weakAreas',
    key: 'weakAreas',
    render: areas => areas.join(', '),
  },
  {
    title: 'AI Suggestions',
    key: 'suggestions',
    render: (_, record) => (
      <div>
        {record.aiSuggestions.map((suggestion, i) => (
          <div key={i} style={{ marginBottom: 4 }}>• {suggestion}</div>
        ))}
      </div>
    ),
  },
];

const ClassPerformance = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedClass, setSelectedClass] = useState('All Classes');

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setIsModalVisible(true);
  };

  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchText.toLowerCase()) &&
    (selectedClass === 'All Classes' || student.class === selectedClass)
  );

  const items = [
    {
      key: 'overview',
      label: 'Overview',
      children: (
        <div className="overview-container">
          <div className="summary-metrics">
            <div className="metric-card">
              <div className="metric-value">{mockPerformanceData.averageScore}%</div>
              <div className="metric-label">Average Score</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{mockPerformanceData.passRate}%</div>
              <div className="metric-label">Pass Rate</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{mockPerformanceData.topPerformer}</div>
              <div className="metric-label">Top Performer</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">
                {(mockPerformanceData.attendanceCorrelation * 100).toFixed(1)}%
              </div>
              <div className="metric-label">Attendance-Performance Correlation</div>
            </div>
          </div>

          <div className="charts-row">
            <div className="chart-container">
              <Bar options={gradeChartOptions} data={{
                labels: Object.keys(mockPerformanceData.gradeDistribution),
                datasets: [{
                  label: 'Number of Students',
                  data: Object.values(mockPerformanceData.gradeDistribution),
                  backgroundColor: 'rgba(54, 162, 235, 0.6)',
                }]
              }} />
            </div>
            <div className="chart-container">
              <Bar options={subjectChartOptions} data={{
                labels: Object.keys(mockPerformanceData.subjectPerformance),
                datasets: [{
                  label: 'Average Score',
                  data: Object.values(mockPerformanceData.subjectPerformance),
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                }]
              }} />
            </div>
          </div>

          <div className="chart-container full-width">
            <Line
              options={attendanceChartOptions}
              data={{
                labels: mockPerformanceData.attendancePerformance.map(s => s.name.split(' ')[0]),
                datasets: [
                  {
                    label: 'Scores',
                    data: mockPerformanceData.attendancePerformance.map(s => s.score),
                    borderColor: 'rgba(153, 102, 255, 0.8)',
                    backgroundColor: 'rgba(153, 102, 255, 0.1)',
                    yAxisID: 'y',
                  },
                  {
                    label: 'Attendance',
                    data: mockPerformanceData.attendancePerformance.map(s => s.attendance),
                    borderColor: 'rgba(255, 159, 64, 0.8)',
                    backgroundColor: 'rgba(255, 159, 64, 0.1)',
                    borderDash: [5, 5],
                    yAxisID: 'y1',
                  }
                ]
              }}
            />
          </div>
        </div>
      ),
    },
    {
      key: 'students',
      label: 'Student Analytics',
      children: (
        <div className="student-analytics">
          <div className="filters">
            <Input
              placeholder="Search students..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200, marginRight: 16 }}
            />
            <Select
              defaultValue="All Classes"
              style={{ width: 200 }}
              onChange={setSelectedClass}
              options={[
                { value: 'All Classes', label: 'All Classes' },
                { value: 'Math 101', label: 'Math 101' },
                { value: 'Physics 201', label: 'Physics 201' },
              ]}
            />
            <Button icon={<DownloadOutlined />} style={{ marginLeft: 'auto' }}>
              Export Data
            </Button>
          </div>
          
          <Table
            columns={studentColumns}
            dataSource={filteredStudents}
            rowKey="id"
            onRow={(record) => ({
              onClick: () => handleStudentClick(record),
              style: { cursor: 'pointer' },
            })}
            pagination={{ pageSize: 10 }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="performance-container">
      <div className="performance-header">
        <h1>Class Performance Analytics</h1>
        <div className="header-actions">
          <Button type="primary" icon={<FilterOutlined />}>
            Filters
          </Button>
          <Button type="primary" icon={<DownloadOutlined />}>
            Export Report
          </Button>
        </div>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={items}
        className="performance-tabs"
      />

      <Modal
        title={`Performance Details: ${selectedStudent?.name || ''}`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedStudent && (
          <div className="student-details">
            <div className="student-stats">
              <div className="stat-item">
                <div className="stat-label">Overall Score</div>
                <div className="stat-value">{selectedStudent.score}%</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Attendance</div>
                <div className="stat-value">{selectedStudent.attendance}%</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Class Rank</div>
                <div className="stat-value">
                  #{mockStudents.findIndex(s => s.id === selectedStudent.id) + 1} of {mockStudents.length}
                </div>
              </div>
            </div>
            
            <div className="weak-areas">
              <h3>Areas Needing Improvement</h3>
              <ul>
                {selectedStudent.weakAreas.map((area, i) => (
                  <li key={i}>{area}</li>
                ))}
              </ul>
            </div>
            
            <div className="ai-recommendations">
              <h3>AI-Powered Recommendations</h3>
              <ul>
                {selectedStudent.aiSuggestions.map((suggestion, i) => (
                  <li key={i}>{suggestion}</li>
                ))}
              </ul>
            </div>
            
            <div className="action-plan">
              <h3>Personalized Teaching Plan</h3>
              <Button type="primary" style={{ marginTop: 16 }}>
                Generate Detailed Plan
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ClassPerformance;
