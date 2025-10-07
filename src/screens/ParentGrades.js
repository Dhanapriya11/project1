import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, TrendingDown, Award, BarChart3, GraduationCap, Star, User } from 'lucide-react';
import ParentPageWrapper from '../components/ParentPageWrapper';
import { useTheme } from '../contexts/PremiumContexts';

const ParentGrades = () => {
  const [selectedChild, setSelectedChild] = useState('both');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [viewMode, setViewMode] = useState('overview');
  const { theme } = useTheme();

  // Enhanced mock data for both children
  const childrenData = {
    aarav: {
      name: 'Aarav Patel',
      class: 'Class 10-B',
      avatar: '👦',
      overallGPA: 3.8,
      rank: 12,
      totalStudents: 85,
      subjects: [
        {
          name: 'Mathematics',
          grade: 'A',
          percentage: 92,
          teacher: 'Mrs. Sharma',
          trend: 'up',
          color: 'from-blue-500 to-blue-600',
          assignments: [
            { name: 'Algebra Test', score: 45, total: 50, date: '2024-01-18', type: 'Test' },
            { name: 'Geometry Quiz', score: 28, total: 30, date: '2024-01-15', type: 'Quiz' },
            { name: 'Homework Set 5', score: 18, total: 20, date: '2024-01-12', type: 'Homework' }
          ]
        },
        {
          name: 'Physics',
          grade: 'B+',
          percentage: 87,
          teacher: 'Mr. Gupta',
          trend: 'up',
          color: 'from-purple-500 to-purple-600',
          assignments: [
            { name: 'Mechanics Test', score: 42, total: 50, date: '2024-01-19', type: 'Test' },
            { name: 'Lab Report', score: 85, total: 100, date: '2024-01-16', type: 'Lab' },
            { name: 'Motion Quiz', score: 24, total: 30, date: '2024-01-13', type: 'Quiz' }
          ]
        },
        {
          name: 'Chemistry',
          grade: 'A-',
          percentage: 89,
          teacher: 'Dr. Singh',
          trend: 'same',
          color: 'from-green-500 to-green-600',
          assignments: [
            { name: 'Organic Chemistry Test', score: 44, total: 50, date: '2024-01-17', type: 'Test' },
            { name: 'Lab Practical', score: 88, total: 100, date: '2024-01-14', type: 'Lab' },
            { name: 'Formula Quiz', score: 26, total: 30, date: '2024-01-11', type: 'Quiz' }
          ]
        },
        {
          name: 'English',
          grade: 'B',
          percentage: 82,
          teacher: 'Ms. Patel',
          trend: 'down',
          color: 'from-yellow-500 to-yellow-600',
          assignments: [
            { name: 'Essay Writing', score: 32, total: 40, date: '2024-01-18', type: 'Assignment' },
            { name: 'Literature Test', score: 38, total: 50, date: '2024-01-15', type: 'Test' },
            { name: 'Grammar Quiz', score: 22, total: 30, date: '2024-01-12', type: 'Quiz' }
          ]
        },
        {
          name: 'Biology',
          grade: 'A',
          percentage: 94,
          teacher: 'Dr. Mehta',
          trend: 'up',
          color: 'from-red-500 to-red-600',
          assignments: [
            { name: 'Genetics Test', score: 47, total: 50, date: '2024-01-19', type: 'Test' },
            { name: 'Microscopy Lab', score: 93, total: 100, date: '2024-01-16', type: 'Lab' },
            { name: 'Cell Biology Quiz', score: 28, total: 30, date: '2024-01-13', type: 'Quiz' }
          ]
        }
      ]
    },
    maya: {
      name: 'Maya Sharma',
      class: 'Class 8-A',
      avatar: '👧',
      overallGPA: 4.0,
      rank: 3,
      totalStudents: 75,
      subjects: [
        {
          name: 'Mathematics',
          grade: 'A+',
          percentage: 96,
          teacher: 'Mr. Kumar',
          trend: 'up',
          color: 'from-blue-500 to-blue-600',
          assignments: [
            { name: 'Fractions Test', score: 48, total: 50, date: '2024-01-18', type: 'Test' },
            { name: 'Geometry Quiz', score: 29, total: 30, date: '2024-01-15', type: 'Quiz' },
            { name: 'Problem Solving', score: 19, total: 20, date: '2024-01-12', type: 'Homework' }
          ]
        },
        {
          name: 'Science',
          grade: 'A',
          percentage: 93,
          teacher: 'Mrs. Verma',
          trend: 'up',
          color: 'from-purple-500 to-purple-600',
          assignments: [
            { name: 'States of Matter', score: 46, total: 50, date: '2024-01-19', type: 'Test' },
            { name: 'Lab Experiment', score: 91, total: 100, date: '2024-01-16', type: 'Lab' },
            { name: 'Elements Quiz', score: 27, total: 30, date: '2024-01-13', type: 'Quiz' }
          ]
        },
        {
          name: 'English',
          grade: 'A+',
          percentage: 97,
          teacher: 'Ms. Joshi',
          trend: 'up',
          color: 'from-green-500 to-green-600',
          assignments: [
            { name: 'Creative Writing', score: 39, total: 40, date: '2024-01-17', type: 'Assignment' },
            { name: 'Reading Test', score: 48, total: 50, date: '2024-01-14', type: 'Test' },
            { name: 'Vocabulary Quiz', score: 29, total: 30, date: '2024-01-11', type: 'Quiz' }
          ]
        },
        {
          name: 'Social Studies',
          grade: 'A',
          percentage: 90,
          teacher: 'Mr. Agarwal',
          trend: 'same',
          color: 'from-yellow-500 to-yellow-600',
          assignments: [
            { name: 'History Test', score: 44, total: 50, date: '2024-01-18', type: 'Test' },
            { name: 'Geography Project', score: 88, total: 100, date: '2024-01-15', type: 'Project' },
            { name: 'Civics Quiz', score: 26, total: 30, date: '2024-01-12', type: 'Quiz' }
          ]
        },
        {
          name: 'Hindi',
          grade: 'A+',
          percentage: 98,
          teacher: 'Mrs. Sharma',
          trend: 'up',
          color: 'from-red-500 to-red-600',
          assignments: [
            { name: 'Literature Test', score: 49, total: 50, date: '2024-01-19', type: 'Test' },
            { name: 'Essay Writing', score: 39, total: 40, date: '2024-01-16', type: 'Assignment' },
            { name: 'Grammar Quiz', score: 30, total: 30, date: '2024-01-13', type: 'Quiz' }
          ]
        }
      ]
    }
  };

  const getGradeColor = (percentage) => {
    if (percentage >= 95) return 'text-green-600 dark:text-green-400';
    if (percentage >= 90) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 85) return 'text-purple-600 dark:text-purple-400';
    if (percentage >= 80) return 'text-yellow-600 dark:text-yellow-400';
    if (percentage >= 75) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <BarChart3 className="w-4 h-4 text-yellow-500" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const renderOverviewCards = (data) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Overall GPA</p>
            <p className="text-3xl font-bold">{data.overallGPA}</p>
          </div>
          <GraduationCap className="w-8 h-8 text-blue-200" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">Class Rank</p>
            <p className="text-3xl font-bold">#{data.rank}</p>
            <p className="text-purple-200 text-xs">of {data.totalStudents} students</p>
          </div>
          <Award className="w-8 h-8 text-purple-200" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Average Score</p>
            <p className="text-3xl font-bold">
              {Math.round(data.subjects.reduce((acc, sub) => acc + sub.percentage, 0) / data.subjects.length)}%
            </p>
          </div>
          <Star className="w-8 h-8 text-green-200" />
        </div>
      </motion.div>
    </div>
  );

  const renderSubjectGrades = (data) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-primary dark:bg-dark-surface-primary rounded-2xl p-6 shadow-lg mb-6"
    >
      <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-6">
        Subject Performance
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.subjects.map((subject, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-background-secondary dark:bg-dark-background-secondary rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer"
            onClick={() => setSelectedSubject(subject)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${subject.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                {subject.name.charAt(0)}
              </div>
              {getTrendIcon(subject.trend)}
            </div>
            <h4 className="font-semibold text-text-primary dark:text-dark-text-primary mb-1">
              {subject.name}
            </h4>
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-2">
              {subject.teacher}
            </p>
            <div className="flex items-center justify-between">
              <span className={`text-2xl font-bold ${getGradeColor(subject.percentage)}`}>
                {subject.grade}
              </span>
              <span className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                {subject.percentage}%
              </span>
            </div>
            <div className="w-full h-2 bg-background-tertiary dark:bg-dark-background-tertiary rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${subject.color} transition-all duration-300`}
                style={{ width: `${subject.percentage}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderSubjectDetail = (subject) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-primary dark:bg-dark-surface-primary rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${subject.color} flex items-center justify-center text-white font-bold text-2xl shadow-lg`}>
            {subject.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">
              {subject.name}
            </h3>
            <p className="text-text-secondary dark:text-dark-text-secondary">{subject.teacher}</p>
          </div>
        </div>
        <button
          onClick={() => setSelectedSubject(null)}
          className="px-4 py-2 bg-background-secondary dark:bg-dark-background-secondary text-text-secondary dark:text-dark-text-secondary rounded-xl hover:bg-background-tertiary dark:hover:bg-dark-background-tertiary transition-all"
        >
          Back to All Subjects
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="text-center p-4 bg-background-secondary dark:bg-dark-background-secondary rounded-xl">
          <p className="text-3xl font-bold text-accent-primary">{subject.grade}</p>
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Current Grade</p>
        </div>
        <div className="text-center p-4 bg-background-secondary dark:bg-dark-background-secondary rounded-xl">
          <p className="text-3xl font-bold text-text-primary dark:text-dark-text-primary">{subject.percentage}%</p>
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Average Score</p>
        </div>
        <div className="text-center p-4 bg-background-secondary dark:bg-dark-background-secondary rounded-xl flex items-center justify-center space-x-2">
          {getTrendIcon(subject.trend)}
          <span className="text-lg font-semibold text-text-primary dark:text-dark-text-primary capitalize">
            {subject.trend}
          </span>
        </div>
      </div>

      <h4 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-4">
        Recent Assignments
      </h4>
      <div className="space-y-3">
        {subject.assignments.map((assignment, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-background-secondary dark:bg-dark-background-secondary rounded-xl"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${subject.color} flex items-center justify-center text-white font-bold text-sm`}>
                {assignment.type.charAt(0)}
              </div>
              <div>
                <h5 className="font-semibold text-text-primary dark:text-dark-text-primary">
                  {assignment.name}
                </h5>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                  {assignment.type} • {formatDate(assignment.date)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-text-primary dark:text-dark-text-primary">
                {assignment.score}/{assignment.total}
              </p>
              <p className={`text-sm font-medium ${getGradeColor((assignment.score / assignment.total) * 100)}`}>
                {Math.round((assignment.score / assignment.total) * 100)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const getCurrentData = () => {
    if (selectedChild === 'both') {
      return Object.values(childrenData);
    }
    return [childrenData[selectedChild]];
  };

  return (
    <ParentPageWrapper>
      <div className="min-h-screen p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
            Academic Performance
          </h1>
          <p className="text-text-secondary dark:text-dark-text-secondary">
            Track your children's grades and academic progress
          </p>
        </motion.div>

        {/* Child Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-primary dark:bg-dark-surface-primary rounded-2xl p-6 shadow-lg mb-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <User className="w-6 h-6 text-accent-primary" />
              <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                Select Child
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedChild('both')}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedChild === 'both'
                    ? 'bg-accent-primary text-white shadow-lg'
                    : 'bg-background-secondary dark:bg-dark-background-secondary text-text-secondary dark:text-dark-text-secondary hover:bg-background-tertiary dark:hover:bg-dark-background-tertiary'
                }`}
              >
                Both Children
              </button>
              <button
                onClick={() => setSelectedChild('aarav')}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedChild === 'aarav'
                    ? 'bg-accent-primary text-white shadow-lg'
                    : 'bg-background-secondary dark:bg-dark-background-secondary text-text-secondary dark:text-dark-text-secondary hover:bg-background-tertiary dark:hover:bg-dark-background-tertiary'
                }`}
              >
                👦 Aarav
              </button>
              <button
                onClick={() => setSelectedChild('maya')}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedChild === 'maya'
                    ? 'bg-accent-primary text-white shadow-lg'
                    : 'bg-background-secondary dark:bg-dark-background-secondary text-text-secondary dark:text-dark-text-secondary hover:bg-background-tertiary dark:hover:bg-dark-background-tertiary'
                }`}
              >
                👧 Maya
              </button>
            </div>
          </div>
        </motion.div>

        {/* Content based on selection */}
        {selectedSubject ? (
          renderSubjectDetail(selectedSubject)
        ) : selectedChild === 'both' ? (
          <div className="space-y-8">
            {/* Comparison Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Object.entries(childrenData).map(([key, data]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: key === 'aarav' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-surface-primary dark:bg-dark-surface-primary rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="text-3xl">{data.avatar}</div>
                    <div>
                      <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">
                        {data.name}
                      </h3>
                      <p className="text-text-secondary dark:text-dark-text-secondary">{data.class}</p>
                    </div>
                    <div className="ml-auto">
                      <div className="text-right">
                        <p className="text-3xl font-bold text-accent-primary">{data.overallGPA}</p>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">GPA</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-background-secondary dark:bg-dark-background-secondary rounded-lg">
                      <p className="text-lg font-bold text-text-primary dark:text-dark-text-primary">#{data.rank}</p>
                      <p className="text-xs text-text-secondary dark:text-dark-text-secondary">Class Rank</p>
                    </div>
                    <div className="text-center p-3 bg-background-secondary dark:bg-dark-background-secondary rounded-lg">
                      <p className="text-lg font-bold text-text-primary dark:text-dark-text-primary">
                        {Math.round(data.subjects.reduce((acc, sub) => acc + sub.percentage, 0) / data.subjects.length)}%
                      </p>
                      <p className="text-xs text-text-secondary dark:text-dark-text-secondary">Average</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {data.subjects.slice(0, 3).map((subject, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-background-secondary dark:bg-dark-background-secondary rounded-lg">
                        <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                          {subject.name}
                        </span>
                        <span className={`text-sm font-bold ${getGradeColor(subject.percentage)}`}>
                          {subject.grade}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {renderOverviewCards(childrenData[selectedChild])}
            {renderSubjectGrades(childrenData[selectedChild])}
          </div>
        )}
      </div>
    </ParentPageWrapper>
  );
};

export default ParentGrades;
