import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChartLine, FaFilePdf, FaArrowLeft, FaSearch, FaFilter } from 'react-icons/fa';
import './ParentDashboard.css';

// Mock data - Replace with actual API calls
const mockGradesData = {
  currentGrades: [
    { 
      subject: 'Mathematics', 
      grade: 'A-', 
      percentage: 92, 
      teacher: 'Mr. Johnson',
      lastUpdated: '2025-09-05',
      trend: 'up',
      assignments: [
        { name: 'Chapter 5 Test', score: '45/50', percentage: 90, date: '2025-09-05' },
        { name: 'Homework 3.2', score: '18/20', percentage: 90, date: '2025-08-30' },
        { name: 'Quiz 4', score: '17/20', percentage: 85, date: '2025-08-20' },
      ]
    },
    { 
      subject: 'Science', 
      grade: 'B+', 
      percentage: 87, 
      teacher: 'Ms. Williams',
      lastUpdated: '2025-09-03',
      trend: 'up',
      assignments: [
        { name: 'Lab Report 2', score: '42/50', percentage: 84, date: '2025-09-03' },
        { name: 'Chapter 4 Test', score: '41/50', percentage: 82, date: '2025-08-25' },
      ]
    },
    { 
      subject: 'English', 
      grade: 'A', 
      percentage: 95, 
      teacher: 'Mrs. Anderson',
      lastUpdated: '2025-09-01',
      trend: 'same',
      assignments: [
        { name: 'Essay Draft', score: '48/50', percentage: 96, date: '2025-09-01' },
        { name: 'Reading Quiz', score: '19/20', percentage: 95, date: '2025-08-28' },
      ]
    },
    { 
      subject: 'History', 
      grade: 'B', 
      percentage: 83, 
      teacher: 'Mr. Thompson',
      lastUpdated: '2025-08-30',
      trend: 'down',
      assignments: [
        { name: 'Research Paper', score: '78/100', percentage: 78, date: '2025-08-30' },
        { name: 'Chapter 3 Quiz', score: '17/20', percentage: 85, date: '2025-08-15' },
      ]
    },
  ],
  classAverages: {
    'Mathematics': 85,
    'Science': 82,
    'English': 88,
    'History': 80
  },
  reportCards: [
    { term: 'Spring 2025', date: '2025-06-15' },
    { term: 'Fall 2024', date: '2024-12-20' },
    { term: 'Spring 2024', date: '2024-06-10' }
  ]
};

