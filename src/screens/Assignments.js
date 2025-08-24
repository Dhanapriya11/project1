import React from 'react';
import './Assignments.css';

const mockAssignments = [
  {
    id: 1,
    title: 'Algebra Homework 1',
    course: 'Mathematics',
    dueDate: '2024-09-15',
    submissions: 28,
    totalStudents: 30,
    status: 'Graded'
  },
  {
    id: 2,
    title: 'Photosynthesis Lab Report',
    course: 'Biology',
    dueDate: '2024-09-20',
    submissions: 25,
    totalStudents: 30,
    status: 'Pending'
  },
  {
    id: 3,
    title: 'Essay: The Roman Republic',
    course: 'History',
    dueDate: '2024-09-22',
    submissions: 15,
    totalStudents: 30,
    status: 'Pending'
  }
];

const Assignments = () => {
  const handleCreateNew = () => {
    alert('Create new assignment functionality not implemented yet.');
  };

  return (
    <div className="assignments-container">
      <div className="assignments-header">
        <h1 className="assignments-title">Assignments</h1>
        <button className="create-assignment-btn" onClick={handleCreateNew}>
          + Create New
        </button>
      </div>

      <div className="assignments-list">
        {mockAssignments.map(assignment => (
          <div key={assignment.id} className="assignment-card">
            <div className="assignment-info">
              <h2 className="assignment-title">{assignment.title}</h2>
              <div className="assignment-details">
                <span>Course: {assignment.course}</span>
                <span>Due: {assignment.dueDate}</span>
              </div>
            </div>
            <div className="assignment-submissions">
              <span>{assignment.submissions} / {assignment.totalStudents} Submitted</span>
            </div>
            <div className="assignment-status">
              <span className={`status-badge status-${assignment.status.toLowerCase()}`}>
                {assignment.status}
              </span>
            </div>
            <div className="assignment-actions">
              <a href="#">View Submissions</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
