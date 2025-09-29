// Color Migration Script for Premium LMS
// This script helps migrate from old color classes to new premium color system

const colorMappings = {
    // Background Colors
    'bg-slate-50': 'bg-background-secondary',
    'bg-slate-100': 'bg-background-tertiary',
    'bg-slate-200': 'bg-surface-secondary',
    'bg-slate-300': 'bg-surface-tertiary',
    'bg-slate-400': 'bg-surface-elevated',
    'bg-slate-500': 'bg-secondary-500',
    'bg-slate-600': 'bg-secondary-600',
    'bg-slate-700': 'bg-secondary-700',
    'bg-slate-800': 'bg-secondary-800',
    'bg-slate-900': 'bg-secondary-900',
    'bg-slate-950': 'bg-secondary-950',

    'bg-gray-50': 'bg-background-secondary',
    'bg-gray-100': 'bg-background-tertiary',
    'bg-gray-200': 'bg-surface-secondary',
    'bg-gray-300': 'bg-surface-tertiary',
    'bg-gray-400': 'bg-surface-elevated',
    'bg-gray-500': 'bg-secondary-500',
    'bg-gray-600': 'bg-secondary-600',
    'bg-gray-700': 'bg-secondary-700',
    'bg-gray-800': 'bg-secondary-800',
    'bg-gray-900': 'bg-secondary-900',
    'bg-gray-950': 'bg-secondary-950',

    'bg-white': 'bg-surface-primary',
    'bg-black': 'bg-dark-surface-primary',

    // Text Colors
    'text-slate-50': 'text-text-inverse',
    'text-slate-100': 'text-text-inverse',
    'text-slate-200': 'text-text-inverse',
    'text-slate-300': 'text-text-inverse',
    'text-slate-400': 'text-text-muted',
    'text-slate-500': 'text-text-tertiary',
    'text-slate-600': 'text-text-secondary',
    'text-slate-700': 'text-text-secondary',
    'text-slate-800': 'text-text-primary',
    'text-slate-900': 'text-text-primary',
    'text-slate-950': 'text-text-primary',

    'text-gray-50': 'text-text-inverse',
    'text-gray-100': 'text-text-inverse',
    'text-gray-200': 'text-text-inverse',
    'text-gray-300': 'text-text-inverse',
    'text-gray-400': 'text-text-muted',
    'text-gray-500': 'text-text-tertiary',
    'text-gray-600': 'text-text-secondary',
    'text-gray-700': 'text-text-secondary',
    'text-gray-800': 'text-text-primary',
    'text-gray-900': 'text-text-primary',
    'text-gray-950': 'text-text-primary',

    'text-white': 'text-text-inverse',
    'text-black': 'text-text-primary',

    // Border Colors
    'border-slate-200': 'border-border-light',
    'border-slate-300': 'border-border-medium',
    'border-slate-400': 'border-border-strong',
    'border-slate-500': 'border-secondary-500',
    'border-slate-600': 'border-secondary-600',
    'border-slate-700': 'border-secondary-700',
    'border-slate-800': 'border-secondary-800',
    'border-slate-900': 'border-secondary-900',

    'border-gray-200': 'border-border-light',
    'border-gray-300': 'border-border-medium',
    'border-gray-400': 'border-border-strong',
    'border-gray-500': 'border-secondary-500',
    'border-gray-600': 'border-secondary-600',
    'border-gray-700': 'border-secondary-700',
    'border-gray-800': 'border-secondary-800',
    'border-gray-900': 'border-secondary-900',

    // Blue Colors (Primary)
    'bg-blue-50': 'bg-primary-50',
    'bg-blue-100': 'bg-primary-100',
    'bg-blue-200': 'bg-primary-200',
    'bg-blue-300': 'bg-primary-300',
    'bg-blue-400': 'bg-primary-400',
    'bg-blue-500': 'bg-primary-500',
    'bg-blue-600': 'bg-primary-600',
    'bg-blue-700': 'bg-primary-700',
    'bg-blue-800': 'bg-primary-800',
    'bg-blue-900': 'bg-primary-900',
    'bg-blue-950': 'bg-primary-950',

    'text-blue-50': 'text-primary-50',
    'text-blue-100': 'text-primary-100',
    'text-blue-200': 'text-primary-200',
    'text-blue-300': 'text-primary-300',
    'text-blue-400': 'text-primary-400',
    'text-blue-500': 'text-primary-500',
    'text-blue-600': 'text-primary-600',
    'text-blue-700': 'text-primary-700',
    'text-blue-800': 'text-primary-800',
    'text-blue-900': 'text-primary-900',
    'text-blue-950': 'text-primary-950',

    'border-blue-200': 'border-primary-200',
    'border-blue-300': 'border-primary-300',
    'border-blue-400': 'border-primary-400',
    'border-blue-500': 'border-primary-500',
    'border-blue-600': 'border-primary-600',
    'border-blue-700': 'border-primary-700',
    'border-blue-800': 'border-primary-800',
    'border-blue-900': 'border-primary-900',

    // Purple Colors (Accent)
    'bg-purple-50': 'bg-accent-50',
    'bg-purple-100': 'bg-accent-100',
    'bg-purple-200': 'bg-accent-200',
    'bg-purple-300': 'bg-accent-300',
    'bg-purple-400': 'bg-accent-400',
    'bg-purple-500': 'bg-accent-500',
    'bg-purple-600': 'bg-accent-600',
    'bg-purple-700': 'bg-accent-700',
    'bg-purple-800': 'bg-accent-800',
    'bg-purple-900': 'bg-accent-900',
    'bg-purple-950': 'bg-accent-950',

    'text-purple-50': 'text-accent-50',
    'text-purple-100': 'text-accent-100',
    'text-purple-200': 'text-accent-200',
    'text-purple-300': 'text-accent-300',
    'text-purple-400': 'text-accent-400',
    'text-purple-500': 'text-accent-500',
    'text-purple-600': 'text-accent-600',
    'text-purple-700': 'text-accent-700',
    'text-purple-800': 'text-accent-800',
    'text-purple-900': 'text-accent-900',
    'text-purple-950': 'text-accent-950',

    // Green Colors (Success)
    'bg-green-50': 'bg-success-50',
    'bg-green-100': 'bg-success-100',
    'bg-green-200': 'bg-success-200',
    'bg-green-300': 'bg-success-300',
    'bg-green-400': 'bg-success-400',
    'bg-green-500': 'bg-success-500',
    'bg-green-600': 'bg-success-600',
    'bg-green-700': 'bg-success-700',
    'bg-green-800': 'bg-success-800',
    'bg-green-900': 'bg-success-900',
    'bg-green-950': 'bg-success-950',

    'text-green-50': 'text-success-50',
    'text-green-100': 'text-success-100',
    'text-green-200': 'text-success-200',
    'text-green-300': 'text-success-300',
    'text-green-400': 'text-success-400',
    'text-green-500': 'text-success-500',
    'text-green-600': 'text-success-600',
    'text-green-700': 'text-success-700',
    'text-green-800': 'text-success-800',
    'text-green-900': 'text-success-900',
    'text-green-950': 'text-success-950',

    // Red Colors (Error)
    'bg-red-50': 'bg-error-50',
    'bg-red-100': 'bg-error-100',
    'bg-red-200': 'bg-error-200',
    'bg-red-300': 'bg-error-300',
    'bg-red-400': 'bg-error-400',
    'bg-red-500': 'bg-error-500',
    'bg-red-600': 'bg-error-600',
    'bg-red-700': 'bg-error-700',
    'bg-red-800': 'bg-error-800',
    'bg-red-900': 'bg-error-900',
    'bg-red-950': 'bg-error-950',

    'text-red-50': 'text-error-50',
    'text-red-100': 'text-error-100',
    'text-red-200': 'text-error-200',
    'text-red-300': 'text-error-300',
    'text-red-400': 'text-error-400',
    'text-red-500': 'text-error-500',
    'text-red-600': 'text-error-600',
    'text-red-700': 'text-error-700',
    'text-red-800': 'text-error-800',
    'text-red-900': 'text-error-900',
    'text-red-950': 'text-error-950',

    // Yellow Colors (Warning)
    'bg-yellow-50': 'bg-warning-50',
    'bg-yellow-100': 'bg-warning-100',
    'bg-yellow-200': 'bg-warning-200',
    'bg-yellow-300': 'bg-warning-300',
    'bg-yellow-400': 'bg-warning-400',
    'bg-yellow-500': 'bg-warning-500',
    'bg-yellow-600': 'bg-warning-600',
    'bg-yellow-700': 'bg-warning-700',
    'bg-yellow-800': 'bg-warning-800',
    'bg-yellow-900': 'bg-warning-900',
    'bg-yellow-950': 'bg-warning-950',

    'text-yellow-50': 'text-warning-50',
    'text-yellow-100': 'text-warning-100',
    'text-yellow-200': 'text-warning-200',
    'text-yellow-300': 'text-warning-300',
    'text-yellow-400': 'text-warning-400',
    'text-yellow-500': 'text-warning-500',
    'text-yellow-600': 'text-warning-600',
    'text-yellow-700': 'text-warning-700',
    'text-yellow-800': 'text-warning-800',
    'text-yellow-900': 'text-warning-900',
    'text-yellow-950': 'text-warning-950',

    // Dark Mode Specific
    'dark:bg-slate-900': 'dark:bg-dark-background-primary',
    'dark:bg-slate-800': 'dark:bg-dark-background-secondary',
    'dark:bg-slate-700': 'dark:bg-dark-background-tertiary',
    'dark:bg-gray-900': 'dark:bg-dark-background-primary',
    'dark:bg-gray-800': 'dark:bg-dark-background-secondary',
    'dark:bg-gray-700': 'dark:bg-dark-background-tertiary',

    'dark:text-white': 'dark:text-dark-text-primary',
    'dark:text-gray-100': 'dark:text-dark-text-primary',
    'dark:text-gray-200': 'dark:text-dark-text-primary',
    'dark:text-gray-300': 'dark:text-dark-text-secondary',
    'dark:text-gray-400': 'dark:text-dark-text-tertiary',
    'dark:text-gray-500': 'dark:text-dark-text-muted',

    'dark:border-gray-700': 'dark:border-dark-border-medium',
    'dark:border-gray-600': 'dark:border-dark-border-strong',
    'dark:border-gray-800': 'dark:border-dark-border-light',

    // Gradient Backgrounds
    'from-slate-50': 'from-background-secondary',
    'to-blue-50': 'to-background-tertiary',
    'from-slate-900': 'from-dark-background-primary',
    'to-blue-900': 'to-dark-background-secondary',

    // Focus States
    'focus:ring-blue-500': 'focus:ring-primary-500',
    'focus:border-blue-500': 'focus:border-primary-500',
    'focus:ring-primary-500': 'focus:ring-primary-500',
    'focus:border-primary-500': 'focus:border-primary-500',
};

// Function to migrate a single file
function migrateFile(filePath) {
    const fs = require('fs');
    let content = fs.readFileSync(filePath, 'utf8');

    // Apply all color mappings
    Object.entries(colorMappings).forEach(([oldClass, newClass]) => {
        const regex = new RegExp(`\\b${oldClass}\\b`, 'g');
        content = content.replace(regex, newClass);
    });

    // Write back to file
    fs.writeFileSync(filePath, content);
    console.log(`Migrated: ${filePath}`);
}

// Export for use
module.exports = {
    colorMappings,
    migrateFile
};
