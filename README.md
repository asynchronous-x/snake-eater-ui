# Snake Eater UI

A dark-themed React component library built with TypeScript and Storybook, featuring a minimalist cyberpunk aesthetic with sharp corners and thin borders.
**Based off of [Steve Lauda](https://x.com/stevelauda_) design work.**

![npm version](https://img.shields.io/npm/v/snake-eater-ui)
![NPM Last Update](https://img.shields.io/npm/last-update/snake-eater-ui)
![NPM Downloads](https://img.shields.io/npm/dy/snake-eater-ui)
![license](https://img.shields.io/badge/license-GPL--3.0-blue)
![typescript](https://img.shields.io/badge/TypeScript-Ready-blue)

## Features

- 🌑 **Dark Theme** - Optimized for dark mode applications
- 📦 **45+ Components** - Comprehensive UI component collection organized by category
- 🎨 **Edgy Design** - Sharp corners and thin borders for a distinctive look
- 🚀 **Zero Runtime Dependencies** - Lightweight and performant
- 📝 **TypeScript Support** - Full type definitions included
- 📚 **Storybook Documentation** - Interactive component playground
- 🎯 **Organized Structure** - Components grouped into logical categories

## Installation

```bash
npm install snake-eater-ui
```

or

```bash
yarn add snake-eater-ui
```

## Usage

```tsx
import { Button, Card, Alert } from 'snake-eater-ui';
import 'snake-eater-ui/styles'; // Import CSS styles

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

### Data Visualization

- **BarGraph** - Bar chart with interactive features
- **DonutGraph** - Donut/pie chart visualization
- **HexagonalBinningGraph** - Hexagonal binning for density visualization
- **LineGraph** - Line chart with multiple series support
- **RidgelineGraph** - Ridge plot for distribution visualization
- **SpiderGraph** - Radar/spider chart for multidimensional data
- **StreamGraph** - Stream graph for temporal data

## UI Components

### Buttons

- **Button** - Primary interactive element with multiple variants
- **IconButton** - Compact button for icon-only actions

### Data Display

- **Badge** - Status indicators and labels
- **Stat** - Statistical data presentation
- **Table** - Data tables with sorting and selection

### Feedback

- **Alert** - Contextual feedback messages
- **Loading** - Loading indicators
- **Modal** - Overlay dialogs
- **Progress** - Progress indicators
- **Skeleton** - Loading placeholders
- **Toast** - Temporary notifications

### Forms

- **Checkbox** - Multi-selection control
- **ColorPicker** - Color selection tool
- **Input** - Text input fields
- **PinInput** - PIN/OTP input control
- **RadioButton** - Single selection control
- **Select** - Dropdown selection
- **Slider** - Range selection
- **Textarea** - Multi-line text input
- **Toggle** - On/off switch

### Layout

- **Accordion** - Collapsible content panels
- **Card** - Content containers with decorative corners
- **Divider** - Visual separation with multiple styles
- **Drawer** - Sliding panel overlays
- **Filter** - Filter controls with count badges
- **Grid** - CSS Grid layout system
- **SubCard** - Nested content containers with accent corners

### Navigation

- **Breadcrumb** - Navigation hierarchy
- **Link** - Text links with hover effects
- **Menu** - Dropdown navigation menus
- **Stepper** - Multi-step navigation
- **Tabs** - Tabbed navigation

### Typography

- **Heading** - Section headers (h1-h6)
- **KeyboardKey** - Keyboard key representation
- **List** - Styled lists with custom markers
- **Text** - Body text with variants

## Design System

### Color Palette

```css
--color-bg-base: #0b0b0d; /* Base background */
--color-bg-card: #1f1d20; /* Card background */
--color-bg-elevated: #2a282b; /* Elevated elements */
--color-text-primary: #bdbdbd; /* Primary text */
--color-text-secondary: #8a8a8a; /* Secondary text */
--color-text-muted: #5a5a5a; /* Muted text */
```

### State Colors

```css
--color-danger: #ff5555; /* Error states */
--color-success: #50fa7b; /* Success states */
--color-warning: #f1fa8c; /* Warning states */
```

### Package Contents

The published package includes:
- Bundled JavaScript (ESM, CJS, and UMD formats)
- TypeScript declarations
- Bundled CSS styles
- Source maps for debugging

## Development

### Prerequisites

- Node.js 16+
- npm 7+

### Setup

```bash
# Clone the repository
git clone https://github.com/asynchronousx/snake-eater-ui.git
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
npm run build:lib    # Build the npm package

# Testing
npm test             # Run all tests
npm test Button      # Run specific component tests

# Code Quality
npm run lint         # Run ESLint with auto-fix
npm run lint:check   # Check linting without fixing
npm run format       # Format code with Prettier
npm run format:check # Check formatting without fixing
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
2. **Storybook Stories** - Every component needs comprehensive stories
3. **Accessibility** - Ensure keyboard navigation and ARIA support

## License

GPL-3.0

## Acknowledgments

Built with:

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Vite](https://vitejs.dev/)
