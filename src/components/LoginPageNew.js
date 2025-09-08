import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import './LoginPageNew.css';
import loginIllustration from '../assets/login-illustration.svg';

const LoginPageNew = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.password) {
      setError('Please enter both username and password');
      return;
    }

    // Hardcoded admin/superadmin logins
    const adminUsers = [
      { username: 'admin', password: 'admin123', role: 'admin', redirect: '/admin/dashboard' },
      { username: 'superadmin', password: 'superadmin123', role: 'superadmin', redirect: '/superadmin/dashboard' }
    ];

    const adminUser = adminUsers.find(
      user => user.username === formData.username && user.password === formData.password
    );

    if (adminUser) {
      const userData = {
        username: adminUser.username,
        role: adminUser.role,
        token: `${adminUser.role}-token-${Date.now()}`
      };
      localStorage.setItem('currentUser', JSON.stringify(userData));
      handleSuccessfulLogin(userData, adminUser.redirect);
      return;
    }

    try {
      // For non-admin users, check MongoDB
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      const data = await response.json().catch(() => {
        throw new Error('Invalid server response');
      });

      if (response.ok && data) {
        const normalizedRole = data.role?.toLowerCase() || '';

        const roleRoutes = {
          admin: '/admin/dashboard',
          superadmin: '/superadmin/dashboard',
          teacher: '/teacher/dashboard',
          parent: '/parent/dashboard',
          student: '/student/dashboard'
        };

        const userData = {
          username: data.username,
          role: normalizedRole,
          originalRole: data.role,
          token: `auth-token-${Date.now()}`,
          ...data
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));

        const from = new URLSearchParams(window.location.search).get('from');
        const path = from || roleRoutes[normalizedRole] || '/';

        handleSuccessfulLogin(userData, path);
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to connect to the server. Please try again.');
    }
  };

  const handleSuccessfulLogin = (userData, path) => {
    console.log('Login successful:', userData);
    setError('Login successful! Redirecting to your dashboard...');
    setTimeout(() => navigate(path), 1000);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">

        {/* Left Illustration */}
        <div className="login-illustration">
          <img src={loginIllustration} alt="Learning Management System" />
        </div>

        {/* Right Form */}
        <div className="login-form-container">
          <h1 className="lms-title">LMS</h1>
          <p className="lms-subtitle">Login to access your courses</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <span className="input-icon"><FaUser /></span>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <span className="input-icon"><FaLock /></span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="login-button">LOGIN</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPageNew;
