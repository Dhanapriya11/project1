import React from 'react';
import './AISupportTools.css';

const AISupportTools = () => {
  return (
    <div className="ai-support-tools">
      <h1>AI & Support Tools</h1>
      <p>AI assistant to answer common questions and provide help</p>
      
      <div className="ai-actions">
        <button className="primary-button">Configure AI Assistant</button>
        <button className="secondary-button">View Support Tickets</button>
      </div>
      
      <div className="ai-sections">
        <div className="section">
          <h2>Chatbot Support</h2>
          <div className="section-content">
            <p>AI assistant to answer common questions and provide help</p>
            <button className="action-button">Manage Chatbot</button>
          </div>
        </div>
      </div>
      
      <div className="support-tickets">
        <h2>Recent Support Tickets</h2>
        <table>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Subject</th>
              <th>Submitted By</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>TCK-001</td>
              <td>Login Issue</td>
              <td>John Doe</td>
              <td>2023-05-15</td>
              <td>Open</td>
              <td>
                <button className="action-button">View</button>
                <button className="action-button">Resolve</button>
              </td>
            </tr>
            <tr>
              <td>TCK-002</td>
              <td>Content Upload Problem</td>
              <td>Jane Smith</td>
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

export default AISupportTools;