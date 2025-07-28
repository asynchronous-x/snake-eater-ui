import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Code } from './Code';

const meta = {
  title: 'Components/Code',
  component: Code,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0b0b0d' },
        { name: 'card', value: '#1f1d20' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['inline', 'block'],
    },
    theme: {
      control: { type: 'select' },
      options: ['dark', 'darker'],
    },
    language: { control: 'text' },
    showLineNumbers: { control: 'boolean' },
    copyable: { control: 'boolean' },
  },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Example usage
console.log(fibonacci(10)); // 55`;

export const Default: Story = {
  args: {
    children: sampleCode,
    language: 'javascript',
  },
};

export const InlineCode: Story = {
  render: () => (
    <p style={{ color: '#bdbdbd', fontSize: '16px', lineHeight: '1.6' }}>
      Use <Code variant="inline">npm install snake-eater-ui</Code> to install the package.
      Then import components like <Code variant="inline">{'import { Button } from "snake-eater-ui"'}</Code>.
    </p>
  ),
};

export const WithLineNumbers: Story = {
  args: {
    children: sampleCode,
    language: 'javascript',
    showLineNumbers: true,
  },
};

export const WithFileName: Story = {
  args: {
    children: sampleCode,
    language: 'javascript',
    fileName: 'fibonacci.js',
    showLineNumbers: true,
  },
};

export const HighlightedLines: Story = {
  args: {
    children: sampleCode,
    language: 'javascript',
    showLineNumbers: true,
    highlightLines: [2, 6],
  },
};

export const DifferentLanguages: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ color: '#bdbdbd', marginBottom: '16px' }}>JavaScript</h3>
        <Code language="javascript" showLineNumbers>
{`const greeting = (name) => {
  return \`Hello, \${name}!\`;
};

export default greeting;`}
        </Code>
      </div>
      
      <div>
        <h3 style={{ color: '#bdbdbd', marginBottom: '16px' }}>CSS</h3>
        <Code language="css" showLineNumbers>
{`.button {
  background-color: #bdbdbd;
  border: 1px solid #3a3a3a;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}`}
        </Code>
      </div>
      
      <div>
        <h3 style={{ color: '#bdbdbd', marginBottom: '16px' }}>HTML</h3>
        <Code language="html" showLineNumbers>
{`<div class="card">
  <h2 class="card-title">Snake Eater UI</h2>
  <p class="card-content">
    A dark-themed component library
  </p>
</div>`}
        </Code>
      </div>
    </div>
  ),
};

export const Themes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ color: '#bdbdbd', marginBottom: '16px' }}>Dark Theme</h3>
        <Code theme="dark" language="javascript">
{`const darkTheme = {
  background: '#1a1a1c',
  border: '#3a3a3a',
  text: '#bdbdbd'
};`}
        </Code>
      </div>
      
      <div>
        <h3 style={{ color: '#bdbdbd', marginBottom: '16px' }}>Darker Theme</h3>
        <Code theme="darker" language="javascript">
{`const darkerTheme = {
  background: '#0d0d0e',
  border: '#2a2a2a',
  text: '#bdbdbd'
};`}
        </Code>
      </div>
    </div>
  ),
};

export const ScrollableCode: Story = {
  args: {
    children: `// A longer code example that requires scrolling
import React, { useState, useEffect } from 'react';
import './styles.css';

const ComplexComponent = ({ initialData, onUpdate, config = {} }) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(config.apiUrl);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (config.autoFetch) {
      fetchData();
    }
  }, [config.apiUrl, config.autoFetch]);

  const handleUpdate = (newData) => {
    setData(newData);
    if (onUpdate) {
      onUpdate(newData);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="complex-component">
      <h2>{config.title || 'Default Title'}</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => handleUpdate({ ...data, updated: true })}>
        Update Data
      </button>
    </div>
  );
};

export default ComplexComponent;`,
    language: 'javascript',
    showLineNumbers: true,
    maxHeight: '400px',
  },
};

export const BashExample: Story = {
  args: {
    children: `# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test`,
    language: 'bash',
    fileName: 'setup.sh',
  },
};

export const JSONExample: Story = {
  args: {
    children: `{
  "name": "snake-eater-ui",
  "version": "1.0.0",
  "description": "A dark-themed React component library",
  "main": "dist/index.js",
  "scripts": {
    "build": "rollup -c",
    "storybook": "storybook dev -p 6006",
    "test": "jest"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}`,
    language: 'json',
    fileName: 'package.json',
    showLineNumbers: true,
  },
};

export const ReactExample: Story = {
  render: () => (
    <div style={{
      padding: '24px',
      backgroundColor: '#1f1d20',
      border: '1px solid #3a3a3a',
    }}>
      <h3 style={{ color: '#bdbdbd', marginTop: 0, marginBottom: '16px' }}>
        Using Snake Eater UI
      </h3>
      <p style={{ color: '#8e8e90', marginBottom: '16px' }}>
        Here's how to create a simple component:
      </p>
      <Code language="typescript" fileName="MyComponent.tsx" showLineNumbers highlightLines={[5, 6, 7]}>
{`import React from 'react';
import { Button, Card } from 'snake-eater-ui';

const MyComponent = () => {
  return (
    <Card>
      <h2>Welcome to Snake Eater UI</h2>
      <p>This is a cyber-themed component library.</p>
      <Button variant="cyber" onClick={() => alert('Clicked!')}>
        Click Me
      </Button>
    </Card>
  );
};

export default MyComponent;`}
      </Code>
    </div>
  ),
};