const ParentGrades = () => {
  const [selectedChild, setSelectedChild] = useState(1); // Default to first child
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('subject');
  const [view, setView] = useState('overview'); // 'overview', 'subject', 'report-cards'
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredGrades = mockGradesData.currentGrades
    .filter(grade => 
      grade.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'subject') return a.subject.localeCompare(b.subject);
      if (sortBy === 'grade') return a.percentage - b.percentage;
      return 0;
    });

  const getGradeColor = (percentage) => {
    if (percentage >= 90) return '#4CAF50';
    if (percentage >= 80) return '#8BC34A';
    if (percentage >= 70) return '#FFC107';
    if (percentage >= 60) return '#FF9800';
    return '#F44336';
  };

  const renderTrendIcon = (trend) => {
    if (trend === 'up') return <span className="trend-up">↑</span>;
    if (trend === 'down') return <span className="trend-down">↓</span>;
    return <span className="trend-same">→</span>;
  };

  const handleViewReportCard = (term) => {
    // In a real app, this would open the PDF or detailed view
    alert(`Viewing report card for ${term}`);
  };

  const { currentGrades, classAverages, reportCards } = mockGradesData;
  const selectedGradeData = selectedSubject 
    ? currentGrades.find(grade => grade.subject === selectedSubject)
    : null;

  return (
    <div className="parent-dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <button onClick={() => navigate(-1)} className="back-button">
            <FaArrowLeft /> Back
          </button>
          <h1>Grades & Progress</h1>
        </div>
        
        <div className="header-actions">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search subjects or teachers..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <div className="filter-dropdown">
            <FaFilter />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="subject">Sort by Subject</option>
              <option value="grade">Sort by Grade</option>
            </select>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="grades-tabs">
        <button 
          className={`tab-button ${view === 'overview' ? 'active' : ''}`}
          onClick={() => setView('overview')}
        >
          <FaChartLine /> Overview
        </button>
        <button 
          className={`tab-button ${view === 'report-cards' ? 'active' : ''}`}
          onClick={() => setView('report-cards')}
        >
          <FaFilePdf /> Report Cards
        </button>
      </div>

      {/* Grades Overview */}
      {view === 'overview' && (
        <div className="grades-overview">
          {selectedSubject ? (
            <div className="subject-details">
              <div className="subject-header">
                <h2>{selectedSubject}</h2>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setSelectedSubject(null)}
                >
                  Back to All Subjects
                </button>
              </div>
              
              <div className="grade-summary">
                <div className="grade-display" style={{ backgroundColor: getGradeColor(selectedGradeData.percentage) }}>
                  <div className="grade-letter">{selectedGradeData.grade}</div>
                  <div className="grade-percentage">{selectedGradeData.percentage}%</div>
                  <div className="grade-trend">
                    {renderTrendIcon(selectedGradeData.trend)}
                  </div>
                </div>
                
                <div className="grade-stats">
                  <div className="stat-item">
                    <span className="stat-label">Teacher:</span>
                    <span className="stat-value">{selectedGradeData.teacher}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Last Updated:</span>
                    <span className="stat-value">
                      {new Date(selectedGradeData.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Class Average:</span>
                    <span className="stat-value">
                      {classAverages[selectedSubject] || 'N/A'}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="assignments-list">
                <h3>Recent Assignments</h3>
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Assignment</th>
                        <th>Score</th>
                        <th>Percentage</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedGradeData.assignments.map((assignment, index) => (
                        <tr key={index}>
                          <td>{assignment.name}</td>
                          <td>{assignment.score}</td>
                          <td>
                            <div className="score-bar-container">
                              <div 
                                className="score-bar" 
                                style={{
                                  width: `${assignment.percentage}%`,
                                  backgroundColor: getGradeColor(assignment.percentage)
                                }}
                              ></div>
                              <span className="score-percentage">{assignment.percentage}%</span>
                            </div>
                          </td>
                          <td>{new Date(assignment.date).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="teacher-comments">
                <h3>Teacher's Comments</h3>
                <div className="comments-box">
                  {selectedGradeData.comments || "No additional comments at this time."}
                </div>
              </div>
            </div>
          ) : (
            <div className="grades-grid">
              {filteredGrades.map((subject) => (
                <div 
                  key={subject.subject} 
                  className="grade-card"
                  onClick={() => setSelectedSubject(subject.subject)}
                >
                  <div className="grade-card-header">
                    <h3>{subject.subject}</h3>
                    <div className="grade-badge" style={{ backgroundColor: getGradeColor(subject.percentage) }}>
                      {subject.grade}
                    </div>
                  </div>
                  <div className="grade-card-body">
                    <div className="grade-percentage">
                      {subject.percentage}%
                      <span className="trend-icon">
                        {renderTrendIcon(subject.trend)}
                      </span>
                    </div>
                    <div className="grade-teacher">{subject.teacher}</div>
                    <div className="class-average">
                      Class Avg: {classAverages[subject.subject] || 'N/A'}%
                    </div>
                  </div>
                  <div className="grade-card-footer">
                    Last updated: {new Date(subject.lastUpdated).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Report Cards View */}
      {view === 'report-cards' && (
        <div className="report-cards-view">
          <h2>Report Card Archive</h2>
          <div className="report-cards-list">
            {reportCards.map((report, index) => (
              <div key={index} className="report-card-item">
                <div className="report-card-info">
                  <h3>{report.term} Report Card</h3>
                  <p>Issued: {new Date(report.date).toLocaleDateString()}</p>
                </div>
                <div className="report-card-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleViewReportCard(report.term)}
                  >
                    <FaFilePdf /> View PDF
                  </button>
                  <button className="btn btn-secondary">
                    <FaFilePdf /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="report-card-legend">
            <h4>Grading Scale:</h4>
            <div className="grading-scale">
              <div>A: 90-100%</div>
              <div>B: 80-89%</div>
              <div>C: 70-79%</div>
              <div>D: 60-69%</div>
              <div>F: Below 60%</div>
            </div>
          </div>
        </div>
      )}
      
      <div className="grades-footer">
        <p>
          <strong>Note:</strong> Grades are updated regularly but may take up to 48 hours to appear after submission.
          Please contact the respective teacher if you have any questions about specific grades.
        </p>
      </div>
    </div>
  );
};

export default ParentGrades;
