# Design System Documentation

This document outlines the comprehensive design system implemented for the Learning Management System (LMS) based on the provided UI schema.

## Overview

The design system provides a consistent, scalable, and maintainable approach to styling across the entire LMS application. It includes design tokens, component styles, and responsive design patterns.

## File Structure

```
src/styles/
├── design-tokens.css      # CSS custom properties and design tokens
├── component-styles.css   # Reusable component styles
└── responsive.css         # Responsive design breakpoints and utilities
```

## Design Tokens

### Colors

#### Primary Colors
- `--color-blue: #2563eb` - Primary blue for actions and highlights
- `--color-orange: #f97316` - Orange for warnings and accents
- `--color-purple: #7c3aed` - Purple for special features
- `--color-green: #10b981` - Green for success states
- `--color-red: #ef4444` - Red for errors and destructive actions

#### Neutral Colors
- `--color-white: #ffffff` - Pure white
- `--color-gray-50: #f9fafb` - Lightest gray (backgrounds)
- `--color-gray-100: #f3f4f6` - Light gray (subtle backgrounds)
- `--color-gray-200: #e5e7eb` - Medium light gray (borders)
- `--color-gray-300: #d1d5db` - Medium gray (disabled states)
- `--color-gray-600: #4b5563` - Dark gray (secondary text)
- `--color-gray-900: #111827` - Darkest gray (primary text)

### Typography

#### Font Family
- `--font-family: 'Inter', system-ui, sans-serif`

#### Font Sizes
- `--font-size-xs: 12px` - Extra small text
- `--font-size-sm: 14px` - Small text
- `--font-size-base: 16px` - Base text size
- `--font-size-lg: 18px` - Large text
- `--font-size-xl: 20px` - Extra large text
- `--font-size-2xl: 24px` - 2X large text
- `--font-size-3xl: 30px` - 3X large text

#### Font Weights
- `--font-weight-normal: 400` - Normal weight
- `--font-weight-medium: 500` - Medium weight
- `--font-weight-semibold: 600` - Semi-bold weight
- `--font-weight-bold: 700` - Bold weight

### Spacing

- `--space-xs: 4px` - Extra small spacing
- `--space-sm: 8px` - Small spacing
- `--space-md: 16px` - Medium spacing
- `--space-lg: 24px` - Large spacing
- `--space-xl: 32px` - Extra large spacing
- `--space-xxl: 48px` - 2X large spacing

### Border Radius

- `--radius-small: 4px` - Small radius
- `--radius-medium: 8px` - Medium radius
- `--radius-large: 12px` - Large radius
- `--radius-xl: 16px` - Extra large radius

### Shadows

- `--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05)` - Small shadow
- `--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.05)` - Medium shadow
- `--shadow-lg: 0 8px 15px rgba(0, 0, 0, 0.1)` - Large shadow

### Motion

- `--motion-fast: all 0.2s ease-in-out` - Fast transitions
- `--motion-normal: all 0.3s ease` - Normal transitions
- `--motion-spin: spin 1s ease-in-out infinite` - Spin animation

## Component Styles

### Cards

All cards follow a consistent pattern:

```css
.card {
  background: var(--color-white);
  border-radius: var(--radius-large);
  padding: var(--space-lg);
  box-shadow: var(--shadow-md);
  border: var(--card-border);
  transition: var(--motion-normal);
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}
```

### Buttons

#### Primary Button
```css
.button-primary {
  background: var(--color-blue);
  color: var(--color-white);
  border-radius: var(--radius-medium);
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: var(--motion-fast);
}

.button-primary:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}
```

#### Secondary Button
```css
.button-secondary {
  background: var(--color-white);
  color: var(--color-gray-900);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-medium);
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: var(--motion-fast);
}

.button-secondary:hover {
  background: var(--color-gray-50);
}
```

### Stats Cards

```css
.stats-card {
  background: var(--color-white);
  border-radius: var(--radius-large);
  padding: var(--space-lg);
  box-shadow: var(--shadow-md);
  transition: var(--motion-normal);
  border: var(--card-border);
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.stats-card .icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #f0f7ff;
  color: #4a6fa5;
  font-size: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
```

## Responsive Design

### Breakpoints

- **Mobile**: `576px` and below
- **Tablet**: `577px` to `768px`
- **Laptop**: `769px` to `992px`
- **Desktop**: `993px` to `1280px`
- **Large Desktop**: `1281px` and above

### Mobile-First Approach

The design system uses a mobile-first approach with progressive enhancement:

1. **Mobile**: Single column layouts, stacked elements
2. **Tablet**: Two-column layouts where appropriate
3. **Laptop**: Multi-column grids with sidebar
4. **Desktop**: Full feature layouts with optimal spacing

### Responsive Patterns

#### Grid Layouts
```css
/* Mobile: Single column */
.grid {
  grid-template-columns: 1fr;
}

/* Tablet: Two columns */
@media (min-width: 577px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: Auto-fit columns */
@media (min-width: 993px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
}
```

#### Sidebar Behavior
```css
/* Mobile: Hidden sidebar */
@media (max-width: 576px) {
  .sidebar {
    transform: translateX(-100%);
  }
  
  .main-content {
    margin-left: 0;
  }
}

/* Desktop: Fixed sidebar */
@media (min-width: 993px) {
  .sidebar {
    transform: translateX(0);
  }
  
  .main-content {
    margin-left: var(--sidebar-width);
  }
}
```

## Accessibility Features

### High Contrast Mode
```css
@media (prefers-contrast: high) {
  :root {
    --color-gray-200: #000000;
    --card-border: 2px solid #000000;
  }
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Dark Mode Support
```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-white: #1a1a1a;
    --color-gray-900: #ffffff;
  }
}
```

## Usage Guidelines

### 1. Use Design Tokens
Always use CSS custom properties instead of hardcoded values:

```css
/* ✅ Good */
.button {
  background: var(--color-blue);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-medium);
}

/* ❌ Bad */
.button {
  background: #2563eb;
  padding: 8px 16px;
  border-radius: 8px;
}
```

### 2. Follow Component Patterns
Use the predefined component classes for consistency:

```css
/* ✅ Good */
<div class="stats-card">
  <div class="icon">📊</div>
  <div class="metric-value">1,234</div>
</div>

/* ❌ Bad */
<div class="custom-card">
  <div class="custom-icon">📊</div>
  <div class="custom-value">1,234</div>
</div>
```

### 3. Responsive Design
Always consider mobile-first responsive design:

```css
/* ✅ Good */
.component {
  padding: var(--space-md);
}

@media (min-width: 768px) {
  .component {
    padding: var(--space-lg);
  }
}
```

### 4. Accessibility
Ensure proper contrast ratios and keyboard navigation:

```css
.button:focus {
  outline: 2px solid var(--color-blue);
  outline-offset: 2px;
}
```

## Browser Support

The design system supports:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Considerations

- CSS custom properties are efficiently cached
- Minimal CSS bundle size through token reuse
- Optimized animations with `transform` and `opacity`
- Reduced layout thrashing through consistent spacing

## Future Enhancements

- Component variants (sizes, themes)
- Animation library integration
- Advanced grid systems
- Component composition patterns
- Design system documentation site

## Contributing

When adding new components or modifying existing ones:

1. Follow the established naming conventions
2. Use design tokens for all values
3. Ensure responsive behavior
4. Test accessibility features
5. Update this documentation

## Resources

- [Inter Font Family](https://fonts.google.com/specimen/Inter)
- [CSS Custom Properties MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Responsive Design Patterns](https://web.dev/responsive-web-design-basics/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
