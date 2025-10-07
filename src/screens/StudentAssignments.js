import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardList, Clock, Calendar, BookOpen,
  Upload, Eye, CheckCircle, AlertCircle,
  Search, Filter, SortAsc, SortDesc, X, FileText, Download
} from 'lucide-react';
import { Card, Button, Badge, Progress } from '../components/ui/PremiumComponents';
import { useTheme } from '../contexts/PremiumContexts';
import StudentPageWrapper from '../components/StudentPageWrapper';

const StudentAssignments = () => {
  const { theme } = useTheme();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [submissionText, setSubmissionText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const assignments = [
    {
      id: 1,
      title: 'Math Homework - Chapter 5',
      course: 'Advanced Mathematics',
      instructor: 'Dr. Jane Smith',
      dueDate: '2024-02-15',
      status: 'pending',
      priority: 'high',
      description: 'Complete exercises 1-20 from chapter 5. Show all work and submit as PDF.',
      points: 100,
      submitted: false,
      grade: null,
      attachments: ['chapter5.pdf', 'homework_guidelines.pdf'],
      submittedFiles: [],
      submissionDate: null,
      feedback: null
    },
    {
      id: 2,
      title: 'Science Project - Photosynthesis',
      course: 'Introduction to Science',
      instructor: 'Prof. Brown',
      dueDate: '2024-02-20',
      status: 'in_progress',
      priority: 'medium',
      description: 'Research and present findings on photosynthesis process. Include diagrams and examples.',
      points: 150,
      submitted: false,
      grade: null,
      attachments: ['project_requirements.pdf'],
      submittedFiles: [],
      submissionDate: null,
      feedback: null
    },
    {
      id: 3,
      title: 'Creative Writing Essay',
      course: 'Creative Writing',
      instructor: 'Ms. Davis',
      dueDate: '2024-02-10',
      status: 'completed',
      priority: 'low',
      description: 'Write a 1000-word creative essay on the topic "A Day in the Future".',
      points: 120,
      submitted: true,
      grade: 'A-',
      attachments: ['essay_guidelines.pdf'],
      submittedFiles: ['my_essay.pdf'],
      submissionDate: '2024-02-08',
      feedback: 'Excellent work! Very creative and well-structured.'
    },
    {
      id: 4,
      title: 'Programming Assignment - OOP',
      course: 'Computer Programming',
      instructor: 'Mr. Wilson',
      dueDate: '2024-02-25',
      status: 'pending',
      priority: 'high',
      description: 'Create a Python program demonstrating object-oriented programming concepts.',
      points: 200,
      submitted: false,
      grade: null,
      attachments: ['assignment_specs.pdf', 'code_template.py'],
      submittedFiles: [],
      submissionDate: null,
      feedback: null
    }
  ];

  // Assignment functionality handlers
  const handleSubmitAssignment = (assignmentId) => {
    setSelectedAssignment(assignments.find(a => a.id === assignmentId));
    setIsSubmissionModalOpen(true);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmission = () => {
    if (!submissionText.trim() && selectedFiles.length === 0) {
      alert('Please add submission text or upload files');
      return;
    }

    // Simulate submission
    alert('Assignment submitted successfully!');
    setSubmissionText('');
    setSelectedFiles([]);
    setIsSubmissionModalOpen(false);
    setSelectedAssignment(null);
  };

  const handleViewAssignment = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleDownloadAttachment = (fileName) => {
    alert(`Downloading ${fileName}...`);
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true;
    if (filter === 'pending') return assignment.status === 'pending';
    if (filter === 'in_progress') return assignment.status === 'in_progress';
    if (filter === 'completed') return assignment.status === 'completed';
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'warning';
      case 'pending': return 'danger';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      default: return <ClipboardList className="w-4 h-4" />;
    }
  };

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

  return (
    <StudentPageWrapper>
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
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                My Assignments 📝
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Track your assignments and stay on top of deadlines
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="primary" 
                className="flex items-center gap-2"
                onClick={() => setIsSubmissionModalOpen(true)}
              >
                <Upload className="w-4 h-4" />
                Submit Assignment
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Stats Cards */}
        <motion.section className="mb-8" variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Pending</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {assignments.filter(a => a.status === 'pending').length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {assignments.filter(a => a.status === 'in_progress').length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Completed</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {assignments.filter(a => a.status === 'completed').length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Points</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {assignments.reduce((sum, a) => sum + a.points, 0)}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </motion.section>

        {/* Filters */}
        <motion.section className="mb-6" variants={itemVariants}>
          <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search assignments..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="all">All Assignments</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <Button variant="ghost" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </Card>
        </motion.section>

        {/* Assignments List */}
        <motion.section variants={itemVariants}>
          <div className="space-y-4">
            {filteredAssignments.map((assignment, index) => (
              <motion.div
                key={assignment.id}
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:shadow-orange-500/10 dark:hover:shadow-orange-400/20 transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                            <ClipboardList className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {assignment.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {assignment.course} • {assignment.instructor}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusColor(assignment.status)} size="sm">
                            {getStatusIcon(assignment.status)}
                            {assignment.status.replace('_', ' ')}
                          </Badge>
                          <Badge variant={getPriorityColor(assignment.priority)} size="sm">
                            {assignment.priority} priority
                          </Badge>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {assignment.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {assignment.points} points
                        </div>
                        {assignment.grade && (
                          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                            <CheckCircle className="w-4 h-4" />
                            Grade: {assignment.grade}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {assignment.attachments && assignment.attachments.length > 0 && (
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {assignment.attachments.length} attachment(s)
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewAssignment(assignment)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {!assignment.submitted ? (
                          <Button 
                            variant="primary" 
                            size="sm"
                            onClick={() => handleSubmitAssignment(assignment.id)}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Submit
                          </Button>
                        ) : (
                          <Button 
                            variant="success" 
                            size="sm"
                            disabled
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Submitted
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Assignment Detail Modal */}
        {selectedAssignment && !isSubmissionModalOpen && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedAssignment(null)}
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedAssignment.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedAssignment.course} • {selectedAssignment.instructor}
                    </p>
                  </div>
                  <Button variant="ghost" onClick={() => setSelectedAssignment(null)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedAssignment.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Assignment Details</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Due Date:</span>
                          <span className="font-medium">{new Date(selectedAssignment.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Points:</span>
                          <span className="font-medium">{selectedAssignment.points}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Status:</span>
                          <Badge variant={getStatusColor(selectedAssignment.status)}>
                            {selectedAssignment.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Priority:</span>
                          <Badge variant={getPriorityColor(selectedAssignment.priority)}>
                            {selectedAssignment.priority}
                          </Badge>
                        </div>
                        {selectedAssignment.grade && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Grade:</span>
                            <span className="font-medium text-green-600">{selectedAssignment.grade}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Attachments</h3>
                      <div className="space-y-2">
                        {selectedAssignment.attachments?.map((attachment, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-gray-500" />
                              <span className="text-sm font-medium">{attachment}</span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDownloadAttachment(attachment)}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {selectedAssignment.submitted && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Submission Details</h3>
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <p className="text-sm text-green-800 dark:text-green-200 mb-2">
                          Submitted on {new Date(selectedAssignment.submissionDate).toLocaleDateString()}
                        </p>
                        {selectedAssignment.feedback && (
                          <div>
                            <h4 className="font-medium mb-2">Feedback:</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{selectedAssignment.feedback}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    {!selectedAssignment.submitted && (
                      <Button 
                        variant="primary"
                        onClick={() => {
                          setIsSubmissionModalOpen(true);
                        }}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Submit Assignment
                      </Button>
                    )}
                    <Button 
                      variant="ghost"
                      onClick={() => setSelectedAssignment(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Submission Modal */}
        {isSubmissionModalOpen && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsSubmissionModalOpen(false)}
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Submit Assignment
                  </h2>
                  <Button variant="ghost" onClick={() => setIsSubmissionModalOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {selectedAssignment && (
                  <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                      {selectedAssignment.title}
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Due: {new Date(selectedAssignment.dueDate).toLocaleDateString()} • {selectedAssignment.points} points
                    </p>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Submission Text
                    </label>
                    <textarea
                      value={submissionText}
                      onChange={(e) => setSubmissionText(e.target.value)}
                      placeholder="Enter your submission text here..."
                      rows={6}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Upload Files
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 dark:text-gray-400">Click to upload files or drag and drop</p>
                      </label>
                    </div>

                    {selectedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">Selected Files:</h4>
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                            <span className="text-sm">{file.name}</span>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRemoveFile(index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      variant="primary"
                      onClick={handleSubmission}
                      disabled={!submissionText.trim() && selectedFiles.length === 0}
                    >
                      Submit Assignment
                    </Button>
                    <Button 
                      variant="ghost"
                      onClick={() => {
                        setSubmissionText('');
                        setSelectedFiles([]);
                        setIsSubmissionModalOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </StudentPageWrapper>
  );
};

export default StudentAssignments;