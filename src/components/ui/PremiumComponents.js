import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

// Premium Button Component with Glassmorphism & Neumorphism
export const Button = forwardRef(({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    icon,
    iconPosition = 'left',
    className,
    ...props
}, ref) => {
    const baseClasses = 'btn-premium inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-gradient-primary text-white shadow-lg hover:shadow-glow transform hover:scale-105 focus:ring-primary-500',
        secondary: 'bg-surface-secondary text-text-primary border border-border-medium hover:bg-surface-tertiary focus:ring-primary-500',
        ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-secondary focus:ring-primary-500',
        glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 focus:ring-primary-500',
        neu: 'bg-surface-primary text-text-primary shadow-neu-light hover:shadow-neu-inset focus:ring-primary-500',
        danger: 'bg-gradient-error text-white shadow-lg hover:shadow-glow-error transform hover:scale-105 focus:ring-error-500',
        success: 'bg-gradient-success text-white shadow-lg hover:shadow-glow-success transform hover:scale-105 focus:ring-success-500',
        warning: 'bg-gradient-warning text-white shadow-lg hover:shadow-glow-warning transform hover:scale-105 focus:ring-warning-500',
        info: 'bg-gradient-to-br from-info-500 to-info-700 text-white shadow-lg hover:shadow-glow transform hover:scale-105 focus:ring-info-500'
    };

    const sizes = {
        sm: 'px-3 py-2 text-sm rounded-lg',
        md: 'px-4 py-3 text-base rounded-xl',
        lg: 'px-6 py-4 text-lg rounded-xl',
        xl: 'px-8 py-5 text-xl rounded-2xl'
    };

    const iconSizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
        xl: 'w-7 h-7'
    };

    return (
        <motion.button
            ref={ref}
            className={clsx(
                baseClasses,
                variants[variant],
                sizes[size],
                className
            )}
            disabled={disabled || loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {loading && (
                <Loader2 className={clsx('animate-spin', iconSizes[size], iconPosition === 'left' ? 'mr-2' : 'ml-2')} />
            )}

            {!loading && icon && iconPosition === 'left' && (
                <span className={clsx(iconSizes[size], 'mr-2')}>
                    {icon}
                </span>
            )}

            {children}

            {!loading && icon && iconPosition === 'right' && (
                <span className={clsx(iconSizes[size], 'ml-2')}>
                    {icon}
                </span>
            )}
        </motion.button>
    );
});

Button.displayName = 'Button';

// Premium Card Component
export const Card = forwardRef(({
    children,
    variant = 'default',
    className,
    hover = true,
    ...props
}, ref) => {
    const variants = {
        default: 'bg-white shadow-lg border border-gray-200',
        glass: 'bg-white/10 backdrop-blur-md border border-white/20',
        neu: 'bg-white shadow-neu-light',
        elevated: 'bg-white shadow-2xl border border-gray-200',
        flat: 'bg-gray-50 border border-gray-300'
    };

    return (
        <motion.div
            ref={ref}
            className={clsx(
                'rounded-xl transition-all duration-300',
                // Only apply default padding if no custom className is provided
                !className?.includes('p-') && 'p-6',
                // Apply variant styles only if no custom background is provided
                !className?.includes('bg-') && variants[variant],
                hover && 'hover:shadow-xl',
                className
            )}
            whileHover={hover ? { y: -2 } : {}}
            {...props}
        >
            {children}
        </motion.div>
    );
});

Card.displayName = 'Card';

// Premium Input Component
export const Input = forwardRef(({
    label,
    error,
    icon,
    iconPosition = 'left',
    variant = 'default',
    className,
    ...props
}, ref) => {
    const variants = {
        default: 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500',
        glass: 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500',
        dark: 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500'
    };

    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-gray-300">
                    {label}
                </label>
            )}

            <div className="relative">
                {icon && iconPosition === 'left' && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400 w-5 h-5">
                            {icon}
                        </span>
                    </div>
                )}

                <input
                    ref={ref}
                    className={clsx(
                        'w-full px-4 py-3 rounded-xl focus:ring-2 transition-all duration-200',
                        variants[variant],
                        icon && iconPosition === 'left' && 'pl-10',
                        icon && iconPosition === 'right' && 'pr-10',
                        error && 'border-error-500 focus:ring-error-500',
                        className
                    )}
                    {...props}
                />

                {icon && iconPosition === 'right' && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-400 w-5 h-5">
                            {icon}
                        </span>
                    </div>
                )}
            </div>

            {error && (
                <p className="text-sm text-error-600">
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

// Premium Loading Component
export const Loading = ({
    size = 'md',
    variant = 'spinner',
    text,
    className
}) => {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };

    const variants = {
        spinner: (
            <div className={clsx('border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin', sizes[size])} />
        ),
        dots: (
            <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-2 h-2 bg-primary-500 rounded-full"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.2
                        }}
                    />
                ))}
            </div>
        ),
        pulse: (
            <div className={clsx('bg-primary-500 rounded-full animate-pulse', sizes[size])} />
        )
    };

    return (
        <div className={clsx('flex flex-col items-center justify-center space-y-2', className)}>
            {variants[variant]}
            {text && (
                <p className="text-sm text-gray-400">
                    {text}
                </p>
            )}
        </div>
    );
};

