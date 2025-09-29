/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
                display: ['Poppins', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
                mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'Consolas', 'Courier New', 'monospace'],
            },
            colors: {
                // Premium Primary Palette - Deep Ocean Blue
                primary: {
                    50: '#f0f9ff',   // Lightest blue
                    100: '#e0f2fe',  // Very light blue
                    200: '#bae6fd',  // Light blue
                    300: '#7dd3fc',  // Medium light blue
                    400: '#38bdf8',  // Medium blue
                    500: '#0ea5e9',  // Base primary blue
                    600: '#0284c7',  // Medium dark blue
                    700: '#0369a1',  // Dark blue
                    800: '#075985',  // Very dark blue
                    900: '#0c4a6e',  // Darkest blue
                    950: '#082f49',  // Ultra dark blue
                },

                // Premium Secondary Palette - Sophisticated Grays
                secondary: {
                    50: '#fafafa',   // Pure white with hint of gray
                    100: '#f5f5f5',  // Very light gray
                    200: '#e5e5e5',  // Light gray
                    300: '#d4d4d4',  // Medium light gray
                    400: '#a3a3a3',  // Medium gray
                    500: '#737373',  // Base gray
                    600: '#525252',  // Medium dark gray
                    700: '#404040',  // Dark gray
                    800: '#262626',  // Very dark gray
                    900: '#171717',  // Darkest gray
                    950: '#0a0a0a',  // Ultra dark gray
                },

                // Premium Accent Palette - Vibrant Purple
                accent: {
                    50: '#faf5ff',   // Lightest purple
                    100: '#f3e8ff',  // Very light purple
                    200: '#e9d5ff',  // Light purple
                    300: '#d8b4fe',  // Medium light purple
                    400: '#c084fc',  // Medium purple
                    500: '#a855f7',  // Base accent purple
                    600: '#9333ea',  // Medium dark purple
                    700: '#7c3aed',  // Dark purple
                    800: '#6b21a8',  // Very dark purple
                    900: '#581c87',  // Darkest purple
                    950: '#3b0764',  // Ultra dark purple
                },

                // Success Palette - Professional Green
                success: {
                    50: '#f0fdf4',   // Lightest green
                    100: '#dcfce7',  // Very light green
                    200: '#bbf7d0',  // Light green
                    300: '#86efac',  // Medium light green
                    400: '#4ade80',  // Medium green
                    500: '#22c55e',  // Base success green
                    600: '#16a34a',  // Medium dark green
                    700: '#15803d',  // Dark green
                    800: '#166534',  // Very dark green
                    900: '#14532d',  // Darkest green
                    950: '#052e16',  // Ultra dark green
                },

                // Warning Palette - Warm Amber
                warning: {
                    50: '#fffbeb',   // Lightest amber
                    100: '#fef3c7',  // Very light amber
                    200: '#fde68a',  // Light amber
                    300: '#fcd34d',  // Medium light amber
                    400: '#fbbf24',  // Medium amber
                    500: '#f59e0b',  // Base warning amber
                    600: '#d97706',  // Medium dark amber
                    700: '#b45309',  // Dark amber
                    800: '#92400e',  // Very dark amber
                    900: '#78350f',  // Darkest amber
                    950: '#451a03',  // Ultra dark amber
                },

                // Error Palette - Professional Red
                error: {
                    50: '#fef2f2',   // Lightest red
                    100: '#fee2e2',  // Very light red
                    200: '#fecaca',  // Light red
                    300: '#fca5a5',  // Medium light red
                    400: '#f87171',  // Medium red
                    500: '#ef4444',  // Base error red
                    600: '#dc2626',  // Medium dark red
                    700: '#b91c1c',  // Dark red
                    800: '#991b1b',  // Very dark red
                    900: '#7f1d1d',  // Darkest red
                    950: '#450a0a',  // Ultra dark red
                },

                // Info Palette - Professional Cyan
                info: {
                    50: '#ecfeff',   // Lightest cyan
                    100: '#cffafe',  // Very light cyan
                    200: '#a5f3fc',  // Light cyan
                    300: '#67e8f9',  // Medium light cyan
                    400: '#22d3ee',  // Medium cyan
                    500: '#06b6d4',  // Base info cyan
                    600: '#0891b2',  // Medium dark cyan
                    700: '#0e7490',  // Dark cyan
                    800: '#155e75',  // Very dark cyan
                    900: '#164e63',  // Darkest cyan
                    950: '#083344',  // Ultra dark cyan
                },

                // Neutral Palette - Pure Grays
                neutral: {
                    50: '#fafafa',   // Pure white
                    100: '#f5f5f5',  // Very light gray
                    200: '#e5e5e5',  // Light gray
                    300: '#d4d4d4',  // Medium light gray
                    400: '#a3a3a3',  // Medium gray
                    500: '#737373',  // Base neutral gray
                    600: '#525252',  // Medium dark gray
                    700: '#404040',  // Dark gray
                    800: '#262626',  // Very dark gray
                    900: '#171717',  // Darkest gray
                    950: '#0a0a0a',  // Ultra dark gray
                },

                // Semantic Colors for Light Mode
                background: {
                    primary: '#ffffff',      // Pure white
                    secondary: '#fafafa',    // Off-white
                    tertiary: '#f5f5f5',     // Light gray
                    elevated: '#ffffff',     // Elevated surfaces
                    glass: 'rgba(255, 255, 255, 0.8)', // Glass effect
                },

                surface: {
                    primary: '#ffffff',      // Primary surface
                    secondary: '#fafafa',    // Secondary surface
                    tertiary: '#f5f5f5',     // Tertiary surface
                    elevated: '#ffffff',     // Elevated surface
                    glass: 'rgba(255, 255, 255, 0.8)', // Glass surface
                },

                text: {
                    primary: '#171717',      // Primary text (darkest)
                    secondary: '#525252',    // Secondary text
                    tertiary: '#737373',     // Tertiary text
                    inverse: '#ffffff',      // Inverse text (white)
                    muted: '#a3a3a3',        // Muted text
                    disabled: '#d4d4d4',     // Disabled text
                },

                border: {
                    light: '#e5e5e5',       // Light borders
                    medium: '#d4d4d4',      // Medium borders
                    strong: '#a3a3a3',      // Strong borders
                    focus: '#0ea5e9',       // Focus borders
                },

                // Dark Mode Colors
                dark: {
                    background: {
                        primary: '#0a0a0a',     // Pure black
                        secondary: '#171717',   // Dark gray
                        tertiary: '#262626',    // Medium dark gray
                        elevated: '#404040',   // Elevated dark surfaces
                        glass: 'rgba(0, 0, 0, 0.8)', // Dark glass effect
                    },

                    surface: {
                        primary: '#171717',     // Primary dark surface
                        secondary: '#262626',  // Secondary dark surface
                        tertiary: '#404040',   // Tertiary dark surface
                        elevated: '#525252',  // Elevated dark surface
                        glass: 'rgba(0, 0, 0, 0.8)', // Dark glass surface
                    },

                    text: {
                        primary: '#fafafa',     // Primary dark text (lightest)
                        secondary: '#d4d4d4',   // Secondary dark text
                        tertiary: '#a3a3a3',    // Tertiary dark text
                        inverse: '#171717',     // Inverse dark text (dark)
                        muted: '#737373',       // Muted dark text
                        disabled: '#525252',    // Disabled dark text
                    },

                    border: {
                        light: '#404040',      // Light dark borders
                        medium: '#525252',     // Medium dark borders
                        strong: '#737373',     // Strong dark borders
                        focus: '#38bdf8',      // Focus dark borders
                    },
                },
            },

            // Premium Typography Scale
            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1rem' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'base': ['1rem', { lineHeight: '1.5rem' }],
                'lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'xl': ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
                '5xl': ['3rem', { lineHeight: '1' }],
                '6xl': ['3.75rem', { lineHeight: '1' }],
                '7xl': ['4.5rem', { lineHeight: '1' }],
                '8xl': ['6rem', { lineHeight: '1' }],
                '9xl': ['8rem', { lineHeight: '1' }],
            },

            // Premium Spacing Scale
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
            },

            // Premium Border Radius
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            },

            // Premium Box Shadows
            boxShadow: {
                'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
                'glow': '0 0 20px rgba(14, 165, 233, 0.3)',
                'glow-accent': '0 0 20px rgba(168, 85, 247, 0.3)',
                'glow-success': '0 0 20px rgba(34, 197, 94, 0.3)',
                'glow-warning': '0 0 20px rgba(245, 158, 11, 0.3)',
                'glow-error': '0 0 20px rgba(239, 68, 68, 0.3)',
                'neu-light': '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
                'neu-inset': 'inset 20px 20px 60px #bebebe, inset -20px -20px 60px #ffffff',
                'neu-dark': '20px 20px 60px #0a0a0a, -20px -20px 60px #262626',
                'neu-dark-inset': 'inset 20px 20px 60px #0a0a0a, inset -20px -20px 60px #262626',
            },

            // Premium Animations
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'fade-in-up': 'fadeInUp 0.6s ease-out',
                'fade-in-down': 'fadeInDown 0.6s ease-out',
                'slide-in-left': 'slideInLeft 0.5s ease-out',
                'slide-in-right': 'slideInRight 0.5s ease-out',
                'scale-in': 'scaleIn 0.4s ease-out',
                'bounce-in': 'bounceIn 0.6s ease-out',
                'glow': 'glow 2s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 3s linear infinite',
                'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
            },

            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInLeft: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                bounceIn: {
                    '0%': { transform: 'scale(0.3)', opacity: '0' },
                    '50%': { transform: 'scale(1.05)' },
                    '70%': { transform: 'scale(0.9)' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                glow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.3)' },
                    '50%': { boxShadow: '0 0 30px rgba(14, 165, 233, 0.6)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },

            // Premium Backdrop Blur
            backdropBlur: {
                xs: '2px',
                sm: '4px',
                md: '8px',
                lg: '12px',
                xl: '16px',
                '2xl': '24px',
                '3xl': '40px',
            },

            // Premium Gradients
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-primary': 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                'gradient-accent': 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
                'gradient-success': 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                'gradient-warning': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                'gradient-error': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                'gradient-dark-glass': 'linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 100%)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
    darkMode: 'class',
}