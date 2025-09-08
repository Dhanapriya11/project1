import React, { useState } from 'react';
import './Messages.css';

const mockConversations = {
  '1': {
    name: 'John Doe (Student)',
    messages: [
      { sender: 'John Doe', text: 'Hi, I have a question about the homework.' },
      { sender: 'Me', text: 'Hi John, I can help with that. What\'s your question?' },
    ]
  },
  '2': {
    name: 'Jane Smith (Parent)',
    messages: [
      { sender: 'Jane Smith', text: 'Good morning, I wanted to check on my son\'s progress.' },
    ]
  },
  '3': {
    name: 'Class Group: Physics 101',
    messages: [
      { sender: 'Me', text: 'Reminder: The lab report is due this Friday.' },
    ]
  }
};

const Messages = () => {
  const [activeConversationId, setActiveConversationId] = useState(null);

  const activeConversation = activeConversationId ? mockConversations[activeConversationId] : null;

  return (
    <div className="messages-container">
      <div className="conversations-list">
        <div className="conversations-header">Conversations</div>
        {Object.keys(mockConversations).map(id => (
          <div 
            key={id} 
            className={`conversation-item ${id === activeConversationId ? 'active' : ''}`}
            onClick={() => setActiveConversationId(id)}
          >
            <div className="conversation-name">{mockConversations[id].name}</div>
            <div className="conversation-preview">
              {mockConversations[id].messages[mockConversations[id].messages.length - 1].text}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-window">
        {activeConversation ? (
          <>
            <div className="chat-header">{activeConversation.name}</div>
            <div className="messages-area">
              {activeConversation.messages.map((msg, index) => (
                <div key={index} className={`message-bubble ${msg.sender === 'Me' ? 'sent' : 'received'}`}>
                  <div className="message-content">{msg.text}</div>
                </div>
              ))}
            </div>
            <div className="message-input-area">
              <input type="text" className="message-input" placeholder="Type a message..." />
              <button className="send-button">Send</button>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            Select a conversation to start chatting.
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
