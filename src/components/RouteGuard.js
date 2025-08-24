import React from 'react';
import { useNavigate } from 'react-router-dom';

const RouteGuard = ({ children, allowedRole }) => {
  const navigate = useNavigate();
  
  // Get user from localStorage
  const storedUser = localStorage.getItem('currentUser');
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  // Legacy support for admin/superadmin roles
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  const adminRole = localStorage.getItem('adminRole');

  const hasAccess = () => {
    // Check for new user roles (Teacher, Parent, Student)
    if (currentUser && currentUser.role === allowedRole) {
      return true;
    }

    // Check for legacy admin roles
    if (isAdminLoggedIn) {
      if (allowedRole === 'admin' && adminRole === 'admin') {
        return true;
      }
      if (allowedRole === 'superadmin' && adminRole === 'superadmin') {
        return true;
      }
    }

    return false;
  };

  if (!hasAccess()) {
    // If a user is logged in but has the wrong role, you could redirect them to their own dashboard.
    // For simplicity, we'll just redirect to login if access is denied.
    navigate('/login');
    return null;
  }
  
  return children;
};

export default RouteGuard;