import type { Meta, StoryObj } from '@storybook/react';
import { List } from './List';

const meta = {
  title: 'Components/List',
  component: List,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    startNumber: {
      control: { type: 'number', min: 0 },
    },
    numberPadding: {
      control: { type: 'number', min: 1, max: 5 },
    },
    arrowColor: {
      control: 'color',
    },
    showNumbers: {
      control: 'boolean',
    },
    uppercase: {
      control: 'boolean',
    },
    interactive: {
      control: 'boolean',
    },
    type: {
      control: { type: 'select' },
      options: ['ordered', 'unordered'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems = [
  { content: 'Initialize system protocols' },
  { content: 'Establish secure connection' },
  { content: 'Load configuration files' },
  { content: 'Start background processes' },
];

const nestedItems = [
  {
    content: 'System Architecture',
    subitems: [
      { content: 'Frontend Layer' },
      { content: 'Backend Services' },
      { content: 'Database Layer' },
    ],
  },
  {
    content: 'Security Protocols',
    subitems: [
      { content: 'Authentication' },
      { content: 'Authorization' },
      { content: 'Encryption Standards' },
    ],
  },
  {
    content: 'Deployment Pipeline',
    subitems: [
      { content: 'Development Environment' },
      { content: 'Staging Environment' },
      { content: 'Production Environment' },
    ],
  },
];

const deeplyNestedItems = [
  {
    content: 'Project Structure',
    subitems: [
      {
        content: 'Source Code',
        subitems: [
          { content: 'Components' },
          { content: 'Services' },
          { content: 'Utilities' },
        ],
      },
      {
        content: 'Configuration',
        subitems: [
          { content: 'Environment Variables' },
          { content: 'Build Scripts' },
          { content: 'Docker Files' },
        ],
      },
      {
        content: 'Documentation',
        subitems: [
          { content: 'API Reference' },
          { content: 'User Guide' },
          { content: 'Developer Notes' },
        ],
      },
    ],
  },
];

export const Default: Story = {
  args: {
    items: basicItems,
  },
};

export const WithSubitems: Story = {
  args: {
    items: nestedItems,
  },
};

export const DeeplyNested: Story = {
  args: {
    items: deeplyNestedItems,
  },
};

export const CustomStartNumber: Story = {
  args: {
    items: basicItems,
    startNumber: 100,
  },
};

export const CustomPadding: Story = {
  args: {
    items: basicItems,
    numberPadding: 4,
  },
};

export const CustomArrowColor: Story = {
  args: {
    items: nestedItems,
    arrowColor: '#50fa7b',
  },
};

export const NoNumbers: Story = {
  args: {
    items: nestedItems,
    showNumbers: false,
  },
};

export const UnorderedList: Story = {
  args: {
    items: nestedItems,
    type: 'unordered',
  },
};

export const SmallSize: Story = {
  args: {
    items: nestedItems,
    size: 'small',
  },
};

export const LargeSize: Story = {
  args: {
    items: nestedItems,
    size: 'large',
  },
};

export const LowercaseText: Story = {
  args: {
    items: basicItems,
    uppercase: false,
  },
};

export const Interactive: Story = {
  args: {
    items: [
      { 
        content: 'Click me to initialize protocols',
        onClick: () => alert('Initializing protocols...'),
      },
      { 
        content: 'Select to establish connection',
        onClick: () => alert('Establishing connection...'),
      },
      { 
        content: 'Load configuration',
        onClick: () => alert('Loading configuration...'),
        subitems: [
          { content: 'Database config' },
          { content: 'Security settings' },
        ],
      },
      { 
        content: 'Start services',
        onClick: () => alert('Starting services...'),
      },
    ],
    interactive: true,
  },
};

export const CustomFormatter: Story = {
  args: {
    items: basicItems,
    formatNumber: (num: number) => `[${num}]`,
  },
};

export const MixedContent: Story = {
  args: {
    items: [
      { content: 'Plain text item' },
      { 
        content: <span>Item with <strong>bold text</strong></span>,
        subitems: [
          { content: <span style={{ color: '#bd93f9' }}>Colored subitem</span> },
          { content: <code>Code snippet subitem</code> },
        ],
      },
      { 
        content: <span>Item with <em>italic text</em></span>,
        subitems: [
          { content: 'Regular subitem' },
          { 
            content: 'Subitem with nested items',
            subitems: [
              { content: 'Deep nested item 1' },
              { content: 'Deep nested item 2' },
            ],
          },
        ],
      },
    ],
  },
};

export const RealWorldExample: Story = {
  args: {
    items: [
      {
        content: 'Installation Steps',
        subitems: [
          { content: 'Download the latest release' },
          { content: 'Extract files to installation directory' },
          { content: 'Run the setup wizard' },
          { content: 'Configure system settings' },
        ],
      },
      {
        content: 'Configuration Options',
        subitems: [
          { 
            content: 'Database Settings',
            subitems: [
              { content: 'Host: localhost' },
              { content: 'Port: 5432' },
              { content: 'Username: admin' },
            ],
          },
          { 
            content: 'Security Settings',
            subitems: [
              { content: 'Enable SSL: true' },
              { content: 'Session timeout: 30 minutes' },
              { content: 'Max login attempts: 3' },
            ],
          },
        ],
      },
      {
        content: 'Troubleshooting',
        subitems: [
          { content: 'Check system requirements' },
          { content: 'Verify network connectivity' },
          { content: 'Review error logs' },
          { content: 'Contact support if needed' },
        ],
      },
    ],
    arrowColor: '#8be9fd',
    numberPadding: 3,
  },
};