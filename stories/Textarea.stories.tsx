import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
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
      options: ['default', 'ghost', 'bordered'],
    },
    resize: {
      control: { type: 'select' },
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    autoResize: { control: 'boolean' },
    showCount: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message here...',
    rows: 4,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Tell us more about your project...',
    helperText: 'Provide a detailed description',
    rows: 4,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Textarea
        size="small"
        label="Small"
        placeholder="Small textarea"
        rows={3}
      />
      <Textarea
        size="medium"
        label="Medium"
        placeholder="Medium textarea"
        rows={4}
      />
      <Textarea
        size="large"
        label="Large"
        placeholder="Large textarea"
        rows={5}
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Textarea
        variant="default"
        label="Default"
        placeholder="Default variant"
        rows={3}
      />
      <Textarea
        variant="ghost"
        label="Ghost"
        placeholder="Ghost variant - click to focus"
        rows={3}
      />
      <Textarea
        variant="bordered"
        label="Bordered"
        placeholder="Bordered variant"
        rows={3}
      />
    </div>
  ),
};

export const AutoResize: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    return (
      <div>
        <Textarea
          label="Auto-resizing textarea"
          placeholder="Type to see auto-resize in action..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoResize
          minRows={3}
          maxRows={8}
          helperText="This textarea will grow as you type (max 8 rows)"
        />
      </div>
    );
  },
};

export const WithCharacterCount: Story = {
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Textarea
          label="Tweet"
          placeholder="What's happening?"
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          showCount
          maxLength={280}
          rows={3}
        />
        <Textarea
          label="Bio"
          placeholder="Tell us about yourself..."
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          showCount
          helperText="A brief description about you"
          rows={4}
        />
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Textarea
        label="Normal"
        placeholder="Normal state"
        rows={3}
      />
      <Textarea
        label="With Error"
        placeholder="Error state"
        error="This field is required"
        rows={3}
      />
      <Textarea
        label="Disabled"
        placeholder="Disabled state"
        disabled
        rows={3}
      />
      <Textarea
        label="Read Only"
        value="This is read-only content that cannot be edited"
        readOnly
        rows={3}
      />
    </div>
  ),
};

export const ResizeOptions: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <Textarea
        label="No resize"
        placeholder="Cannot be resized"
        resize="none"
        rows={3}
      />
      <Textarea
        label="Vertical only (default)"
        placeholder="Can only resize vertically"
        resize="vertical"
        rows={3}
      />
      <Textarea
        label="Horizontal only"
        placeholder="Can only resize horizontally"
        resize="horizontal"
        rows={3}
      />
      <Textarea
        label="Both directions"
        placeholder="Can resize in both directions"
        resize="both"
        rows={3}
      />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      feedback: '',
      details: '',
      notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
    };

    return (
      <form onSubmit={handleSubmit} style={{
        padding: '24px',
        backgroundColor: '#1f1d20',
        border: '1px solid #3a3a3a',
        width: '500px',
      }}>
        <h3 style={{ color: '#bdbdbd', marginTop: 0, marginBottom: '24px' }}>
          Feedback Form
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Textarea
            label="General Feedback"
            placeholder="What's on your mind?"
            value={formData.feedback}
            onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
            rows={4}
            fullWidth
            required
          />
          
          <Textarea
            label="Additional Details"
            placeholder="Any specific issues or suggestions?"
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            rows={5}
            fullWidth
            autoResize
            minRows={3}
            maxRows={8}
            showCount
            maxLength={500}
          />
          
          <Textarea
            label="Internal Notes (optional)"
            placeholder="For office use only"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            variant="bordered"
            rows={3}
            fullWidth
            helperText="These notes will not be shared"
          />
          
          <button
            type="submit"
            style={{
              padding: '12px 24px',
              backgroundColor: '#bdbdbd',
              border: '1px solid #bdbdbd',
              color: '#0b0b0d',
              cursor: 'pointer',
              marginTop: '16px',
            }}
          >
            Submit Feedback
          </button>
        </div>
      </form>
    );
  },
};

export const CodeEditor: Story = {
  render: () => (
    <div style={{
      padding: '16px',
      backgroundColor: '#1f1d20',
      border: '1px solid #3a3a3a',
    }}>
      <Textarea
        label="Code Editor"
        placeholder="// Enter your code here..."
        rows={10}
        fullWidth
        style={{ fontFamily: 'monospace' }}
        defaultValue={`function calculateSum(a, b) {
  // Add two numbers
  return a + b;
}

const result = calculateSum(10, 20);
console.log(result); // 30`}
      />
    </div>
  ),
};