import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, Clock, BookOpen, Users,
  Plus, ChevronLeft, ChevronRight,
  Filter, Search, Bell, MapPin
} from 'lucide-react';
import { Card, Button, Badge } from '../components/ui/PremiumComponents';
import { useTheme } from '../contexts/PremiumContexts';
import StudentPageWrapper from '../components/StudentPageWrapper';

const StudentCalendar = () => {
  const { theme } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const events = [
    {
      id: 1,
      title: 'Math Class',
      type: 'class',
      time: '09:00 AM',
      duration: 60,
      location: 'Room 101',
      instructor: 'Dr. Jane Smith',
      color: 'blue',
      date: new Date(2024, 1, 15)
    },
    {
      id: 2,
      title: 'Science Lab',
      type: 'lab',
      time: '11:00 AM',
      duration: 120,
      location: 'Lab 205',
      instructor: 'Prof. Brown',
      color: 'green',
      date: new Date(2024, 1, 15)
    },
    {
      id: 3,
      title: 'Assignment Due',
      type: 'assignment',
      time: '11:59 PM',
      duration: 0,
      location: 'Online',
      instructor: 'Dr. Jane Smith',
      color: 'red',
      date: new Date(2024, 1, 15)
    },
    {
      id: 4,
      title: 'Study Group',
      type: 'study',
      time: '02:00 PM',
      duration: 90,
      location: 'Library',
      instructor: 'Self',
      color: 'purple',
      date: new Date(2024, 1, 16)
    },
    {
      id: 5,
      title: 'Creative Writing Workshop',
      type: 'workshop',
      time: '10:00 AM',
      duration: 90,
      location: 'Room 203',
      instructor: 'Ms. Davis',
      color: 'orange',
      date: new Date(2024, 1, 17)
    },
    {
      id: 6,
      title: 'Programming Project Review',
      type: 'review',
      time: '03:00 PM',
      duration: 60,
      location: 'Computer Lab',
      instructor: 'Mr. Wilson',
      color: 'indigo',
      date: new Date(2024, 1, 18)
    }
  ];

  const getEventColor = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      red: 'from-red-500 to-red-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600',
      indigo: 'from-indigo-500 to-indigo-600'
    };
    return colors[color] || 'from-gray-500 to-gray-600';
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'class': return <BookOpen className="w-4 h-4" />;
      case 'lab': return <Users className="w-4 h-4" />;
      case 'assignment': return <Clock className="w-4 h-4" />;
      case 'study': return <BookOpen className="w-4 h-4" />;
      case 'workshop': return <Users className="w-4 h-4" />;
      case 'review': return <BookOpen className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getEventsForDate = (date) => {
    return events.filter(event =>
      event.date.toDateString() === date.toDateString()
    );
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
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
                My Calendar 📅
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Stay organized with your academic schedule
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="primary" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Event
              </Button>
            </div>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <motion.section className="lg:col-span-2" variants={itemVariants}>
            <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateMonth(-1)}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateMonth(1)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {dayNames.map(day => (
                  <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentDate).map((day, index) => {
                  const dayEvents = day ? getEventsForDate(day) : [];
                  const isToday = day && day.toDateString() === new Date().toDateString();
                  const isSelected = day && day.toDateString() === selectedDate.toDateString();

                  return (
                    <motion.div
                      key={index}
                      className={`
                        min-h-[80px] p-2 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer transition-all duration-200
                        ${day ? 'hover:bg-gray-50 dark:hover:bg-gray-800' : ''}
                        ${isToday ? 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700' : ''}
                        ${isSelected ? 'bg-blue-200 dark:bg-blue-800 border-blue-400 dark:border-blue-600' : ''}
                      `}
                      onClick={() => day && setSelectedDate(day)}
                      whileHover={day ? { scale: 1.02 } : {}}
                    >
                      {day && (
                        <>
                          <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                            {day.getDate()}
                          </div>
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map(event => (
                              <div
                                key={event.id}
                                className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getEventColor(event.color)} text-white truncate`}
                              >
                                {event.title}
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.section>

          {/* Sidebar */}
          <motion.section variants={itemVariants}>
            <div className="space-y-6">
              {/* Today's Events */}
              <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Today's Events
                </h3>
                <div className="space-y-3">
                  {getEventsForDate(new Date()).map(event => (
                    <motion.div
                      key={event.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getEventColor(event.color)} flex items-center justify-center text-white`}>
                        {getEventIcon(event.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {event.title}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {event.time} • {event.location}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  {getEventsForDate(new Date()).length === 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                      No events today
                    </p>
                  )}
                </div>
              </Card>

              {/* Selected Date Events */}
              <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {selectedDate.toLocaleDateString()}
                </h3>
                <div className="space-y-3">
                  {getEventsForDate(selectedDate).map(event => (
                    <motion.div
                      key={event.id}
                      className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getEventColor(event.color)} flex items-center justify-center text-white flex-shrink-0`}>
                          {getEventIcon(event.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            {event.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {event.time} • {event.duration}min
                          </p>
                          <div className="flex items-center gap-1 mt-2">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {event.location}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {event.instructor}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {getEventsForDate(selectedDate).length === 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                      No events on this date
                    </p>
                  )}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <Bell className="w-4 h-4 mr-2" />
                    Set Reminder
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Assignment
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Schedule Study Time
                  </Button>
                </div>
              </Card>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </StudentPageWrapper>
  );
};

export default StudentCalendar;