import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
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
      options: ['default', 'success', 'warning', 'danger', 'info'],
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    placeholder: 'Enter text...',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'user@example.com',
    helperText: 'We\'ll never share your email',
    type: 'email',
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    error: 'Password must be at least 8 characters',
    type: 'password',
  },
};

export const WithIcons: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search for items...',
    leftIcon: '🔍',
    rightIcon: '✕',
  },
};

export const Success: Story = {
  args: {
    label: 'Valid Input',
    variant: 'success',
    value: 'Valid data',
    helperText: 'Input validated successfully',
  },
};

export const Warning: Story = {
  args: {
    label: 'Warning Input',
    variant: 'warning',
    placeholder: 'Check this value',
    helperText: 'This value might need attention',
  },
};

export const Danger: Story = {
  args: {
    label: 'Critical Input',
    variant: 'danger',
    placeholder: 'Fix required',
    error: 'This field has an error',
  },
};

export const Info: Story = {
  args: {
    label: 'Information',
    variant: 'info',
    placeholder: 'FYI',
    helperText: 'This is informational',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit',
    disabled: true,
    value: 'Read-only value',
  },
};

export const Small: Story = {
  args: {
    label: 'Small Input',
    size: 'small',
    placeholder: 'Compact size',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Input',
    size: 'large',
    placeholder: 'Bigger size',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Input',
    fullWidth: true,
    placeholder: 'Spans entire container',
  },
};

export const NumberInput: Story = {
  args: {
    label: 'Amount',
    type: 'number',
    placeholder: '0.00',
    rightIcon: '$',
    min: 0,
    step: 0.01,
  },
};

export const InputGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input
        label="First Name"
        placeholder="John"
        fullWidth
      />
      <Input
        label="Last Name"
        placeholder="Doe"
        fullWidth
      />
      <Input
        label="Email"
        type="email"
        placeholder="john.doe@example.com"
        leftIcon="@"
        fullWidth
      />
      <Input
        label="Phone"
        type="tel"
        placeholder="+1 (555) 000-0000"
        leftIcon="📱"
        fullWidth
      />
    </div>
  ),
};