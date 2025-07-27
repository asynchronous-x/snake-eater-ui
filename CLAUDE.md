# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Snake Eater UI is a dark-themed TypeScript React component library built with Storybook. It features a minimalist, boxy design with no rounded corners and thin borders for visual hierarchy. The project uses Storybook 9.0.18 with the React-Vite framework for component development and documentation.

### Design System
- **Base background**: #0b0b0d
- **Card background**: #1f1d20
- **Text color**: #bdbdbd
- **Boxy design**: No rounded corners
- **Borders**: Thin 1px borders in text color

## Essential Commands

### Development
```bash
# Start Storybook development server
npm run storybook

# Build static Storybook site
npm run build-storybook
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
Components are located in the `stories/` directory and follow this pattern:
- `ComponentName.tsx` - React component implementation using function components with TypeScript interfaces
- `ComponentName.stories.ts` - Storybook stories defining component states and variations with proper TypeScript types
- `componentname.css` - Component-specific styles

### Testing Strategy
Tests run through Storybook's Vitest integration using Playwright with headless Chromium. The test configuration is in `vitest.config.js` and setup in `.storybook/vitest.setup.js`.

### Storybook Configuration
- Main configuration: `.storybook/main.js`
- Preview configuration: `.storybook/preview.js`
- Addons include: essentials, onboarding, interactions, a11y (in "todo" mode), test

## Development Notes

1. This is a TypeScript Storybook-based component library, so all component development should include corresponding stories with proper type definitions
2. Components use TypeScript interfaces for compile-time type checking instead of PropTypes
3. Styles are component-scoped using separate CSS files
4. The project currently has no linting configuration - consider adding ESLint with TypeScript support when implementing new components
5. When creating new components, follow the existing pattern in the stories directory:
   - Define interfaces for component props
   - Use `React.FC<PropsInterface>` for component typing
   - Export typed stories using `Meta` and `StoryObj` from `@storybook/react`