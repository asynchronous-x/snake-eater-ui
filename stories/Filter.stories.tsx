import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Filter } from './Filter';

const meta = {
  title: 'Layout/Filter',
  component: Filter,
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
      options: ['default', 'success', 'warning', 'danger', 'info'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    onClick: () => console.log('Filter clicked'),
  },
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'All Items',
  },
};

export const Active: Story = {
  args: {
    children: 'Active',
    active: true,
  },
};

export const WithCount: Story = {
  args: {
    children: 'Pending',
    count: 24,
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Favorites',
    icon: '⭐',
  },
};

export const WithIconAndCount: Story = {
  args: {
    children: 'Messages',
    icon: '💬',
    count: 5,
    active: true,
  },
};

export const Success: Story = {
  args: {
    children: 'Completed',
    variant: 'success',
    icon: '✓',
    count: 12,
  },
};

export const Warning: Story = {
  args: {
    children: 'Warnings',
    variant: 'warning',
    icon: '⚠',
    count: 3,
    active: true,
  },
};

export const Danger: Story = {
  args: {
    children: 'Errors',
    variant: 'danger',
    icon: '✕',
    count: 2,
  },
};

export const Info: Story = {
  args: {
    children: 'Information',
    variant: 'info',
    icon: 'ℹ',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
    count: 0,
  },
};

export const Small: Story = {
  args: {
    children: 'Small Filter',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Filter',
    size: 'large',
    count: 99,
  },
};

export const FilterGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Filter active>All</Filter>
      <Filter variant="success" count={15}>Active</Filter>
      <Filter variant="warning" count={3}>Pending</Filter>
      <Filter variant="danger" count={2}>Failed</Filter>
      <Filter disabled>Archived</Filter>
    </div>
  ),
};