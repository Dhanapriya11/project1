import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, updateUser } from '../services/api';
import './TeacherProfile.css';

const TeacherProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    department: '',
    designation: '',
    employeeId: '',
    qualification: '',
    specialization: '',
    joiningDate: ''
  });
  const [assignedClasses, setAssignedClasses] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        // Get teacher data from localStorage
        const teacherData = await getCurrentUser();
        
        // Set default values if data is missing
        const defaultTeacherData = {
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '',
          address: '',
          department: 'Computer Science',
          designation: 'Senior Lecturer',
          employeeId: 'EMP' + Math.floor(1000 + Math.random() * 9000),
          qualification: 'M.Tech in Computer Science',
          specialization: 'Web Development',
          joiningDate: '2020-01-15',
          photoUrl: '/default-teacher-avatar.png',
          assignedClasses: [
            { id: 1, name: 'Class 10A', subject: 'Computer Science', schedule: 'Mon, Wed, Fri 10:00 AM', studentCount: 30 },
            { id: 2, name: 'Class 12B', subject: 'Web Development', schedule: 'Tue, Thu 2:00 PM', studentCount: 25 }
          ]
        };

        // Merge with any existing data
        const mergedData = { ...defaultTeacherData, ...teacherData };
        
        setFormData({
          name: mergedData.name || '',
          email: mergedData.email || '',
          phone: mergedData.phone || '',
          address: mergedData.address || '',
          department: mergedData.department || '',
          designation: mergedData.designation || '',
          employeeId: mergedData.employeeId || '',
          qualification: mergedData.qualification || '',
          specialization: mergedData.specialization || '',
          joiningDate: mergedData.joiningDate || ''
        });
        
        setAssignedClasses(mergedData.assignedClasses || []);
        
        // Save the initial data if not exists
        if (!localStorage.getItem('currentUser')) {
          localStorage.setItem('currentUser', JSON.stringify(mergedData));
        }
      } catch (err) {
        console.error('Error fetching teacher data:', err);
        setError('Failed to load profile data. Using demo data.');
        
        // Set demo data on error
        const demoData = {
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1 234 567 8900',
          address: '123 Education St, Campus City',
          department: 'Computer Science',
          designation: 'Senior Lecturer',
          employeeId: 'EMP' + Math.floor(1000 + Math.random() * 9000),
          qualification: 'M.Tech in Computer Science',
          specialization: 'Web Development',
          joiningDate: '2020-01-15',
          assignedClasses: [
            { id: 1, name: 'Class 10A', subject: 'Computer Science', schedule: 'Mon, Wed, Fri 10:00 AM', studentCount: 30 },
            { id: 2, name: 'Class 12B', subject: 'Web Development', schedule: 'Tue, Thu 2:00 PM', studentCount: 25 }
          ]
        };
        
        setFormData(demoData);
        setAssignedClasses(demoData.assignedClasses);
        localStorage.setItem('currentUser', JSON.stringify(demoData));
      }
    };

    fetchTeacherData();
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
    
    if (!formData.name || !formData.email) {
      setError('Name and email are required');
      return;
    }

    try {
      await updateUser(formData);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      // Refresh teacher data
      const updatedTeacher = await getCurrentUser();
      setFormData(updatedTeacher);
    } catch (err) {
      setError('Failed to update profile');
      console.error('Update error:', err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    getCurrentUser().then(teacherData => {
      setFormData(teacherData);
    });
  };

  return (
    <div className="teacher-profile">
      <div className="profile-header">
        <h2>Teacher Profile</h2>
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
              src={formData.photoUrl || '/default-teacher-avatar.png'} 
              alt="Teacher Profile" 
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

                <h3>Professional Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Department</label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Designation</label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Employee ID</label>
                    <input
                      type="text"
                      name="employeeId"
                      value={formData.employeeId}
                      onChange={handleChange}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label>Joining Date</label>
                    <input
                      type="date"
                      name="joiningDate"
                      value={formData.joiningDate}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Highest Qualification</label>
                    <input
                      type="text"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Specialization</label>
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
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
                  <h3>Professional Information</h3>
                  <p><strong>Department:</strong> {formData.department || 'N/A'}</p>
                  <p><strong>Designation:</strong> {formData.designation || 'N/A'}</p>
                  <p><strong>Employee ID:</strong> {formData.employeeId || 'N/A'}</p>
                  <p><strong>Joining Date:</strong> {formData.joiningDate ? new Date(formData.joiningDate).toLocaleDateString() : 'N/A'}</p>
                  <p><strong>Qualification:</strong> {formData.qualification || 'N/A'}</p>
                  <p><strong>Specialization:</strong> {formData.specialization || 'N/A'}</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="classes-section">
          <h3>Assigned Classes</h3>
          {assignedClasses.length > 0 ? (
            <div className="class-list">
              {assignedClasses.map((classItem, index) => (
                <div key={index} className="class-card">
                  <h4>{classItem.name}</h4>
                  <p>Subject: {classItem.subject}</p>
                  <p>Schedule: {classItem.schedule}</p>
                  <p>Students: {classItem.studentCount}</p>
                  <button 
                    className="view-class-btn"
                    onClick={() => navigate(`/classes/${classItem.id}`)}
                  >
                    View Class
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No classes assigned yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
