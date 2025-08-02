import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
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
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Remember me',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox size="small" label="Small checkbox" />
      <Checkbox size="medium" label="Medium checkbox" />
      <Checkbox size="large" label="Large checkbox" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox variant="default" label="Default variant" defaultChecked />
      <Checkbox variant="success" label="Success variant" defaultChecked />
      <Checkbox variant="warning" label="Warning variant" defaultChecked />
      <Checkbox variant="danger" label="Danger variant" defaultChecked />
      <Checkbox variant="info" label="Info variant" defaultChecked />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Checkbox label="Subscribe to newsletter" helperText="We'll send you updates once a week" />
      <Checkbox
        label="Enable notifications"
        helperText="Get notified about important updates"
        defaultChecked
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
      <Checkbox label="Error state" error helperText="This field is required" />
    </div>
  ),
};

export const IndeterminateExample: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = useState([false, true, false]);

    const allChecked = checkedItems.every(Boolean);
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

    const handleParentChange = () => {
      if (allChecked) {
        setCheckedItems([false, false, false]);
      } else {
        setCheckedItems([true, true, true]);
      }
    };

    const handleChildChange = (index: number) => {
      const newCheckedItems = [...checkedItems];
      newCheckedItems[index] = !newCheckedItems[index];
      setCheckedItems(newCheckedItems);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Checkbox
          label="Select all"
          checked={allChecked}
          indeterminate={isIndeterminate}
          onChange={handleParentChange}
        />
        <div style={{ marginLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Checkbox
            label="Option 1"
            checked={checkedItems[0]}
            onChange={() => handleChildChange(0)}
          />
          <Checkbox
            label="Option 2"
            checked={checkedItems[1]}
            onChange={() => handleChildChange(1)}
          />
          <Checkbox
            label="Option 3"
            checked={checkedItems[2]}
            onChange={() => handleChildChange(2)}
          />
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => (
    <div
      style={{
        padding: '24px',
        backgroundColor: '#1f1d20',
        border: '1px solid #3a3a3a',
        width: '400px',
      }}
    >
      <h3 style={{ color: '#bdbdbd', marginTop: 0, marginBottom: '16px' }}>Preferences</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Checkbox
          label="Email notifications"
          defaultChecked
          helperText="Receive updates via email"
        />
        <Checkbox label="SMS notifications" helperText="Receive updates via text message" />
        <Checkbox
          label="Marketing emails"
          variant="info"
          helperText="Receive promotional content and offers"
        />
        <Checkbox
          label="Data collection"
          variant="warning"
          helperText="Allow us to collect usage data"
        />
      </div>
    </div>
  ),
};

export const TermsAndConditions: Story = {
  render: () => {
    const [agreed, setAgreed] = useState(false);

    return (
      <div
        style={{
          padding: '24px',
          backgroundColor: '#1f1d20',
          border: '1px solid #3a3a3a',
          width: '400px',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <p style={{ color: '#8e8e90', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
            By creating an account, you agree to our terms of service and privacy policy. Please
            read them carefully before proceeding.
          </p>
        </div>
        <Checkbox
          label="I agree to the terms and conditions"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          variant="success"
        />
        <button
          style={{
            marginTop: '16px',
            padding: '8px 16px',
            backgroundColor: agreed ? '#bdbdbd' : '#3a3a3a',
            border: '1px solid #4a4a4a',
            color: agreed ? '#0b0b0d' : '#8e8e90',
            cursor: agreed ? 'pointer' : 'not-allowed',
            opacity: agreed ? 1 : 0.5,
            width: '100%',
          }}
          disabled={!agreed}
        >
          Continue
        </button>
      </div>
    );
  },
};
