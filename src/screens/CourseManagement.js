import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCourses, createCourse } from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, Plus, Search, Filter, Edit, Trash2,
  Eye, MoreVertical, Upload, Download, Calendar,
  Users, Clock, Star, Award, FileText, Play,
  CheckCircle, AlertCircle, RefreshCw, Settings
} from 'lucide-react';
import { Card, Button, Input } from '../components/ui/PremiumComponents';
import { useTheme } from '../contexts/PremiumContexts';

const CourseManagement = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterLevel, setFilterLevel] = useState('All');
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    price: '',
    category: '',
    level: 'Beginner',
    startDate: '',
    endDate: '',
    status: 'Active'
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await getCourses();
      setCourses(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch courses. Please try again.');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleAddCourseForm = () => {
    setShowAddCourseForm(!showAddCourseForm);
    setEditingCourseId(null);
    setNewCourse({
      title: '',
      description: '',
      instructor: '',
      duration: '',
      price: '',
      category: '',
      level: 'Beginner',
      startDate: '',
      endDate: '',
      status: 'Active'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitCourse = async (e) => {
    e.preventDefault();
    try {
      if (editingCourseId) {
        // Assuming an updateCourse function exists in api.js
        // await updateCourse(editingCourseId, newCourse);
        alert('Course update functionality not fully implemented in mock API.');
      } else {
        await createCourse(newCourse);
      }
      fetchCourses();
      toggleAddCourseForm();
    } catch (err) {
      setError(`Failed to ${editingCourseId ? 'update' : 'create'} course.`);
      console.error(`Error ${editingCourseId ? 'updating' : 'creating'} course:`, err);
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourseId(course.id);
    setNewCourse(course);
    setShowAddCourseForm(true);
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        // Assuming a deleteCourse function exists in api.js
        // await deleteCourse(id);
        alert('Course delete functionality not fully implemented in mock API.');
        fetchCourses();
      } catch (err) {
        setError('Failed to delete course.');
        console.error('Error deleting course:', err);
      }
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || course.category === filterCategory;
    const matchesLevel = filterLevel === 'All' || course.level === filterLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading courses...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <motion.div
        className="p-6 lg:p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.header className="mb-8" variants={itemVariants}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Course Management 📚
              </h1>
              <p className="text-gray-600 text-lg">
                Manage academic courses, content, and instructors
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                onClick={toggleAddCourseForm}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                {showAddCourseForm ? 'Cancel' : 'Add New Course'}
              </Button>
              <Button
                variant="ghost"
                onClick={fetchCourses}
                className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            </div>
          </div>
        </motion.header>

        {error && (
          <motion.div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative mb-6"
            role="alert"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="inline w-5 h-5 mr-2" />
            <span className="block sm:inline">{error}</span>
          </motion.div>
        )}

        <AnimatePresence>
          {showAddCourseForm && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: -50, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -50, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 bg-white shadow-lg rounded-xl border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingCourseId ? 'Edit Course' : 'Add New Course'}
                </h2>
                <form onSubmit={handleSubmitCourse} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Course Title"
                    name="title"
                    value={newCourse.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Introduction to React"
                    required
                    icon={BookOpen}
                  />
                  <Input
                    label="Instructor"
                    name="instructor"
                    value={newCourse.instructor}
                    onChange={handleInputChange}
                    placeholder="e.g., Jane Doe"
                    required
                    icon={Users}
                  />
                  <Input
                    label="Description"
                    name="description"
                    value={newCourse.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of the course"
                    type="textarea"
                    required
                    icon={FileText}
                  />
                  <Input
                    label="Duration (e.g., 8 weeks)"
                    name="duration"
                    value={newCourse.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 8 weeks"
                    icon={Clock}
                  />
                  <Input
                    label="Price"
                    name="price"
                    value={newCourse.price}
                    onChange={handleInputChange}
                    placeholder="e.g., $99.99"
                    type="number"
                    icon={Star}
                  />
                  <Input
                    label="Category"
                    name="category"
                    value={newCourse.category}
                    onChange={handleInputChange}
                    placeholder="e.g., Programming"
                    icon={BookOpen}
                  />
                  <div className="col-span-1">
                    <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
                      Level
                    </label>
                    <div className="relative">
                      <select
                        id="level"
                        name="level"
                        value={newCourse.level}
                        onChange={handleInputChange}
                        className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Award className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                  <Input
                    label="Start Date"
                    name="startDate"
                    value={newCourse.startDate}
                    onChange={handleInputChange}
                    type="date"
                    icon={Calendar}
                  />
                  <Input
                    label="End Date"
                    name="endDate"
                    value={newCourse.endDate}
                    onChange={handleInputChange}
                    type="date"
                    icon={Calendar}
                  />
                  <div className="col-span-1">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <div className="relative">
                      <select
                        id="status"
                        name="status"
                        value={newCourse.status}
                        onChange={handleInputChange}
                        className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="Active">Active</option>
                        <option value="Archived">Archived</option>
                        <option value="Draft">Draft</option>
                      </select>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CheckCircle className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-full flex justify-end gap-4 mt-4">
                    <Button variant="secondary" onClick={toggleAddCourseForm}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                      {editingCourseId ? 'Update Course' : 'Create Course'}
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Courses</h2>
          <Card className="p-6 bg-white shadow-lg rounded-xl border border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={Search}
                className="w-full md:w-1/3"
              />
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative w-full sm:w-auto">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="All">All Categories</option>
                    {Array.from(new Set(courses.map(c => c.category).filter(Boolean))).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                </div>
                <div className="relative w-full sm:w-auto">
                  <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="All">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Award className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Instructor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCourses.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        No courses found.
                      </td>
                    </tr>
                  ) : (
                    filteredCourses.map((course) => (
                      <motion.tr
                        key={course._id || course.id}
                        variants={itemVariants}
                        whileHover={{ backgroundColor: theme === 'dark' ? '#1f2937' : '#f9fafb' }}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <BookOpen className="w-5 h-5 text-blue-500 mr-3" />
                            <div className="text-sm font-medium text-gray-900">{course.title || course.courseName}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{course.instructor || 'TBD'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {course.category || course.department || 'General'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {course.level || 'Beginner'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${(course.status || 'Active') === 'Active' ? 'bg-green-100 text-green-800' :
                            (course.status || 'Active') === 'Archived' ? 'bg-gray-100 text-gray-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                            {course.status || 'Active'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditCourse(course)}
                              className="text-indigo-600 hover:text-indigo-900 p-2"
                              aria-label="Edit course"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteCourse(course._id || course.id)}
                              className="text-red-600 hover:text-red-900 p-2"
                              aria-label="Delete course"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/courses/${course._id || course.id}`)}
                              className="text-gray-600 hover:text-gray-900 p-2"
                              aria-label="View course details"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default CourseManagement;