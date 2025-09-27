import React, { useState, useEffect } from 'react';
import { getContent, approveContent, rejectContent, getPendingContent } from '../services/api';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AcademicContentControl.css';

const AcademicContentControl = () => {
  const [content, setContent] = useState([]);
  const [contentLoading, setContentLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isAdmin, isTeacher, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  // Log user info for debugging
  useEffect(() => {
    if (!authLoading && user) {
      console.log('Current user:', user);
      console.log('User role:', user.role);
      console.log('isAdmin:', isAdmin, 'isTeacher:', isTeacher);
    }
  }, [authLoading, user, isAdmin, isTeacher]);
  
  // Redirect to login if not authenticated
  if (!authLoading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Show loading state while checking auth
  if (authLoading) {
    return <div className="loading">Loading user information...</div>;
  }

  // Handle content approval
  const handleApprove = async (contentId) => {
    try {
      setContentLoading(true);
      await approveContent(contentId);
      // Refresh the content list
      const contentData = isAdmin ? await getPendingContent() : await getContent();
      setContent(contentData);
    } catch (err) {
      console.error('Error approving content:', err);
      setError('Failed to approve content');
    } finally {
      setContentLoading(false);
    }
  };

  // Handle content rejection
  const handleReject = async (contentId) => {
    try {
      setContentLoading(true);
      await rejectContent(contentId);
      // Refresh the content list
      const contentData = isAdmin ? await getPendingContent() : await getContent();
      setContent(contentData);
    } catch (err) {
      console.error('Error rejecting content:', err);
      setError('Failed to reject content');
    } finally {
      setContentLoading(false);
    }
  };

  // Handle view content
  const handleViewContent = (contentId) => {
    navigate(`/content/${contentId}`);
  };

  // Handle edit content
  const handleEditContent = (contentId) => {
    navigate(`/content/${contentId}/edit`);
  };

  // Fetch content from the backend
  useEffect(() => {
    if (!user) return; // Don't fetch if user is not authenticated
    
    const fetchContent = async () => {
      try {
        setContentLoading(true);
        const contentData = isAdmin ? await getPendingContent() : await getContent();
        setContent(contentData);
      } catch (err) {
        setError('Failed to fetch content. Please try again later.');
        console.error('Error fetching content:', err);
        
        // If unauthorized, redirect to login
        if (err.response?.status === 401) {
          navigate('/login', { replace: true });
        }
      } finally {
        setContentLoading(false);
      }
    };

    fetchContent();
  }, [isAdmin, user, navigate]);

  if (contentLoading) {
    return <div className="loading">Loading content...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="academic-content-control">
      <h1>Academic Content</h1>
      
      <div className="content-table">
        <h2>{isAdmin ? 'Pending Content for Review' : 'Available Content'}</h2>
        
        {content.length === 0 ? (
          <p>No content available</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {content.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.contentType}</td>
                  <td>
                    <span className={`status-badge ${item.status || 'pending'}`}>
                      {item.status || 'pending'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="table-action view-button"
                        onClick={() => handleViewContent(item._id)}
                        title="View Content"
                      >
                        <i className="fas fa-eye"></i>
                      </button>

                      {(isTeacher || isAdmin) && (
                        <button 
                          className="table-action edit-button"
                          onClick={() => handleEditContent(item._id)}
                          title="Edit Content"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                      )}

                      {isAdmin && (
                        <div className="admin-actions">
                          <button 
                            className={`table-action approve-button ${item.status === 'approved' ? 'active' : ''}`}
                            onClick={() => handleApprove(item._id)}
                            disabled={loading || item.status === 'approved'}
                            title={item.status === 'approved' ? 'Approved' : 'Approve Content'}
                          >
                            <i className="fas fa-check"></i>
                            {item.status === 'approved' && <span className="action-text">Approved</span>}
                          </button>
                          <button 
                            className={`table-action reject-button ${item.status === 'rejected' ? 'active' : ''}`}
                            onClick={() => handleReject(item._id)}
                            disabled={loading || item.status === 'rejected'}
                            title={item.status === 'rejected' ? 'Rejected' : 'Reject Content'}
                          >
                            <i className="fas fa-times"></i>
                            {item.status === 'rejected' && <span className="action-text">Rejected</span>}
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AcademicContentControl;