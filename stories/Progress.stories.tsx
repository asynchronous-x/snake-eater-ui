import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { Progress } from './Progress';
import { Button } from './Button';

const meta = {
  title: 'Components/Progress',
  component: Progress,
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
    labelPosition: {
      control: { type: 'select' },
      options: ['inside', 'outside'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100 },
    },
    showLabel: { control: 'boolean' },
    animated: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    showLabel: true,
  },
};

export const LabelInside: Story = {
  args: {
    value: 50,
    showLabel: true,
    labelPosition: 'inside',
    size: 'large',
  },
};

export const Animated: Story = {
  args: {
    value: 80,
    animated: true,
    variant: 'info',
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    animated: true,
  },
};

export const Success: Story = {
  args: {
    value: 100,
    variant: 'success',
    showLabel: true,
  },
};

export const Warning: Story = {
  args: {
    value: 65,
    variant: 'warning',
    showLabel: true,
  },
};

export const Danger: Story = {
  args: {
    value: 25,
    variant: 'danger',
    showLabel: true,
  },
};

export const Info: Story = {
  args: {
    value: 45,
    variant: 'info',
    showLabel: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Progress value={70} size="small" />
      <Progress value={70} size="medium" />
      <Progress value={70} size="large" showLabel labelPosition="inside" />
    </div>
  ),
};

export const LiveProgress: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
      if (isRunning && progress < 100) {
        const timer = setTimeout(() => {
          setProgress(prev => Math.min(prev + 1, 100));
        }, 50);
        return () => clearTimeout(timer);
      } else if (progress >= 100) {
        setIsRunning(false);
      }
    }, [progress, isRunning]);

    const handleStart = () => {
      setProgress(0);
      setIsRunning(true);
    };

    return (
      <div style={{ width: '400px' }}>
        <Progress 
          value={progress} 
          variant={progress === 100 ? 'success' : 'info'}
          showLabel
          animated
        />
        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
          <Button onClick={handleStart} disabled={isRunning}>
            Start
          </Button>
          <Button onClick={() => setIsRunning(!isRunning)} disabled={progress >= 100}>
            {isRunning ? 'Pause' : 'Resume'}
          </Button>
          <Button onClick={() => { setProgress(0); setIsRunning(false); }} variant="ghost">
            Reset
          </Button>
        </div>
      </div>
    );
  },
};

export const FileUpload: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <h3 style={{ color: '#bdbdbd', marginBottom: '16px' }}>File Upload Progress</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '12px', color: '#8e8e90' }}>document.pdf</span>
            <span style={{ fontSize: '12px', color: '#8e8e90' }}>2.5 MB</span>
          </div>
          <Progress value={100} variant="success" size="small" />
        </div>
        
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '12px', color: '#8e8e90' }}>image.jpg</span>
            <span style={{ fontSize: '12px', color: '#8e8e90' }}>1.2 MB</span>
          </div>
          <Progress value={65} variant="info" size="small" animated />
        </div>
        
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '12px', color: '#8e8e90' }}>video.mp4</span>
            <span style={{ fontSize: '12px', color: '#8e8e90' }}>45.8 MB</span>
          </div>
          <Progress value={30} variant="warning" size="small" animated />
        </div>
        
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '12px', color: '#8e8e90' }}>archive.zip</span>
            <span style={{ fontSize: '12px', color: '#ff5555' }}>Failed</span>
          </div>
          <Progress value={15} variant="danger" size="small" />
        </div>
      </div>
    </div>
  ),
};

export const SystemStatus: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <h3 style={{ color: '#bdbdbd', marginBottom: '16px' }}>System Resources</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#bdbdbd' }}>CPU Usage</span>
            <span style={{ color: '#50fa7b' }}>42%</span>
          </div>
          <Progress value={42} variant="success" />
        </div>
        
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#bdbdbd' }}>Memory</span>
            <span style={{ color: '#f1fa8c' }}>78%</span>
          </div>
          <Progress value={78} variant="warning" />
        </div>
        
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#bdbdbd' }}>Storage</span>
            <span style={{ color: '#ff5555' }}>92%</span>
          </div>
          <Progress value={92} variant="danger" />
        </div>
      </div>
    </div>
  ),
};