import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Loading } from './Loading';

const meta = {
  title: 'Components/Loading',
  component: Loading,
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
    type: {
      control: { type: 'select' },
      options: ['dots', 'bars', 'pulse', 'grid'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
    },
    text: { control: 'text' },
    fullscreen: { control: 'boolean' },
    backdrop: { control: 'boolean' },
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'grid',
  },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
      <Loading type="grid" />
      <Loading type="dots" />
      <Loading type="bars" />
      <Loading type="pulse" />
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
      <Loading type="grid" text="Loading..." />
      <Loading type="dots" text="Processing" />
      <Loading type="bars" text="Please wait" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
      <Loading size="small" text="Small" />
      <Loading size="medium" text="Medium" />
      <Loading size="large" text="Large" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <Loading variant="default" text="Default" />
      <Loading variant="primary" text="Primary" />
      <Loading variant="success" text="Success" />
      <Loading variant="warning" text="Warning" />
      <Loading variant="danger" text="Danger" />
      <Loading variant="info" text="Info" />
    </div>
  ),
};

export const Dots: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <Loading type="dots" size="small" />
      <Loading type="dots" size="medium" />
      <Loading type="dots" size="large" />
    </div>
  ),
};

export const Bars: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <Loading type="bars" size="small" />
      <Loading type="bars" size="medium" />
      <Loading type="bars" size="large" />
    </div>
  ),
};

export const Pulse: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <Loading type="pulse" size="small" />
      <Loading type="pulse" size="medium" />
      <Loading type="pulse" size="large" />
    </div>
  ),
};

export const Grid: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <Loading type="grid" size="small" />
      <Loading type="grid" size="medium" />
      <Loading type="grid" size="large" />
    </div>
  ),
};

export const WithBackdrop: Story = {
  render: () => (
    <div style={{ 
      position: 'relative',
      width: '400px',
      height: '300px',
      backgroundColor: '#1f1d20',
      border: '1px solid #3a3a3a',
      padding: '24px',
    }}>
      <h3 style={{ color: '#bdbdbd', marginTop: 0 }}>Content Area</h3>
      <p style={{ color: '#8e8e90' }}>
        This content is behind the loading backdrop.
        The backdrop creates a semi-transparent overlay
        while loading is in progress.
      </p>
      <Loading type="grid" text="Loading content..." backdrop />
    </div>
  ),
};

export const Fullscreen: Story = {
  render: () => (
    <div>
      <button
        onClick={() => {
          const container = document.createElement('div');
          document.body.appendChild(container);
          const root = document.createElement('div');
          container.appendChild(root);
          
          // Simulate loading
          const loadingElement = (
            <Loading type="grid" text="Loading application..." fullscreen />
          );
          
          // This would normally use ReactDOM.render or createRoot
          console.log('Fullscreen loading would be shown here');
          
          setTimeout(() => {
            document.body.removeChild(container);
          }, 3000);
        }}
        style={{
          padding: '12px 24px',
          backgroundColor: '#3a3a3a',
          border: '1px solid #4a4a4a',
          color: '#bdbdbd',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        Show Fullscreen Loading (3s)
      </button>
      <p style={{ color: '#8e8e90', marginTop: '16px' }}>
        Click the button to see a fullscreen loading state
      </p>
    </div>
  ),
};

export const InlineStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        backgroundColor: '#1f1d20',
        border: '1px solid #3a3a3a',
      }}>
        <Loading type="dots" size="small" />
        <span style={{ color: '#bdbdbd' }}>Saving changes...</span>
      </div>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        backgroundColor: '#1f1d20',
        border: '1px solid #3a3a3a',
      }}>
        <Loading type="dots" size="small" variant="success" />
        <span style={{ color: '#bdbdbd' }}>Uploading files...</span>
      </div>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        backgroundColor: '#1f1d20',
        border: '1px solid #3a3a3a',
      }}>
        <Loading type="bars" size="small" variant="info" />
        <span style={{ color: '#bdbdbd' }}>Fetching data...</span>
      </div>
    </div>
  ),
};

export const ButtonLoading: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          backgroundColor: '#3a3a3a',
          border: '1px solid #4a4a4a',
          color: '#bdbdbd',
          cursor: 'not-allowed',
          opacity: 0.8,
        }}
        disabled
      >
        <Loading type="dots" size="small" />
        Submitting...
      </button>
      
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          backgroundColor: '#bdbdbd',
          border: '1px solid #bdbdbd',
          color: '#0b0b0d',
          cursor: 'not-allowed',
          opacity: 0.8,
        }}
        disabled
      >
        <Loading type="dots" size="small" variant="primary" />
        Processing
      </button>
    </div>
  ),
};

export const CardLoading: Story = {
  render: () => (
    <div style={{
      width: '300px',
      minHeight: '200px',
      backgroundColor: '#1f1d20',
      border: '1px solid #3a3a3a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      <Loading type="pulse" text="Loading content" />
    </div>
  ),
};

export const TableLoading: Story = {
  render: () => (
    <div style={{
      width: '100%',
      maxWidth: '600px',
    }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#1f1d20',
        border: '1px solid #3a3a3a',
      }}>
        <thead>
          <tr>
            <th style={{
              padding: '12px',
              borderBottom: '1px solid #3a3a3a',
              textAlign: 'left',
              color: '#bdbdbd',
            }}>Name</th>
            <th style={{
              padding: '12px',
              borderBottom: '1px solid #3a3a3a',
              textAlign: 'left',
              color: '#bdbdbd',
            }}>Status</th>
            <th style={{
              padding: '12px',
              borderBottom: '1px solid #3a3a3a',
              textAlign: 'left',
              color: '#bdbdbd',
            }}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3} style={{
              padding: '48px',
              textAlign: 'center',
              color: '#8e8e90',
            }}>
              <Loading type="bars" text="Loading data..." />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};