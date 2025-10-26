import React, { useState, useEffect } from 'react';
import './Communication.css';

const Communication = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'normal',
    targetAudience: 'all'
  });
  const [newMessage, setNewMessage] = useState({
    recipient: '',
    subject: '',
    content: '',
    type: 'general'
  });

  useEffect(() => {
    // Load sample data
    setAnnouncements([
      {
        id: 1,
        title: 'School Holiday Notice',
        content: 'School will be closed on Friday, October 27th for staff development.',
        priority: 'normal',
        targetAudience: 'all',
        date: '2025-10-25',
        author: 'Admin'
      },
      {
        id: 2,
        title: 'Parent-Teacher Conference',
        content: 'Parent-teacher conferences will be held next week. Please schedule your appointments.',
        priority: 'high',
        targetAudience: 'parents',
        date: '2025-10-24',
        author: 'Admin'
      }
    ]);

    setMessages([
      {
        id: 1,
        from: 'Admin',
        to: 'All Parents',
        subject: 'Weekly Progress Report',
        content: 'Weekly progress reports have been updated.',
        type: 'update',
        date: '2025-10-25',
        status: 'sent'
      }
    ]);
  }, []);

  const handleAnnouncementSubmit = (e) => {
    e.preventDefault();
    const announcement = {
      id: announcements.length + 1,
      ...newAnnouncement,
      date: new Date().toISOString().split('T')[0],
      author: 'Admin'
    };
    setAnnouncements([announcement, ...announcements]);
    setNewAnnouncement({
      title: '',
      content: '',
      priority: 'normal',
      targetAudience: 'all'
    });
    setShowAnnouncementForm(false);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const message = {
      id: messages.length + 1,
      from: 'Admin',
      to: newMessage.recipient,
      ...newMessage,
      date: new Date().toISOString().split('T')[0],
      status: 'sent'
    };
    setMessages([message, ...messages]);
    setNewMessage({
      recipient: '',
      subject: '',
      content: '',
      type: 'general'
    });
    setShowMessageForm(false);
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'urgent': return 'priority-urgent';
      default: return 'priority-normal';
    }
  };

  return (
    <div className="communication">
      <div className="communication-header">
        <h1>Communication Center</h1>
        <p>Manage announcements, messages, and emergency alerts</p>
      </div>
      
      <div className="communication-actions">
        <button 
          className="premium-button"
          onClick={() => setShowAnnouncementForm(!showAnnouncementForm)}
        >
          📢 Create Announcement
        </button>
        <button 
          className="premium-button secondary"
          onClick={() => setShowMessageForm(!showMessageForm)}
        >
          ✉️ Send Message
        </button>
        <button className="premium-button gold">
          🚨 Emergency Alert
        </button>
      </div>

      {showAnnouncementForm && (
        <div className="premium-card form-card">
          <h2>Create New Announcement</h2>
          <form onSubmit={handleAnnouncementSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select
                  value={newAnnouncement.priority}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value})}
                >
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div className="form-group">
                <label>Target Audience</label>
                <select
                  value={newAnnouncement.targetAudience}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, targetAudience: e.target.value})}
                >
                  <option value="all">All Users</option>
                  <option value="students">Students</option>
                  <option value="teachers">Teachers</option>
                  <option value="parents">Parents</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Content</label>
              <textarea
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                rows="4"
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="premium-button">Publish Announcement</button>
              <button 
                type="button" 
                className="premium-button secondary"
                onClick={() => setShowAnnouncementForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {showMessageForm && (
        <div className="premium-card form-card">
          <h2>Send Message</h2>
          <form onSubmit={handleMessageSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Recipient</label>
                <select
                  value={newMessage.recipient}
                  onChange={(e) => setNewMessage({...newMessage, recipient: e.target.value})}
                  required
                >
                  <option value="">Select Recipient</option>
                  <option value="All Parents">All Parents</option>
                  <option value="All Teachers">All Teachers</option>
                  <option value="All Students">All Students</option>
                  <option value="Grade 10 Parents">Grade 10 Parents</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message Type</label>
                <select
                  value={newMessage.type}
                  onChange={(e) => setNewMessage({...newMessage, type: e.target.value})}
                >
                  <option value="general">General</option>
                  <option value="update">Progress Update</option>
                  <option value="reminder">Reminder</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                value={newMessage.subject}
                onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Message Content</label>
              <textarea
                value={newMessage.content}
                onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                rows="4"
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="premium-button">Send Message</button>
              <button 
                type="button" 
                className="premium-button secondary"
                onClick={() => setShowMessageForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="premium-grid premium-grid-2">
        <div className="premium-card">
          <div className="premium-section-header">
            <h2>📢 Recent Announcements</h2>
          </div>
          <div className="announcements-list">
            {announcements.map(announcement => (
              <div key={announcement.id} className={`announcement-item ${getPriorityClass(announcement.priority)}`}>
                <div className="announcement-header">
                  <h3>{announcement.title}</h3>
                  <span className={`priority-badge ${announcement.priority}`}>
                    {announcement.priority.toUpperCase()}
                  </span>
                </div>
                <p>{announcement.content}</p>
                <div className="announcement-meta">
                  <span>👥 {announcement.targetAudience}</span>
                  <span>📅 {announcement.date}</span>
                  <span>👤 {announcement.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="premium-card">
          <div className="premium-section-header">
            <h2>✉️ Recent Messages</h2>
          </div>
          <div className="messages-list">
            {messages.map(message => (
              <div key={message.id} className="message-item">
                <div className="message-header">
                  <h3>{message.subject}</h3>
                  <span className={`status-badge ${message.status}`}>
                    {message.status.toUpperCase()}
                  </span>
                </div>
                <p><strong>To:</strong> {message.to}</p>
                <p>{message.content}</p>
                <div className="message-meta">
                  <span>📅 {message.date}</span>
                  <span className={`type-badge ${message.type}`}>
                    {message.type.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="premium-card">
        <div className="premium-section-header">
          <h2>📊 Communication Statistics</h2>
        </div>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-icon">📢</div>
            <div className="stat-content">
              <div className="stat-value">{announcements.length}</div>
              <div className="stat-label">Total Announcements</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">✉️</div>
            <div className="stat-content">
              <div className="stat-value">{messages.length}</div>
              <div className="stat-label">Messages Sent</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">👀</div>
            <div className="stat-content">
              <div className="stat-value">92%</div>
              <div className="stat-label">Read Rate</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <div className="stat-value">3</div>
              <div className="stat-label">Emergency Alerts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;