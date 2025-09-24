import React, { useState, useEffect } from 'react';
import { 
  getUsers, 
  getCourses, 
  assignTeacherToSubject, 
  getTeacherAssignments,
  deleteTeacherAssignment 
} from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TeacherSubjectAssignment.css';

const TeacherSubjectAssignment = () => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    teacherId: '',
    subjectId: '',
    classId: ''
  });
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      console.log('Starting to fetch data...');
      setIsLoading(true);
      setError(null);
      
      // Fetch data in parallel
      const [usersResponse, coursesResponse, assignmentsResponse] = await Promise.allSettled([
        getUsers(),
        getCourses(),
        getTeacherAssignments()
      ]);

      // Handle users response
      if (usersResponse.status === 'rejected') {
        console.error('Failed to fetch users:', usersResponse.reason);
        throw new Error('Failed to load teacher data');
      }
      const users = usersResponse.value;
      
      // Handle courses response
      if (coursesResponse.status === 'rejected') {
        console.error('Failed to fetch courses:', coursesResponse.reason);
        throw new Error('Failed to load course data');
      }
      const courses = coursesResponse.value;
      
      // Handle assignments response (this one can fail silently with empty array)
      const existingAssignments = assignmentsResponse.status === 'fulfilled' 
        ? assignmentsResponse.value 
        : [];

      console.log('Fetched users:', JSON.stringify(users, null, 2));
      
      const teacherUsers = users.filter(user => user.role === 'teacher');
      console.log('Filtered teachers:', JSON.stringify(teacherUsers, null, 2));
      
      if (teacherUsers.length === 0) {
        console.warn('No teachers found in the users list');
        toast.warning('No teachers found. Please add teachers first.');
      }
      
      setTeachers(teacherUsers);
      setSubjects(courses);
      
      // Extract unique classes from courses
      const uniqueClasses = [...new Set(courses.map(course => course.classLevel))];
      setClasses(uniqueClasses);
      
      // Process assignments to include teacher and subject details
      const processedAssignments = existingAssignments.map(assignment => {
        const teacher = teacherUsers.find(t => t._id === assignment.teacherId);
        const subject = courses.find(s => s._id === assignment.subjectId);
        
        return {
          ...assignment,
          teacherName: teacher ? `${teacher.name} (${teacher.email})` : 'Unknown Teacher',
          subjectName: subject ? subject.name : 'Unknown Subject'
        };
      });
      
      setAssignments(processedAssignments);
      
    } catch (err) {
      console.error('Error in fetchData:', err);
      const errorMessage = err.message || 'Failed to load data. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.teacherId || !formData.subjectId || !formData.classId) {
      setError('Please fill in all fields');
      toast.error('Please fill in all fields');
      return;
    }

    // Check if this assignment already exists
    const assignmentExists = assignments.some(
      a => a.teacherId === formData.teacherId && 
           a.subjectId === formData.subjectId && 
           a.classId === formData.classId
    );

    if (assignmentExists) {
      setError('This teacher is already assigned to this subject and class');
      toast.warning('This assignment already exists');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await assignTeacherToSubject(formData);
      toast.success('Teacher assigned successfully!');
      
      // Refresh data
      await fetchData();
      
      // Reset form
      setFormData({
        teacherId: '',
        subjectId: '',
        classId: ''
      });
    } catch (err) {
      console.error('Error assigning teacher:', err);
      const errorMessage = err.message || 'Failed to assign teacher. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    if (!window.confirm('Are you sure you want to remove this assignment?')) {
      return;
    }

    try {
      await deleteTeacherAssignment(assignmentId);
      toast.success('Assignment removed successfully');
      
      // Refresh data
      await fetchData();
    } catch (err) {
      console.error('Error deleting assignment:', err);
      toast.error('Failed to remove assignment');
    }
  };

  const handleClassChange = (e) => {
    const classId = e.target.value;
    setFormData(prev => ({
      ...prev,
      classId,
      subjectId: '' // Reset subject when class changes
    }));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="teacher-assignment-container">
      <h2>Assign Teachers to Subjects</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit} className="assignment-form">
        <div className="form-group">
          <label htmlFor="teacherId">Select Teacher:</label>
          <select
            id="teacherId"
            name="teacherId"
            value={formData.teacherId}
            onChange={handleInputChange}
            className="form-control"
            required
            disabled={isSubmitting}
          >
            <option value="">-- Select Teacher --</option>
            {teachers.length > 0 ? (
              teachers.map(teacher => {
                console.log('Rendering teacher:', teacher);
                return (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.name || 'Unnamed Teacher'} ({teacher.email || 'No email'})
                  </option>
                );
              })
            ) : (
              <option value="" disabled>No teachers available</option>
            )}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="classId">Select Class:</label>
          <select
            id="classId"
            name="classId"
            value={formData.classId}
            onChange={handleClassChange}
            className="form-control"
            required
            disabled={isSubmitting}
          >
            <option value="">-- Select Class --</option>
            {classes.map((classLevel, index) => (
              <option key={index} value={classLevel}>
                {classLevel}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="subjectId">Select Subject:</label>
          <select
            id="subjectId"
            name="subjectId"
            value={formData.subjectId}
            onChange={handleInputChange}
            className="form-control"
            required
            disabled={!formData.classId || isSubmitting}
          >
            <option value="">-- Select Subject --</option>
            {subjects
              .filter(subject => subject.classLevel === formData.classId)
              .map(subject => (
                <option key={subject._id} value={subject._id}>
                  {subject.name}
                </option>
              ))}
          </select>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Assigning...' : 'Assign Teacher'}
        </button>
      </form>

      <div className="assignments-list mt-4">
        <h3>Current Assignments</h3>
        {isLoading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <p>Loading assignments...</p>
          </div>
        ) : error ? (
          <div className="alert alert-warning">
            {error}
            <button 
              className="btn btn-sm btn-link" 
              onClick={fetchData}
            >
              Retry
            </button>
          </div>
        ) : assignments.length === 0 ? (
          <div className="alert alert-info">
            No teacher assignments found. Please add a new assignment.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="thead-light">
                <tr>
                  <th>Teacher</th>
                  <th>Class</th>
                  <th>Subject</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map(assignment => (
                  <tr key={assignment._id}>
                    <td>{assignment.teacherName}</td>
                    <td>{assignment.classId}</td>
                    <td>{assignment.subjectName}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteAssignment(assignment._id)}
                        disabled={isSubmitting}
                      >
                        Remove
                      </button>
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

export default TeacherSubjectAssignment;
