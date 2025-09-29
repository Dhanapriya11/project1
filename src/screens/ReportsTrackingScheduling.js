import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, Calendar, FileText, TrendingUp,
  Users, Clock, Download, Eye, Filter,
  Plus, Search, MoreVertical, CheckCircle,
  AlertCircle, RefreshCw, Settings, Zap
} from 'lucide-react';
import { Card, Button } from '../components/ui/PremiumComponents';
import { useTheme } from '../contexts/PremiumContexts';

const ReportsTrackingScheduling = () => {
  const { theme } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);

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

  const reportSections = [
    {
      title: 'Reports Review',
      description: 'View academic and administrative reports',
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
      action: 'View Reports',
      stats: { count: 24, trend: '+12%' }
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor teacher activity and class progress',
      icon: TrendingUp,
      color: 'from-pink-500 to-pink-600',
      action: 'Track Progress',
      stats: { count: 156, trend: '+8%' }
    },
    {
      title: 'Login/Logout Tracking',
      description: 'Track system usage by all users',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      action: 'View Logs',
      stats: { count: 1.2, trend: '+15%' }
    },
    {
      title: 'Calendar & Scheduling',
      description: 'Manage academic calendar, events, and deadlines',
      icon: Calendar,
      color: 'from-green-500 to-green-600',
      action: 'Manage Calendar',
      stats: { count: 8, trend: '+5%' }
    }
  ];

  const recentReports = [
    {
      id: 1,
      name: 'Monthly Usage Report',
      type: 'System',
      generatedBy: 'Admin System',
      date: '2025-05-01',
      status: 'completed',
      size: '2.4 MB'
    },
    {
      id: 2,
      name: 'Student Performance Report',
      type: 'Academic',
      generatedBy: 'John Doe',
      date: '2025-05-10',
      status: 'completed',
      size: '1.8 MB'
    },
    {
      id: 3,
      name: 'Teacher Activity Report',
      type: 'Analytics',
      generatedBy: 'System',
      date: '2025-05-15',
      status: 'processing',
      size: '3.2 MB'
    },
    {
      id: 4,
      name: 'Attendance Summary',
      type: 'Academic',
      generatedBy: 'Jane Smith',
      date: '2025-05-20',
      status: 'completed',
      size: '1.1 MB'
    }
  ];

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'failed': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

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
                Reports, Tracking & Scheduling 📊
              </h1>
              <p className="text-gray-600 text-lg">
                Comprehensive analytics and scheduling management
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                onClick={handleGenerateReport}
                loading={isGenerating}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                {isGenerating ? 'Generating...' : 'Generate Report'}
              </Button>
              <Button
                variant="secondary"
                className="flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                View Calendar
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Quick Stats */}
        <motion.section className="mb-8" variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Reports</p>
                  <p className="text-2xl font-bold text-gray-900">47</p>
                  <p className="text-xs text-green-600">+12% this month</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                  <p className="text-xs text-green-600">+8% this week</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium">Avg. Response</p>
                  <p className="text-2xl font-bold text-gray-900">2.3s</p>
                  <p className="text-xs text-green-600">-15% faster</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">98.7%</p>
                  <p className="text-xs text-green-600">+2.1% this month</p>
                </div>
              </div>
            </Card>
          </div>
        </motion.section>

        {/* Main Sections */}
        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics & Tracking</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reportSections.map((section, index) => (
              <motion.div
                key={section.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Card className="p-6 cursor-pointer group hover:shadow-xl transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${section.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 group-hover:text-gray-700 transition-colors">
                    {section.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{section.stats.count}</p>
                      <p className="text-xs text-green-600">{section.stats.trend}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"
                  >
                    {section.action}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Recent Reports Table */}
        <motion.section variants={itemVariants}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Reports</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="system">System</option>
                <option value="academic">Academic</option>
                <option value="analytics">Analytics</option>
              </select>
            </div>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Generated By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentReports.map((report, index) => (
                    <motion.tr
                      key={report.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{report.name}</div>
                            <div className="text-sm text-gray-500">{report.size}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {report.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.generatedBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(report.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                          {getStatusIcon(report.status)}
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-600 hover:text-green-700"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 hover:text-gray-700"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default ReportsTrackingScheduling;