import React, { useState, useEffect } from 'react';
import { getContent, createContent } from '../services/api';
import './AcademicContentControl.css';

const AcademicContentControl = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddContentForm, setShowAddContentForm] = useState(false);
  const [newContent, setNewContent] = useState({
    title: '',
    courseId: '',
    contentType: 'video',
    contentUrl: ''
  });

  // Fetch content from the backend
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const contentData = await getContent();
        setContent(contentData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch content');
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Handle input changes in the add content form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContent({
      ...newContent,
      [name]: value
    });
  };

  // Handle form submission for adding new content
  const handleAddContent = async (e) => {
    e.preventDefault();
    try {
      const createdContent = await createContent(newContent);
      setContent([...content, createdContent]);
      setNewContent({
        title: '',
        courseId: '',
        contentType: 'video',
        contentUrl: ''
      });
      setShowAddContentForm(false);
    } catch (err) {
      setError('Failed to create content');
    }
  };

  if (loading) {
    return <div className="academic-content-control">Loading content...</div>;
  }

  if (error) {
    return <div className="academic-content-control">Error: {error}</div>;
  }

  return (
    <div className="academic-content-control">
      <h1>Academic Content Control</h1>
      <p>Manage syllabus and review uploaded content</p>
      
      <div className="content-actions">
        <button className="primary-button" onClick={() => setShowAddContentForm(!showAddContentForm)}>
          {showAddContentForm ? 'Cancel' : 'Add Content'}
        </button>
        <button className="secondary-button">Review Content</button>
      </div>
      
      {/* Add Content Form */}
      {showAddContentForm && (
        <div className="add-content-form">
          <h2>Add New Content</h2>
          <form onSubmit={handleAddContent}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newContent.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="courseId">Course ID</label>
              <input
                type="text"
                id="courseId"
                name="courseId"
                value={newContent.courseId}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contentType">Content Type</label>
              <select
                id="contentType"
                name="contentType"
                value={newContent.contentType}
                onChange={handleInputChange}
              >
                <option value="video">Video</option>
                <option value="document">Document</option>
                <option value="quiz">Quiz</option>
                <option value="assignment">Assignment</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="contentUrl">Content URL</label>
              <input
                type="text"
                id="contentUrl"
                name="contentUrl"
                value={newContent.contentUrl}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="primary-button">Add Content</button>
          </form>
        </div>
      )}
      
      <div className="content-sections">
        <div className="section">
          <h2>Syllabus Management</h2>
          <div className="section-content">
            <p>Add and update syllabus for each grade/subject</p>
            <button className="action-button">Manage Syllabus</button>
          </div>
        </div>
        
        <div className="section">
          <h2>Content Moderation</h2>
          <div className="section-content">
            <p>Review and flag uploaded content to maintain quality</p>
            <button className="action-button">Moderate Content</button>
          </div>
        </div>
      </div>
      
      <div className="content-table">
        <h2>Recent Content Uploads</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Course</th>
              <th>Type</th>
              <th>Uploaded By</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {content.map((item, index) => (
              <tr key={item._id || index}>
                <td>{item.title}</td>
                <td>{item.courseId}</td>
                <td>{item.contentType}</td>
                <td>System</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>Approved</td>
                <td>
                  <button className="action-button">View</button>
                  <button className="action-button">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcademicContentControl;