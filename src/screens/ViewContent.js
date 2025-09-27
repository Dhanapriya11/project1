import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getContentById } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './ViewContent.css';

// Helper function to get the full content URL
const getContentUrl = (url) => {
  if (!url) return '';
  // If it's already a full URL, return as is
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:')) {
    return url;
  }
  // Otherwise, construct the full URL using the API base URL
  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  // Remove any leading slashes from the URL to prevent double slashes
  const cleanUrl = url.startsWith('/') ? url.substring(1) : url;
  return `${baseUrl}/uploads/${cleanUrl}`;
};

const ViewContent = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getContentById(id);
        setContent(data);
      } catch (err) {
        setError('Failed to load content');
        console.error('Error fetching content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  if (loading) {
    return <div className="view-content">Loading content...</div>;
  }

  if (error) {
    return <div className="view-content error">{error}</div>;
  }

  if (!content) {
    return <div className="view-content">Content not found</div>;
  }

  return (
    <div className="view-content">
      <div className="content-header">
        <h1>{content.title}</h1>
        <div className="content-meta">
          <span className="content-type">{content.contentType}</span>
          <span className="content-date">
            Uploaded on: {new Date(content.createdAt).toLocaleDateString()}
          </span>
          <span className={`content-status ${content.status?.toLowerCase() || 'pending'}`}>
            {content.status || 'Pending Review'}
          </span>
        </div>
      </div>

      <div className="content-body">
        <div className="content-info">
          <div className="info-row">
            <label>Course:</label>
            <span>{content.courseId?.name || content.courseId || 'N/A'}</span>
          </div>
          <div className="info-row">
            <label>Uploaded By:</label>
            <span>{content.uploadedBy?.name || 'System'}</span>
          </div>
          <div className="info-row">
            <label>Description:</label>
            <p className="content-description">
              {content.description || 'No description available'}
            </p>
          </div>
        </div>

        <div className="content-preview">
          {content.contentType === 'video' ? (
            <div className="video-container">
              <video controls>
                <source src={getContentUrl(content.contentUrl)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <div className="document-container">
              <iframe
                src={`https://docs.google.com/viewer?url=${encodeURIComponent(getContentUrl(content.contentUrl))}&embedded=true`}
                title={content.title}
                className="document-viewer"
              />
              <a 
                href={getContentUrl(content.contentUrl)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="download-button"
              >
                Download Document
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="content-actions">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
        >
          Back to List
        </button>
        {(user?.role === 'admin' || user?.role === 'superadmin' || user?.role === 'teacher') && (
          <button 
            className="edit-button"
            onClick={() => navigate(`/edit-content/${content._id}`)}
          >
            Edit Content
          </button>
        )}
      </div>
    </div>
  );
};

export default ViewContent;
