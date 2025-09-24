import React, { useState, useEffect } from 'react';
import { getCourses, createCourse } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './CourseManagement.css';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    courseCode: '',
    courseName: '',
    description: '',
    credits: 3,
    department: '',
    syllabus: null,
    syllabusName: ''
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const navigate = useNavigate();

  // Fetch courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log('Fetching courses from API');
        const courseData = await getCourses();
        console.log('Courses fetched:', courseData);
        setCourses(courseData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to fetch courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle input changes in the add course form
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'file') {
      const file = e.target.files[0];
      if (file) {
        setNewCourse({
          ...newCourse,
          syllabus: file,
          syllabusName: file.name
        });
      }
    } else {
      setNewCourse({
        ...newCourse,
        [name]: value
      });
    }
  };

  // Handle form submission for adding a new course
  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      setUploadProgress(0);
      console.log('Creating course with data:', newCourse);
      
      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append('courseCode', newCourse.courseCode);
      formData.append('courseName', newCourse.courseName);
      formData.append('description', newCourse.description);
      formData.append('credits', newCourse.credits);
      formData.append('department', newCourse.department);
      
      if (newCourse.syllabus) {
        formData.append('syllabus', newCourse.syllabus);
      }
      
      const createdCourse = await createCourse(formData);
      console.log('Course created:', createdCourse);
      setCourses([...courses, createdCourse]);
      
      // Reset form
      setNewCourse({
        courseCode: '',
        courseName: '',
        description: '',
        credits: 3,
        department: '',
        syllabus: null,
        syllabusName: ''
      });
      setUploadProgress(0);
      setShowAddCourseForm(false);
    } catch (err) {
      console.error('Error creating course:', err);
      setError('Failed to create course');
    }
  };

  if (loading) {
    return <div className="course-management">Loading courses...</div>;
  }

  if (error) {
    return <div className="course-management">Error: {error}</div>;
  }

  return (
    <div className="course-management">
      <h1>Course Management</h1>
      <p>Manage courses and their details</p>
      
      <div className="course-actions">
        <button 
          className="primary-button" 
          onClick={() => setShowAddCourseForm(!showAddCourseForm)}
        >
          {showAddCourseForm ? 'Cancel' : 'Add New Course'}
        </button>
      </div>
      
      {/* Add Course Form */}
      {showAddCourseForm && (
        <div className="add-course-form">
          <h2>Add New Course</h2>
          <form onSubmit={handleAddCourse}>
            <div className="form-group">
              <label htmlFor="courseCode">Course Code*</label>
              <input
                type="text"
                id="courseCode"
                name="courseCode"
                value={newCourse.courseCode}
                onChange={handleInputChange}
                required
                placeholder="e.g., CS101"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="courseName">Course Name*</label>
              <input
                type="text"
                id="courseName"
                name="courseName"
                value={newCourse.courseName}
                onChange={handleInputChange}
                required
                placeholder="e.g., Introduction to Computer Science"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={newCourse.description}
                onChange={handleInputChange}
                rows="3"
                placeholder="Course description and objectives"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="credits">Credits*</label>
              <input
                type="number"
                id="credits"
                name="credits"
                min="1"
                max="10"
                value={newCourse.credits}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="department">Department*</label>
              <input
                type="text"
                id="department"
                name="department"
                value={newCourse.department}
                onChange={handleInputChange}
                required
                placeholder="e.g., Computer Science"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="syllabus">Syllabus (PDF/DOCX)</label>
              <div className="file-upload">
                <label className="file-upload-label">
                  <input
                    type="file"
                    id="syllabus"
                    name="syllabus"
                    onChange={handleInputChange}
                    accept=".pdf,.doc,.docx"
                    style={{ display: 'none' }}
                  />
                  <span className="file-upload-button">Choose File</span>
                  <span className="file-upload-name">
                    {newCourse.syllabusName || 'No file chosen'}
                  </span>
                </label>
              </div>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="upload-progress">
                  <div 
                    className="upload-progress-bar" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                  <span>{uploadProgress}%</span>
                </div>
              )}
            </div>
            
            <div className="form-actions">
              <button 
                type="submit" 
                className="primary-button"
                disabled={uploadProgress > 0 && uploadProgress < 100}
              >
                {uploadProgress > 0 && uploadProgress < 100 ? 'Uploading...' : 'Save Course'}
              </button>
              <button 
                type="button" 
                className="secondary-button"
                onClick={() => setShowAddCourseForm(false)}
                disabled={uploadProgress > 0 && uploadProgress < 100}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Courses List */}
      <div className="courses-list">
        <h2>Available Courses</h2>
        {courses.length === 0 ? (
          <p>No courses found. Add your first course using the button above.</p>
        ) : (
          <div className="table-responsive">
            <table className="courses-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Department</th>
                  <th>Credits</th>
                  <th>Syllabus</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td>{course.courseCode}</td>
                    <td>{course.courseName}</td>
                    <td>{course.department}</td>
                    <td>{course.credits}</td>
                    <td>
                      {course.syllabusUrl ? (
                        <a 
                          href={course.syllabusUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="syllabus-link"
                        >
                          View Syllabus
                        </a>
                      ) : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseManagement;
