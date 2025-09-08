import React, { useState } from 'react';
import './Feedback.css';

const Feedback = () => {
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to a server
    alert('Feedback submitted successfully!');
    setFeedback({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="feedback">
      <h1>Feedback</h1>
      <p>Collect LMS feedback from users</p>
      
      <div className="feedback-section">
        <h2>Submit Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={feedback.name}
              onChange={handleFeedbackChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={feedback.email}
              onChange={handleFeedbackChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={feedback.subject}
              onChange={handleFeedbackChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={feedback.message}
              onChange={handleFeedbackChange}
              rows="5"
              required
            ></textarea>
          </div>
          
          <button type="submit" className="primary-button">Submit Feedback</button>
        </form>
      </div>
      
      <div className="feedback-table">
        <h2>Recent Feedback</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>UI Improvement Suggestions</td>
              <td>2023-05-15</td>
              <td>Open</td>
              <td>
                <button className="action-button">View</button>
                <button className="action-button">Resolve</button>
              </td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>Feature Request</td>
              <td>2023-05-14</td>
              <td>Resolved</td>
              <td>
                <button className="action-button">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Feedback;