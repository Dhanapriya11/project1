import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, updateUser } from '../services/api';
import './StudentProfile.css';

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    grade: '',
    section: '',
    rollNumber: '',
    parentName: '',
    parentEmail: '',
    parentPhone: ''
  });
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUser();
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || '',
          grade: userData.grade || '',
          section: userData.section || '',
          rollNumber: userData.rollNumber || '',
          parentName: userData.parentName || '',
          parentEmail: userData.parentEmail || '',
          parentPhone: userData.parentPhone || ''
        });
        setCourses(userData.enrolledCourses || []);
      } catch (err) {
        setError('Failed to load profile data');
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Basic validation
    if (!formData.name || !formData.email) {
      setError('Name and email are required');
      return;
    }

    try {
      await updateUser(formData);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      // Refresh user data
      const updatedUser = await getCurrentUser();
      setFormData(updatedUser);
    } catch (err) {
      setError('Failed to update profile');
      console.error('Update error:', err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original data
    getCurrentUser().then(userData => {
      setFormData(userData);
    });
  };

  return (
    <div className="student-profile">
      <div className="profile-header">
        <h2>Student Profile</h2>
        {!isEditing && (
          <button 
            className="edit-button"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="profile-container">
        <div className="profile-section">
          <div className="profile-picture">
            <img 
              src={formData.photoUrl || '/default-avatar.png'} 
              alt="Profile" 
              className="profile-avatar"
            />
            {isEditing && (
              <button className="change-photo-btn">
                Change Photo
              </button>
            )}
          </div>
          
          <div className="profile-info">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>

                <h3>Academic Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Grade</label>
                    <input
                      type="text"
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Section</label>
                    <input
                      type="text"
                      name="section"
                      value={formData.section}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Roll Number</label>
                    <input
                      type="text"
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <h3>Parent/Guardian Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Parent Name</label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Parent Email</label>
                    <input
                      type="email"
                      name="parentEmail"
                      value={formData.parentEmail}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Parent Phone</label>
                    <input
                      type="tel"
                      name="parentPhone"
                      value={formData.parentPhone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="cancel-button" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button type="submit" className="save-button">
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="info-group">
                  <h3>Personal Information</h3>
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone || 'Not provided'}</p>
                  <p><strong>Address:</strong> {formData.address || 'Not provided'}</p>
                </div>

                <div className="info-group">
                  <h3>Academic Information</h3>
                  <p><strong>Grade:</strong> {formData.grade || 'N/A'}</p>
                  <p><strong>Section:</strong> {formData.section || 'N/A'}</p>
                  <p><strong>Roll Number:</strong> {formData.rollNumber || 'N/A'}</p>
                </div>

                <div className="info-group">
                  <h3>Parent/Guardian Information</h3>
                  <p><strong>Name:</strong> {formData.parentName || 'Not provided'}</p>
                  <p><strong>Email:</strong> {formData.parentEmail || 'Not provided'}</p>
                  <p><strong>Phone:</strong> {formData.parentPhone || 'Not provided'}</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="courses-section">
          <h3>Enrolled Courses</h3>
          {courses.length > 0 ? (
            <div className="course-list">
              {courses.map((course, index) => (
                <div key={index} className="course-card">
                  <h4>{course.name}</h4>
                  <p>Instructor: {course.instructor}</p>
                  <p>Schedule: {course.schedule}</p>
                  <button 
                    className="view-course-btn"
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    View Course
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No courses enrolled yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
