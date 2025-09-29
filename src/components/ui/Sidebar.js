import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

const Sidebar = ({
    isCollapsed = false,
    onToggle,
    items = [],
    className,
    variant = 'default'
}) => {
    const location = useLocation();

    const variants = {
        default: 'bg-white border-r border-gray-200',
        glass: 'bg-white/10 backdrop-blur-md border-r border-white/20',
        dark: 'bg-gray-900 border-r border-gray-700',
        neu: 'bg-gray-100 shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.7),inset_2px_2px_4px_rgba(0,0,0,0.1)]'
    };

    const sidebarVariants = {
        expanded: { width: 320 },
        collapsed: { width: 80 }
    };

    return (
        <motion.aside
            className={clsx(
                'fixed inset-y-0 left-0 z-30 flex flex-col transition-all duration-300',
                variants[variant],
                className
            )}
            variants={sidebarVariants}
            animate={isCollapsed ? 'collapsed' : 'expanded'}
            initial={false}
        >
            {/* Header */}
            <div className="p-6 border-b border-gray-200/50">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h2 className="text-xl font-bold text-gray-900">LMS Portal</h2>
                            <p className="text-sm text-gray-500">Learning Management</p>
                        </motion.div>
                    )}

                    <button
                        onClick={onToggle}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Toggle sidebar"
                    >
                        <div className="w-5 h-5 flex flex-col justify-center items-center">
                            <div className={clsx(
                                'w-4 h-0.5 bg-gray-600 transition-all duration-200',
                                isCollapsed ? 'rotate-45 translate-y-1' : 'mb-1'
                            )}></div>
                            <div className={clsx(
                                'w-4 h-0.5 bg-gray-600 transition-all duration-200',
                                isCollapsed ? 'opacity-0' : 'mb-1'
                            )}></div>
                            <div className={clsx(
                                'w-4 h-0.5 bg-gray-600 transition-all duration-200',
                                isCollapsed ? '-rotate-45 -translate-y-1' : ''
                            )}></div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {items.map((item, index) => {
                    const isActive = location.pathname === item.href;

                    return (
                        <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                to={item.href}
                                className={clsx(
                                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                                    isActive
                                        ? 'bg-blue-500 text-white shadow-lg'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                )}
                            >
                                <div className={clsx(
                                    'w-5 h-5 flex-shrink-0',
                                    isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                                )}>
                                    {item.icon}
                                </div>

                                {!isCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="font-medium"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}

                                {item.badge && !isCollapsed && (
                                    <span className="ml-auto px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        </motion.div>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200/50">
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center"
                    >
                        <p className="text-xs text-gray-500">
                            © 2024 LMS Platform
                        </p>
                    </motion.div>
                )}
            </div>
        </motion.aside>
    );
};

export default Sidebar;
