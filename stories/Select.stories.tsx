import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Select } from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
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
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'strawberry', label: 'Strawberry' },
];

export const Default: Story = {
  args: {
    options: fruitOptions,
    label: 'Select Fruit',
    placeholder: 'Choose a fruit',
  },
};

export const WithValue: Story = {
  args: {
    options: fruitOptions,
    value: 'banana',
    label: 'Selected Fruit',
  },
};

export const WithHelperText: Story = {
  args: {
    options: fruitOptions,
    label: 'Favorite Fruit',
    helperText: 'Pick your favorite fruit from the list',
  },
};

export const WithError: Story = {
  args: {
    options: fruitOptions,
    label: 'Required Selection',
    error: 'Please select an option',
  },
};

export const Success: Story = {
  args: {
    options: fruitOptions,
    variant: 'success',
    value: 'apple',
    label: 'Valid Selection',
    helperText: 'Selection confirmed',
  },
};

export const Warning: Story = {
  args: {
    options: fruitOptions,
    variant: 'warning',
    label: 'Warning Selection',
    helperText: 'This option might have issues',
  },
};

export const Danger: Story = {
  args: {
    options: fruitOptions,
    variant: 'danger',
    label: 'Critical Selection',
    error: 'Invalid selection',
  },
};

export const Info: Story = {
  args: {
    options: fruitOptions,
    variant: 'info',
    label: 'Info Selection',
    helperText: 'For your information',
  },
};

export const Disabled: Story = {
  args: {
    options: fruitOptions,
    disabled: true,
    value: 'orange',
    label: 'Disabled Select',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'active1', label: 'Active Option 1' },
      { value: 'active2', label: 'Active Option 2' },
      { value: 'disabled1', label: 'Disabled Option 1', disabled: true },
      { value: 'active3', label: 'Active Option 3' },
      { value: 'disabled2', label: 'Disabled Option 2', disabled: true },
    ],
    label: 'Mixed Options',
  },
};

export const Small: Story = {
  args: {
    options: fruitOptions,
    size: 'small',
    label: 'Small Select',
  },
};

export const Large: Story = {
  args: {
    options: fruitOptions,
    size: 'large',
    label: 'Large Select',
  },
};

export const FullWidth: Story = {
  args: {
    options: fruitOptions,
    fullWidth: true,
    label: 'Full Width Select',
  },
};

export const LongList: Story = {
  args: {
    options: [
      { value: 'item1', label: 'Item 1' },
      { value: 'item2', label: 'Item 2' },
      { value: 'item3', label: 'Item 3' },
      { value: 'item4', label: 'Item 4' },
      { value: 'item5', label: 'Item 5' },
      { value: 'item6', label: 'Item 6' },
      { value: 'item7', label: 'Item 7' },
      { value: 'item8', label: 'Item 8' },
      { value: 'item9', label: 'Item 9' },
      { value: 'item10', label: 'Item 10' },
    ],
    label: 'Long List',
    placeholder: 'Scroll to see more',
  },
};

export const ControlledSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    const [history, setHistory] = useState<string[]>([]);

    const handleChange = (newValue: string) => {
      setValue(newValue);
      setHistory([...history, newValue]);
    };

    return (
      <div style={{ width: '300px' }}>
        <Select
          options={fruitOptions}
          value={value}
          onChange={handleChange}
          label="Controlled Select"
          helperText={`Current: ${value || 'none'}`}
          fullWidth
        />
        {history.length > 0 && (
          <div style={{ marginTop: '20px', fontSize: '12px', color: '#8e8e90' }}>
            Selection history: {history.join(' → ')}
          </div>
        )}
      </div>
    );
  },
};