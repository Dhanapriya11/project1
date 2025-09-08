import React, { useState, useEffect } from 'react';
import { Card, Button, List, Tag, Modal, Form, Input, Select, DatePicker, Badge, Tabs } from 'antd';
import { PlusOutlined, ClockCircleOutlined, CheckCircleOutlined, BookOutlined } from '@ant-design/icons';
import moment from 'moment';
import './HomeworkReminders.css';

const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

// Mock data for homework
const mockHomework = [
  {
    id: '1',
    title: 'Math Chapter 5 Exercises',
    subject: 'Mathematics',
    description: 'Complete exercises 1-10 from Chapter 5',
    dueDate: '2023-06-20',
    status: 'pending',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Science Project',
    subject: 'Science',
    description: 'Work on the science fair project',
    dueDate: '2023-06-25',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'History Essay',
    subject: 'History',
    description: 'Write a 1000-word essay on World War II',
    dueDate: '2023-06-15',
    status: 'completed',
    priority: 'high'
  }
];

const HomeworkReminders = () => {
  const [homework, setHomework] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const [form] = Form.useForm();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setHomework(mockHomework);
      setLoading(false);
    }, 500);
  }, []);

  const filteredHomework = homework.filter(hw => 
    activeTab === 'all' ? true : hw.status === activeTab
  );

  const handleAddHomework = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleSubmit = (values) => {
    const newHomework = {
      id: `hw-${Date.now()}`,
      ...values,
      status: 'pending',
      dueDate: values.dueDate.format('YYYY-MM-DD')
    };
    
    setHomework([...homework, newHomework]);
    setIsModalVisible(false);
    form.resetFields();
  };

  const toggleStatus = (id) => {
    setHomework(homework.map(hw => 
      hw.id === id 
        ? { ...hw, status: hw.status === 'completed' ? 'pending' : 'completed' } 
        : hw
    ));
  };

  const getPriorityTag = (priority) => {
    const colors = { high: 'red', medium: 'orange', low: 'green' };
    return <Tag color={colors[priority]}>{priority}</Tag>;
  };

  const isOverdue = (dueDate) => {
    return moment(dueDate).isBefore(moment(), 'day') && 
           !homework.find(hw => hw.dueDate === dueDate)?.status === 'completed';
  };

  return (
    <div className="homework-reminders">
      <div className="homework-header">
        <h1>Homework Reminders</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddHomework}>
          Add Homework
        </Button>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} className="homework-tabs">
        <TabPane 
          tab={
            <span>
              <ClockCircleOutlined />
              Pending
              <span className="tab-badge">
                {homework.filter(hw => hw.status === 'pending').length}
              </span>
            </span>
          } 
          key="pending"
        >
          <List
            itemLayout="horizontal"
            dataSource={filteredHomework}
            loading={loading}
            renderItem={item => (
              <List.Item
                className={`homework-item ${isOverdue(item.dueDate) ? 'overdue' : ''}`}
                actions={[
                  <Button 
                    type="link" 
                    icon={<CheckCircleOutlined />} 
                    onClick={() => toggleStatus(item.id)}
                  >
                    Mark Complete
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={<BookOutlined className="homework-icon" />}
                  title={
                    <div className="homework-title">
                      {item.title}
                      {getPriorityTag(item.priority)}
                      {isOverdue(item.dueDate) && (
                        <Tag color="red">Overdue</Tag>
                      )}
                    </div>
                  }
                  description={
                    <div className="homework-meta">
                      <span className="subject">{item.subject}</span>
                      <span className="due-date">
                        Due: {moment(item.dueDate).format('MMM D, YYYY')}
                      </span>
                    </div>
                  }
                />
                <div className="homework-description">{item.description}</div>
              </List.Item>
            )}
          />
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <CheckCircleOutlined />
              Completed
              <span className="tab-badge">
                {homework.filter(hw => hw.status === 'completed').length}
              </span>
            </span>
          } 
          key="completed"
        >
          <List
            itemLayout="horizontal"
            dataSource={filteredHomework}
            loading={loading}
            renderItem={item => (
              <List.Item className="homework-item completed">
                <List.Item.Meta
                  avatar={<CheckCircleOutlined className="completed-icon" />}
                  title={item.title}
                  description={`Completed on ${moment().format('MMM D, YYYY')}`}
                />
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>

      <Modal
        title="Add New Homework"
        visible={isModalVisible}
        onOk={() => form.submit()}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input placeholder="Enter homework title" />
          </Form.Item>
          
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: 'Please select a subject' }]}
          >
            <Select placeholder="Select subject">
              <Option value="Mathematics">Mathematics</Option>
              <Option value="Science">Science</Option>
              <Option value="History">History</Option>
              <Option value="English">English</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <TextArea rows={4} placeholder="Enter homework details" />
          </Form.Item>
          
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: 'Please select a due date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="priority"
            label="Priority"
            initialValue="medium"
          >
            <Select>
              <Option value="high">High</Option>
              <Option value="medium">Medium</Option>
              <Option value="low">Low</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HomeworkReminders;
