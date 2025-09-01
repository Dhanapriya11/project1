import React, { useState, useEffect } from 'react';
import './ContentLibrary.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faShare, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

const mockClasses = ['Math 101', 'Biology 201', 'Physics 301', 'Chemistry 202'];

const ContentLibrary = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');
  const [uploading, setUploading] = useState(false);
  const [shareModal, setShareModal] = useState({ show: false, resourceId: null });
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('teacherContent');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Introduction to Algebra', type: 'video', subject: 'Math',
        description: 'A 15-minute video covering the basics of algebraic expressions.',
        classes: ['Math 101'], views: 15, uploadDate: '2025-08-01'
      },
      { id: 2, title: 'The Cell Structure', type: 'notes', subject: 'Biology',
        description: 'Downloadable PDF notes on prokaryotic and eukaryotic cells.',
        classes: ['Biology 201'], views: 8, uploadDate: '2025-08-10'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('teacherContent', JSON.stringify(content));
  }, [content]);

  const filteredContent = activeTab === 'all'
    ? content
    : content.filter(item => item.type === activeTab);

  const handleUpload = (e) => {
    const files = e.target.files;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      const newContent = Array.from(files).map((file, i) => ({
        id: Date.now() + i,
        title: file.name.split('.')[0],
        type: file.type.includes('video') ? 'video' :
              file.type.includes('pdf') ? 'notes' : 'other',
        subject: 'General',
        description: `Uploaded ${file.name}`,
        classes: [selectedClass === 'all' ? 'All Classes' : selectedClass],
        views: 0,
        uploadDate: new Date().toISOString().split('T')[0]
      }));
      setContent(prev => [...prev, ...newContent]);
    }, 1000);
  };

  const handleShare = (id) => {
    setShareModal({ show: true, resourceId: id });
  };

  const handleDelete = (id) => {
    setContent(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="content-library-container">
      <div className="library-header">
        <h1>Content Library</h1>
        <div className="upload-controls">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="class-selector"
          >
            <option value="all">All Classes</option>
            {mockClasses.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
          <label className="upload-btn">
            <input
              type="file"
              multiple
              onChange={handleUpload}
              style={{display: 'none'}}
            />
            <FontAwesomeIcon icon={faUpload} /> {uploading ? 'Uploading...' : 'Upload'}
          </label>
        </div>
      </div>
      
      <div className="tabs">
        <button className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}>All</button>
        <button className={`tab-button ${activeTab === 'video' ? 'active' : ''}`}
          onClick={() => setActiveTab('video')}>Videos</button>
        <button className={`tab-button ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveTab('notes')}>Notes</button>
        <button className={`tab-button ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}>Quizzes</button>
      </div>

      <div className="content-grid">
        {filteredContent.map(item => (
          <div key={item.id} className="content-card">
            <div className="card-header">
              <h2 className="content-title">{item.title}</h2>
              <div className="card-actions">
                <button onClick={() => handleShare(item.id)}>
                  <FontAwesomeIcon icon={faShare} />
                </button>
                <button onClick={() => handleDelete(item.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
            <p className="content-description">{item.description}</p>
            <div className="content-footer">
              <span className="content-subject">{item.subject}</span>
              <span className="content-type">{item.type}</span>
              <span className="content-views">
                <FontAwesomeIcon icon={faEye} /> {item.views}
              </span>
              <span className="content-classes">
                {item.classes.join(', ')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {shareModal.show && (
        <div className="share-modal">
          <h3>Share Resource</h3>
          <select multiple>
            {mockClasses.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
          <button onClick={() => setShareModal({ show: false, resourceId: null })}>
            Share
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentLibrary;
