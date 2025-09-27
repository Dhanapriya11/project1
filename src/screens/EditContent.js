import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getContentById, updateContent } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './EditContent.css';

// Helper function to get the display URL (remove the base URL if present)
const getDisplayUrl = (url) => {
  if (!url) return '';
  // If it's a full URL, return just the filename
  if (url.startsWith('http')) {
    const urlObj = new URL(url);
    return urlObj.pathname.split('/').pop();
  }
  return url;
};

const EditContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    courseId: '',
    contentType: 'document',
    contentUrl: '',
    status: 'pending',
    file: null,
    fileName: ''
  });
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getContentById(id);
        setFormData({
          title: data.title,
          description: data.description || '',
          courseId: data.courseId?._id || data.courseId || '',
          contentType: data.contentType || 'document',
          contentUrl: data.contentUrl,
          status: data.status || 'pending'
        });
      } catch (err) {
        setError('Failed to load content');
        console.error('Error fetching content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file' && files && files.length > 0) {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        file,
        fileName: file.name,
        contentUrl: URL.createObjectURL(file) // For preview
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      
      // Append all form fields to FormData
      Object.keys(formData).forEach(key => {
        if (key !== 'file' && key !== 'fileName') {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // If a new file was selected, append it
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }
      
      await updateContent(id, formDataToSend);
      navigate(`/content/${id}`, { 
        state: { message: 'Content updated successfully!' } 
      });
    } catch (err) {
      setError(err.message || 'Failed to update content');
      console.error('Error updating content:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="edit-content">Loading content...</div>;
  }

  return (
    <div className="edit-content">
      <div className="edit-content-header">
        <h1>Edit Content</h1>
        <p>Update the content details below</p>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="content-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="form-control"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="courseId">Course *</label>
            <input
              type="text"
              id="courseId"
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Enter course ID"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contentType">Content Type *</label>
            <select
              id="contentType"
              name="contentType"
              value={formData.contentType}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="document">Document</option>
              <option value="video">Video</option>
              <option value="presentation">Presentation</option>
              <option value="quiz">Quiz</option>
              <option value="assignment">Assignment</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="file">Upload File</label>
          <div className="file-upload-container">
            <input
              type="file"
              id="file"
              name="file"
              ref={fileInputRef}
              onChange={handleChange}
              className="file-input"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.mp4,.mov,.avi"
            />
            <button 
              type="button" 
              className="file-upload-button"
              onClick={() => fileInputRef.current.click()}
            >
              Choose File
            </button>
            <span className="file-name">
              {formData.fileName || (formData.contentUrl ? 'Current file: ' + getDisplayUrl(formData.contentUrl) : 'No file chosen')}
            </span>
          </div>
          <small className="form-hint">
            Supported formats: PDF, Word, PowerPoint, Excel, MP4, MOV, AVI
          </small>
          
          {/* Keep the URL field as a fallback */}
          <label htmlFor="contentUrl" style={{ marginTop: '15px', display: 'block' }}>
            Or enter content URL
          </label>
          <input
            type="url"
            id="contentUrl"
            name="contentUrl"
            value={formData.contentUrl}
            onChange={handleChange}
            className="form-control"
            placeholder="https://example.com/content"
            disabled={!!formData.file}
          />
        </div>

        {(user?.role === 'admin' || user?.role === 'superadmin') && (
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-control"
            >
              <option value="pending">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-secondary"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContent;
