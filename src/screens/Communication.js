import React, { useState } from 'react';
import { FaBullhorn, FaExclamationTriangle, FaComments, FaBell } from "react-icons/fa";
import './Communication.css';

const Communication = () => {
  const [messages, setMessages] = useState([
    {
      subject: "Summer Break Schedule",
      to: "All Users",
      sentBy: "Admin",
      date: "2023-05-15",
      status: "Sent",
      unread: false
    },
    {
      subject: "Parent-Teacher Meeting",
      to: "Parents",
      sentBy: "Jane Smith",
      date: "2023-05-10",
      status: "Sent",
      unread: true
    }
  ]);

  const handleCreateAnnouncement = () => {
    alert("📢 Create Announcement form will open here!");
  };

  const handleSendAlert = () => {
    alert("🚨 Send Emergency Alert form will open here!");
  };

  const handleViewMessages = () => {
    alert("💬 Messaging interface will open here!");
  };

  const markAsRead = (index) => {
    const updated = [...messages];
    updated[index].unread = false;
    setMessages(updated);
  };

  return (
    <div className="communication">
      <h1>Communication</h1>
      <p>Manage announcements, alerts, and messaging</p>
      
      <div className="communication-actions">
        <button className="primary-button" onClick={handleCreateAnnouncement}>
          Create Announcement
        </button>
        <button className="secondary-button" onClick={handleSendAlert}>
          Send Alert
        </button>
      </div>
      
      <div className="communication-sections">
        <div className="section">
          <h2><FaBullhorn /> Announcements</h2>
          <div className="section-content">
            <p>Publish updates to all users</p>
            <button className="action-button" onClick={handleCreateAnnouncement}>
              Manage Announcements
            </button>
          </div>
        </div>
        
        <div className="section alerts">
          <h2><FaExclamationTriangle /> Emergency Alerts</h2>
          <div className="section-content">
            <p>Send urgent notifications to specific groups</p>
            <button className="action-button" onClick={handleSendAlert}>
              Send Alert
            </button>
          </div>
        </div>
        
        <div className="section">
          <h2><FaComments /> Parent Messaging</h2>
          <div className="section-content">
            <p>Direct communication with parents</p>
            <button className="action-button" onClick={handleViewMessages}>
              View Messages
            </button>
          </div>
        </div>
        
        <div className="section">
          <h2><FaBell /> Parent Updates & Notifications</h2>
          <div className="section-content">
            <p>Share student progress and school news</p>
            <button className="action-button" onClick={handleCreateAnnouncement}>
              Send Updates
            </button>
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
            {messages.map((msg, index) => (
              <tr key={index} className={msg.unread ? "unread-row" : ""}>
                <td>
                  {msg.subject}{" "}
                  {msg.unread && <span className="badge-unread">NEW</span>}
                </td>
                <td>{msg.to}</td>
                <td>{msg.sentBy}</td>
                <td>{msg.date}</td>
                <td>{msg.status}</td>
                <td>
                  <button className="action-button view" onClick={() => markAsRead(index)}>
                    View
                  </button>
                  <button className="action-button reply">
                    Reply
                  </button>
                  <button className="action-button delete">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Communication;
