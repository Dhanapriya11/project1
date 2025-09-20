import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/api';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Student'
  });

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

  if (loading) {
    return <div className="user-management">Loading users...</div>;
  }

  if (error) {
    return <div className="user-management">Error: {error}</div>;
  }

  return (
    <div className="user-management">
      <h1>User Management</h1>
      <p>Manage users, teachers, and parents</p>
      
      <div className="user-actions">
        <button className="primary-button" onClick={toggleAddUserForm}>
          {showAddUserForm ? 'Cancel' : 'Add New User'}
        </button>
        <button className="secondary-button" onClick={() => alert('Assign Teachers to Subjects feature to be implemented')}>Assign Teachers to Subjects</button>
      </div>
      
      {/* Add User Form */}
      {showAddUserForm && (
        <div className="add-user-form">
          <h2>Add New User</h2>
          <form onSubmit={handleSubmitUser}>
            {editingUserId && <input type="hidden" value={editingUserId} />}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={newUser.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Parent">Parent</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="primary-button">
              {editingUserId ? 'Update User' : 'Create User'}
            </button>
          </form>
        </div>
      )}
      
      <div className="user-table">
        <h2>User List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>Active</td>
                <td>
                  <button 
                    className="action-button edit" 
                    onClick={() => handleEditUser(user)}
                    title="Edit user"
                  >
                    Edit
                  </button>
                  <button 
                    className="action-button delete" 
                    onClick={() => handleDeleteUser(user._id)}
                    title="Delete user"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;