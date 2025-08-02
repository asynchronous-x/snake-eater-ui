import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Tabs } from './Tabs';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
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
      options: ['default', 'boxed', 'underline'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    fullWidth: { control: 'boolean' },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTabs = [
  {
    id: 'overview',
    label: 'Overview',
    content: (
      <div>
        <h3>Overview Content</h3>
        <p>This is the overview tab content. It provides general information about the topic.</p>
      </div>
    ),
  },
  {
    id: 'details',
    label: 'Details',
    content: (
      <div>
        <h3>Details Content</h3>
        <p>This tab contains more detailed information and specifications.</p>
      </div>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    content: (
      <div>
        <h3>Settings Content</h3>
        <p>Configure your preferences and options here.</p>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    tabs: sampleTabs,
  },
};

export const Boxed: Story = {
  args: {
    tabs: sampleTabs,
    variant: 'boxed',
  },
};

export const Underline: Story = {
  args: {
    tabs: sampleTabs,
    variant: 'underline',
  },
};

export const WithIcons: Story = {
  args: {
    tabs: [
      {
        id: 'home',
        label: 'Home',
        icon: '🏠',
        content: <p>Welcome to the home tab!</p>,
      },
      {
        id: 'profile',
        label: 'Profile',
        icon: '👤',
        content: <p>User profile information goes here.</p>,
      },
      {
        id: 'messages',
        label: 'Messages',
        icon: '💬',
        content: <p>Your messages will appear here.</p>,
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: '⚙️',
        content: <p>Application settings and preferences.</p>,
      },
    ],
  },
};

export const WithBadges: Story = {
  args: {
    tabs: [
      {
        id: 'all',
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            All
            <Badge size="small" variant="ghost">
              24
            </Badge>
          </div>
        ),
        content: <p>All items are shown here.</p>,
      },
      {
        id: 'active',
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Active
            <Badge size="small" variant="success">
              12
            </Badge>
          </div>
        ),
        content: <p>Active items only.</p>,
      },
      {
        id: 'pending',
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Pending
            <Badge size="small" variant="warning">
              5
            </Badge>
          </div>
        ),
        content: <p>Items pending approval.</p>,
      },
      {
        id: 'archived',
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Archived
            <Badge size="small">7</Badge>
          </div>
        ),
        content: <p>Archived items.</p>,
      },
    ],
  },
};

export const WithDisabled: Story = {
  args: {
    tabs: [
      {
        id: 'enabled1',
        label: 'Enabled',
        content: <p>This tab is enabled.</p>,
      },
      {
        id: 'disabled1',
        label: 'Disabled',
        content: <p>You cannot see this content.</p>,
        disabled: true,
      },
      {
        id: 'enabled2',
        label: 'Also Enabled',
        content: <p>This tab is also enabled.</p>,
      },
      {
        id: 'disabled2',
        label: 'Also Disabled',
        content: <p>This is also inaccessible.</p>,
        disabled: true,
      },
    ],
  },
};

export const FullWidth: Story = {
  args: {
    tabs: sampleTabs,
    fullWidth: true,
  },
};

export const Small: Story = {
  args: {
    tabs: sampleTabs,
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    tabs: sampleTabs,
    size: 'large',
  },
};

export const ControlledTabs: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const tabs = [
      {
        id: 'tab1',
        label: 'Tab 1',
        content: <p>Content for Tab 1</p>,
      },
      {
        id: 'tab2',
        label: 'Tab 2',
        content: <p>Content for Tab 2</p>,
      },
      {
        id: 'tab3',
        label: 'Tab 3',
        content: <p>Content for Tab 3</p>,
      },
    ];

    return (
      <div>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <div style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
          <Button size="small" onClick={() => setActiveTab('tab1')}>
            Go to Tab 1
          </Button>
          <Button size="small" onClick={() => setActiveTab('tab2')}>
            Go to Tab 2
          </Button>
          <Button size="small" onClick={() => setActiveTab('tab3')}>
            Go to Tab 3
          </Button>
        </div>
      </div>
    );
  },
};

export const CodeEditor: Story = {
  args: {
    tabs: [
      {
        id: 'html',
        label: 'HTML',
        icon: '📄',
        content: (
          <pre
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              padding: '16px',
              margin: 0,
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#bdbdbd',
            }}
          >
            {`<div class="snake-component">
  <h1>Hello World</h1>
  <p>This is a code example.</p>
</div>`}
          </pre>
        ),
      },
      {
        id: 'css',
        label: 'CSS',
        icon: '🎨',
        content: (
          <pre
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              padding: '16px',
              margin: 0,
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#bdbdbd',
            }}
          >
            {`.snake-component {
  background-color: #101010;
  border: 1px solid #3a3a3a;
  padding: 16px;
}`}
          </pre>
        ),
      },
      {
        id: 'js',
        label: 'JavaScript',
        icon: '⚡',
        content: (
          <pre
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              padding: '16px',
              margin: 0,
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#bdbdbd',
            }}
          >
            {`function initComponent() {
  const element = document.querySelector('.snake-component');
  console.log('Component initialized');
}`}
          </pre>
        ),
      },
    ],
    variant: 'boxed',
  },
};

export const DashboardTabs: Story = {
  args: {
    tabs: [
      {
        id: 'analytics',
        label: 'Analytics',
        icon: '📊',
        content: (
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div
              style={{ backgroundColor: '#101010', border: '1px solid #3a3a3a', padding: '16px' }}
            >
              <h4 style={{ margin: '0 0 8px 0', color: '#8e8e90' }}>Users</h4>
              <p style={{ margin: 0, fontSize: '24px', color: '#50fa7b' }}>1,234</p>
            </div>
            <div
              style={{ backgroundColor: '#101010', border: '1px solid #3a3a3a', padding: '16px' }}
            >
              <h4 style={{ margin: '0 0 8px 0', color: '#8e8e90' }}>Revenue</h4>
              <p style={{ margin: 0, fontSize: '24px', color: '#61dafb' }}>$45.2K</p>
            </div>
            <div
              style={{ backgroundColor: '#101010', border: '1px solid #3a3a3a', padding: '16px' }}
            >
              <h4 style={{ margin: '0 0 8px 0', color: '#8e8e90' }}>Growth</h4>
              <p style={{ margin: 0, fontSize: '24px', color: '#f1fa8c' }}>+12%</p>
            </div>
          </div>
        ),
      },
      {
        id: 'reports',
        label: 'Reports',
        icon: '📈',
        content: <p>Detailed reports and data visualizations would go here.</p>,
      },
      {
        id: 'export',
        label: 'Export',
        icon: '📤',
        content: <p>Export options and data download features.</p>,
      },
    ],
    variant: 'underline',
    size: 'large',
  },
};
