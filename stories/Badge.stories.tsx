import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
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
      options: ['default', 'success', 'warning', 'danger', 'info', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    style: {
      control: { type: 'select' },
      options: ['solid', 'outline', 'dot'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Status',
    icon: '⚡',
  },
};

export const Clickable: Story = {
  args: {
    children: 'Click Me',
    onClick: () => console.log('Badge clicked'),
  },
};

export const Success: Story = {
  args: {
    children: 'Active',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Pending',
    variant: 'warning',
  },
};

export const Danger: Story = {
  args: {
    children: 'Error',
    variant: 'danger',
  },
};

export const Info: Story = {
  args: {
    children: 'New',
    variant: 'info',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Draft',
    variant: 'ghost',
  },
};

export const OutlineStyle: Story = {
  args: {
    children: 'Outline',
    style: 'outline',
  },
};

export const DotStyle: Story = {
  args: {
    children: 'Online',
    style: 'dot',
    variant: 'success',
  },
};

export const Small: Story = {
  args: {
    children: 'XS',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    children: 'Large',
    size: 'large',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge>Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="ghost">Ghost</Badge>
    </div>
  ),
};

export const AllStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ color: '#8e8e90', width: '80px' }}>Solid:</span>
        <Badge variant="success">Active</Badge>
        <Badge variant="warning">Pending</Badge>
        <Badge variant="danger">Error</Badge>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ color: '#8e8e90', width: '80px' }}>Outline:</span>
        <Badge variant="success" style="outline">Active</Badge>
        <Badge variant="warning" style="outline">Pending</Badge>
        <Badge variant="danger" style="outline">Error</Badge>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ color: '#8e8e90', width: '80px' }}>Dot:</span>
        <Badge variant="success" style="dot">Online</Badge>
        <Badge variant="warning" style="dot">Away</Badge>
        <Badge variant="danger" style="dot">Offline</Badge>
      </div>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="success" icon="✓">Completed</Badge>
      <Badge variant="warning" icon="⏱">In Progress</Badge>
      <Badge variant="danger" icon="✕">Failed</Badge>
      <Badge variant="info" icon="ℹ">Info</Badge>
      <Badge variant="ghost" icon="📝">Draft</Badge>
    </div>
  ),
};

export const UserStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#bdbdbd' }}>John Doe</span>
        <Badge variant="success" style="dot" size="small">Online</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#bdbdbd' }}>Jane Smith</span>
        <Badge variant="warning" style="dot" size="small">Away</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#bdbdbd' }}>Bob Wilson</span>
        <Badge variant="danger" style="dot" size="small">Offline</Badge>
      </div>
    </div>
  ),
};

export const NotificationBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <span style={{ color: '#bdbdbd', fontSize: '24px' }}>🔔</span>
        <div style={{ position: 'absolute', top: '-4px', right: '-8px' }}>
          <Badge variant="danger" size="small">5</Badge>
        </div>
      </div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <span style={{ color: '#bdbdbd', fontSize: '24px' }}>✉️</span>
        <div style={{ position: 'absolute', top: '-4px', right: '-8px' }}>
          <Badge variant="info" size="small">12</Badge>
        </div>
      </div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <span style={{ color: '#bdbdbd', fontSize: '24px' }}>💬</span>
        <div style={{ position: 'absolute', top: '-4px', right: '-8px' }}>
          <Badge variant="success" size="small">3</Badge>
        </div>
      </div>
    </div>
  ),
};