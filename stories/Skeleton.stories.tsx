import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
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
    variant: {
      control: { type: 'select' },
      options: ['text', 'rectangular', 'circular', 'button'],
    },
    animation: {
      control: { type: 'select' },
      options: ['pulse', 'wave', 'none'],
    },
    intensity: {
      control: { type: 'select' },
      options: ['subtle', 'normal', 'strong'],
    },
    width: { control: 'text' },
    height: { control: 'text' },
    lines: { control: 'number' },
    decorated: { control: 'boolean' },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 300,
    height: 100,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '8px' }}>Text</p>
        <Skeleton variant="text" />
      </div>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '8px' }}>Rectangular</p>
        <Skeleton variant="rectangular" width={300} height={100} />
      </div>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '8px' }}>Circular</p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={60} height={60} />
          <Skeleton variant="circular" width={80} height={80} />
        </div>
      </div>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '8px' }}>Button</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Skeleton variant="button" />
          <Skeleton variant="button" width={120} />
          <Skeleton variant="button" width={80} />
        </div>
      </div>
    </div>
  ),
};

export const TextLines: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ width: '300px' }}>
        <p style={{ color: '#bdbdbd', marginBottom: '8px' }}>Single line</p>
        <Skeleton variant="text" />
      </div>
      <div style={{ width: '300px' }}>
        <p style={{ color: '#bdbdbd', marginBottom: '8px' }}>Three lines</p>
        <Skeleton variant="text" lines={3} />
      </div>
      <div style={{ width: '400px' }}>
        <p style={{ color: '#bdbdbd', marginBottom: '8px' }}>Five lines</p>
        <Skeleton variant="text" lines={5} />
      </div>
    </div>
  ),
};

export const AnimationStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '8px' }}>Pulse (default)</p>
        <Skeleton animation="pulse" width={300} height={60} />
      </div>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '8px' }}>Wave</p>
        <Skeleton animation="wave" width={300} height={60} />
      </div>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '8px' }}>None</p>
        <Skeleton animation="none" width={300} height={60} />
      </div>
    </div>
  ),
};

export const AnimationIntensity: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '8px' }}>Subtle</p>
        <Skeleton animation="wave" intensity="subtle" width={300} height={60} />
      </div>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '8px' }}>Normal</p>
        <Skeleton animation="wave" intensity="normal" width={300} height={60} />
      </div>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '8px' }}>Strong</p>
        <Skeleton animation="wave" intensity="strong" width={300} height={60} />
      </div>
    </div>
  ),
};

export const Decorated: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Skeleton variant="rectangular" width={300} height={100} decorated />
      <Skeleton variant="button" width={150} decorated animation="wave" />
      <div style={{ width: '400px' }}>
        <Skeleton variant="text" lines={3} decorated />
      </div>
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <div style={{
      backgroundColor: '#1f1d20',
      border: '1px solid #3a3a3a',
      padding: '24px',
      width: '300px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
        <Skeleton variant="circular" width={48} height={48} />
        <div style={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" style={{ marginBottom: '8px' }} />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
      <Skeleton variant="rectangular" height={120} decorated style={{ marginBottom: '16px' }} />
      <Skeleton variant="text" lines={3} />
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <Skeleton variant="button" />
        <Skeleton variant="button" width={80} />
      </div>
    </div>
  ),
};

export const TableSkeleton: Story = {
  render: () => (
    <div style={{
      backgroundColor: '#1f1d20',
      border: '1px solid #3a3a3a',
      padding: '24px',
    }}>
      <Skeleton variant="text" width="200px" height="24px" style={{ marginBottom: '16px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[1, 2, 3, 4].map((row) => (
          <div key={row} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton variant="text" width="25%" />
            <Skeleton variant="text" width="20%" />
            <Skeleton variant="text" width="15%" />
            <Skeleton variant="button" width={60} />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const FormSkeleton: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Skeleton variant="text" width="100px" style={{ marginBottom: '8px' }} />
      <Skeleton variant="rectangular" height={40} style={{ marginBottom: '16px' }} />
      
      <Skeleton variant="text" width="120px" style={{ marginBottom: '8px' }} />
      <Skeleton variant="rectangular" height={40} style={{ marginBottom: '16px' }} />
      
      <Skeleton variant="text" width="80px" style={{ marginBottom: '8px' }} />
      <Skeleton variant="rectangular" height={80} style={{ marginBottom: '16px' }} />
      
      <div style={{ display: 'flex', gap: '8px' }}>
        <Skeleton variant="button" width={100} />
        <Skeleton variant="button" width={80} />
      </div>
    </div>
  ),
};