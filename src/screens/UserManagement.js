import React, { useState, useEffect } from 'react';
import { getUsers, createUser } from '../services/api';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
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

  // Handle form submission for adding a new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    console.log('Creating user with data:', newUser);
    try {
      const createdUser = await createUser(newUser);
      console.log('User created:', createdUser);
      setUsers([...users, createdUser]);
      setNewUser({
        username: '',
        email: '',
        password: '',
        role: 'Student'
      });
      setShowAddUserForm(false);
    } catch (err) {
      console.error('Error creating user:', err);
      setError('Failed to create user');
    }
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
        <button className="primary-button" onClick={() => setShowAddUserForm(!showAddUserForm)}>
          {showAddUserForm ? 'Cancel' : 'Add New User'}
        </button>
        <button className="secondary-button" onClick={() => alert('Assign Teachers to Subjects feature to be implemented')}>Assign Teachers to Subjects</button>
      </div>
      
      {/* Add User Form */}
      {showAddUserForm && (
        <div className="add-user-form">
          <h2>Add New User</h2>
          <form onSubmit={handleAddUser}>
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
            <button type="submit" className="primary-button">Create User</button>
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
                  <button className="action-button">Edit</button>
                  <button className="action-button">Delete</button>
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