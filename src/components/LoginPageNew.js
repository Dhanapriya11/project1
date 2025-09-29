import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { Button, Input, Card } from './ui/PremiumComponents';
import { useTheme } from '../contexts/PremiumContexts';
import { authenticateUser } from '../data/mockCredentials';

const LoginPageNew = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

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
    setSuccess('');
    setIsLoading(true);

    if (!formData.username || !formData.password) {
      setError('Please enter both username and password');
      setIsLoading(false);
      return;
    }

    try {
      // Use mock authentication
      const user = authenticateUser(formData.username, formData.password);

      if (user) {
        const userData = {
          username: user.username,
          role: user.role.toLowerCase(),
          originalRole: user.role,
          token: `auth-token-${Date.now()}`,
          ...user
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));

        const roleRoutes = {
          admin: '/admin/dashboard',
          teacher: '/teacher/dashboard',
          parent: '/parent/dashboard',
          student: '/student/dashboard'
        };

        const from = new URLSearchParams(window.location.search).get('from');
        const path = from || roleRoutes[user.role.toLowerCase()] || '/student/dashboard';

        handleSuccessfulLogin(userData, path);
      } else {
        setError('Invalid username or password. Try: admin/admin123, teacher1/teacher123, parent1/parent123, student1/student123');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleSuccessfulLogin = (userData, path) => {
    console.log('Login successful:', userData);
    setSuccess('Login successful! Redirecting to your dashboard...');
    setTimeout(() => navigate(path), 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Illustration & Features */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <div className="text-center lg:text-left">
              <motion.div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-blue-400/30 text-white text-sm font-semibold mb-6 shadow-lg shadow-blue-500/20"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4" />
                Secure Login Portal
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200 mb-6">
                Welcome Back
              </h1>

              <p className="text-xl text-white/80 leading-relaxed">
                Access your personalized learning dashboard with enterprise-grade security
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="p-6 text-center bg-gradient-to-br from-emerald-500/30 to-green-600/30 backdrop-blur-xl border border-emerald-400/40 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300">
                <Shield className="w-10 h-10 text-emerald-300 mx-auto mb-3" />
                <h3 className="text-white font-bold text-base mb-1">Secure</h3>
                <p className="text-emerald-100 text-sm font-medium">Enterprise security</p>
              </Card>

              <Card className="p-6 text-center bg-gradient-to-br from-yellow-500/30 to-orange-500/30 backdrop-blur-xl border border-yellow-400/40 shadow-xl shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300">
                <Zap className="w-10 h-10 text-yellow-300 mx-auto mb-3" />
                <h3 className="text-white font-bold text-base mb-1">Fast</h3>
                <p className="text-yellow-100 text-sm font-medium">Lightning quick</p>
              </Card>

              <Card className="p-6 text-center bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-xl border border-purple-400/40 shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300">
                <Sparkles className="w-10 h-10 text-purple-300 mx-auto mb-3" />
                <h3 className="text-white font-bold text-base mb-1">Smart</h3>
                <p className="text-purple-100 text-sm font-medium">AI-powered</p>
              </Card>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div variants={itemVariants}>
            <Card className="p-8 lg:p-12 bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-indigo-900/90 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
                <p className="text-white/70">Enter your credentials to continue</p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  {success}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  icon={<User className="w-5 h-5" />}
                  variant="glass"
                  required
                />

                <div className="relative">
                  <Input
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    icon={<Lock className="w-5 h-5" />}
                    variant="glass"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isLoading}
                  className="w-full"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>

              {/* Test Credentials */}
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <h3 className="text-sm font-semibold text-blue-300 mb-3">
                  🧪 Test Credentials
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-blue-200">
                  <div><strong>Admin:</strong> admin / admin123</div>
                  <div><strong>Teacher:</strong> teacher1 / teacher123</div>
                  <div><strong>Parent:</strong> parent1 / parent123</div>
                  <div><strong>Student:</strong> student1 / student123</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {theme === 'light' ? '🌙' : '☀️'} {theme === 'light' ? 'Dark' : 'Light'} Mode
                  </button>

                  <button className="text-white/60 hover:text-white transition-colors text-sm">
                    Forgot Password?
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPageNew;
