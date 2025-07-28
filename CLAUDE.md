# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Snake Eater UI is a dark-themed TypeScript React component library built with Storybook. It features a minimalist, boxy design with no rounded corners and thin borders for visual hierarchy. The project uses Storybook 9.0.18 with the React-Vite framework for component development and documentation.

### Design System

#### Core Colors

- **Base background**: `#0b0b0d` (--color-bg-base)
- **Card background**: `#1f1d20` (--color-bg-card)
- **Elevated background**: `#2a282b` (--color-bg-elevated)
- **Primary text**: `#bdbdbd` (--color-text-primary)
- **Secondary text**: `#8a8a8a` (--color-text-secondary)
- **Muted text**: `#5a5a5a` (--color-text-muted)

#### Visual Characteristics

- **Boxy design**: No rounded corners throughout
- **Borders**: Thin 1px borders using text color
- **Corner accents**: Some components (like Modal) feature decorative corner elements
- **Typography**: System font stack with monospace for code
- **Transitions**: Fast (150ms), base (250ms), and slow (350ms) easing

#### State Colors

- **Danger**: `#ff5555` (red)
- **Success**: `#50fa7b` (green)
- **Warning**: `#f1fa8c` (yellow)

## Essential Commands

### Development

```bash
# Start Storybook development server (default port 6006)
npm run storybook
# or
npm run dev

# Build static Storybook site
npm run build-storybook
# or
npm run build
```

### Testing

```bash
# Run all tests through Storybook's Vitest integration
npm test

# Run tests for a specific component (example)
npm test Button
```

## Architecture

### Component Structure

Components are located in the `stories/` directory with organized subdirectories:

```
stories/
├── ComponentName.tsx    # Component implementation
├── ComponentName.stories.tsx # Storybook stories
└── componentname.css    # Component styles
```

### File Patterns

- `ComponentName.tsx` - React component implementation using function components with TypeScript interfaces
- `ComponentName.stories.tsx` - Storybook stories defining component states and variations
- `componentname.css` - Component-specific styles (lowercase naming)

### Component Implementation Patterns

#### TypeScript Interfaces

```typescript
interface ComponentProps extends React.HTMLAttributes<HTMLElement> {
  /** JSDoc comments for Storybook docs */
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}
```

#### Component Structure

```typescript
export const Component: React.FC<ComponentProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  className = '',
  ...props
}) => {
  const classes = [
    'snake-component',
    `snake-component--${variant}`,
    `snake-component--${size}`,
    className
  ].filter(Boolean).join(' ');

  return <div className={classes} {...props}>{children}</div>;
};
```

#### CSS Naming Convention

- BEM-style with `snake-` prefix
- Component: `snake-component`
- Modifiers: `snake-component--variant`
- Elements: `snake-component__element`

### Global Styles

- `theme.css` - CSS custom properties for design tokens
- `global.css` - Base styles and utility classes
- All components import global styles via component CSS files

### Testing Strategy

Tests run through Storybook's Vitest integration using Playwright with headless Chromium. The test configuration is in `vitest.config.js` and setup in `.storybook/vitest.setup.js`.

### Storybook Configuration

- Main configuration: `.storybook/main.ts`
- Preview configuration: `.storybook/preview.js`
- Test setup: `.storybook/vitest.setup.js`
- Addons: essentials, onboarding, interactions, a11y (in "todo" mode), test, chromatic

### TypeScript Configuration

Strict mode enabled with the following key settings:

- Target: ES2020
- Module: ESNext with bundler resolution
- JSX: react-jsx
- Strict type checking enabled
- No unused locals/parameters
- No fallthrough cases

## Component Library Contents

### Current Components (40+ components)

**Buttons**: Button, IconButton
**Data Display**: Badge, Code, Stat, Table
**Feedback**: Alert, Loading, Modal, Progress, Skeleton, Toast, Tooltip
**Forms**: Checkbox, ColorPicker, Input, RadioButton, Select, Slider, Textarea, Toggle
**Layout**: Accordion, Card, Divider, Filter, SubCard
**Navigation**: Breadcrumb, Link, Menu, Tabs
**Typography**: Heading, Text

### Common Props Patterns

- `variant`: Visual style variations (primary, secondary, ghost, danger, cyber)
- `size`: Component sizing (small, medium, large)
- `loading`: Loading states for interactive components
- `fullWidth`: Make component fill container width
- `className`: Additional CSS classes (always merged with component classes)

## Development Notes

1. **No dependencies**: This is a zero-dependency component library (dev dependencies only)
2. **TypeScript First**: All components use TypeScript interfaces, no PropTypes
3. **CSS Modules**: Component styles are scoped using separate CSS files
4. **No Linting**: Currently no ESLint configuration - be extra careful with code quality
5. **Storybook Stories**: Every component must have comprehensive stories showcasing all variants
6. **Accessibility**: Use semantic HTML, ARIA attributes, and keyboard navigation support
7. **Dark Theme Only**: All components are designed specifically for dark theme
8. **Consistent Spacing**: Use CSS custom properties for spacing (--spacing-xs through --spacing-2xl)

## Best Practices

1. **Component Props**: Extend appropriate HTML element interfaces for proper type inheritance
2. **Default Props**: Use ES6 default parameters in function signatures
3. **Class Names**: Use array filter pattern for conditional classes
4. **Event Handlers**: Always include proper event types in TypeScript
5. **Ref Forwarding**: Use `React.forwardRef` when components need ref access
6. **Side Effects**: Use `useEffect` with proper cleanup functions
7. **Keyboard Support**: Implement Escape key handling for dismissible components
8. **Focus Management**: Ensure proper focus trapping for modals and popovers
