import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';

const meta = {
  title: 'Feedback/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    max: {
      control: { type: 'number' },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info', 'cyber'],
    },
    type: {
      control: { type: 'select' },
      options: ['linear', 'striped', 'animated', 'segmented'],
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['outside', 'top', 'bottom'],
    },
    segments: {
      control: { type: 'number', min: 5, max: 20 },
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
    max: 100,
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    max: 100,
    showLabel: true,
  },
};

export const LabelPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '400px' }}>
      <Progress value={50} showLabel labelPosition="outside" />
      <Progress value={75} showLabel labelPosition="top" />
      <Progress value={90} showLabel labelPosition="bottom" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <Progress value={40} size="small" showLabel />
      <Progress value={60} size="medium" showLabel />
      <Progress value={80} size="large" showLabel />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Progress value={60} variant="default" showLabel />
      <Progress value={70} variant="primary" showLabel />
      <Progress value={85} variant="success" showLabel />
      <Progress value={50} variant="warning" showLabel />
      <Progress value={30} variant="danger" showLabel />
      <Progress value={65} variant="info" showLabel />
      <Progress value={90} variant="cyber" showLabel />
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <div>
        <p style={{ color: '#8a8a8a', marginBottom: '8px' }}>Linear</p>
        <Progress value={60} type="linear" />
      </div>
      <div>
        <p style={{ color: '#8a8a8a', marginBottom: '8px' }}>Striped</p>
        <Progress value={60} type="striped" />
      </div>
      <div>
        <p style={{ color: '#8a8a8a', marginBottom: '8px' }}>Animated</p>
        <Progress value={60} type="animated" />
      </div>
      <div>
        <p style={{ color: '#8a8a8a', marginBottom: '8px' }}>Segmented</p>
        <Progress value={60} type="segmented" segments={10} />
      </div>
    </div>
  ),
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    variant: 'primary',
  },
};

export const CustomLabel: Story = {
  args: {
    value: 456,
    max: 1000,
    showLabel: true,
    label: 'Loading files...',
    labelPosition: 'top',
  },
};

export const CustomFormat: Story = {
  args: {
    value: 2.5,
    max: 5,
    showLabel: true,
    formatValue: (value, max) => `${value}/${max} GB`,
    labelPosition: 'outside',
  },
};

export const ProgressSteps: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Progress value={0} showLabel label="Not started" variant="default" />
      <Progress value={25} showLabel label="Initializing..." variant="info" />
      <Progress value={50} showLabel label="Processing..." variant="warning" />
      <Progress value={75} showLabel label="Finalizing..." variant="primary" />
      <Progress value={100} showLabel label="Complete!" variant="success" />
    </div>
  ),
};

export const SegmentedVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Progress value={30} type="segmented" segments={5} variant="primary" />
      <Progress value={60} type="segmented" segments={10} variant="success" />
      <Progress value={80} type="segmented" segments={15} variant="cyber" />
      <Progress value={45} type="segmented" segments={20} variant="warning" />
    </div>
  ),
};

export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '400px' }}>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '8px' }}>File Upload</p>
        <Progress 
          value={67} 
          showLabel 
          labelPosition="top"
          formatValue={(v) => `${v}% uploaded`}
          variant="primary"
        />
      </div>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '8px' }}>Disk Usage</p>
        <Progress 
          value={85} 
          showLabel 
          labelPosition="outside"
          variant="warning"
          formatValue={(v) => `${v}% used`}
        />
      </div>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '8px' }}>Task Progress</p>
        <Progress 
          value={4} 
          max={10}
          type="segmented"
          segments={10}
          showLabel
          labelPosition="bottom"
          formatValue={(v, m) => `${v} of ${m} tasks completed`}
          variant="success"
        />
      </div>
    </div>
  ),
};