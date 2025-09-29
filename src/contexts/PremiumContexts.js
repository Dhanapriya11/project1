import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Premium Theme Context with AI Integration
const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = React.useState(() => {
        const savedTheme = localStorage.getItem('lms-theme');
        return savedTheme || 'light';
    });

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('lms-theme', newTheme);
            return newTheme;
        });
    };

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// AI Assistant Context for Smart Features
const AIContext = createContext();

export const useAI = () => {
    const context = useContext(AIContext);
    if (!context) {
        throw new Error('useAI must be used within an AIProvider');
    }
    return context;
};

export const AIProvider = ({ children }) => {
    const [aiState, setAIState] = React.useState({
        isEnabled: true,
        recommendations: [],
        insights: [],
        isLoading: false,
        lastUpdated: null
    });

    const generateRecommendations = async (userData) => {
        setAIState(prev => ({ ...prev, isLoading: true }));

        // Simulate AI processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        const mockRecommendations = [
            {
                id: 1,
                type: 'course',
                title: 'Advanced React Patterns',
                description: 'Based on your progress, you might enjoy this advanced course',
                confidence: 0.87,
                reason: 'You completed React Fundamentals with 95% score'
            },
            {
                id: 2,
                type: 'study',
                title: 'Focus on JavaScript ES6+',
                description: 'Your JavaScript skills could benefit from modern features',
                confidence: 0.73,
                reason: 'Recent quiz showed gaps in ES6 concepts'
            }
        ];

        setAIState(prev => ({
            ...prev,
            recommendations: mockRecommendations,
            isLoading: false,
            lastUpdated: new Date()
        }));
    };

    const generateInsights = async (analyticsData) => {
        setAIState(prev => ({ ...prev, isLoading: true }));

        await new Promise(resolve => setTimeout(resolve, 1500));

        const mockInsights = [
            {
                id: 1,
                type: 'performance',
                title: 'Peak Learning Time Detected',
                description: 'You perform best between 10 AM - 12 PM',
                impact: 'high',
                actionable: true
            },
            {
                id: 2,
                type: 'engagement',
                title: 'Course Completion Rate Improving',
                description: 'Your completion rate increased by 23% this month',
                impact: 'medium',
                actionable: false
            }
        ];

        setAIState(prev => ({
            ...prev,
            insights: mockInsights,
            isLoading: false,
            lastUpdated: new Date()
        }));
    };

    return (
        <AIContext.Provider value={{
            ...aiState,
            generateRecommendations,
            generateInsights
        }}>
            {children}
        </AIContext.Provider>
    );
};

// Premium Toast Context
const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = React.useState([]);

    const addToast = (message, type = 'info', duration = 5000) => {
        const id = Date.now();
        const toast = { id, message, type, duration };
        setToasts(prev => [...prev, toast]);

        setTimeout(() => {
            removeToast(id);
        }, duration);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}

            <div className="fixed top-4 right-4 z-50 space-y-2">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 300, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 300, scale: 0.8 }}
                            className={`
                px-6 py-4 rounded-xl shadow-lg text-white font-medium
                ${toast.type === 'success' ? 'bg-green-500' : ''}
                ${toast.type === 'error' ? 'bg-red-500' : ''}
                ${toast.type === 'warning' ? 'bg-yellow-500' : ''}
                ${toast.type === 'info' ? 'bg-blue-500' : ''}
              `}
                        >
                            <div className="flex items-center justify-between">
                                <span>{toast.message}</span>
                                <button
                                    onClick={() => removeToast(toast.id)}
                                    className="ml-4 text-white hover:text-gray-200"
                                >
                                    ×
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

// Premium Loading Context
const LoadingContext = createContext();

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};

export const LoadingProvider = ({ children }) => {
    const [loadingStates, setLoadingStates] = React.useState({});

    const setLoading = (key, isLoading) => {
        setLoadingStates(prev => ({
            ...prev,
            [key]: isLoading
        }));
    };

    const isLoading = (key) => {
        return loadingStates[key] || false;
    };

    return (
        <LoadingContext.Provider value={{ setLoading, isLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

// Premium User Context with AI Integration
const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [userPreferences, setUserPreferences] = React.useState({
        theme: 'light',
        notifications: true,
        aiRecommendations: true,
        learningStyle: 'visual',
        difficulty: 'intermediate'
    });

    const updateUserPreferences = (preferences) => {
        setUserPreferences(prev => ({ ...prev, ...preferences }));
        localStorage.setItem('lms-user-preferences', JSON.stringify(preferences));
    };

    const login = async (credentials) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockUser = {
            id: 1,
            name: 'John Doe',
            email: credentials.email,
            role: 'student',
            avatar: null,
            preferences: userPreferences
        };

        setUser(mockUser);
        localStorage.setItem('lms-user', JSON.stringify(mockUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('lms-user');
    };

    useEffect(() => {
        const savedUser = localStorage.getItem('lms-user');
        const savedPreferences = localStorage.getItem('lms-user-preferences');

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        if (savedPreferences) {
            setUserPreferences(JSON.parse(savedPreferences));
        }
    }, []);

    return (
        <UserContext.Provider value={{
            user,
            userPreferences,
            login,
            logout,
            updateUserPreferences
        }}>
            {children}
        </UserContext.Provider>
    );
};

// Premium Analytics Context
const AnalyticsContext = createContext();

export const useAnalytics = () => {
    const context = useContext(AnalyticsContext);
    if (!context) {
        throw new Error('useAnalytics must be used within an AnalyticsProvider');
    }
    return context;
};

export const AnalyticsProvider = ({ children }) => {
    const [analytics, setAnalytics] = React.useState({
        userEngagement: 87,
        courseCompletion: 73,
        performanceScore: 92,
        resourceUsage: 68,
        trends: {
            weekly: [65, 70, 75, 80, 85, 87, 90],
            monthly: [60, 65, 70, 75, 80, 85, 87]
        }
    });

    const updateAnalytics = (newData) => {
        setAnalytics(prev => ({ ...prev, ...newData }));
    };

    const trackEvent = (event, data) => {
        // In a real app, this would send data to analytics service
        console.log('Analytics Event:', event, data);
    };

    return (
        <AnalyticsContext.Provider value={{
            analytics,
            updateAnalytics,
            trackEvent
        }}>
            {children}
        </AnalyticsContext.Provider>
    );
};

// Premium Error Boundary
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center p-8 bg-white rounded-xl shadow-lg"
                    >
                        <h2 className="text-2xl font-bold text-red-600 mb-4">
                            Oops! Something went wrong
                        </h2>
                        <p className="text-gray-600 mb-6">
                            We're sorry, but something unexpected happened. Please try refreshing the page.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                        >
                            Refresh Page
                        </button>
                    </motion.div>
                </div>
            );
        }

        return this.props.children;
    }
}

// Premium Custom Hooks
export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = React.useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            setStoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue];
};

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export const useIntersectionObserver = (ref, options = {}) => {
    const [isIntersecting, setIsIntersecting] = React.useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return isIntersecting;
};

export const useMediaQuery = (query) => {
    const [matches, setMatches] = React.useState(false);

    React.useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        media.addListener(listener);
        return () => media.removeListener(listener);
    }, [matches, query]);

    return matches;
};
