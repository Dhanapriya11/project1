import React, { useState, useEffect } from 'react';
import './Assignments.css';

const StudentAssignments = () => {
  // Mock data for assignments
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Math Homework 1',
      course: 'Mathematics 101',
      deadline: '2023-06-15',
      status: 'Pending',
      submitted: false,
      graded: false,
      score: null,
      feedback: '',
      allowLateSubmission: true
    },
    {
      id: 2,
      title: 'Physics Lab Report',
      course: 'Physics 201',
      deadline: '2023-06-10',
      status: 'Submitted',
      submitted: true,
      graded: true,
      score: 85,
      feedback: 'Good work, but could improve on the analysis section.',
      allowLateSubmission: false
    },
    {
      id: 3,
      title: 'History Essay',
      course: 'History 150',
      deadline: '2023-06-05',
      status: 'Graded',
      submitted: true,
      graded: true,
      score: 92,
      feedback: 'Excellent research and writing.',
      allowLateSubmission: false
    },
    {
      id: 4,
      title: 'Chemistry Problem Set',
      course: 'Chemistry 301',
      deadline: '2023-05-30',
      status: 'Pending',
      submitted: false,
      graded: false,
      score: null,
      feedback: '',
      allowLateSubmission: true
    }
  ]);

  const [filteredAssignments, setFilteredAssignments] = useState(assignments);
  const [filters, setFilters] = useState({
    course: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  });
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Filter assignments based on filters
  useEffect(() => {
    let result = assignments;
    
    if (filters.course) {
      result = result.filter(assignment => assignment.course.includes(filters.course));
    }
    
    if (filters.status) {
      result = result.filter(assignment => assignment.status === filters.status);
    }
    
    if (filters.dateFrom) {
      result = result.filter(assignment => assignment.deadline >= filters.dateFrom);
    }
    
    if (filters.dateTo) {
      result = result.filter(assignment => assignment.deadline <= filters.dateTo);
    }
    
    setFilteredAssignments(result);
  }, [filters, assignments]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (selectedAssignment) {
      setAssignments(prev => 
        prev.map(assignment => 
          assignment.id === selectedAssignment.id 
            ? { 
                ...assignment, 
                submitted: true, 
                status: 'Submitted',
                submissionText,
                uploadedFiles: uploadedFiles.map(f => f.name)
              } 
            : assignment
        )
      );
      setSelectedAssignment(null);
      setSubmissionText('');
      setUploadedFiles([]);
    }
  };

  const isOverdue = (deadline) => {
    const today = new Date();
    const dueDate = new Date(deadline);
    return dueDate < today;
  };

  const uniqueCourses = [...new Set(assignments.map(a => a.course))];

  return (
    <div className="assignments-container">
      <h2>My Assignments</h2>
      
      {/* Filters */}
      <div className="filters">
        <h3>Filter Assignments</h3>
        <div className="filter-row">
          <select name="course" value={filters.course} onChange={handleFilterChange}>
            <option value="">All Courses</option>
            {uniqueCourses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
          
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Submitted">Submitted</option>
            <option value="Graded">Graded</option>
          </select>
          
          <input 
            type="date" 
            name="dateFrom" 
            value={filters.dateFrom} 
            onChange={handleFilterChange}
            placeholder="From Date"
          />
          
          <input 
            type="date" 
            name="dateTo" 
            value={filters.dateTo} 
            onChange={handleFilterChange}
            placeholder="To Date"
          />
          
          <button onClick={() => setFilters({ course: '', status: '', dateFrom: '', dateTo: '' })}>
            Clear Filters
          </button>
        </div>
      </div>
      
      {/* Assignments List */}
      <div className="assignments-list">
        <h3>Assignments</h3>
        <table className="assignments-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Course</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssignments.map(assignment => (
              <tr 
                key={assignment.id} 
                className={isOverdue(assignment.deadline) && !assignment.submitted ? 'overdue' : ''}
              >
                <td>{assignment.title}</td>
                <td>{assignment.course}</td>
                <td>{assignment.deadline}</td>
                <td>
                  <span className={`status ${assignment.status.toLowerCase()}`}>
                    {assignment.status}
                  </span>
                  {assignment.graded && (
                    <div className="grade-info">
                      Score: {assignment.score}/100
                    </div>
                  )}
                </td>
                <td>
                  <button 
                    onClick={() => setSelectedAssignment(assignment)}
                    disabled={assignment.status === 'Graded'}
                  >
                    {assignment.submitted ? 'View Submission' : 'Submit'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Submission Modal */}
      {selectedAssignment && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedAssignment(null)}>&times;</span>
            <h3>{selectedAssignment.title}</h3>
            <p>Course: {selectedAssignment.course}</p>
            <p>Deadline: {selectedAssignment.deadline}</p>
            
            {selectedAssignment.graded ? (
              <div className="graded-section">
                <h4>Graded</h4>
                <p>Score: {selectedAssignment.score}/100</p>
                <p>Feedback: {selectedAssignment.feedback}</p>
              </div>
            ) : (
              <>
                <div className="submission-form">
                  <h4>Submit Assignment</h4>
                  <textarea
                    placeholder="Enter your answer here..."
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    rows="5"
                  />
                  
                  <div className="file-upload">
                    <label htmlFor="file-upload" className="file-upload-btn">
                      Upload Files
                    </label>
                    <input 
                      id="file-upload" 
                      type="file" 
                      multiple 
                      onChange={handleFileUpload} 
                    />
                  </div>
                  
                  {uploadedFiles.length > 0 && (
                    <div className="uploaded-files">
                      <h5>Uploaded Files:</h5>
                      <ul>
                        {uploadedFiles.map((file, index) => (
                          <li key={index}>
                            {file.name}
                            <button onClick={() => removeFile(index)}>Remove</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <button onClick={handleSubmit} className="submit-btn">
                    Submit Assignment
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAssignments;
