import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { RadioButton } from './RadioButton';

const meta = {
  title: 'Components/RadioButton',
  component: RadioButton,
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
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'danger', 'info'],
    },
  },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export const Default: Story = {
  args: {
    name: 'default-radio',
    options: sampleOptions,
    label: 'Select an option',
  },
};

export const WithValue: Story = {
  args: {
    name: 'with-value-radio',
    options: sampleOptions,
    value: 'option2',
    label: 'Pre-selected option',
  },
};

export const Horizontal: Story = {
  args: {
    name: 'horizontal-radio',
    options: sampleOptions,
    direction: 'horizontal',
    label: 'Horizontal layout',
  },
};

export const WithHelperText: Story = {
  args: {
    name: 'helper-radio',
    options: [
      { value: 'basic', label: 'Basic Plan', helperText: '$9/month - 10GB storage' },
      { value: 'pro', label: 'Pro Plan', helperText: '$19/month - 100GB storage' },
      { value: 'enterprise', label: 'Enterprise', helperText: 'Custom pricing - Unlimited' },
    ],
    label: 'Choose your plan',
  },
};

export const WithDisabled: Story = {
  args: {
    name: 'disabled-radio',
    options: [
      { value: 'available1', label: 'Available Option 1' },
      { value: 'unavailable', label: 'Unavailable', disabled: true },
      { value: 'available2', label: 'Available Option 2' },
    ],
    label: 'Some options disabled',
  },
};

export const WithError: Story = {
  args: {
    name: 'error-radio',
    options: sampleOptions,
    error: 'Please select an option',
    label: 'Required field',
  },
};

export const Success: Story = {
  args: {
    name: 'success-radio',
    options: sampleOptions,
    variant: 'success',
    value: 'option1',
    label: 'Success variant',
  },
};

export const Warning: Story = {
  args: {
    name: 'warning-radio',
    options: sampleOptions,
    variant: 'warning',
    value: 'option2',
    label: 'Warning variant',
  },
};

export const Danger: Story = {
  args: {
    name: 'danger-radio',
    options: sampleOptions,
    variant: 'danger',
    value: 'option3',
    label: 'Danger variant',
  },
};

export const Info: Story = {
  args: {
    name: 'info-radio',
    options: sampleOptions,
    variant: 'info',
    value: 'option1',
    label: 'Info variant',
  },
};

export const Small: Story = {
  args: {
    name: 'small-radio',
    options: sampleOptions,
    size: 'small',
    label: 'Small size',
  },
};

export const Large: Story = {
  args: {
    name: 'large-radio',
    options: sampleOptions,
    size: 'large',
    label: 'Large size',
  },
};

export const ControlledRadio: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    const options = [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
    ];

    return (
      <div style={{ width: '300px' }}>
        <RadioButton
          name="framework"
          options={options}
          value={value}
          onChange={setValue}
          label="Favorite framework"
        />
        <div style={{ marginTop: '20px', fontSize: '14px', color: '#8e8e90' }}>
          Selected: {value || 'none'}
        </div>
      </div>
    );
  },
};

export const SurveyForm: Story = {
  render: () => {
    const [experience, setExperience] = useState('');
    const [frequency, setFrequency] = useState('');
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
        <RadioButton
          name="experience"
          label="How would you rate your experience?"
          options={[
            { value: 'excellent', label: 'Excellent' },
            { value: 'good', label: 'Good' },
            { value: 'average', label: 'Average' },
            { value: 'poor', label: 'Poor' },
          ]}
          value={experience}
          onChange={setExperience}
          variant="info"
        />
        
        <RadioButton
          name="frequency"
          label="How often do you use our service?"
          options={[
            { value: 'daily', label: 'Daily', helperText: 'Every day' },
            { value: 'weekly', label: 'Weekly', helperText: '2-3 times per week' },
            { value: 'monthly', label: 'Monthly', helperText: 'Few times a month' },
            { value: 'rarely', label: 'Rarely', helperText: 'Less than monthly' },
          ]}
          value={frequency}
          onChange={setFrequency}
          direction="horizontal"
        />
      </div>
    );
  },
};