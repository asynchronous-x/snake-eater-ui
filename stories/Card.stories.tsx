import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card } from './Card';
import { Button } from './Button';

const meta = {
  title: 'Layout/Card',
  component: Card,
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
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'grid'],
    },
    interactive: { control: 'boolean' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <h3>Card Title</h3>
        <p>
          This is a card component with decorative corner elbows. It features a dark background and
          subtle border styling.
        </p>
      </>
    ),
  },
};

export const WithHeader: Story = {
  args: {
    header: <h3>Card Header</h3>,
    children: <p>Card content goes here. The header is separated with a border.</p>,
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: <h3>Featured Content</h3>,
    children: (
      <>
        <p>This card demonstrates all three sections: header, content, and footer.</p>
        <p>Each section is visually separated with borders.</p>
      </>
    ),
    footer: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button size="small" variant="primary">
          Action
        </Button>
        <Button size="small" variant="ghost">
          Cancel
        </Button>
      </div>
    ),
  },
};

export const Interactive: Story = {
  args: {
    interactive: true,
    onClick: () => console.log('Card clicked'),
    children: (
      <>
        <h3>Interactive Card</h3>
        <p>This card is clickable. Hover to see the interactive state.</p>
      </>
    ),
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: <p>Small card with less padding and smaller corner elbows.</p>,
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    header: <h2>Large Card</h2>,
    children: (
      <>
        <p>This is a large card with more padding and larger corner elbows.</p>
        <p>The increased size makes it suitable for featured content or important information.</p>
      </>
    ),
  },
};

export const ComplexContent: Story = {
  args: {
    header: <h3>System Status</h3>,
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>CPU Usage</span>
          <span style={{ color: '#50fa7b' }}>42%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Memory</span>
          <span style={{ color: '#f1fa8c' }}>67%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Storage</span>
          <span style={{ color: '#ff5555' }}>89%</span>
        </div>
      </div>
    ),
    footer: (
      <Button variant="cyber" size="small" fullWidth>
        View Details
      </Button>
    ),
  },
};

export const GridVariant: Story = {
  args: {
    variant: 'grid',
    header: <h3>Grid Background</h3>,
    children: (
      <>
        <p>This card features a subtle grid overlay on the background.</p>
        <p>The grid pattern adds visual texture while maintaining readability.</p>
      </>
    ),
  },
};

export const GridInteractive: Story = {
  args: {
    variant: 'grid',
    interactive: true,
    onClick: () => console.log('Grid card clicked'),
    size: 'large',
    children: (
      <>
        <h3>Interactive Grid Card</h3>
        <p>Combines the grid variant with interactive functionality.</p>
        <p>Click to trigger an action.</p>
      </>
    ),
  },
};
