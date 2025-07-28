# Snake Eater UI

A dark-themed React component library built with TypeScript and Storybook, featuring a minimalist future aesthetic.
**Based entirely off of [Steve Lauda](https://x.com/stevelauda_) design work.**

![npm version](https://img.shields.io/npm/v/snake-eater-ui)
![license](https://img.shields.io/npm/l/snake-eater-ui)
![typescript](https://img.shields.io/badge/TypeScript-Ready-blue)

## Features

- 🌑 **Dark Theme** - Optimized for dark mode applications
- 📦 **40+ Components** - Comprehensive UI component collection
- 🎨 **Edgy Design** - Sharp corners and thin borders for a distinctive look
- 🚀 **Zero Runtime Dependencies** - Lightweight and performant
- 📝 **TypeScript Support** - Full type definitions included
- 📚 **Storybook Documentation** - Interactive component playground

## Installation

```bash
npm install snake-eater-ui
```

## Usage

```tsx
import { Button, Card, Alert } from 'snake-eater-ui';
import 'snake-eater-ui/dist/styles.css';

function App() {
  return (
    <Card>
      <Alert variant="success">Welcome to Snake Eater UI!</Alert>
      <Button variant="primary">Get Started</Button>
    </Card>
  );
}
```

## Components

### Buttons
- **Button** - Primary interactive element with multiple variants
- **IconButton** - Compact button for icon-only actions

### Data Display
- **Badge** - Status indicators and labels
- **Code** - Syntax-highlighted code blocks
- **Stat** - Statistical data presentation
- **Table** - Data tables with sorting and selection

### Feedback
- **Alert** - Contextual feedback messages
- **Loading** - Loading indicators
- **Modal** - Overlay dialogs
- **Progress** - Progress indicators
- **Skeleton** - Loading placeholders
- **Toast** - Temporary notifications
- **Tooltip** - Contextual hints

### Forms
- **Checkbox** - Multi-selection control
- **ColorPicker** - Color selection tool
- **Input** - Text input fields
- **RadioButton** - Single selection control
- **Select** - Dropdown selection
- **Slider** - Range selection
- **Textarea** - Multi-line text input
- **Toggle** - On/off switch

### Layout
- **Accordion** - Collapsible content panels
- **Card** - Content containers
- **Divider** - Visual separation
- **Filter** - Filter controls
- **SubCard** - Nested content containers

### Navigation
- **Breadcrumb** - Navigation hierarchy
- **Link** - Text links
- **Menu** - Navigation menus
- **Tabs** - Tabbed navigation

### Typography
- **Heading** - Section headers
- **Text** - Body text with variants

## Design System

### Color Palette

```css
--color-bg-base: #0b0b0d;      /* Base background */
--color-bg-card: #1f1d20;      /* Card background */
--color-bg-elevated: #2a282b;  /* Elevated elements */
--color-text-primary: #bdbdbd; /* Primary text */
--color-text-secondary: #8a8a8a; /* Secondary text */
--color-text-muted: #5a5a5a;   /* Muted text */
```

### State Colors

```css
--color-danger: #ff5555;  /* Error states */
--color-success: #50fa7b; /* Success states */
--color-warning: #f1fa8c; /* Warning states */
```

## Development

### Prerequisites

- Node.js 16+
- npm 7+

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/snake-eater-ui.git
cd snake-eater-ui

# Install dependencies
npm install

# Start Storybook
npm run storybook
```

### Commands

```bash
# Development
npm run storybook     # Start Storybook dev server
npm run dev          # Alias for storybook

# Building
npm run build        # Build static Storybook
npm run build-storybook # Alias for build

# Testing
npm test             # Run all tests
npm test Button      # Run specific component tests
```

## Project Structure

```
snake-eater-ui/
├── .storybook/          # Storybook configuration
├── stories/             # Component library
│   ├── Component.tsx    # Component implementation
│   ├── Component.stories.tsx # Storybook stories
│   └── component.css    # Component styles
├── package.json
└── tsconfig.json
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **TypeScript First** - All components must be written in TypeScript
5. **Storybook Stories** - Every component needs comprehensive stories
6. **Accessibility** - Ensure keyboard navigation and ARIA support

## License

Unlicensed (for now)

## Acknowledgments

Built with:
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Vite](https://vitejs.dev/)