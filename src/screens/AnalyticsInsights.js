import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, TrendingUp, Users, BookOpen,
  Download, RefreshCw, Filter, Calendar,
  Eye, Share, Settings, Zap, Target,
  Activity, Award, Clock, Star, AlertCircle
} from 'lucide-react';
import { Card, Button } from '../components/ui/PremiumComponents';
import { useTheme } from '../contexts/PremiumContexts';

const AnalyticsInsights = () => {
  const { theme } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('all');

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

  const analyticsCards = [
    {
      title: 'User Engagement',
      description: 'Track user activity and interaction patterns',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      value: '87%',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Course Completion',
      description: 'Monitor course completion rates and progress',
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      value: '73%',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Performance Metrics',
      description: 'Analyze academic performance trends',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      value: '92%',
      change: '+15%',
      trend: 'up'
    },
    {
      title: 'Resource Usage',
      description: 'Track system resource utilization',
      icon: Activity,
      color: 'from-orange-500 to-orange-600',
      value: '68%',
      change: '+5%',
      trend: 'up'
    }
  ];

  const chartData = [
    { name: 'Jan', users: 1200, completions: 850, performance: 78 },
    { name: 'Feb', users: 1350, completions: 920, performance: 82 },
    { name: 'Mar', users: 1480, completions: 1050, performance: 85 },
    { name: 'Apr', users: 1620, completions: 1180, performance: 88 },
    { name: 'May', users: 1750, completions: 1280, performance: 91 },
    { name: 'Jun', users: 1890, completions: 1420, performance: 94 }
  ];

  const topCourses = [
    { name: 'Introduction to React', students: 245, completion: 89, rating: 4.8 },
    { name: 'Advanced JavaScript', students: 198, completion: 85, rating: 4.7 },
    { name: 'Python Fundamentals', students: 187, completion: 92, rating: 4.9 },
    { name: 'Data Structures', students: 156, completion: 78, rating: 4.6 },
    { name: 'Machine Learning Basics', students: 134, completion: 81, rating: 4.5 }
  ];

  const insights = [
    {
      type: 'success',
      title: 'High Engagement Peak',
      description: 'User engagement increased by 23% this week',
      icon: TrendingUp
    },
    {
      type: 'warning',
      title: 'Course Completion Alert',
      description: 'Some courses showing lower completion rates',
      icon: AlertCircle
    },
    {
      type: 'info',
      title: 'New Feature Impact',
      description: 'Recent updates improved user satisfaction by 15%',
      icon: Star
    }
  ];

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
                Analytics & Insights 📊
              </h1>
              <p className="text-gray-600 text-lg">
                Visual dashboards showing trends in performance, engagement, and resource usage
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                className="flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Generate Report
              </Button>
              <Button
                variant="secondary"
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Data
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Filter Controls */}
        <motion.section className="mb-8" variants={itemVariants}>
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Period
                </label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Metric Focus
                </label>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Metrics</option>
                  <option value="engagement">User Engagement</option>
                  <option value="completion">Course Completion</option>
                  <option value="performance">Performance</option>
                  <option value="resources">Resource Usage</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </Button>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Analytics Cards */}
        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analyticsCards.map((card, index) => (
              <motion.div
                key={card.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Card className="p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center`}>
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {card.change}
                      </span>
                      <p className="text-xs text-gray-500">vs last period</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">{card.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{card.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Engagement Chart */}
          <motion.section variants={itemVariants}>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">User Engagement Trends</h2>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive Chart</p>
                  <p className="text-sm text-gray-500">User engagement over time</p>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Course Completion Chart */}
          <motion.section variants={itemVariants}>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Course Completion Rates</h2>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="h-64 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive Chart</p>
                  <p className="text-sm text-gray-500">Completion rates by course</p>
                </div>
              </div>
            </Card>
          </motion.section>
        </div>

        {/* Top Courses and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Performing Courses */}
          <motion.section variants={itemVariants}>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Top Performing Courses</h2>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                {topCourses.map((course, index) => (
                  <motion.div
                    key={course.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{course.name}</p>
                        <p className="text-sm text-gray-500">{course.students} students</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{course.completion}%</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span className="text-xs text-gray-500">{course.rating}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.section>

          {/* Insights */}
          <motion.section variants={itemVariants}>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Key Insights</h2>
                <Button variant="ghost" size="sm">
                  <Zap className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <motion.div
                    key={insight.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-start gap-3 p-4 rounded-lg ${insight.type === 'success' ? 'bg-green-50 border border-green-200' :
                      insight.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                        'bg-blue-50 border border-blue-200'
                      }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${insight.type === 'success' ? 'bg-green-100' :
                      insight.type === 'warning' ? 'bg-yellow-100' :
                        'bg-blue-100'
                      }`}>
                      <insight.icon className={`w-4 h-4 ${insight.type === 'success' ? 'text-green-600' :
                        insight.type === 'warning' ? 'text-yellow-600' :
                          'text-blue-600'
                        }`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{insight.title}</p>
                      <p className="text-sm text-gray-600">{insight.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsInsights;