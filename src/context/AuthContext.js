import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCurrentUser } from '../services/api';

const AuthContext = createContext({
  user: null,
  loading: true,
  isAuthenticated: false,
  isAdmin: false,
  isTeacher: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function to check if user has admin role
  const checkIsAdmin = useCallback((user) => {
    return user?.role === 'admin' || user?.role === 'superadmin';
  }, []);

  // Helper function to check if user has teacher role
  const checkIsTeacher = useCallback((user) => {
    return user?.role === 'teacher';
  }, []);

  // Check authentication status
  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await getCurrentUser();
        if (userData) {
          setUser({
            ...userData,
            isAdmin: checkIsAdmin(userData),
            isTeacher: checkIsTeacher(userData)
          });
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [checkIsAdmin, checkIsTeacher]);

  // Initial auth check
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Login function
  const login = useCallback((userData, token) => {
    if (token) {
      localStorage.setItem('token', token);
    }
    setUser({
      ...userData,
      isAdmin: checkIsAdmin(userData),
      isTeacher: checkIsTeacher(userData)
    });
  }, [checkIsAdmin, checkIsTeacher]);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  // Context value
  const contextValue = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
    isTeacher: user?.isTeacher || false,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
