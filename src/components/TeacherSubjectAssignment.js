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
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    teacherId: '',
    courseId: '',
    classId: ''
  });
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [users, coursesData, assignmentsData] = await Promise.all([
        getUsers(),
        getCourses(),
        getTeacherAssignments()
      ]);

      // ✅ Handle both lowercase & uppercase role
      const teacherUsers = users.filter(
        user => user.role?.toLowerCase() === 'teacher'
      );

      setTeachers(teacherUsers);
      setCourses(coursesData);

      const uniqueClasses = [...new Set(coursesData.map(course => course.classLevel))];
      setClasses(uniqueClasses);

      setAssignments(assignmentsData);

    } catch (err) {
      console.error('Error loading data:', err);
      toast.error('Failed to load data');
      setError(err.message);
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
    if (!formData.teacherId || !formData.courseId || !formData.classId) {
      toast.error('Please fill in all fields');
      return;
    }

    const assignmentExists = assignments.some(
      a => a.teacherId._id === formData.teacherId && 
           a.courseId._id === formData.courseId && 
           a.classId === formData.classId
    );

    if (assignmentExists) {
      toast.warning('This assignment already exists');
      return;
    }

    setIsSubmitting(true);
    try {
      await assignTeacherToSubject(formData);
      toast.success('Teacher assigned successfully!');
      await fetchData();
      setFormData({ teacherId: '', courseId: '', classId: '' });
    } catch (err) {
      console.error('Error assigning teacher:', err);
      toast.error('Failed to assign teacher');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAssignment = async (id) => {
    if (!window.confirm('Are you sure you want to remove this assignment?')) return;
    try {
      await deleteTeacherAssignment(id);
      toast.success('Assignment removed');
      await fetchData();
    } catch (err) {
      console.error('Error deleting assignment:', err);
      toast.error('Failed to delete assignment');
    }
  };

  const handleClassChange = (e) => {
    const classId = e.target.value;
    setFormData(prev => ({
      ...prev,
      classId,
      courseId: '' 
    }));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="teacher-assignment-container">
      <h2>Assign Teachers to Subjects</h2>

      <form onSubmit={handleSubmit} className="assignment-form">
        <div className="form-group">
          <label htmlFor="teacherId">Select Teacher:</label>
          <select
            id="teacherId"
            name="teacherId"
            value={formData.teacherId}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
          >
            <option value="">-- Select Teacher --</option>
            {teachers.map(teacher => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.username || teacher.email}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="classId">Select Class:</label>
          <select
            id="classId"
            name="classId"
            value={formData.classId}
            onChange={handleClassChange}
            required
            disabled={isSubmitting}
          >
            <option value="">-- Select Class --</option>
            {classes.map((cls, i) => (
              <option key={i} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="courseId">Select Subject:</label>
          <select
            id="courseId"
            name="courseId"
            value={formData.courseId}
            onChange={handleInputChange}
            required
            disabled={!formData.classId || isSubmitting}
          >
            <option value="">-- Select Subject --</option>
            {courses
              .filter(course => course.classLevel === formData.classId)
              .map(course => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
          </select>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Assigning...' : 'Assign Teacher'}
        </button>
      </form>

      <div className="assignments-list">
        <h3>Current Assignments</h3>
        {assignments.length === 0 ? (
          <div>No teacher assignments found.</div>
        ) : (
          <table>
            <thead>
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
                  <td>{assignment.teacherId?.username || assignment.teacherId?.email}</td>
                  <td>{assignment.classId}</td>
                  <td>{assignment.courseId?.name}</td>
                  <td>
                    <button 
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
        )}
      </div>
    </div>
  );
};

export default TeacherSubjectAssignment;
