import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);

        if (newTheme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <motion.button
            onClick={toggleTheme}
            className="group fixed top-4 right-4 z-[9999] p-5 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-3 backdrop-blur-lg hover:scale-110"
            style={{
                backgroundColor: isDark ? '#ffffff' : '#1e293b',
                borderColor: isDark ? '#374151' : '#64748b',
                boxShadow: isDark 
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 0, 0, 0.1)' 
                    : '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.2)'
            }}
            whileHover={{ scale: 1.15, y: -4 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                className="relative"
            >
                {isDark ? (
                    <Sun className="w-7 h-7 drop-shadow-2xl" style={{ color: '#fbbf24' }} />
                ) : (
                    <Moon className="w-7 h-7 drop-shadow-2xl" style={{ color: '#ffffff' }} />
                )}
                
                {/* Enhanced Glow effect */}
                <motion.div
                    className="absolute inset-0 rounded-full blur-xl"
                    style={{
                        backgroundColor: isDark ? 'rgba(251, 191, 36, 0.4)' : 'rgba(255, 255, 255, 0.6)'
                    }}
                    animate={{ 
                        scale: [1, 1.4, 1],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.div>
            
            {/* Enhanced Tooltip */}
            <motion.div
                className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap text-sm font-bold"
                style={{
                    backgroundColor: isDark ? '#ffffff' : '#1e293b',
                    color: isDark ? '#1e293b' : '#ffffff',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                    border: `2px solid ${isDark ? '#374151' : '#64748b'}`
                }}
                initial={{ opacity: 0, y: -5 }}
                whileHover={{ opacity: 1, y: 0 }}
            >
                {isDark ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
                <div 
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45"
                    style={{
                        backgroundColor: isDark ? '#ffffff' : '#1e293b',
                        border: `1px solid ${isDark ? '#374151' : '#64748b'}`
                    }}
                ></div>
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;
