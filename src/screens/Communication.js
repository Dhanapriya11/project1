import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, Plus, Search, Filter, Send,
  Bell, AlertTriangle, Users, Mail, Eye,
  CheckCircle, Clock, Star, MoreVertical,
  User, Calendar, Settings, RefreshCw
} from 'lucide-react';
import { Card, Button, Input } from '../components/ui/PremiumComponents';
import { useTheme } from '../contexts/PremiumContexts';

const Communication = () => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState([
    {
      id: 1,
      subject: "Summer Break Schedule",
      to: "All Users",
      sentBy: "Admin",
      date: "2025-05-15",
      status: "Sent",
      unread: false,
      type: "announcement"
    },
    {
      id: 2,
      subject: "Parent-Teacher Meeting",
      to: "Parents",
      sentBy: "Jane Smith",
      date: "2025-05-10",
      status: "Sent",
      unread: true,
      type: "meeting"
    },
    {
      id: 3,
      subject: "Emergency School Closure",
      to: "All Users",
      sentBy: "Principal",
      date: "2025-05-12",
      status: "Sent",
      unread: false,
      type: "alert"
    },
    {
      id: 4,
      subject: "Student Progress Report",
      to: "Parents",
      sentBy: "System",
      date: "2025-05-08",
      status: "Sent",
      unread: true,
      type: "update"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showComposeForm, setShowComposeForm] = useState(false);

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

  const communicationSections = [
    {
      title: 'Announcements',
      description: 'Publish updates to all users',
      icon: Bell,
      color: 'from-blue-500 to-blue-600',
      action: 'Create Announcement',
      count: 12,
      trend: '+3 this week'
    },
    {
      title: 'Emergency Alerts',
      description: 'Send urgent notifications to specific groups',
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      action: 'Send Alert',
      count: 2,
      trend: 'Last used 2 days ago'
    },
    {
      title: 'Parent Messaging',
      description: 'Direct communication with parents',
      icon: MessageCircle,
      color: 'from-green-500 to-green-600',
      action: 'View Messages',
      count: 28,
      trend: '+5 today'
    },
    {
      title: 'Updates & Notifications',
      description: 'Share student progress and school news',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      action: 'Send Updates',
      count: 45,
      trend: '+8 this week'
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'announcement': return <Bell className="w-4 h-4" />;
      case 'meeting': return <Calendar className="w-4 h-4" />;
      case 'alert': return <AlertTriangle className="w-4 h-4" />;
      case 'update': return <Users className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'announcement': return 'text-blue-600 bg-blue-100';
      case 'meeting': return 'text-green-600 bg-green-100';
      case 'alert': return 'text-red-600 bg-red-100';
      case 'update': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.sentBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || msg.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleCreateAnnouncement = () => {
    setShowComposeForm(true);
  };

  const handleSendAlert = () => {
    alert("🚨 Send Emergency Alert form will open here!");
  };

  const handleViewMessages = () => {
    alert("💬 Messaging interface will open here!");
  };

  const markAsRead = (id) => {
    setMessages(messages.map(msg =>
      msg.id === id ? { ...msg, unread: false } : msg
    ));
  };

  const unreadCount = messages.filter(msg => msg.unread).length;

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
                Communication 💬
              </h1>
              <p className="text-gray-600 text-lg">
                Manage announcements, alerts, and messaging across the platform
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Button
                  variant="ghost"
                  className="relative p-3"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </div>
              <Button
                variant="primary"
                onClick={handleCreateAnnouncement}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Announcement
              </Button>
              <Button
                variant="secondary"
                onClick={handleSendAlert}
                className="flex items-center gap-2"
              >
                <AlertTriangle className="w-4 h-4" />
                Send Alert
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Communication Sections */}
        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Communication Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communicationSections.map((section, index) => (
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
                      <p className="text-2xl font-bold text-gray-900">{section.count}</p>
                      <p className="text-xs text-gray-500">{section.trend}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"
                    onClick={section.action === 'Create Announcement' ? handleCreateAnnouncement :
                      section.action === 'Send Alert' ? handleSendAlert : handleViewMessages}
                  >
                    {section.action}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Search and Filter */}
        <motion.section className="mb-6" variants={itemVariants}>
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="announcement">Announcements</option>
                <option value="meeting">Meetings</option>
                <option value="alert">Alerts</option>
                <option value="update">Updates</option>
              </select>
            </div>
          </Card>
        </motion.section>

        {/* Messages Table */}
        <motion.section variants={itemVariants}>
          <Card className="overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Messages</h2>
              <p className="text-gray-600 text-sm">{filteredMessages.length} messages found</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sent By
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
                  {filteredMessages.map((msg, index) => (
                    <motion.tr
                      key={msg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`hover:bg-gray-50 transition-colors ${msg.unread ? 'bg-blue-50' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getTypeColor(msg.type)}`}>
                            {getTypeIcon(msg.type)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                              {msg.subject}
                              {msg.unread && (
                                <span className="px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded-full">
                                  NEW
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {msg.to}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {msg.sentBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(msg.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full text-green-600 bg-green-100">
                          <CheckCircle className="w-3 h-3" />
                          {msg.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(msg.id)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-600 hover:text-green-700"
                          >
                            <Send className="w-4 h-4" />
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

export default Communication;
