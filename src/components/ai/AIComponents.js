import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain, TrendingUp, Users, BookOpen, Award,
    Clock, Target, Zap, Star, ChevronRight,
    Lightbulb, BarChart3, PieChart, Activity
} from 'lucide-react';
import { Card, Button, Badge, Progress, Avatar, Loading } from './PremiumComponents';
import { useAI, useAnalytics, useUser } from '../contexts/PremiumContexts';

// AI-Powered Recommendation Widget
export const AIRecommendations = () => {
    const { recommendations, isLoading, generateRecommendations } = useAI();
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            generateRecommendations(user);
        }
    }, [user, generateRecommendations]);

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
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Card className="glass-card">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                            <Brain className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                AI Recommendations
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Personalized for you
                            </p>
                        </div>
                    </div>
                    <Badge variant="primary" size="sm">
                        {recommendations.length} suggestions
                    </Badge>
                </div>

                {isLoading ? (
                    <Loading text="Generating recommendations..." />
                ) : (
                    <div className="space-y-4">
                        {recommendations.map((rec, index) => (
                            <motion.div
                                key={rec.id}
                                variants={itemVariants}
                                className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h4 className="font-medium text-gray-900 dark:text-white">
                                                {rec.title}
                                            </h4>
                                            <Badge variant="info" size="sm">
                                                {Math.round(rec.confidence * 100)}% match
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                            {rec.description}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 italic">
                                            {rec.reason}
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </Card>
        </motion.div>
    );
};

// AI-Powered Learning Insights
export const AILearningInsights = () => {
    const { insights, isLoading, generateInsights } = useAI();
    const { analytics } = useAnalytics();

    useEffect(() => {
        generateInsights(analytics);
    }, [analytics, generateInsights]);

    const getInsightIcon = (type) => {
        switch (type) {
            case 'performance': return <TrendingUp className="w-5 h-5" />;
            case 'engagement': return <Users className="w-5 h-5" />;
            case 'learning': return <BookOpen className="w-5 h-5" />;
            default: return <Lightbulb className="w-5 h-5" />;
        }
    };

    const getInsightColor = (impact) => {
        switch (impact) {
            case 'high': return 'from-green-500 to-green-600';
            case 'medium': return 'from-yellow-500 to-yellow-600';
            case 'low': return 'from-blue-500 to-blue-600';
            default: return 'from-gray-500 to-gray-600';
        }
    };

    return (
        <Card className="neu-card">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Learning Insights
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            AI-powered analysis
                        </p>
                    </div>
                </div>
                <Badge variant="success" size="sm">
                    {insights.length} insights
                </Badge>
            </div>

            {isLoading ? (
                <Loading text="Analyzing your learning patterns..." />
            ) : (
                <div className="space-y-4">
                    {insights.map((insight, index) => (
                        <motion.div
                            key={insight.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getInsightColor(insight.impact)} flex items-center justify-center flex-shrink-0`}>
                                    {getInsightIcon(insight.type)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-medium text-gray-900 dark:text-white">
                                            {insight.title}
                                        </h4>
                                        <Badge
                                            variant={insight.impact === 'high' ? 'success' : insight.impact === 'medium' ? 'warning' : 'info'}
                                            size="sm"
                                        >
                                            {insight.impact}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {insight.description}
                                    </p>
                                    {insight.actionable && (
                                        <Button variant="ghost" size="sm" className="mt-2">
                                            Take Action
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </Card>
    );
};

// AI-Powered Performance Dashboard
export const AIPerformanceDashboard = () => {
    const { analytics } = useAnalytics();
    const { user } = useUser();

    const performanceMetrics = [
        {
            title: 'Learning Velocity',
            value: analytics.userEngagement,
            target: 90,
            icon: <TrendingUp className="w-6 h-6" />,
            color: 'from-blue-500 to-blue-600',
            description: 'How fast you\'re progressing'
        },
        {
            title: 'Retention Rate',
            value: analytics.courseCompletion,
            target: 80,
            icon: <BookOpen className="w-6 h-6" />,
            color: 'from-green-500 to-green-600',
            description: 'Information retention'
        },
        {
            title: 'Mastery Level',
            value: analytics.performanceScore,
            target: 95,
            icon: <Award className="w-6 h-6" />,
            color: 'from-purple-500 to-purple-600',
            description: 'Subject mastery'
        },
        {
            title: 'Engagement Score',
            value: analytics.resourceUsage,
            target: 85,
            icon: <Activity className="w-6 h-6" />,
            color: 'from-orange-500 to-orange-600',
            description: 'Platform engagement'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, index) => (
                <motion.div
                    key={metric.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <Card className="glass-card hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${metric.color} flex items-center justify-center`}>
                                {metric.icon}
                            </div>
                            <Badge
                                variant={metric.value >= metric.target ? 'success' : 'warning'}
                                size="sm"
                            >
                                {metric.value >= metric.target ? 'On Track' : 'Needs Focus'}
                            </Badge>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                {metric.title}
                            </h3>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {metric.value}%
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                                {metric.description}
                            </p>
                        </div>

                        <Progress
                            value={metric.value}
                            max={100}
                            variant={metric.value >= metric.target ? 'success' : 'default'}
                            showLabel={false}
                        />

                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                            Target: {metric.target}%
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};

// AI-Powered Study Assistant
export const AIStudyAssistant = () => {
    const [isActive, setIsActive] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const studyTasks = [
        {
            id: 1,
            title: 'Review React Hooks',
            duration: '25 minutes',
            difficulty: 'intermediate',
            type: 'review',
            description: 'Focus on useEffect and useState patterns'
        },
        {
            id: 2,
            title: 'Practice JavaScript Algorithms',
            duration: '45 minutes',
            difficulty: 'advanced',
            type: 'practice',
            description: 'Work on array manipulation problems'
        },
        {
            id: 3,
            title: 'Read Documentation',
            duration: '20 minutes',
            difficulty: 'beginner',
            type: 'reading',
            description: 'Study new ES6+ features'
        }
    ];

    const startStudySession = (task) => {
        setCurrentTask(task);
        setIsActive(true);
    };

    return (
        <Card className="neu-card">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            AI Study Assistant
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Personalized study sessions
                        </p>
                    </div>
                </div>
                <Badge variant="primary" size="sm">
                    {isActive ? 'Active' : 'Ready'}
                </Badge>
            </div>

            {isActive && currentTask ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
                >
                    <div className="text-center">
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {currentTask.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {currentTask.description}
                        </p>
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <Badge variant="info" size="sm">
                                {currentTask.duration}
                            </Badge>
                            <Badge variant="warning" size="sm">
                                {currentTask.difficulty}
                            </Badge>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="primary" className="flex-1">
                                Continue Session
                            </Button>
                            <Button variant="secondary" onClick={() => setIsActive(false)}>
                                End Session
                            </Button>
                        </div>
                    </div>
                </motion.div>
            ) : (
                <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                        Recommended Study Sessions
                    </h4>
                    {studyTasks.map((task, index) => (
                        <motion.div
                            key={task.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer"
                            onClick={() => startStudySession(task)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                                        {task.title}
                                    </h5>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {task.description}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Badge variant="info" size="sm">
                                            {task.duration}
                                        </Badge>
                                        <Badge variant="warning" size="sm">
                                            {task.difficulty}
                                        </Badge>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm">
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </Card>
    );
};

// AI-Powered Progress Tracker
export const AIProgressTracker = () => {
    const { analytics } = useAnalytics();
    const [selectedPeriod, setSelectedPeriod] = useState('week');

    const progressData = {
        week: analytics.trends.weekly,
        month: analytics.trends.monthly
    };

    const currentData = progressData[selectedPeriod];
    const previousData = selectedPeriod === 'week' ? analytics.trends.weekly.slice(0, -1) : analytics.trends.monthly.slice(0, -1);

    const calculateImprovement = () => {
        const current = currentData[currentData.length - 1];
        const previous = previousData[previousData.length - 1];
        return ((current - previous) / previous * 100).toFixed(1);
    };

    return (
        <Card className="glass-card">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Progress Tracker
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            AI-powered insights
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={selectedPeriod === 'week' ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => setSelectedPeriod('week')}
                    >
                        Week
                    </Button>
                    <Button
                        variant={selectedPeriod === 'month' ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => setSelectedPeriod('month')}
                    >
                        Month
                    </Button>
                </div>
            </div>

            <div className="space-y-6">
                <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {currentData[currentData.length - 1]}%
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600 font-medium">
                            +{calculateImprovement()}% improvement
                        </span>
                    </div>
                </div>

                <div className="h-32 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                        <PieChart className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Interactive Progress Chart
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {Math.max(...currentData)}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Peak Performance
                        </div>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {Math.round(currentData.reduce((a, b) => a + b, 0) / currentData.length)}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Average Score
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};
