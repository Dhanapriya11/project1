

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaInbox, 
  FaPaperPlane, 
  FaTrash, 
  FaStar, 
  FaStarHalfAlt, 
  FaPaperclip, 
  FaSearch, 
  FaReply, 
  FaReplyAll,
  FaArrowLeft,
  FaEllipsisV
} from 'react-icons/fa';
import './ParentStyles.css';

// Mock data - Replace with actual API calls
const mockMessages = {
  inbox: [
    {
      id: 1,
      from: 'Mr. Johnson',
      subject: 'Math Test Results',
      preview: 'Alex scored 95% on the latest math test. Great improvement!',
      date: '2025-09-05T14:30:00',
      read: false,
      starred: true,
      attachments: false,
      child: 'Alex Johnson',
      subjectId: 'MATH-101'
    },
    {
      id: 2,
      from: 'School Administration',
      subject: 'Upcoming Parent-Teacher Conference',
      preview: 'This is a reminder about the parent-teacher conference next week...',
      date: '2025-09-03T09:15:00',
      read: true,
      starred: false,
      attachments: true,
      child: 'All'
    },
    {
      id: 3,
      from: 'Ms. Williams',
      subject: 'Science Project Update',
      preview: 'Sam has been doing excellent work on the science project...',
      date: '2025-09-01T16:45:00',
      read: true,
      starred: false,
      attachments: true,
      child: 'Sam Johnson',
      subjectId: 'SCI-201'
    },
  ],
  sent: [
    {
      id: 101,
      to: 'Mr. Johnson',
      subject: 'Question about Math Homework',
      preview: 'Hello Mr. Johnson, I had a question about the math homework...',
      date: '2025-08-28T11:20:00',
      read: true,
      child: 'Alex Johnson'
    },
    {
      id: 102,
      to: 'School Administration',
      subject: 'Absence Notification',
      preview: 'This is to inform you that Alex will be absent on...',
      date: '2025-08-25T08:10:00',
      read: true,
      child: 'Alex Johnson'
    }
  ]
};

