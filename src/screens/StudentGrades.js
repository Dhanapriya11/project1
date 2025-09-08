import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faDownload, faChartLine, faChartPie, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './StudentGrades.css';

const StudentGrades = () => {
  // Mock data for demonstration
  const [gradesData, setGradesData] = useState([
    {
      courseId: 1,
      courseName: 'Mathematics',
      courseCode: 'MATH101',
      semester: 'Fall 2023',
      gpa: 3.7,
      cgpa: 3.5,
      assignments: [
        { id: 1, name: 'Midterm Exam', score: 85, maxMarks: 100, weightage: 30, status: 'Passed', grade: 'B+', feedback: 'Good understanding of calculus concepts' },
        { id: 2, name: 'Homework 1', score: 92, maxMarks: 100, weightage: 10, status: 'Passed', grade: 'A-', feedback: 'Excellent problem-solving approach' },
        { id: 3, name: 'Final Project', score: 78, maxMarks: 100, weightage: 20, status: 'Passed', grade: 'C+', feedback: 'Needs improvement in presentation' }
      ]
    },
    {
      courseId: 2,
      courseName: 'Physics',
      courseCode: 'PHYS101',
      semester: 'Fall 2023',
      gpa: 3.3,
      cgpa: 3.2,
      assignments: [
        { id: 4, name: 'Lab Report 1', score: 88, maxMarks: 100, weightage: 15, status: 'Passed', grade: 'B+', feedback: 'Well-structured report' },
        { id: 5, name: 'Quiz 1', score: 75, maxMarks: 100, weightage: 10, status: 'Passed', grade: 'C', feedback: 'Average performance, study more' }
      ]
    },
    {
      courseId: 3,
      courseName: 'Computer Science',
      courseCode: 'CS101',
      semester: 'Fall 2023',
      gpa: 4.0,
      cgpa: 3.9,
      assignments: [
        { id: 6, name: 'Programming Assignment 1', score: 95, maxMarks: 100, weightage: 25, status: 'Passed', grade: 'A', feedback: 'Excellent coding skills' },
        { id: 7, name: 'Midterm Project', score: 90, maxMarks: 100, weightage: 30, status: 'Passed', grade: 'A-', feedback: 'Good implementation' }
      ]
    }
  ]);

  const [expandedCourses, setExpandedCourses] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSemester, setFilterSemester] = useState('All');
  const [filterCourse, setFilterCourse] = useState('All');
  const [classAverages, setClassAverages] = useState({
    1: { course: 'Mathematics', average: 78 },
    2: { course: 'Physics', average: 82 },
    3: { course: 'Computer Science', average: 88 }
  });

  // Toggle course expansion
  const toggleCourseExpansion = (courseId) => {
    setExpandedCourses(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  // Calculate overall GPA and CGPA
  const calculateOverallGrades = () => {
    const totalGPA = gradesData.reduce((sum, course) => sum + course.gpa, 0);
    const totalCGPA = gradesData.reduce((sum, course) => sum + course.cgpa, 0);
    const avgGPA = totalGPA / gradesData.length;
    const avgCGPA = totalCGPA / gradesData.length;
    
    return { avgGPA, avgCGPA };
  };

  // Filter grades based on search and filters
  const filteredGrades = gradesData.filter(course => {
    const matchesSearch = course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.assignments.some(assignment => 
                           assignment.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSemester = filterSemester === 'All' || course.semester === filterSemester;
    const matchesCourse = filterCourse === 'All' || course.courseName === filterCourse;
    
    return matchesSearch && matchesSemester && matchesCourse;
  });

  // Get unique semesters and courses for filters
  const semesters = [...new Set(gradesData.map(course => course.semester))];
  const courses = [...new Set(gradesData.map(course => course.courseName))];

  // Render status badge
  const renderStatusBadge = (status) => {
    let className = '';
    switch (status) {
      case 'Passed':
        className = 'status-passed';
        break;
      case 'Failed':
        className = 'status-failed';
        break;
      case 'Pending':
        className = 'status-pending';
        break;
      default:
        className = '';
    }
    return <span className={`status-badge ${className}`}>{status}</span>;
  };

  // Render grade badge
  const renderGradeBadge = (grade) => {
    let className = '';
    switch (grade.charAt(0)) {
      case 'A':
        className = 'grade-a';
        break;
      case 'B':
        className = 'grade-b';
        break;
      case 'C':
        className = 'grade-c';
        break;
      case 'D':
        className = 'grade-d';
        break;
      case 'F':
        className = 'grade-f';
        break;
      default:
        className = 'grade-default';
    }
    return <span className={`grade-badge ${className}`}>{grade}</span>;
  };

  // Calculate progress percentage
  const calculateProgress = (score, maxMarks) => {
    return Math.round((score / maxMarks) * 100);
  };

  // Download report as PDF
  const downloadReport = (format) => {
    if (format === 'pdf') {
      alert('PDF download would be implemented here');
      // In a real implementation, you would use a library like jsPDF
    } else if (format === 'excel') {
      alert('Excel download would be implemented here');
      // In a real implementation, you would use a library like xlsx
    }
  };

  const { avgGPA, avgCGPA } = calculateOverallGrades();

  return (
    <div className="student-grades-container">
      <div className="grades-header">
        <h2>My Grades</h2>
        <div className="header-actions">
          <button className="download-btn" onClick={() => downloadReport('pdf')}>
            <FontAwesomeIcon icon={faDownload} /> Download PDF
          </button>
          <button className="download-btn" onClick={() => downloadReport('excel')}>
            <FontAwesomeIcon icon={faDownload} /> Download Excel
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grades-summary">
        <div className="summary-card">
          <h3>Overall GPA</h3>
          <p className="summary-value">{avgGPA.toFixed(2)}</p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(avgGPA / 4) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="summary-card">
          <h3>Overall CGPA</h3>
          <p className="summary-value">{avgCGPA.toFixed(2)}</p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(avgCGPA / 4) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="summary-card">
          <h3>Total Courses</h3>
          <p className="summary-value">{gradesData.length}</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="grades-filters">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <FontAwesomeIcon icon={faFilter} />
          <select value={filterSemester} onChange={(e) => setFilterSemester(e.target.value)}>
            <option value="All">All Semesters</option>
            {semesters.map(semester => (
              <option key={semester} value={semester}>{semester}</option>
            ))}
          </select>
          <select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)}>
            <option value="All">All Courses</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Graphical Analytics */}
      <div className="analytics-section">
        <div className="chart-container">
          <h3><FontAwesomeIcon icon={faChartLine} /> Grade Trends</h3>
          <div className="chart-placeholder">
            Line chart showing grade trends would appear here
          </div>
        </div>
        <div className="chart-container">
          <h3><FontAwesomeIcon icon={faChartPie} /> Grade Distribution</h3>
          <div className="chart-placeholder">
            Pie chart showing grade distribution would appear here
          </div>
        </div>
      </div>

      {/* Grades Table */}
      <div className="grades-table-container">
        <table className="grades-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Assignment/Exam</th>
              <th>Score</th>
              <th>Max Marks</th>
              <th>Weightage</th>
              <th>Grade</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Comparison</th>
            </tr>
          </thead>
          <tbody>
            {filteredGrades.map(course => (
              <React.Fragment key={course.courseId}>
                <tr 
                  className="course-header" 
                  onClick={() => toggleCourseExpansion(course.courseId)}
                >
                  <td>
                    <FontAwesomeIcon 
                      icon={expandedCourses[course.courseId] ? faChevronDown : faChevronRight} 
                    />
                    {course.courseName} ({course.courseCode})
                  </td>
                  <td colSpan="8">
                    <div className="course-summary">
                      <span>GPA: {course.gpa}</span>
                      <span>CGPA: {course.cgpa}</span>
                      <span>Semester: {course.semester}</span>
                    </div>
                  </td>
                </tr>
                {expandedCourses[course.courseId] && course.assignments.map(assignment => (
                  <tr key={assignment.id} className="assignment-row">
                    <td></td>
                    <td>{assignment.name}</td>
                    <td>
                      <div className="score-container">
                        <span>{assignment.score}</span>
                        <div className="progress-container">
                          <div 
                            className="score-progress" 
                            style={{ width: `${calculateProgress(assignment.score, assignment.maxMarks)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td>{assignment.maxMarks}</td>
                    <td>{assignment.weightage}%</td>
                    <td>{renderGradeBadge(assignment.grade)}</td>
                    <td>{renderStatusBadge(assignment.status)}</td>
                    <td>{assignment.feedback}</td>
                    <td>
                      {classAverages[course.courseId] && (
                        <div className="comparison">
                          <span>Class Avg: {classAverages[course.courseId].average}</span>
                          <span className={assignment.score > classAverages[course.courseId].average ? 'above-average' : 'below-average'}>
                            {assignment.score > classAverages[course.courseId].average ? 'Above' : 'Below'} Average
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentGrades;
