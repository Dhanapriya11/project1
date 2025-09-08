import React, { useState, useEffect } from 'react';
import { Input, Button, List, Avatar, Tabs, Badge, Modal, Upload, message } from 'antd';
import { 
  SearchOutlined, 
  PaperClipOutlined, 
  SendOutlined, 
  UserOutlined, 
  TeamOutlined, 
  CheckOutlined,
  FileOutlined,
  PictureOutlined
} from '@ant-design/icons';
import './TeacherMessaging.css';

const { TextArea } = Input;
const { TabPane } = Tabs;

// Mock data
const mockStudents = [
  { id: 1, name: 'Alice Johnson', avatar: null, unread: 2, lastMessage: 'Hi, I have a question about the assignment', time: '10:30 AM' },
  { id: 2, name: 'Bob Smith', avatar: null, unread: 0, lastMessage: 'Thanks for your help!', time: 'Yesterday' },
  { id: 3, name: 'Charlie Brown', avatar: null, unread: 5, lastMessage: 'Can we schedule a meeting?', time: 'Yesterday' },
];

const mockGroups = [
  { id: 1, name: 'Math 101 - Section A', unread: 0, lastMessage: 'Reminder: Assignment due tomorrow', time: '2h ago' },
  { id: 2, name: 'Science Club', unread: 3, lastMessage: 'Meeting at 3 PM today', time: '5h ago' },
  { id: 3, name: 'Class Representatives', unread: 0, lastMessage: 'Field trip details attached', time: '1d ago' },
];

const TeacherMessaging = () => {
  const [activeTab, setActiveTab] = useState('direct');
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isAttachmentModalVisible, setIsAttachmentModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);

  // Check if mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load messages for selected chat
  useEffect(() => {
    if (selectedChat) {
      // In a real app, this would fetch messages from an API
      const mockMessages = [
        { id: 1, sender: 'Alice Johnson', text: 'Hi, I have a question about the assignment', time: '10:30 AM', isMe: false },
        { id: 2, sender: 'You', text: 'Sure, what would you like to know?', time: '10:32 AM', isMe: true },
        { id: 3, sender: 'Alice Johnson', text: 'I\'m having trouble with question 3', time: '10:33 AM', isMe: false },
      ];
      setMessages(mockMessages);
    }
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (messageText.trim() === '') return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: 'You',
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    
    setMessages([...messages, newMessage]);
    setMessageText('');
    
    // In a real app, this would send the message to a server
  };

  const handleAttachment = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      setIsAttachmentModalVisible(false);
      // In a real app, this would handle the file upload
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const renderChatList = (items) => (
    <List
      itemLayout="horizontal"
      dataSource={items.filter(item => 
        item.name.toLowerCase().includes(searchText.toLowerCase())
      )}
      renderItem={item => (
        <List.Item 
          className={`chat-list-item ${selectedChat?.id === item.id ? 'active' : ''}`}
          onClick={() => setSelectedChat(item)}
        >
          <List.Item.Meta
            avatar={
              <Badge count={item.unread} size="small">
                <Avatar 
                  icon={activeTab === 'direct' ? <UserOutlined /> : <TeamOutlined />} 
                  src={item.avatar}
                />
              </Badge>
            }
            title={
              <div className="chat-header">
                <span>{item.name}</span>
                <span className="chat-time">{item.time}</span>
              </div>
            }
            description={
              <div className="chat-preview">
                {item.lastMessage.length > 30 
                  ? `${item.lastMessage.substring(0, 30)}...` 
                  : item.lastMessage}
              </div>
            }
          />
        </List.Item>
      )}
    />
  );

  return (
    <div className="teacher-messaging">
      <div className={`chat-sidebar ${isMobileView && selectedChat ? 'hidden' : ''}`}>
        <div className="chat-search">
          <Input 
            placeholder="Search messages..." 
            prefix={<SearchOutlined />} 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        
        <Tabs 
          defaultActiveKey="direct" 
          className="chat-tabs"
          onChange={setActiveTab}
        >
          <TabPane 
            tab={
              <span>
                <UserOutlined /> Direct Messages
              </span>
            } 
            key="direct" 
          >
            {renderChatList(mockStudents)}
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <TeamOutlined /> Groups
                <Badge count={mockGroups.reduce((sum, group) => sum + group.unread, 0)} 
                       style={{ marginLeft: 8 }} />
              </span>
            } 
            key="groups"
          >
            {renderChatList(mockGroups)}
          </TabPane>
        </Tabs>
      </div>

      <div className={`chat-container ${isMobileView && !selectedChat ? 'hidden' : ''}`}>
        {selectedChat ? (
          <>
            <div className="chat-header">
              <div className="chat-title">
                {activeTab === 'direct' ? (
                  <Avatar icon={<UserOutlined />} src={selectedChat.avatar} />
                ) : (
                  <Avatar icon={<TeamOutlined />} />
                )}
                <h3>{selectedChat.name}</h3>
                {activeTab === 'groups' && (
                  <Button type="text" size="small">
                    <TeamOutlined /> {selectedChat.members || 'Group Info'}
                  </Button>
                )}
              </div>
              {isMobileView && (
                <Button type="text" onClick={() => setSelectedChat(null)}>
                  Back
                </Button>
              )}
            </div>
            
            <div className="messages-container">
              {messages.map(msg => (
                <div key={msg.id} className={`message ${msg.isMe ? 'sent' : 'received'}`}>
                  {!msg.isMe && <div className="sender-name">{msg.sender}</div>}
                  <div className="message-content">
                    {msg.text}
                    {msg.attachment && (
                      <div className="message-attachment">
                        {msg.attachment.type === 'image' ? (
                          <PictureOutlined />
                        ) : (
                          <FileOutlined />
                        )}
                        <span>{msg.attachment.name}</span>
                      </div>
                    )}
                    <div className="message-time">
                      {msg.time}
                      {msg.isMe && <CheckOutlined className="read-receipt" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="message-input">
              <Button 
                type="text" 
                icon={<PaperClipOutlined />} 
                onClick={() => setIsAttachmentModalVisible(true)}
              />
              <TextArea
                placeholder="Type a message..."
                autoSize={{ minRows: 1, maxRows: 4 }}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onPressEnter={(e) => {
                  if (!e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button 
                type="primary" 
                icon={<SendOutlined />} 
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
              />
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <div className="no-chat-content">
              <TeamOutlined className="no-chat-icon" />
              <h3>Select a conversation to start messaging</h3>
              <p>Or create a new group to collaborate with multiple students</p>
              <Button type="primary">New Group</Button>
            </div>
          </div>
        )}
      </div>

      {/* Attachment Modal */}
      <Modal
        title="Send Attachment"
        visible={isAttachmentModalVisible}
        onCancel={() => setIsAttachmentModalVisible(false)}
        footer={null}
      >
        <Upload.Dragger
          name="file"
          multiple={true}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76" // Mock API endpoint
          onChange={handleAttachment}
          className="attachment-upload"
        >
          <p className="ant-upload-drag-icon">
            <PaperClipOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
          </p>
        </Upload.Dragger>
      </Modal>
    </div>
  );
};

export default TeacherMessaging;
