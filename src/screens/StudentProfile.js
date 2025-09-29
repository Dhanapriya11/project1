import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, MapPin, Calendar,
  Edit, Save, X, Camera, Award, BookOpen,
  Settings, Shield, Bell, Globe, Lock
} from 'lucide-react';
import { Card, Button, Badge, Input } from '../components/ui/PremiumComponents';
import { useTheme } from '../contexts/PremiumContexts';
import StudentPageWrapper from '../components/StudentPageWrapper';

const StudentProfile = () => {
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@student.edu',
    phone: '+1 (555) 123-4567',
    address: '123 University Ave, Campus City, ST 12345',
    dateOfBirth: '2000-05-15',
    studentId: 'STU2024001',
    major: 'Computer Science',
    year: 'Junior',
    gpa: 3.7,
    avatar: '👨‍🎓',
    bio: 'Passionate computer science student with a focus on software development and artificial intelligence.',
    interests: ['Programming', 'Machine Learning', 'Web Development', 'Data Science'],
    achievements: [
      { title: 'Dean\'s List', semester: 'Fall 2025', description: 'Maintained GPA above 3.5' },
      { title: 'Programming Competition', semester: 'Spring 2025', description: '2nd Place in University Hackathon' },
      { title: 'Research Assistant', semester: 'Summer 2025', description: 'AI Research Project' }
    ]
  });

  const [editData, setEditData] = useState(profileData);

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'academic', label: 'Academic', icon: BookOpen },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

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
                My Profile 👤
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Manage your personal information and academic details
              </p>
            </div>
            <div className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <Button variant="ghost" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button variant="primary" onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <motion.section className="lg:col-span-1" variants={itemVariants}>
            <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl mb-4">
                    {profileData.avatar}
                  </div>
                  {isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-lg"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {profileData.major} • {profileData.year}
                </p>
                <Badge variant="success" className="mt-2">
                  Student ID: {profileData.studentId}
                </Badge>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">GPA</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {profileData.gpa}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Year</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {profileData.year}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Major</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {profileData.major}
                  </span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${activeTab === tab.id
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </Card>
          </motion.section>

          {/* Main Content */}
          <motion.section className="lg:col-span-3" variants={itemVariants}>
            {activeTab === 'personal' && (
              <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    {isEditing ? (
                      <Input
                        value={editData.firstName}
                        onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                        placeholder="First Name"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profileData.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    {isEditing ? (
                      <Input
                        value={editData.lastName}
                        onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                        placeholder="Last Name"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profileData.lastName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        placeholder="Email"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profileData.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone
                    </label>
                    {isEditing ? (
                      <Input
                        value={editData.phone}
                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                        placeholder="Phone"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profileData.phone}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address
                    </label>
                    {isEditing ? (
                      <Input
                        value={editData.address}
                        onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                        placeholder="Address"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profileData.address}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date of Birth
                    </label>
                    {isEditing ? (
                      <Input
                        type="date"
                        value={editData.dateOfBirth}
                        onChange={(e) => setEditData({ ...editData, dateOfBirth: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">
                        {new Date(profileData.dateOfBirth).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bio
                    </label>
                    {isEditing ? (
                      <textarea
                        value={editData.bio}
                        onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                        placeholder="Tell us about yourself..."
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        rows={3}
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profileData.bio}</p>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'academic' && (
              <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Academic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Student ID
                    </label>
                    <p className="text-gray-900 dark:text-white">{profileData.studentId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Major
                    </label>
                    {isEditing ? (
                      <Input
                        value={editData.major}
                        onChange={(e) => setEditData({ ...editData, major: e.target.value })}
                        placeholder="Major"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profileData.major}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Year
                    </label>
                    {isEditing ? (
                      <select
                        value={editData.year}
                        onChange={(e) => setEditData({ ...editData, year: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="Freshman">Freshman</option>
                        <option value="Sophomore">Sophomore</option>
                        <option value="Junior">Junior</option>
                        <option value="Senior">Senior</option>
                        <option value="Graduate">Graduate</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profileData.year}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current GPA
                    </label>
                    <p className="text-gray-900 dark:text-white">{profileData.gpa}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Interests
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'achievements' && (
              <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Achievements & Awards
                </h3>
                <div className="space-y-4">
                  {profileData.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all duration-200"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center text-white">
                          <Award className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {achievement.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {achievement.semester}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'settings' && (
              <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Account Settings
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates about assignments and grades</p>
                      </div>
                    </div>
                    <Button variant="primary" size="sm">Enable</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security to your account</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Setup</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Privacy Settings</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Control who can see your profile information</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Manage</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Change Password</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Update your account password</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Change</Button>
                  </div>
                </div>
              </Card>
            )}
          </motion.section>
        </div>
      </motion.div>
    </StudentPageWrapper>
  );
};

export default StudentProfile;