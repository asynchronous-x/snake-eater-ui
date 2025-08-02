import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';

const meta = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
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
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
    trigger: {
      control: { type: 'select' },
      options: ['hover', 'click'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'danger', 'info'],
    },
    delay: { control: 'number' },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
};

export const AllPositions: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '40px',
        gridTemplateColumns: 'repeat(2, 1fr)',
        padding: '40px',
      }}
    >
      <Tooltip content="Top tooltip" position="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" position="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" position="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" position="right">
        <Button>Right</Button>
      </Tooltip>
    </div>
  ),
};

export const ClickTrigger: Story = {
  args: {
    content: 'Click triggered tooltip',
    trigger: 'click',
    children: <Button variant="secondary">Click me</Button>,
  },
};

export const WithDelay: Story = {
  args: {
    content: 'This tooltip has a 1 second delay',
    delay: 1000,
    children: <Button>Hover and wait</Button>,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Tooltip content="Default tooltip">
        <Badge>Default</Badge>
      </Tooltip>
      <Tooltip content="Success!" variant="success">
        <Badge variant="success">Success</Badge>
      </Tooltip>
      <Tooltip content="Warning message" variant="warning">
        <Badge variant="warning">Warning</Badge>
      </Tooltip>
      <Tooltip content="Error occurred" variant="danger">
        <Badge variant="danger">Danger</Badge>
      </Tooltip>
      <Tooltip content="Information" variant="info">
        <Badge variant="info">Info</Badge>
      </Tooltip>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Tooltip
      content={
        <div>
          <p>
            <strong>Extended Information</strong>
          </p>
          <p>This tooltip contains multiple lines of text and will wrap accordingly.</p>
          <p>Maximum width is 300px.</p>
        </div>
      }
    >
      <Button>Hover for details</Button>
    </Tooltip>
  ),
};

export const IconButtons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Tooltip content="Settings">
        <Button variant="ghost" size="small">
          ⚙️
        </Button>
      </Tooltip>
      <Tooltip content="Edit">
        <Button variant="ghost" size="small">
          ✏️
        </Button>
      </Tooltip>
      <Tooltip content="Delete" variant="danger">
        <Button variant="ghost" size="small">
          🗑️
        </Button>
      </Tooltip>
      <Tooltip content="Share">
        <Button variant="ghost" size="small">
          📤
        </Button>
      </Tooltip>
    </div>
  ),
};

export const FormHelp: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#bdbdbd' }}>Password</span>
        <Tooltip
          content="Must be at least 8 characters with one uppercase, one lowercase, and one number"
          variant="info"
        >
          <span style={{ cursor: 'help', color: '#61dafb' }}>ℹ</span>
        </Tooltip>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#bdbdbd' }}>API Key</span>
        <Tooltip content="Keep this secret! Never share your API key" variant="warning">
          <span style={{ cursor: 'help', color: '#f1fa8c' }}>⚠</span>
        </Tooltip>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#bdbdbd' }}>Delete Account</span>
        <Tooltip content="This action is permanent and cannot be undone!" variant="danger">
          <span style={{ cursor: 'help', color: '#ff5555' }}>⚠</span>
        </Tooltip>
      </div>
    </div>
  ),
};

export const StatusTooltips: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Tooltip content="Service is operational" variant="success">
        <div style={{ width: '12px', height: '12px', backgroundColor: '#50fa7b' }} />
      </Tooltip>
      <Tooltip content="Minor degradation" variant="warning">
        <div style={{ width: '12px', height: '12px', backgroundColor: '#f1fa8c' }} />
      </Tooltip>
      <Tooltip content="Service offline" variant="danger">
        <div style={{ width: '12px', height: '12px', backgroundColor: '#ff5555' }} />
      </Tooltip>
    </div>
  ),
};

export const ComplexContent: Story = {
  render: () => (
    <Tooltip
      content={
        <div style={{ padding: '8px' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#bdbdbd' }}>User Statistics</h4>
          <div style={{ display: 'grid', gap: '4px', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
              <span>Total Users:</span>
              <strong>1,234</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
              <span>Active Today:</span>
              <strong style={{ color: '#50fa7b' }}>892</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
              <span>New Users:</span>
              <strong style={{ color: '#61dafb' }}>45</strong>
            </div>
          </div>
        </div>
      }
      trigger="click"
    >
      <Button variant="secondary">View Stats</Button>
    </Tooltip>
  ),
};
