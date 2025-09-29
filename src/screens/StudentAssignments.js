import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardList, Clock, Calendar, BookOpen,
  Upload, Eye, CheckCircle, AlertCircle,
  Search, Filter, SortAsc, SortDesc
} from 'lucide-react';
import { Card, Button, Badge, Progress } from '../components/ui/PremiumComponents';
import { useTheme } from '../contexts/PremiumContexts';
import StudentPageWrapper from '../components/StudentPageWrapper';

const StudentAssignments = () => {
  const { theme } = useTheme();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');

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
      attachments: ['chapter5.pdf', 'homework_guidelines.pdf']
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
      attachments: ['project_requirements.pdf']
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
      attachments: ['essay_guidelines.pdf']
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
      attachments: ['assignment_specs.pdf', 'code_template.py']
    }
  ];

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
              <Button variant="primary" className="flex items-center gap-2">
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
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {!assignment.submitted && (
                          <Button variant="primary" size="sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Submit
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
      </motion.div>
    </StudentPageWrapper>
  );
};

export default StudentAssignments;