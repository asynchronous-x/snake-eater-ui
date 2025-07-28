import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Toast, ToastContainer } from './Toast';
import { Button } from './Button';

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
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
      options: ['default', 'success', 'warning', 'danger', 'info'],
    },
    position: {
      control: { type: 'select' },
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
    },
    duration: { control: 'number' },
    closable: { control: 'boolean' },
    showIcon: { control: 'boolean' },
    showProgress: { control: 'boolean' },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'This is a toast notification',
    duration: 0,
  },
};

export const Variants: Story = {
  render: () => {
    const [toasts, setToasts] = useState<Array<{ id: string; variant: any; message: string }>>([
      { id: '1', variant: 'default', message: 'Default toast message' },
      { id: '2', variant: 'success', message: 'Success! Operation completed' },
      { id: '3', variant: 'warning', message: 'Warning: Check your input' },
      { id: '4', variant: 'danger', message: 'Error: Something went wrong' },
      { id: '5', variant: 'info', message: 'Info: Did you know?' },
    ]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            variant={toast.variant}
            duration={0}
            onClose={() => setToasts(toasts.filter((t) => t.id !== toast.id))}
          />
        ))}
      </div>
    );
  },
};

export const WithActions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Toast
        message="Your session will expire soon"
        variant="warning"
        duration={0}
        action={{
          label: 'Extend',
          onClick: () => console.log('Session extended'),
        }}
      />
      <Toast
        message="New update available"
        variant="info"
        duration={0}
        action={{
          label: 'Update Now',
          onClick: () => console.log('Updating...'),
        }}
      />
      <Toast
        message="Failed to save changes"
        variant="danger"
        duration={0}
        action={{
          label: 'Retry',
          onClick: () => console.log('Retrying...'),
        }}
      />
    </div>
  ),
};

export const WithProgress: Story = {
  render: () => {
    const [show, setShow] = useState(true);

    return (
      <div>
        {show && (
          <Toast
            message="This toast will auto-dismiss in 5 seconds"
            variant="info"
            duration={5000}
            showProgress
            onClose={() => setShow(false)}
          />
        )}
        {!show && <Button onClick={() => setShow(true)}>Show Toast</Button>}
      </div>
    );
  },
};

export const CustomIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Toast message="File uploaded successfully" variant="success" icon="📄" duration={0} />
      <Toast message="Security alert" variant="danger" icon="🔒" duration={0} />
      <Toast message="New message received" variant="info" icon="💬" duration={0} />
    </div>
  ),
};

export const NoIcon: Story = {
  render: () => <Toast message="Simple toast without icon" showIcon={false} duration={0} />,
};

export const NotClosable: Story = {
  render: () => (
    <Toast message="This toast cannot be closed manually" closable={false} duration={0} />
  ),
};

export const LongMessage: Story = {
  render: () => (
    <Toast
      message="This is a very long toast message that demonstrates how the toast component handles text wrapping when the content exceeds the maximum width of the container."
      variant="info"
      duration={0}
    />
  ),
};

export const ToastStack: Story = {
  render: () => {
    const [toasts, setToasts] = useState<
      Array<{
        id: string;
        message: string;
        variant?: any;
        duration?: number;
        action?: any;
      }>
    >([]);

    let nextId = 1;

    const addToast = (variant?: any) => {
      const newToast = {
        id: String(nextId++),
        message: `Toast notification #${nextId - 1}`,
        variant,
        duration: 3000,
      };
      setToasts([...toasts, newToast]);
    };

    const removeToast = (id: string) => {
      setToasts(toasts.filter((t) => t.id !== id));
    };

    return (
      <div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <Button onClick={() => addToast()}>Add Default</Button>
          <Button onClick={() => addToast('success')} variant="secondary">
            Add Success
          </Button>
          <Button onClick={() => addToast('warning')} variant="secondary">
            Add Warning
          </Button>
          <Button onClick={() => addToast('danger')} variant="secondary">
            Add Danger
          </Button>
          <Button onClick={() => addToast('info')} variant="secondary">
            Add Info
          </Button>
        </div>

        <ToastContainer toasts={toasts} position="bottom-right" onClose={removeToast} />
      </div>
    );
  },
};

export const Positions: Story = {
  render: () => {
    const [position, setPosition] = useState<any>('bottom-right');
    const [toasts, setToasts] = useState<
      Array<{
        id: string;
        message: string;
        variant?: any;
      }>
    >([{ id: '1', message: 'Toast in selected position', variant: 'info' }]);

    return (
      <div>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ color: '#bdbdbd', display: 'block', marginBottom: '8px' }}>
            Toast Position:
          </label>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            style={{
              padding: '8px',
              backgroundColor: '#1f1d20',
              border: '1px solid #3a3a3a',
              color: '#bdbdbd',
            }}
          >
            <option value="top-left">Top Left</option>
            <option value="top-center">Top Center</option>
            <option value="top-right">Top Right</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-center">Bottom Center</option>
            <option value="bottom-right">Bottom Right</option>
          </select>
        </div>

        <ToastContainer
          toasts={toasts}
          position={position}
          onClose={(id) => setToasts(toasts.filter((t) => t.id !== id))}
        />
      </div>
    );
  },
};
