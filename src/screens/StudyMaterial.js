import React, { useState, useEffect } from 'react';
import { Card, Tabs, Button, Input, Select, List, Tag, Badge, Avatar, Tooltip, Modal } from 'antd';
import { BookOutlined, FilePdfOutlined, VideoCameraOutlined, DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import './StudyMaterial.css';

const { TabPane } = Tabs;
const { Option } = Select;

// Mock data
const mockMaterials = [
  {
    id: '1',
    title: 'Organic Chemistry Notes',
    type: 'pdf',
    subject: 'Chemistry',
    exam: 'JEE',
    rating: 4.8,
    downloads: 1245,
    author: 'Dr. Sharma'
  },
  {
    id: '2',
    title: 'Physics Video Lectures',
    type: 'video',
    subject: 'Physics',
    exam: 'NEET',
    rating: 4.6,
    views: 3560,
    author: 'Prof. Verma'
  },
  {
    id: '3',
    title: 'Math Practice Problems',
    type: 'pdf',
    subject: 'Mathematics',
    exam: 'JEE',
    rating: 4.5,
    downloads: 987,
    author: 'Dr. Gupta'
  }
];

const StudyMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    subject: 'all',
    exam: 'all',
    type: 'all'
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setMaterials(mockMaterials);
      setLoading(false);
    }, 500);
  }, []);

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchesSubject = filters.subject === 'all' || material.subject === filters.subject;
    const matchesExam = filters.exam === 'all' || material.exam === filters.exam;
    const matchesType = filters.type === 'all' || material.type === filters.type;
    
    return matchesSearch && matchesSubject && matchesExam && matchesType;
  });

  const renderMaterialCard = (item) => (
    <Card className="material-card" key={item.id}>
      <div className="material-header">
        <div className="material-type">
          {item.type === 'pdf' ? <FilePdfOutlined /> : <VideoCameraOutlined />}
          <span>{item.type.toUpperCase()}</span>
        </div>
        <Tag color={item.exam === 'JEE' ? 'blue' : 'green'}>{item.exam}</Tag>
      </div>
      <h3>{item.title}</h3>
      <p className="material-subject">{item.subject}</p>
      <div className="material-meta">
        <span>{item.author}</span>
        <div className="material-rating">
          <span className="rating-value">{item.rating}</span>
          <span className="rating-stars">★★★★★</span>
          <span className="rating-count">({item.views || item.downloads})</span>
        </div>
      </div>
      <div className="material-actions">
        <Button type="primary" icon={<DownloadOutlined />}>
          {item.type === 'pdf' ? 'Download' : 'Watch'}
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="study-material-container">
      <div className="study-material-header">
        <h1>JEE/NEET Study Materials</h1>
        <Button type="primary" icon={<DownloadOutlined />}>
          Upload Material
        </Button>
      </div>

      <Card className="filters-card">
        <div className="filters-row">
          <Input
            placeholder="Search materials..."
            prefix={<SearchOutlined />}
            value={filters.search}
            onChange={e => setFilters({...filters, search: e.target.value})}
            style={{ width: 250 }}
          />
          
          <Select 
            value={filters.subject}
            onChange={value => setFilters({...filters, subject: value})}
            style={{ width: 150 }}
          >
            <Option value="all">All Subjects</Option>
            <Option value="Physics">Physics</Option>
            <Option value="Chemistry">Chemistry</Option>
            <Option value="Mathematics">Mathematics</Option>
            <Option value="Biology">Biology</Option>
          </Select>
          
          <Select 
            value={filters.exam}
            onChange={value => setFilters({...filters, exam: value})}
            style={{ width: 120 }}
          >
            <Option value="all">All Exams</Option>
            <Option value="JEE">JEE</Option>
            <Option value="NEET">NEET</Option>
          </Select>
          
          <Select 
            value={filters.type}
            onChange={value => setFilters({...filters, type: value})}
            style={{ width: 120 }}
          >
            <Option value="all">All Types</Option>
            <Option value="pdf">PDF</Option>
            <Option value="video">Video</Option>
          </Select>
        </div>
      </Card>

      <div className="materials-grid">
        {loading ? (
          <div>Loading...</div>
        ) : filteredMaterials.length > 0 ? (
          filteredMaterials.map(renderMaterialCard)
        ) : (
          <div className="no-results">No study materials found matching your criteria.</div>
        )}
      </div>
    </div>
  );
};

export default StudyMaterial;
