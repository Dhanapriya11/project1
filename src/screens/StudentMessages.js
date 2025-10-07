import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare, Send, Search, Filter,
  MoreVertical, Star, Archive, Trash2,
  Paperclip, Smile, Image, FileText,
  Clock, Check, CheckCheck, Reply
} from 'lucide-react';
import { Card, Button, Badge, Input } from '../components/ui/PremiumComponents';
import { useTheme } from '../contexts/PremiumContexts';
import StudentPageWrapper from '../components/StudentPageWrapper';

const StudentMessages = () => {
  const { theme } = useTheme();
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Dr. Jane Smith',
      role: 'Mathematics Instructor',
      avatar: '👩‍🏫',
      lastMessage: 'Please review the solutions to Chapter 5 exercises',
      timestamp: '2 min ago',
      unread: 2,
      online: true,
      messages: [
        {
          id: 1,
          sender: 'Dr. Jane Smith',
          content: 'Hello! I hope you\'re doing well with the mathematics course.',
          timestamp: '10:30 AM',
          isOwn: false
        },
        {
          id: 2,
          sender: 'You',
          content: 'Hi Dr. Smith! Yes, I\'m enjoying the course so far.',
          timestamp: '10:32 AM',
          isOwn: true
        },
        {
          id: 3,
          sender: 'Dr. Jane Smith',
          content: 'That\'s great to hear! Please review the solutions to Chapter 5 exercises before our next class.',
          timestamp: '10:35 AM',
          isOwn: false
        },
        {
          id: 4,
          sender: 'Dr. Jane Smith',
          content: 'The assignment is due next Monday. Let me know if you have any questions.',
          timestamp: '10:36 AM',
          isOwn: false
        }
      ]
    },
    {
      id: 2,
      name: 'Prof. Brown',
      role: 'Science Instructor',
      avatar: '👨‍🔬',
      lastMessage: 'Lab report feedback is ready',
      timestamp: '1 hour ago',
      unread: 0,
      online: false,
      messages: [
        {
          id: 1,
          sender: 'Prof. Brown',
          content: 'Your lab report on photosynthesis was excellent!',
          timestamp: '9:15 AM',
          isOwn: false
        },
        {
          id: 2,
          sender: 'You',
          content: 'Thank you, Professor! I really enjoyed the experiment.',
          timestamp: '9:20 AM',
          isOwn: true
        }
      ]
    },
    {
      id: 3,
      name: 'Ms. Davis',
      role: 'Creative Writing Instructor',
      avatar: '👩‍💼',
      lastMessage: 'Great work on your essay!',
      timestamp: '3 hours ago',
      unread: 0,
      online: true,
      messages: [
        {
          id: 1,
          sender: 'Ms. Davis',
          content: 'Your creative essay was very well written!',
          timestamp: '8:45 AM',
          isOwn: false
        }
      ]
    },
    {
      id: 4,
      name: 'Study Group',
      role: 'Mathematics Study Group',
      avatar: '👥',
      lastMessage: 'Meeting tomorrow at 2 PM',
      timestamp: '5 hours ago',
      unread: 1,
      online: false,
      messages: [
        {
          id: 1,
          sender: 'Alex',
          content: 'Hey everyone! Let\'s meet tomorrow at 2 PM in the library.',
          timestamp: '6:30 AM',
          isOwn: false
        },
        {
          id: 2,
          sender: 'You',
          content: 'Sounds good! I\'ll be there.',
          timestamp: '6:35 AM',
          isOwn: true
        }
      ]
    }
  ]);

  // Message functionality handlers
  const handleFileAttachment = () => {
    alert('File attachment feature coming soon!');
  };

  const handleMarkAsRead = (conversationId) => {
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === conversationId ? { ...conv, unread: 0 } : conv
      )
    );
  };

  const handleArchiveConversation = (conversationId) => {
    if (window.confirm('Archive this conversation?')) {
      alert('Conversation archived!');
    }
  };

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);

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

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'You',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === selectedConversation 
          ? { 
              ...conv, 
              messages: [...conv.messages, newMsg],
              lastMessage: newMessage,
              timestamp: 'Just now'
            }
          : conv
      )
    );

    setNewMessage('');
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
                Messages 💬
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Stay connected with your instructors and peers
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="primary" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                New Message
              </Button>
            </div>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <motion.section className="lg:col-span-1" variants={itemVariants}>
            <Card className="h-full flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                  <motion.div
                    key={conversation.id}
                    className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-200 ${selectedConversation === conversation.id
                      ? 'bg-blue-50 dark:bg-blue-900 border-l-4 border-l-blue-500'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedConversation(conversation.id);
                      handleMarkAsRead(conversation.id);
                    }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg">
                          {conversation.avatar}
                        </div>
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {conversation.name}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {conversation.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                          {conversation.role}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 truncate mt-1">
                          {conversation.lastMessage}
                        </p>
                      </div>
                      {conversation.unread > 0 && (
                        <Badge variant="danger" size="sm">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.section>

          {/* Chat Area */}
          <motion.section className="lg:col-span-2" variants={itemVariants}>
            <Card className="h-full flex flex-col">
              {selectedConv ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                          {selectedConv.avatar}
                        </div>
                        {selectedConv.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {selectedConv.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {selectedConv.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Star className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Archive className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {selectedConv.messages.map((message) => (
                      <motion.div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.isOwn
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                          }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${message.isOwn ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={handleFileAttachment}
                        title="Attach file"
                      >
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => alert('Image upload coming soon!')}
                        title="Attach image"
                      >
                        <Image className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => alert('Document upload coming soon!')}
                        title="Attach document"
                      >
                        <FileText className="w-4 h-4" />
                      </Button>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                      <Button variant="ghost" size="sm">
                        <Smile className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Choose a conversation from the list to start messaging
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </motion.section>
        </div>
      </motion.div>
    </StudentPageWrapper>
  );
};

export default StudentMessages;