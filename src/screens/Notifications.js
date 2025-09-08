import React, { useState,useEffect } from 'react';
import { Badge, List, Tabs, Button, Tag, Dropdown, Menu } from 'antd';
import { 
  BellOutlined, 
  CheckOutlined,
  ExclamationCircleOutlined,
  NotificationOutlined,
  StarOutlined,
  FileOutlined,
  FilterOutlined
} from '@ant-design/icons';
import './Notifications.css';

const { TabPane } = Tabs;

// Mock data for notifications
const mockNotifications = {
  all: [
    {
      id: 1,
      title: 'Assignment Submitted',
      description: 'Alice Johnson has submitted the Math assignment',
      time: '2 minutes ago',
      type: 'submission',
      read: false,
      meta: { subject: 'Mathematics', assignment: 'Algebra Basics' }
    },
    {
      id: 2,
      title: 'New Announcement',
      description: 'Class cancelled tomorrow due to weather conditions',
      time: '1 hour ago',
      type: 'announcement',
      read: false,
      meta: { class: 'Physics 101' }
    },
    {
      id: 3,
      title: 'Grade Updated',
      description: 'Your grade for Science Project has been updated',
      time: '5 hours ago',
      type: 'grade',
      read: true,
      meta: { subject: 'Science', score: 'A+' }
    },
    {
      id: 4,
      title: 'Upcoming Deadline',
      description: 'Math homework due in 2 days',
      time: 'Yesterday',
      type: 'deadline',
      read: true,
      meta: { subject: 'Mathematics', due: '2023-06-30' }
    }
  ]
};

// Add unread notifications
mockNotifications.unread = mockNotifications.all.filter(n => !n.read);

const Notifications = ({ isWidget = false, teacherNotifications }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState(
    teacherNotifications && teacherNotifications.length > 0 
      ? { all: teacherNotifications, unread: teacherNotifications.filter(n => !n.read) }
      : mockNotifications
  );
  
  // Update notifications when teacherNotifications prop changes
  useEffect(() => {
    if (teacherNotifications && teacherNotifications.length > 0) {
      setNotifications({
        all: teacherNotifications,
        unread: teacherNotifications.filter(n => !n.read)
      });
    }
  }, [teacherNotifications]);
  
  // Mark notification as read
  const markAsRead = (id) => {
    const updatedNotifications = { ...notifications };
    Object.keys(updatedNotifications).forEach(key => {
      updatedNotifications[key] = updatedNotifications[key].map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      );
    });
    setNotifications(updatedNotifications);
  };
  
  // Mark all as read
  const markAllAsRead = () => {
    const updatedNotifications = { ...notifications };
    Object.keys(updatedNotifications).forEach(key => {
      updatedNotifications[key] = updatedNotifications[key].map(notification => ({
        ...notification,
        read: true
      }));
    });
    setNotifications(updatedNotifications);
  };
  
  // Filter notifications based on tab
  const filteredNotifications = notifications[activeTab] || [];
  
  // Get unread count
  const unreadCount = notifications.all.filter(n => !n.read).length;

  const renderNotificationItem = (item) => {
    // Get appropriate icon based on notification type
    const getNotificationIcon = () => {
      switch(item.type) {
        case 'submission':
          return <FileOutlined style={{ color: '#1890ff' }} />;
        case 'announcement':
          return <NotificationOutlined style={{ color: '#faad14' }} />;
        case 'grade':
          return <StarOutlined style={{ color: '#52c41a' }} />;
        case 'deadline':
          return <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />;
        case 'system':
        default:
          return <NotificationOutlined style={{ color: '#52c41a' }} />;
      }
    };
    
    return (
      <List.Item
        key={item.id}
        className={`notification-item ${!item.read ? 'unread' : ''}`}
        onClick={() => markAsRead(item.id)}
      >
        <List.Item.Meta
          avatar={
            <div className="notification-icon">
              {getNotificationIcon()}
            </div>
          }
          title={
            <div className="notification-title">
              <span>{item.title}</span>
              <span className="notification-time">{item.time}</span>
            </div>
          }
          description={
            <>
              <div className="notification-description">{item.description}</div>
              {item.meta && (
                <div className="notification-meta">
                  {Object.entries(item.meta).map(([key, value]) => (
                    <Tag key={key} color="blue">
                      {key}: {value}
                    </Tag>
                  ))}
                </div>
              )}
            </>
          }
        />
      </List.Item>
    );
  };

  if (isWidget) {
    return (
      <div className="notifications-widget">
        <div className="notifications-widget-header">
          <h4>Recent Notifications</h4>
          <Badge count={unreadCount} style={{ backgroundColor: '#1890ff' }} />
        </div>
        <List
          itemLayout="horizontal"
          dataSource={notifications.all.slice(0, 3)}
          renderItem={renderNotificationItem}
          locale={{ emptyText: 'No recent notifications' }}
          className="notifications-list"
        />
      </div>
    );
  }

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2>Notifications</h2>
        <div>
          <Button 
            type="text" 
            icon={<CheckOutlined />}
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </Button>
        </div>
      </div>
      
      <Tabs 
        activeKey={activeTab}
        onChange={setActiveTab}
        tabBarExtraContent={{
          right: (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="all">All Notifications</Menu.Item>
                  <Menu.Item key="unread">Unread Only</Menu.Item>
                  <Menu.Item key="today">Today</Menu.Item>
                </Menu>
              }
              trigger={['click']}
            >
              <Button type="text" icon={<FilterOutlined />} />
            </Dropdown>
          ),
        }}
      >
        <TabPane
          tab={
            <span>
              <BellOutlined />
              All
              {unreadCount > 0 && <Badge count={unreadCount} style={{ marginLeft: 8 }} />}
            </span>
          }
          key="all"
        >
          <List
            itemLayout="horizontal"
            dataSource={notifications.all}
            renderItem={renderNotificationItem}
            locale={{ emptyText: 'No notifications' }}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <ExclamationCircleOutlined />
              Unread
              {unreadCount > 0 && <Badge count={unreadCount} style={{ marginLeft: 8 }} />}
            </span>
          }
          key="unread"
        >
          <List
            itemLayout="horizontal"
            dataSource={notifications.unread}
            renderItem={renderNotificationItem}
            locale={{ emptyText: 'No unread notifications' }}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Notifications;
