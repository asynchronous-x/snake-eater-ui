import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { IconButton } from './IconButton';

const meta = {
  title: 'Buttons/IconButton',
  component: IconButton,
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
      options: ['default', 'primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    shape: {
      control: { type: 'select' },
      options: ['square', 'circle'],
    },
    badgeVariant: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'danger', 'info'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    onClick: () => console.log('IconButton clicked'),
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: '⚙️',
    tooltip: 'Settings',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton icon="⚙️" variant="default" tooltip="Default" />
      <IconButton icon="⚙️" variant="primary" tooltip="Primary" />
      <IconButton icon="⚙️" variant="secondary" tooltip="Secondary" />
      <IconButton icon="⚙️" variant="ghost" tooltip="Ghost" />
      <IconButton icon="⚙️" variant="danger" tooltip="Danger" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton icon="⚙️" size="small" tooltip="Small" />
      <IconButton icon="⚙️" size="medium" tooltip="Medium" />
      <IconButton icon="⚙️" size="large" tooltip="Large" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton icon="⚙️" shape="square" tooltip="Square shape" />
      <IconButton icon="⚙️" shape="circle" tooltip="Circle shape" />
    </div>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton icon="🔔" badge={5} tooltip="Notifications" />
      <IconButton icon="✉️" badge={12} badgeVariant="info" tooltip="Messages" />
      <IconButton icon="🛒" badge={3} badgeVariant="success" tooltip="Cart" />
      <IconButton icon="⚠️" badge="!" badgeVariant="warning" tooltip="Warnings" />
    </div>
  ),
};

export const Loading: Story = {
  args: {
    icon: '💾',
    loading: true,
    tooltip: 'Saving...',
  },
};

export const Disabled: Story = {
  args: {
    icon: '🗑️',
    disabled: true,
    tooltip: 'Delete (disabled)',
  },
};

export const CommonActions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <IconButton icon="🏠" variant="ghost" tooltip="Home" />
      <IconButton icon="🔍" variant="ghost" tooltip="Search" />
      <IconButton icon="➕" variant="primary" tooltip="Add new" />
      <IconButton icon="✏️" variant="secondary" tooltip="Edit" />
      <IconButton icon="🗑️" variant="danger" tooltip="Delete" />
      <IconButton icon="⬇️" variant="ghost" tooltip="Download" />
      <IconButton icon="⬆️" variant="ghost" tooltip="Upload" />
      <IconButton icon="♥️" variant="ghost" tooltip="Favorite" />
      <IconButton icon="📤" variant="ghost" tooltip="Share" />
      <IconButton icon="🔄" variant="ghost" tooltip="Refresh" />
    </div>
  ),
};

export const SocialIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <IconButton icon="📧" shape="circle" variant="secondary" tooltip="Email" />
      <IconButton icon="💬" shape="circle" variant="secondary" tooltip="Chat" />
      <IconButton icon="📱" shape="circle" variant="secondary" tooltip="Phone" />
      <IconButton icon="🌐" shape="circle" variant="secondary" tooltip="Website" />
    </div>
  ),
};

export const MediaControls: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <IconButton icon="⏮️" size="small" variant="ghost" tooltip="Previous" />
      <IconButton icon="▶️" variant="primary" shape="circle" tooltip="Play" />
      <IconButton icon="⏭️" size="small" variant="ghost" tooltip="Next" />
    </div>
  ),
};

export const Toolbar: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '4px', 
      padding: '8px',
      backgroundColor: '#101010',
      border: '1px solid #3a3a3a',
    }}>
      <IconButton icon="📁" size="small" variant="ghost" tooltip="New file" />
      <IconButton icon="💾" size="small" variant="ghost" tooltip="Save" />
      <div style={{ width: '1px', backgroundColor: '#3a3a3a', margin: '0 4px' }} />
      <IconButton icon="↩️" size="small" variant="ghost" tooltip="Undo" />
      <IconButton icon="↪️" size="small" variant="ghost" tooltip="Redo" />
      <div style={{ width: '1px', backgroundColor: '#3a3a3a', margin: '0 4px' }} />
      <IconButton icon="✂️" size="small" variant="ghost" tooltip="Cut" />
      <IconButton icon="📋" size="small" variant="ghost" tooltip="Copy" />
      <IconButton icon="📌" size="small" variant="ghost" tooltip="Paste" />
    </div>
  ),
};

export const NavigationBar: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      backgroundColor: '#101010',
      border: '1px solid #3a3a3a',
      width: '400px',
    }}>
      <IconButton icon="☰" variant="ghost" tooltip="Menu" />
      <div style={{ display: 'flex', gap: '8px' }}>
        <IconButton icon="🔍" variant="ghost" tooltip="Search" />
        <IconButton icon="🔔" variant="ghost" badge={3} tooltip="Notifications" />
        <IconButton icon="👤" shape="circle" variant="secondary" tooltip="Profile" />
      </div>
    </div>
  ),
};