const ParentMessages = () => {
  const navigate = useNavigate();
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [replyMode, setReplyMode] = useState(null); // null, 'reply', 'replyAll', 'forward'

  // Form state for compose/reply
  const [messageForm, setMessageForm] = useState({
    to: '',
    subject: '',
    body: '',
    attachment: null,
    child: '',
    subjectId: ''
  });

  // Filter messages based on search term
  const filteredMessages = mockMessages[activeFolder].filter(msg => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (activeFolder === 'inbox' ? msg.from.toLowerCase() : msg.to.toLowerCase()).includes(searchLower) ||
      msg.subject.toLowerCase().includes(searchLower) ||
      msg.preview.toLowerCase().includes(searchLower) ||
      (msg.child && msg.child.toLowerCase().includes(searchLower))
    );
  });

  // Handle selecting a message
  const handleSelectMessage = (message) => {
    // Mark as read when selected
    if (activeFolder === 'inbox' && !message.read) {
      // In a real app, this would update the backend
      message.read = true;
    }
    setSelectedMessage(message);
    setReplyMode(null);
  };

  // Handle replying to a message
  const handleReply = (mode = 'reply') => {
    if (!selectedMessage) return;
    
    let to = '';
    let subject = '';
    
    if (mode === 'reply') {
      to = selectedMessage.from;
      subject = `Re: ${selectedMessage.subject}`;
    } else if (mode === 'replyAll') {
      // In a real app, this would include all recipients
      to = selectedMessage.from;
      subject = `Re: ${selectedMessage.subject}`;
    } else if (mode === 'forward') {
      to = '';
      subject = `Fwd: ${selectedMessage.subject}`;
    }
    
    setMessageForm({
      ...messageForm,
      to,
      subject,
      body: mode === 'forward' 
        ? `\n\n---------- Forwarded Message ----------\nFrom: ${selectedMessage.from}\nDate: ${new Date(selectedMessage.date).toLocaleString()}\nSubject: ${selectedMessage.subject}\n\n${selectedMessage.preview}`
        : `\n\n---------- Original Message ----------\nFrom: ${selectedMessage.from}\nDate: ${new Date(selectedMessage.date).toLocaleString()}\nSubject: ${selectedMessage.subject}\n\n${selectedMessage.preview}`,
      child: selectedMessage.child || '',
      subjectId: selectedMessage.subjectId || ''
    });
    
    setReplyMode(mode);
    setComposeOpen(true);
  };

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    // In a real app, this would send the message to the server
    console.log('Message sent:', messageForm);
    
    // Reset form and close compose
    setMessageForm({
      to: '',
      subject: '',
      body: '',
      attachment: null,
      child: '',
      subjectId: ''
    });
    
    setComposeOpen(false);
    setReplyMode(null);
    
    // Show success message
    alert('Message sent successfully!');
  };

  // Handle file attachment
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessageForm({
        ...messageForm,
        attachment: file
      });
    }
  };

  // Toggle message selection
  const toggleSelectMessage = (messageId, e) => {
    e.stopPropagation();
    setSelectedMessages(prev => 
      prev.includes(messageId)
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  };

  // Toggle star status
  const toggleStarMessage = (messageId, e) => {
    e.stopPropagation();
    // In a real app, this would update the backend
    const message = mockMessages[activeFolder].find(m => m.id === messageId);
    if (message) message.starred = !message.starred;
  };

  // Format date to relative time (e.g., "2 hours ago")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="parent-messages-container">
      {/* Header */}
      <header className="messages-header">
        <div className="header-content">
          <button 
            onClick={() => navigate(-1)} 
            className="back-button"
          >
            <FaArrowLeft /> Back
          </button>
          <h1>Messages</h1>
        </div>
        
        <div className="header-actions">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            className="compose-button"
            onClick={() => {
              setComposeOpen(true);
              setReplyMode(null);
              setMessageForm({
                to: '',
                subject: '',
                body: '',
                attachment: null,
                child: '',
                subjectId: ''
              });
            }}
          >
            + New Message
          </button>
        </div>
      </header>

      <div className="messages-layout">
        {/* Sidebar */}
        <aside className={`messages-sidebar ${showMobileMenu ? 'mobile-visible' : ''}`}>
          <div className="sidebar-header">
            <h2>Folders</h2>
            <button 
              className="close-mobile-menu"
              onClick={() => setShowMobileMenu(false)}
            >
              &times;
            </button>
          </div>
          
          <nav className="folder-list">
            <button 
              className={`folder-item ${activeFolder === 'inbox' ? 'active' : ''}`}
              onClick={() => {
                setActiveFolder('inbox');
                setSelectedMessage(null);
                setShowMobileMenu(false);
              }}
            >
              <FaInbox /> Inbox
              <span className="unread-count">
                {mockMessages.inbox.filter(m => !m.read).length}
              </span>
            </button>
            
            <button 
              className={`folder-item ${activeFolder === 'sent' ? 'active' : ''}`}
              onClick={() => {
                setActiveFolder('sent');
                setSelectedMessage(null);
                setShowMobileMenu(false);
              }}
            >
              <FaPaperPlane /> Sent
            </button>
            
            <button 
              className="folder-item"
              onClick={() => {
                // In a real app, this would show starred messages
                alert('Starred messages feature coming soon!');
              }}
            >
              <FaStar /> Starred
            </button>
            
            <button 
              className="folder-item"
              onClick={() => {
                // In a real app, this would show trash
                alert('Trash folder coming soon!');
              }}
            >
              <FaTrash /> Trash
            </button>
          </nav>
          
          <div className="sidebar-footer">
            <div className="storage-info">
              <div className="storage-bar">
                <div className="storage-used" style={{ width: '35%' }}></div>
              </div>
              <span>35% of storage used</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="messages-main">
          {/* Message List */}
          {!selectedMessage ? (
            <div className="message-list">
              <div className="message-list-header">
                <h2>
                  {activeFolder === 'inbox' ? 'Inbox' : 'Sent Items'}
                  {selectedMessages.length > 0 && (
                    <span className="selected-count">{selectedMessages.length} selected</span>
                  )}
                </h2>
                
                <div className="message-actions">
                  {selectedMessages.length > 0 ? (
                    <>
                      <button 
                        className="action-button"
                        onClick={() => {
                          // In a real app, this would mark as read/unread
                          alert('Mark as read/unread functionality coming soon!');
                        }}
                      >
                        Mark as {selectedMessages.some(id => {
                          const msg = mockMessages[activeFolder].find(m => m.id === id);
                          return msg && !msg.read;
                        }) ? 'Read' : 'Unread'}
                      </button>
                      
                      <button 
                        className="action-button"
                        onClick={() => {
                          // In a real app, this would move to trash
                          alert('Move to trash functionality coming soon!');
                        }}
                      >
                        <FaTrash /> Delete
                      </button>
                    </>
                  ) : (
                    <button 
                      className="mobile-menu-button"
                      onClick={() => setShowMobileMenu(true)}
                    >
                      <FaEllipsisV />
                    </button>
                  )}
                </div>
              </div>
              
              {filteredMessages.length === 0 ? (
                <div className="no-messages">
                  <FaInbox size={48} />
                  <h3>No messages found</h3>
                  <p>Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="message-items">
                  {filteredMessages.map(message => (
                    <div 
                      key={message.id}
                      className={`message-item ${!message.read ? 'unread' : ''} ${selectedMessages.includes(message.id) ? 'selected' : ''}`}
                      onClick={() => handleSelectMessage(message)}
                    >
                      <div className="message-select">
                        <input 
                          type="checkbox" 
                          checked={selectedMessages.includes(message.id)}
                          onChange={(e) => toggleSelectMessage(message.id, e)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      
                      <div 
                        className="message-star"
                        onClick={(e) => toggleStarMessage(message.id, e)}
                      >
                        {message.starred ? <FaStar className="starred" /> : <FaStarHalfAlt />}
                      </div>
                      
                      <div className="message-sender">
                        {activeFolder === 'inbox' ? message.from : `To: ${message.to}`}
                        {message.child && message.child !== 'All' && (
                          <span className="message-child">{message.child}</span>
                        )}
                      </div>
                      
                      <div className="message-content">
                        <div className="message-subject">
                          {message.subject}
                          {message.attachments && <FaPaperclip className="attachment-icon" />}
                        </div>
                        <div className="message-preview">
                          {message.preview.length > 60 
                            ? `${message.preview.substring(0, 60)}...` 
                            : message.preview}
                        </div>
                      </div>
                      
                      <div className="message-date">
                        {formatDate(message.date)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Message Detail View */
            <div className="message-detail">
              <div className="message-detail-header">
                <button 
                  className="back-button"
                  onClick={() => setSelectedMessage(null)}
                >
                  <FaArrowLeft /> Back to {activeFolder}
                </button>
                
                <div className="message-actions">
                  <button 
                    className="action-button"
                    onClick={() => handleReply('reply')}
                    title="Reply"
                  >
                    <FaReply />
                  </button>
                  
                  <button 
                    className="action-button"
                    onClick={() => handleReply('replyAll')}
                    title="Reply All"
                  >
                    <FaReplyAll />
                  </button>
                  
                  <button 
                    className="action-button"
                    onClick={() => handleReply('forward')}
                    title="Forward"
                  >
                    <FaPaperPlane />
                  </button>
                  
                  <button 
                    className="action-button"
                    onClick={() => {
                      // In a real app, this would move to trash
                      alert('Move to trash functionality coming soon!');
                    }}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              
              <div className="message-detail-content">
                <h2>{selectedMessage.subject}</h2>
                
                <div className="message-meta">
                  <div className="message-from">
                    <strong>{activeFolder === 'inbox' ? 'From:' : 'To:'}</strong>
                    <span>{activeFolder === 'inbox' ? selectedMessage.from : selectedMessage.to}</span>
                    {selectedMessage.child && (
                      <span className="message-child">{selectedMessage.child}</span>
                    )}
                  </div>
                  
                  <div className="message-date">
                    {new Date(selectedMessage.date).toLocaleString()}
                  </div>
                </div>
                
                <div className="message-body">
                  {selectedMessage.preview}
                  
                  {selectedMessage.attachments && (
                    <div className="message-attachments">
                      <h4>Attachments:</h4>
                      <div className="attachment-item">
                        <FaPaperclip /> Document.pdf (245 KB)
                      </div>
                    </div>
                  )}
                </div>
                
                {activeFolder === 'inbox' && (
                  <div className="message-reply-actions">
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleReply('reply')}
                    >
                      <FaReply /> Reply
                    </button>
                    
                    <button 
                      className="btn btn-secondary"
                      onClick={() => handleReply('forward')}
                    >
                      <FaPaperPlane /> Forward
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
      
      {/* Compose Message Modal */}
      {composeOpen && (
        <div className="modal-overlay" onClick={() => setComposeOpen(false)}>
          <div className="compose-modal" onClick={e => e.stopPropagation()}>
            <div className="compose-header">
              <h3>
                {replyMode === 'reply' && 'Reply'}
                {replyMode === 'replyAll' && 'Reply All'}
                {replyMode === 'forward' && 'Forward'}
                {!replyMode && 'New Message'}
              </h3>
              <button 
                className="close-button"
                onClick={() => {
                  setComposeOpen(false);
                  setReplyMode(null);
                }}
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSendMessage}>
              <div className="form-group">
                <label>To:</label>
                <input 
                  type="text" 
                  value={messageForm.to}
                  onChange={(e) => setMessageForm({...messageForm, to: e.target.value})}
                  placeholder="Recipient email address"
                  required={!replyMode}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Child:</label>
                  <select 
                    value={messageForm.child}
                    onChange={(e) => setMessageForm({...messageForm, child: e.target.value})}
                  >
                    <option value="">Select Child</option>
                    <option value="Alex Johnson">Alex Johnson</option>
                    <option value="Sam Johnson">Sam Johnson</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Subject:</label>
                  <select 
                    value={messageForm.subjectId}
                    onChange={(e) => setMessageForm({...messageForm, subjectId: e.target.value})}
                  >
                    <option value="">Select Subject</option>
                    <option value="MATH-101">Mathematics</option>
                    <option value="SCI-201">Science</option>
                    <option value="ENG-101">English</option>
                    <option value="HIS-101">History</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Subject:</label>
                <input 
                  type="text" 
                  value={messageForm.subject}
                  onChange={(e) => setMessageForm({...messageForm, subject: e.target.value})}
                  placeholder="Message subject"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Message:</label>
                <textarea 
                  value={messageForm.body}
                  onChange={(e) => setMessageForm({...messageForm, body: e.target.value})}
                  placeholder="Type your message here..."
                  rows="8"
                  required
                ></textarea>
              </div>
              
              <div className="form-group attachments">
                <label>
                  <FaPaperclip /> Attach File
                  <input 
                    type="file" 
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </label>
                {messageForm.attachment && (
                  <span className="attachment-name">
                    {messageForm.attachment.name}
                    <button 
                      type="button" 
                      onClick={() => setMessageForm({...messageForm, attachment: null})}
                      className="remove-attachment"
                    >
                      &times;
                    </button>
                  </span>
                )}
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setComposeOpen(false);
                    setReplyMode(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <FaPaperPlane /> Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


export default ParentMessages;
