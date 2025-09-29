import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getUsers, createUser, updateUser, deleteUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
  Users, Plus, Search, Filter, Edit, Trash2,
  Eye, MoreVertical, UserPlus, Shield, Mail,
  User, GraduationCap, UserCheck, AlertCircle,
  CheckCircle, Clock, RefreshCw
} from 'lucide-react';
import { Card, Button, Input } from '../components/ui/PremiumComponents';
import { useTheme } from '../contexts/PremiumContexts';

const UserManagement = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Student'
  });

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

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching users from API');
        const userData = await getUsers();
        console.log('Users fetched:', userData);
        setUsers(userData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle input changes in the add user form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    });
  };

  // Handle form submission for adding/updating a user
  const handleSubmitUser = async (e) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        // Update existing user
        console.log('Updating user with data:', { id: editingUserId, ...newUser });
        const updatedUser = await updateUser(editingUserId, newUser);
        console.log('User updated:', updatedUser);
        setUsers(users.map(user => user._id === editingUserId ? updatedUser : user));
        setEditingUserId(null);
      } else {
        // Create new user
        console.log('Creating user with data:', newUser);
        const createdUser = await createUser(newUser);
        console.log('User created:', createdUser);
        setUsers([...users, createdUser]);
      }

      // Reset form
      setNewUser({
        username: '',
        email: '',
        password: '',
        role: 'Student'
      });
      setShowAddUserForm(false);
    } catch (err) {
      console.error('Error saving user:', err);
      setError(editingUserId ? 'Failed to update user' : 'Failed to create user');
    }
  };

  // Handle edit user
  const handleEditUser = (user) => {
    setEditingUserId(user._id);
    setNewUser({
      username: user.username,
      email: user.email,
      password: '', // Don't pre-fill password for security
      role: user.role
    });
    setShowAddUserForm(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(user => user._id !== userId));
      } catch (err) {
        console.error('Error deleting user:', err);
        setError('Failed to delete user');
      }
    }
  };

  // Reset form when toggling add user form
  const toggleAddUserForm = () => {
    setShowAddUserForm(!showAddUserForm);
    setEditingUserId(null);
    setNewUser({
      username: '',
      email: '',
      password: '',
      role: 'Student'
    });
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Student': return <GraduationCap className="w-4 h-4" />;
      case 'Teacher': return <User className="w-4 h-4" />;
      case 'Parent': return <UserCheck className="w-4 h-4" />;
      case 'Admin': return <Shield className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Student': return 'from-blue-500 to-blue-600';
      case 'Teacher': return 'from-green-500 to-green-600';
      case 'Parent': return 'from-purple-500 to-purple-600';
      case 'Admin': return 'from-red-500 to-red-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const roleStats = {
    Student: users.filter(u => u.role === 'Student').length,
    Teacher: users.filter(u => u.role === 'Teacher').length,
    Parent: users.filter(u => u.role === 'Parent').length,
    Admin: users.filter(u => u.role === 'Admin').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading users...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 text-lg">Error: {error}</p>
        </motion.div>
      </div>
    );
  }

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
                User Management 👥
              </h1>
              <p className="text-gray-600 text-lg">
                Manage users, teachers, and parents across the platform
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                onClick={toggleAddUserForm}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                {showAddUserForm ? 'Cancel' : 'Add New User'}
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate('/teacher-assignments')}
                className="flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Assign Teachers
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Stats Cards */}
        <motion.section className="mb-8" variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Object.entries(roleStats).map(([role, count]) => (
              <motion.div
                key={role}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Card className="p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getRoleColor(role)} flex items-center justify-center`}>
                      {getRoleIcon(role)}
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{role}s</p>
                      <p className="text-3xl font-bold text-gray-900">{count}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Add User Form */}
        <AnimatePresence>
          {showAddUserForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingUserId ? 'Edit User' : 'Add New User'}
                </h2>
                <form onSubmit={handleSubmitUser} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Username"
                    type="text"
                    name="username"
                    value={newUser.username}
                    onChange={handleInputChange}
                    required
                    icon={<User className="w-4 h-4" />}
                  />
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    required
                    icon={<Mail className="w-4 h-4" />}
                  />
                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    required
                    icon={<Shield className="w-4 h-4" />}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      name="role"
                      value={newUser.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Student">Student</option>
                      <option value="Teacher">Teacher</option>
                      <option value="Parent">Parent</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={toggleAddUserForm}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      className="flex items-center gap-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      {editingUserId ? 'Update User' : 'Create User'}
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search and Filter */}
        <motion.section className="mb-6" variants={itemVariants}>
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="Student">Students</option>
                <option value="Teacher">Teachers</option>
                <option value="Parent">Parents</option>
                <option value="Admin">Admins</option>
              </select>
            </div>
          </Card>
        </motion.section>

        {/* Users Table */}
        <motion.section variants={itemVariants}>
          <Card className="overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">User List</h2>
              <p className="text-gray-600 text-sm">{filteredUsers.length} users found</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
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
                  {filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getRoleColor(user.role)} flex items-center justify-center text-white font-semibold`}>
                            {user.username.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.username}</div>
                            <div className="text-sm text-gray-500">ID: {user._id.slice(-8)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getRoleColor(user.role)} text-white`}>
                          {getRoleIcon(user.role)}
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full text-green-600 bg-green-100">
                          <CheckCircle className="w-3 h-3" />
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditUser(user)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteUser(user._id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
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

export default UserManagement;