// Premium Badge Component
export const Badge = ({
    children,
    variant = 'default',
    size = 'md',
    className
}) => {
    const variants = {
        default: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-200',
        primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200',
        success: 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200',
        warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200',
        danger: 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200',
        info: 'bg-info-100 text-info-800 dark:bg-info-900 dark:text-info-200',
        accent: 'bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-200'
    };

    const sizes = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-2 text-base'
    };

    return (
        <span className={clsx(
            'inline-flex items-center font-medium rounded-full',
            variants[variant],
            sizes[size],
            className
        )}>
            {children}
        </span>
    );
};

// Premium Modal Component
export const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    className
}) => {
    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full mx-4'
    };

    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <motion.div
                    className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                />

                <motion.div
                    className={clsx(
                        'inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle',
                        sizes[size],
                        className
                    )}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                >
                    {title && (
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {title}
                            </h3>
                        </div>
                    )}

                    <div className="px-6 py-4">
                        {children}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

// Premium Toast Component
export const Toast = ({
    message,
    type = 'info',
    isVisible,
    onClose,
    duration = 5000
}) => {
    const types = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-white',
        info: 'bg-blue-500 text-white'
    };

    React.useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    return (
        <motion.div
            className={clsx(
                'fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-lg',
                types[type]
            )}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
        >
            <div className="flex items-center justify-between">
                <span className="font-medium">{message}</span>
                <button
                    onClick={onClose}
                    className="ml-4 text-white hover:text-gray-200"
                >
                    ×
                </button>
            </div>
        </motion.div>
    );
};

// Premium Progress Component
export const Progress = ({
    value,
    max = 100,
    size = 'md',
    variant = 'default',
    showLabel = true,
    className
}) => {
    const sizes = {
        sm: 'h-2',
        md: 'h-3',
        lg: 'h-4'
    };

    const variants = {
        default: 'bg-primary-500',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        danger: 'bg-red-500'
    };

    const percentage = Math.min((value / max) * 100, 100);

    return (
        <div className={clsx('space-y-2', className)}>
            {showLabel && (
                <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span>Progress</span>
                    <span>{Math.round(percentage)}%</span>
                </div>
            )}

            <div className={clsx('w-full bg-gray-200 rounded-full overflow-hidden', sizes[size])}>
                <motion.div
                    className={clsx('h-full rounded-full transition-all duration-500 ease-out', variants[variant])}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

// Premium Skeleton Component
export const Skeleton = ({
    width = 'w-full',
    height = 'h-4',
    className
}) => {
    return (
        <div className={clsx('skeleton rounded', width, height, className)} />
    );
};

// Premium Avatar Component
export const Avatar = ({
    src,
    alt,
    size = 'md',
    fallback,
    className
}) => {
    const sizes = {
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
        xl: 'w-16 h-16 text-xl'
    };

    return (
        <div className={clsx(
            'relative inline-flex items-center justify-center rounded-full bg-gray-500 text-white font-medium',
            sizes[size],
            className
        )}>
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full rounded-full object-cover"
                />
            ) : (
                <span>{fallback || alt?.charAt(0)?.toUpperCase()}</span>
            )}
        </div>
    );
};

// Premium Divider Component
export const Divider = ({
    orientation = 'horizontal',
    className
}) => {
    if (orientation === 'vertical') {
        return <div className={clsx('w-px bg-gray-200 dark:bg-gray-700', className)} />;
    }

    return <div className={clsx('h-px bg-gray-200 dark:bg-gray-700', className)} />;
};

// Premium Tooltip Component
export const Tooltip = ({
    children,
    content,
    position = 'top',
    className
}) => {
    const positions = {
        top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
    };

    return (
        <div className="relative group">
            {children}
            <div className={clsx(
                'absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none',
                positions[position],
                className
            )}>
                {content}
                <div className={clsx(
                    'absolute w-2 h-2 bg-gray-900 transform rotate-45',
                    position === 'top' && 'top-full left-1/2 transform -translate-x-1/2 -mt-1',
                    position === 'bottom' && 'bottom-full left-1/2 transform -translate-x-1/2 -mb-1',
                    position === 'left' && 'left-full top-1/2 transform -translate-y-1/2 -ml-1',
                    position === 'right' && 'right-full top-1/2 transform -translate-y-1/2 -mr-1'
                )} />
            </div>
        </div>
    );
};
