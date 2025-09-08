import React from 'react';
import './Communication.css';

const Communication = () => {
  return (
    <div className="communication">
      <h1>Communication</h1>
      <p>Manage announcements, alerts, and messaging</p>
      
      <div className="communication-actions">
        <button className="primary-button">Create Announcement</button>
        <button className="secondary-button">Send Alert</button>
      </div>
      
      <div className="communication-sections">
        <div className="section">
          <h2>Announcements</h2>
          <div className="section-content">
            <p>Publish updates to all users</p>
            <button className="action-button">Manage Announcements</button>
          </div>
        </div>
        
        <div className="section">
          <h2>Emergency Alerts</h2>
          <div className="section-content">
            <p>Send urgent notifications to specific groups</p>
            <button className="action-button">Send Alert</button>
          </div>
        </div>
        
        <div className="section">
          <h2>Parent Messaging</h2>
          <div className="section-content">
            <p>Direct communication with parents</p>
            <button className="action-button">View Messages</button>
          </div>
        </div>
        
        <div className="section">
          <h2>Parent Updates & Notifications</h2>
          <div className="section-content">
            <p>Share student progress and school news</p>
            <button className="action-button">Send Updates</button>
          </div>
        </div>
      </div>
      
      <div className="messages-table">
        <h2>Recent Messages</h2>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>To</th>
              <th>Sent By</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Summer Break Schedule</td>
              <td>All Users</td>
              <td>Admin</td>
              <td>2023-05-15</td>
              <td>Sent</td>
              <td>
                <button className="action-button">View</button>
              </td>
            </tr>
            <tr>
              <td>Parent-Teacher Meeting</td>
              <td>Parents</td>
              <td>Jane Smith</td>
              <td>2023-05-10</td>
              <td>Sent</td>
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

export default Communication;