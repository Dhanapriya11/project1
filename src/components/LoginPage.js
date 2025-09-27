import React, { useState, useContext } from 'react';
import './LoginPage.css';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = ({ onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    try {
      const response = await loginUser({ username, password });
      
      if (response.token) {
        // Store token in localStorage
        localStorage.setItem('token', response.token);
        
        // Store user data in context
        login({
          id: response.user.id,
          username: response.user.username,
          role: response.user.role || 'student', // Default to 'student' if role not provided
          name: response.user.name || username
        }, response.token);
        
        // Redirect based on role
        if (response.user.role === 'admin' || response.user.role === 'superadmin') {
          navigate('/admin/dashboard');
        } else if (response.user.role === 'teacher') {
          navigate('/teacher/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <button type="submit" className="login-button">Login</button>
          <button type="button" className="back-button" onClick={onBack}>Back</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
