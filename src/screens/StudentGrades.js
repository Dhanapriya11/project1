import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award, TrendingUp, BookOpen, Calendar,
  BarChart3, PieChart, Target, Star,
  Search, Filter, Download, Eye
} from 'lucide-react';
import { Card, Button, Badge, Progress } from '../components/ui/PremiumComponents';
import { useTheme } from '../contexts/PremiumContexts';
import StudentPageWrapper from '../components/StudentPageWrapper';

const StudentGrades = () => {
  const { theme } = useTheme();
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  const grades = [
    {
      id: 1,
      course: 'Advanced Mathematics',
      instructor: 'Dr. Jane Smith',
      assignments: [
        { name: 'Chapter 5 Homework', points: 95, maxPoints: 100, weight: 15, date: '2024-01-15' },
        { name: 'Midterm Exam', points: 88, maxPoints: 100, weight: 30, date: '2024-01-20' },
        { name: 'Project Presentation', points: 92, maxPoints: 100, weight: 20, date: '2024-01-25' },
        { name: 'Final Exam', points: 90, maxPoints: 100, weight: 35, date: '2024-02-01' }
      ],
      currentGrade: 'A-',
      gpa: 3.7,
      credits: 4
    },
    {
      id: 2,
      course: 'Introduction to Science',
      instructor: 'Prof. Brown',
      assignments: [
        { name: 'Lab Report 1', points: 85, maxPoints: 100, weight: 20, date: '2024-01-10' },
        { name: 'Quiz 1', points: 92, maxPoints: 100, weight: 15, date: '2024-01-12' },
        { name: 'Research Paper', points: 88, maxPoints: 100, weight: 25, date: '2024-01-18' },
        { name: 'Final Project', points: 95, maxPoints: 100, weight: 40, date: '2024-01-30' }
      ],
      currentGrade: 'A',
      gpa: 4.0,
      credits: 3
    },
    {
      id: 3,
      course: 'Creative Writing',
      instructor: 'Ms. Davis',
      assignments: [
        { name: 'Poetry Collection', points: 90, maxPoints: 100, weight: 25, date: '2024-01-08' },
        { name: 'Short Story', points: 87, maxPoints: 100, weight: 30, date: '2024-01-15' },
        { name: 'Portfolio Review', points: 93, maxPoints: 100, weight: 45, date: '2024-01-22' }
      ],
      currentGrade: 'A-',
      gpa: 3.7,
      credits: 3
    },
    {
      id: 4,
      course: 'Computer Programming',
      instructor: 'Mr. Wilson',
      assignments: [
        { name: 'Assignment 1', points: 78, maxPoints: 100, weight: 20, date: '2024-01-05' },
        { name: 'Assignment 2', points: 85, maxPoints: 100, weight: 20, date: '2024-01-12' },
        { name: 'Midterm Project', points: 82, maxPoints: 100, weight: 30, date: '2024-01-19' },
        { name: 'Final Project', points: 88, maxPoints: 100, weight: 30, date: '2024-01-26' }
      ],
      currentGrade: 'B+',
      gpa: 3.3,
      credits: 4
    }
  ];

  const calculateOverallGPA = () => {
    const totalPoints = grades.reduce((sum, course) => sum + (course.gpa * course.credits), 0);
    const totalCredits = grades.reduce((sum, course) => sum + course.credits, 0);
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'success';
    if (grade.startsWith('B')) return 'warning';
    if (grade.startsWith('C')) return 'info';
    return 'danger';
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
                My Grades 🎓
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Track your academic progress and performance
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Grades
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Overall Stats */}
        <motion.section className="mb-8" variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Overall GPA</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {calculateOverallGPA()}
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
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Courses</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {grades.length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Credits</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {grades.reduce((sum, course) => sum + course.credits, 0)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Trend</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    +5.2%
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
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="all">All Courses</option>
                {grades.map(course => (
                  <option key={course.id} value={course.course}>{course.course}</option>
                ))}
              </select>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="current">Current Semester</option>
                <option value="all">All Time</option>
                <option value="last">Last Semester</option>
              </select>
            </div>
          </Card>
        </motion.section>

        {/* Course Grades */}
        <motion.section variants={itemVariants}>
          <div className="space-y-6">
            {grades.map((course, courseIndex) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-400/20 transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {course.course}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {course.instructor} • {course.credits} credits
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Current Grade</p>
                        <Badge variant={getGradeColor(course.currentGrade)} size="lg">
                          {course.currentGrade}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">GPA</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {course.gpa}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Assignments Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Assignment
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Points
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Weight
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Grade
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {course.assignments.map((assignment, index) => (
                          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              {assignment.name}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {assignment.points}/{assignment.maxPoints}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                              {assignment.weight}%
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                              {new Date(assignment.date).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                                    style={{ width: `${(assignment.points / assignment.maxPoints) * 100}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                  {((assignment.points / assignment.maxPoints) * 100).toFixed(1)}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default StudentGrades;