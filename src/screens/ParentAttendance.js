import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, TrendingDown, Clock, AlertTriangle, CheckCircle, XCircle, User, BarChart } from 'lucide-react';
import ParentPageWrapper from '../components/ParentPageWrapper';
import { useTheme } from '../contexts/PremiumContexts';

const ParentAttendance = () => {
  const [selectedChild, setSelectedChild] = useState('both');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [viewMode, setViewMode] = useState('overview');
  const { theme } = useTheme();

  // Enhanced mock data for both children
  const childrenData = {
    aarav: {
      name: 'Aarav Patel',
      class: 'Class 10-B',
      avatar: '👦',
      attendance: {
        overall: 92,
        thisMonth: 89,
        thisWeek: 100,
        totalDays: 120,
        presentDays: 110,
        absentDays: 7,
        lateDays: 3
      },
      subjects: [
        { name: 'Mathematics', attendance: 95, present: 38, total: 40, color: 'from-blue-500 to-blue-600' },
        { name: 'Physics', attendance: 88, present: 35, total: 40, color: 'from-purple-500 to-purple-600' },
        { name: 'Chemistry', attendance: 92, present: 37, total: 40, color: 'from-green-500 to-green-600' },
        { name: 'English', attendance: 90, present: 36, total: 40, color: 'from-yellow-500 to-yellow-600' },
        { name: 'Biology', attendance: 93, present: 37, total: 40, color: 'from-red-500 to-red-600' }
      ],
      recentAttendance: [
        { date: '2024-01-20', status: 'present', subjects: ['Math', 'Physics', 'Chemistry'] },
        { date: '2024-01-19', status: 'present', subjects: ['English', 'Biology', 'Math'] },
        { date: '2024-01-18', status: 'late', subjects: ['Physics', 'Chemistry', 'English'], lateBy: '15 min' },
        { date: '2024-01-17', status: 'present', subjects: ['Biology', 'Math', 'Physics'] },
        { date: '2024-01-16', status: 'absent', subjects: ['Chemistry', 'English', 'Biology'], reason: 'Sick' }
      ]
    },
    maya: {
      name: 'Maya Sharma',
      class: 'Class 8-A',
      avatar: '👧',
      attendance: {
        overall: 96,
        thisMonth: 94,
        thisWeek: 100,
        totalDays: 115,
        presentDays: 110,
        absentDays: 3,
        lateDays: 2
      },
      subjects: [
        { name: 'Mathematics', attendance: 98, present: 39, total: 40, color: 'from-blue-500 to-blue-600' },
        { name: 'Science', attendance: 94, present: 38, total: 40, color: 'from-purple-500 to-purple-600' },
        { name: 'English', attendance: 96, present: 38, total: 40, color: 'from-green-500 to-green-600' },
        { name: 'Social Studies', attendance: 92, present: 37, total: 40, color: 'from-yellow-500 to-yellow-600' },
        { name: 'Hindi', attendance: 100, present: 40, total: 40, color: 'from-red-500 to-red-600' }
      ],
      recentAttendance: [
        { date: '2024-01-20', status: 'present', subjects: ['Math', 'Science', 'English'] },
        { date: '2024-01-19', status: 'present', subjects: ['Social Studies', 'Hindi', 'Math'] },
        { date: '2024-01-18', status: 'present', subjects: ['Science', 'English', 'Social Studies'] },
        { date: '2024-01-17', status: 'present', subjects: ['Hindi', 'Math', 'Science'] },
        { date: '2024-01-16', status: 'late', subjects: ['English', 'Social Studies', 'Hindi'], lateBy: '10 min' }
      ]
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'absent': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'late': return <Clock className="w-5 h-5 text-yellow-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      case 'absent': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'late': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const renderOverviewCards = (data) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Overall Attendance</p>
            <p className="text-3xl font-bold">{data.attendance.overall}%</p>
          </div>
          <CheckCircle className="w-8 h-8 text-green-200" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Present Days</p>
            <p className="text-3xl font-bold">{data.attendance.presentDays}</p>
            <p className="text-blue-200 text-xs">of {data.attendance.totalDays} days</p>
          </div>
          <Calendar className="w-8 h-8 text-blue-200" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-100 text-sm font-medium">Absent Days</p>
            <p className="text-3xl font-bold">{data.attendance.absentDays}</p>
          </div>
          <XCircle className="w-8 h-8 text-red-200" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-yellow-100 text-sm font-medium">Late Days</p>
            <p className="text-3xl font-bold">{data.attendance.lateDays}</p>
          </div>
          <Clock className="w-8 h-8 text-yellow-200" />
        </div>
      </motion.div>
    </div>
  );

  const renderSubjectAttendance = (data) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-primary dark:bg-dark-surface-primary rounded-2xl p-6 shadow-lg mb-6"
    >
      <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-6">
        Subject-wise Attendance
      </h3>
      <div className="space-y-4">
        {data.subjects.map((subject, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-background-secondary dark:bg-dark-background-secondary rounded-xl">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${subject.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                {subject.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold text-text-primary dark:text-dark-text-primary">{subject.name}</h4>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                  {subject.present}/{subject.total} classes
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">{subject.attendance}%</p>
              <div className="w-20 h-2 bg-background-tertiary dark:bg-dark-background-tertiary rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${subject.color} transition-all duration-300`}
                  style={{ width: `${subject.attendance}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderRecentAttendance = (data) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-primary dark:bg-dark-surface-primary rounded-2xl p-6 shadow-lg"
    >
      <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-6">
        Recent Attendance
      </h3>
      <div className="space-y-4">
        {data.recentAttendance.map((day, index) => (
          <div
            key={index}
            className={`border-l-4 rounded-lg p-4 ${getStatusColor(day.status)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(day.status)}
                <div>
                  <p className="font-semibold text-text-primary dark:text-dark-text-primary">
                    {formatDate(day.date)}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {day.subjects.map((subject, subIndex) => (
                      <span
                        key={subIndex}
                        className="px-2 py-1 bg-background-tertiary dark:bg-dark-background-tertiary text-text-secondary dark:text-dark-text-secondary text-xs rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  day.status === 'present' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  day.status === 'absent' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {day.status}
                </span>
                {day.lateBy && (
                  <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-1">
                    Late by {day.lateBy}
                  </p>
                )}
                {day.reason && (
                  <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-1">
                    Reason: {day.reason}
                  </p>
                )}
              </div>
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
            Attendance Tracking
          </h1>
          <p className="text-text-secondary dark:text-dark-text-secondary">
            Monitor your children's attendance and identify patterns
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
        {selectedChild === 'both' ? (
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
                        <p className="text-3xl font-bold text-accent-primary">{data.attendance.overall}%</p>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Overall</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">{data.attendance.presentDays}</p>
                      <p className="text-xs text-green-600 dark:text-green-400">Present</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <p className="text-lg font-bold text-red-600 dark:text-red-400">{data.attendance.absentDays}</p>
                      <p className="text-xs text-red-600 dark:text-red-400">Absent</p>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{data.attendance.lateDays}</p>
                      <p className="text-xs text-yellow-600 dark:text-yellow-400">Late</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {renderOverviewCards(childrenData[selectedChild])}
            {renderSubjectAttendance(childrenData[selectedChild])}
            {renderRecentAttendance(childrenData[selectedChild])}
          </div>
        )}
      </div>
    </ParentPageWrapper>
  );
};

export default ParentAttendance;
