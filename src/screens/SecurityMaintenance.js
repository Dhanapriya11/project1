import React from 'react';
import './SecurityMaintenance.css';

const SecurityMaintenance = () => {
  return (
    <div className="security-maintenance">
      <h1>Security & Maintenance</h1>
      <p>Manage system security and maintenance tasks</p>
      
      <div className="security-actions">
        <button className="primary-button">View Audit Logs</button>
        <button className="secondary-button">Backup System</button>
      </div>
      
      <div className="security-sections">
        <div className="section">
          <h2>Audit Log</h2>
          <div className="section-content">
            <p>Keep records of all system actions for security purposes</p>
            <button className="action-button">View Logs</button>
          </div>
        </div>
        
        <div className="section">
          <h2>Backup/Restore</h2>
          <div className="section-content">
            <p>Maintain and restore system backups</p>
            <button className="action-button">Manage Backups</button>
          </div>
        </div>
        
        <div className="section">
          <h2>System Health Monitor</h2>
          <div className="section-content">
            <p>Monitor performance and uptime</p>
            <button className="action-button">View Health</button>
          </div>
        </div>
      </div>
      
      <div className="security-table">
        <h2>Recent Security Events</h2>
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>User</th>
              <th>IP Address</th>
              <th>Date/Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Login</td>
              <td>admin</td>
              <td>192.168.1.100</td>
              <td>2023-05-15 14:30</td>
              <td>Success</td>
            </tr>
            <tr>
              <td>Failed Login</td>
              <td>unknown</td>
              <td>192.168.1.105</td>
              <td>2023-05-15 10:15</td>
              <td>Failed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SecurityMaintenance;