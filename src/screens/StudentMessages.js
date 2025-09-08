import React, { useState, useEffect } from 'react';
import './Messages.css';

const StudentMessages = () => {
  // Mock data for messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Dr. Smith',
      subject: 'Assignment 2 Questions',
      content: 'Please find attached the questions for Assignment 2. Let me know if you have any questions.',
      timestamp: '2023-06-10T10:30:00Z',
      read: false,
      folder: 'inbox',
      threadId: 1,
      attachments: ['assignment2_questions.pdf'],
      courseId: 1
    },
    {
      id: 2,
      sender: 'Prof. Johnson',
      subject: 'Midterm Exam Results',
      content: 'Your midterm exam results are now available. You scored 85/100. Great job!',
      timestamp: '2023-06-08T14:15:00Z',
      read: true,
      folder: 'inbox',
      threadId: 2,
      attachments: [],
      courseId: 2
    },
    {
      id: 3,
      sender: 'You',
      subject: 'Re: Assignment 1 Clarification',
      content: 'Thank you for the clarification. I have updated my submission accordingly.',
      timestamp: '2023-06-05T09:45:00Z',
      read: true,
      folder: 'sent',
      threadId: 3,
      attachments: [],
      courseId: 1
    },
    {
      id: 4,
      sender: 'Dr. Smith',
      subject: 'Office Hours',
      content: 'My office hours are on Tuesdays and Thursdays from 2-4 PM. Feel free to drop by.',
      timestamp: '2023-06-01T16:20:00Z',
      read: true,
      folder: 'inbox',
      threadId: 4,
      attachments: [],
      courseId: 1
    },
    {
      id: 5,
      sender: 'You',
      subject: 'Draft: Project Proposal',
      content: 'This is a draft of my project proposal. Please review and provide feedback.',
      timestamp: '2023-05-28T11:30:00Z',
      read: true,
      folder: 'drafts',
      threadId: 5,
      attachments: ['project_proposal_draft.pdf'],
      courseId: 3
    }
  ]);

  // Mock data for conversations (threaded messages)
  const [conversations, setConversations] = useState([
    {
      id: 1,
      subject: 'Assignment 2 Questions',
      courseId: 1,
      messages: [
        {
          id: 1,
          sender: 'Dr. Smith',
          content: 'Please find attached the questions for Assignment 2. Let me know if you have any questions.',
          timestamp: '2023-06-10T10:30:00Z',
          attachments: ['assignment2_questions.pdf']
        },
        {
          id: 2,
          sender: 'You',
          content: 'Thank you for sharing the questions. I have a few clarifications regarding question 3.',
          timestamp: '2023-06-10T14:45:00Z',
          attachments: []
        },
        {
          id: 3,
          sender: 'Dr. Smith',
          content: 'Sure, please send me your questions and I will clarify them.',
          timestamp: '2023-06-10T16:20:00Z',
          attachments: []
        }
      ]
    }
  ]);

  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showCompose, setShowCompose] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [newMessage, setNewMessage] = useState({
    to: '',
    subject: '',
    content: '',
    attachments: []
  });
  const [replyContent, setReplyContent] = useState('');
  const [replyAttachments, setReplyAttachments] = useState([]);

  // Mock courses data
  const courses = [
    { id: 1, name: 'Mathematics 101' },
    { id: 2, name: 'Physics 201' },
    { id: 3, name: 'History 150' }
  ];

  // Filter messages based on search and filter
  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          message.sender.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFolder = message.folder === activeTab;
    const matchesCourse = filterCourse === 'all' || message.courseId === parseInt(filterCourse);
    
    return matchesSearch && matchesFolder && matchesCourse;
  });

  // Handle compose form changes
  const handleComposeChange = (e) => {
    const { name, value } = e.target;
    setNewMessage(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file upload for compose
  const handleComposeFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewMessage(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  // Handle file upload for reply
  const handleReplyFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setReplyAttachments(prev => [...prev, ...files]);
  };

  // Remove attachment from compose
  const removeComposeAttachment = (index) => {
    setNewMessage(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  // Remove attachment from reply
  const removeReplyAttachment = (index) => {
    setReplyAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // Send new message
  const sendNewMessage = () => {
    // In a real app, this would send the message to the server
    console.log('Sending message:', newMessage);
    setShowCompose(false);
    setNewMessage({
      to: '',
      subject: '',
      content: '',
      attachments: []
    });
    alert('Message sent successfully!');
  };

  // Reply to a message
  const replyToMessage = () => {
    // In a real app, this would send the reply to the server
    console.log('Replying to message:', { content: replyContent, attachments: replyAttachments });
    setReplyContent('');
    setReplyAttachments([]);
    setSelectedMessage(null);
    alert('Reply sent successfully!');
  };

  // Mark message as read
  const markAsRead = (id) => {
    setMessages(prev => 
      prev.map(message => 
        message.id === id ? { ...message, read: true } : message
      )
    );
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Get unread messages count
  const unreadCount = messages.filter(m => !m.read && m.folder === 'inbox').length;

  // Get sender name for display
  const getSenderName = (sender) => {
    return sender === 'You' ? 'Me' : sender;
  };

  return (
    <div className="messages-container">
      <h2>My Messages</h2>
      
      {/* Tabs */}
      <div className="messages-tabs">
        <button 
          className={activeTab === 'inbox' ? 'active' : ''} 
          onClick={() => setActiveTab('inbox')}
        >
          Inbox {unreadCount > 0 && <span className="unread-count">({unreadCount})</span>}
        </button>
        <button 
          className={activeTab === 'sent' ? 'active' : ''} 
          onClick={() => setActiveTab('sent')}
        >
          Sent
        </button>
        <button 
          className={activeTab === 'drafts' ? 'active' : ''} 
          onClick={() => setActiveTab('drafts')}
        >
          Drafts
        </button>
        <button className="compose-btn" onClick={() => setShowCompose(true)}>
          Compose
        </button>
      </div>
      
      {/* Search and Filters */}
      <div className="messages-search-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)}>
            <option value="all">All Courses</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Messages List */}
      <div className="messages-list">
        {filteredMessages.length === 0 ? (
          <p className="no-messages">No messages found.</p>
        ) : (
          <table className="messages-table">
            <thead>
              <tr>
                <th>Sender</th>
                <th>Subject</th>
                <th>Course</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map(message => (
                <tr 
                  key={message.id} 
                  className={!message.read && message.folder === 'inbox' ? 'unread' : ''}
                  onClick={() => {
                    setSelectedMessage(message);
                    if (!message.read && message.folder === 'inbox') {
                      markAsRead(message.id);
                    }
                  }}
                >
                  <td>{getSenderName(message.sender)}</td>
                  <td>
                    {message.subject}
                    {!message.read && message.folder === 'inbox' && (
                      <span className="unread-indicator">●</span>
                    )}
                  </td>
                  <td>
                    {courses.find(c => c.id === message.courseId)?.name || 'General'}
                  </td>
                  <td>{formatTimestamp(message.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      {/* Message Detail View */}
      {selectedMessage && (
        <div className="message-detail">
          <div className="message-header">
            <h3>{selectedMessage.subject}</h3>
            <button className="close-btn" onClick={() => setSelectedMessage(null)}>×</button>
          </div>
          <div className="message-info">
            <p><strong>From:</strong> {selectedMessage.sender}</p>
            <p><strong>To:</strong> You</p>
            <p><strong>Date:</strong> {formatTimestamp(selectedMessage.timestamp)}</p>
            {selectedMessage.attachments.length > 0 && (
              <div className="attachments">
                <strong>Attachments:</strong>
                <ul>
                  {selectedMessage.attachments.map((file, index) => (
                    <li key={index}>
                      <a href="#" onClick={(e) => e.preventDefault()}>{file}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="message-content">
            {selectedMessage.content}
          </div>
          
          {/* Reply Section */}
          <div className="reply-section">
            <h4>Reply</h4>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write your reply..."
              rows="4"
            />
            <div className="reply-attachments">
              <label htmlFor="reply-file" className="file-upload-btn">
                Attach Files
              </label>
              <input 
                id="reply-file" 
                type="file" 
                multiple 
                onChange={handleReplyFileUpload} 
              />
              {replyAttachments.length > 0 && (
                <div className="uploaded-files">
                  <ul>
                    {replyAttachments.map((file, index) => (
                      <li key={index}>
                        {file.name}
                        <button onClick={() => removeReplyAttachment(index)}>Remove</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <button className="send-btn" onClick={replyToMessage}>Send Reply</button>
          </div>
        </div>
      )}
      
      {/* Compose Message Modal */}
      {showCompose && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Compose Message</h3>
              <button className="close-btn" onClick={() => setShowCompose(false)}>×</button>
            </div>
            <div className="compose-form">
              <div className="form-group">
                <label>To:</label>
                <input
                  type="text"
                  name="to"
                  value={newMessage.to}
                  onChange={handleComposeChange}
                  placeholder="Recipient"
                />
              </div>
              <div className="form-group">
                <label>Subject:</label>
                <input
                  type="text"
                  name="subject"
                  value={newMessage.subject}
                  onChange={handleComposeChange}
                  placeholder="Subject"
                />
              </div>
              <div className="form-group">
                <label>Message:</label>
                <textarea
                  name="content"
                  value={newMessage.content}
                  onChange={handleComposeChange}
                  placeholder="Write your message..."
                  rows="6"
                />
              </div>
              <div className="form-group">
                <label htmlFor="compose-file" className="file-upload-btn">
                  Attach Files
                </label>
                <input 
                  id="compose-file" 
                  type="file" 
                  multiple 
                  onChange={handleComposeFileUpload} 
                />
                {newMessage.attachments.length > 0 && (
                  <div className="uploaded-files">
                    <ul>
                      {newMessage.attachments.map((file, index) => (
                        <li key={index}>
                          {file.name}
                          <button onClick={() => removeComposeAttachment(index)}>Remove</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="form-actions">
                <button className="cancel-btn" onClick={() => setShowCompose(false)}>Cancel</button>
                <button className="send-btn" onClick={sendNewMessage}>Send</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentMessages;
