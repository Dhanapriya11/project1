import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((toast) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newToast = {
            id,
            type: 'info',
            duration: 5000,
            ...toast,
        };

        setToasts(prev => [...prev, newToast]);

        if (newToast.duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, newToast.duration);
        }

        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const success = useCallback((message, options = {}) => {
        return addToast({ type: 'success', message, ...options });
    }, [addToast]);

    const error = useCallback((message, options = {}) => {
        return addToast({ type: 'error', message, ...options });
    }, [addToast]);

    const warning = useCallback((message, options = {}) => {
        return addToast({ type: 'warning', message, ...options });
    }, [addToast]);

    const info = useCallback((message, options = {}) => {
        return addToast({ type: 'info', message, ...options });
    }, [addToast]);

    const value = {
        addToast,
        removeToast,
        success,
        error,
        warning,
        info,
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
};

const ToastContainer = ({ toasts, onRemove }) => {
    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <Toast key={toast.id} toast={toast} onRemove={onRemove} />
                ))}
            </AnimatePresence>
        </div>
    );
};

const Toast = ({ toast, onRemove }) => {
    const icons = {
        success: CheckCircle,
        error: AlertCircle,
        warning: AlertTriangle,
        info: Info,
    };

    const colors = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-white',
        info: 'bg-blue-500 text-white',
    };

    const Icon = icons[toast.type];

    return (
        <motion.div
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg max-w-sm',
                colors[toast.type]
            )}
        >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <div className="flex-1">
                <p className="font-medium">{toast.message}</p>
                {toast.description && (
                    <p className="text-sm opacity-90 mt-1">{toast.description}</p>
                )}
            </div>
            <button
                onClick={() => onRemove(toast.id)}
                className="flex-shrink-0 p-1 rounded-lg hover:bg-white/20 transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
};

export default ToastProvider;
