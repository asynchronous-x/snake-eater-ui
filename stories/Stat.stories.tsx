import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Stat } from './Stat';

const meta = {
  title: 'Components/Stat',
  component: Stat,
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
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'centered', 'horizontal'],
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'danger', 'info'],
    },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof Stat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Total Revenue',
    value: '$45,678',
    info: 'Last 30 days',
  },
};

export const WithChange: Story = {
  args: {
    label: 'Active Users',
    value: '1,234',
    change: {
      value: '+12.5%',
      type: 'increase',
    },
    info: 'vs last month',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <Stat
        label="Default"
        value="12,345"
        info="Total items"
        variant="default"
      />
      <Stat
        label="Centered"
        value="98.5%"
        info="Success rate"
        variant="centered"
      />
      <Stat
        label="Horizontal"
        value="456"
        info="Active now"
        variant="horizontal"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
      <Stat
        label="Small"
        value="123"
        size="small"
      />
      <Stat
        label="Medium"
        value="456"
        size="medium"
      />
      <Stat
        label="Large"
        value="789"
        size="large"
      />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <Stat
        label="Default"
        value="100"
        color="default"
      />
      <Stat
        label="Success"
        value="95%"
        color="success"
      />
      <Stat
        label="Warning"
        value="25"
        color="warning"
      />
      <Stat
        label="Danger"
        value="5"
        color="danger"
      />
      <Stat
        label="Info"
        value="42"
        color="info"
      />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <Stat
        label="Revenue"
        value="$12,345"
        icon="💰"
        change={{ value: '+8%', type: 'increase' }}
      />
      <Stat
        label="Users"
        value="5,678"
        icon="👥"
        change={{ value: '+125', type: 'increase' }}
        variant="centered"
      />
      <Stat
        label="Performance"
        value="99.9%"
        icon="⚡"
        info="Uptime"
        color="success"
      />
      <Stat
        label="Storage"
        value="2.5TB"
        icon="💾"
        info="Used of 5TB"
        variant="horizontal"
      />
    </div>
  ),
};

export const ChangeTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px' }}>
      <Stat
        label="Growth"
        value="23%"
        change={{ value: '+5%', type: 'increase' }}
        color="success"
      />
      <Stat
        label="Expenses"
        value="$8,420"
        change={{ value: '-12%', type: 'decrease' }}
        color="danger"
      />
      <Stat
        label="Stable"
        value="500"
        change={{ value: '0%', type: 'neutral' }}
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px' }}>
      <Stat
        label="Loading..."
        value=""
        loading
      />
      <Stat
        label="Fetching data"
        value=""
        loading
        icon="📊"
        variant="centered"
      />
    </div>
  ),
};

export const Dashboard: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(4, 1fr)', 
      gap: '24px',
      padding: '24px',
      backgroundColor: '#0b0b0d',
    }}>
      <Stat
        label="Total Sales"
        value="$125,420"
        change={{ value: '+22%', type: 'increase' }}
        icon="📈"
        color="success"
      />
      <Stat
        label="New Customers"
        value="1,234"
        change={{ value: '+18%', type: 'increase' }}
        icon="👤"
      />
      <Stat
        label="Conversion Rate"
        value="3.24%"
        change={{ value: '-0.5%', type: 'decrease' }}
        icon="🎯"
        color="warning"
      />
      <Stat
        label="Avg Order Value"
        value="$85.50"
        change={{ value: '+$5', type: 'increase' }}
        icon="🛒"
      />
    </div>
  ),
};

export const MetricsGrid: Story = {
  render: () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      maxWidth: '800px',
    }}>
      <Stat
        label="CPU Usage"
        value="45%"
        info="4 cores"
        variant="centered"
        size="small"
      />
      <Stat
        label="Memory"
        value="8.2GB"
        info="of 16GB"
        variant="centered"
        size="small"
      />
      <Stat
        label="Disk"
        value="234GB"
        info="of 512GB"
        variant="centered"
        size="small"
      />
      <Stat
        label="Network In"
        value="125Mbps"
        variant="centered"
        size="small"
      />
      <Stat
        label="Network Out"
        value="89Mbps"
        variant="centered"
        size="small"
      />
      <Stat
        label="Processes"
        value="147"
        variant="centered"
        size="small"
      />
    </div>
  ),
};

export const ProjectStats: Story = {
  render: () => (
    <div style={{
      padding: '24px',
      backgroundColor: '#1f1d20',
      border: '1px solid #3a3a3a',
    }}>
      <h3 style={{ color: '#bdbdbd', marginTop: 0, marginBottom: '24px' }}>
        Project Overview
      </h3>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <Stat
          label="Components"
          value="42"
          icon="🧩"
          info="React components"
          variant="horizontal"
          size="small"
        />
        <Stat
          label="Test Coverage"
          value="87%"
          icon="✅"
          change={{ value: '+3%', type: 'increase' }}
          variant="horizontal"
          size="small"
          color="success"
        />
        <Stat
          label="Build Time"
          value="2.3s"
          icon="⚡"
          change={{ value: '-0.5s', type: 'decrease' }}
          variant="horizontal"
          size="small"
        />
      </div>
    </div>
  ),
};