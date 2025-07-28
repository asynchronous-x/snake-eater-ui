import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Alert } from './Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
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
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    borderPosition: {
      control: { type: 'select' },
      options: ['left', 'top', 'all'],
    },
    showIcon: { control: 'boolean' },
    closable: { control: 'boolean' },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'System Update',
    description: 'A new version is available. Please refresh the page to get the latest updates.',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert
        title="Default Alert"
        description="This is a default alert message with neutral styling."
      />
      <Alert
        variant="success"
        title="Success!"
        description="Your changes have been saved successfully."
      />
      <Alert
        variant="warning"
        title="Warning"
        description="Your session will expire in 5 minutes. Please save your work."
      />
      <Alert
        variant="danger"
        title="Error"
        description="Failed to connect to the server. Please try again later."
      />
      <Alert
        variant="info"
        title="Information"
        description="You can customize your dashboard in the settings panel."
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert
        size="small"
        variant="info"
        title="Small Alert"
        description="This is a small sized alert."
      />
      <Alert
        size="medium"
        variant="info"
        title="Medium Alert"
        description="This is a medium sized alert (default)."
      />
      <Alert
        size="large"
        variant="info"
        title="Large Alert"
        description="This is a large sized alert with more padding."
      />
    </div>
  ),
};

export const BorderPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert
        variant="success"
        borderPosition="left"
        title="Left Border"
        description="Alert with accent border on the left side."
      />
      <Alert
        variant="warning"
        borderPosition="top"
        title="Top Border"
        description="Alert with accent border on the top."
      />
      <Alert
        variant="danger"
        borderPosition="all"
        title="All Borders"
        description="Alert with accent borders on all sides."
      />
    </div>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <Alert
      showIcon={false}
      variant="info"
      title="No Icon Alert"
      description="This alert doesn't display an icon, giving more space for content."
    />
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert
        icon="🔒"
        variant="info"
        title="Security Update"
        description="Two-factor authentication has been enabled for your account."
      />
      <Alert
        icon="🚀"
        variant="success"
        title="Deployment Complete"
        description="Your application has been successfully deployed to production."
      />
      <Alert
        icon="💡"
        variant="warning"
        title="Pro Tip"
        description="You can use keyboard shortcuts to navigate faster."
      />
    </div>
  ),
};

export const Closable: Story = {
  render: () => {
    const [alerts, setAlerts] = useState([
      { id: 1, variant: 'info' as const, title: 'Tip', description: 'Click the X to close this alert.' },
      { id: 2, variant: 'success' as const, title: 'Success', description: 'This alert can be dismissed.' },
      { id: 3, variant: 'warning' as const, title: 'Warning', description: 'Don\'t forget to save your work!' },
    ]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {alerts.map(alert => (
          <Alert
            key={alert.id}
            variant={alert.variant}
            title={alert.title}
            description={alert.description}
            closable
            onClose={() => setAlerts(alerts.filter(a => a.id !== alert.id))}
          />
        ))}
        {alerts.length === 0 && (
          <Alert variant="default" description="All alerts have been dismissed." />
        )}
      </div>
    );
  },
};

export const WithActions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert
        variant="warning"
        title="Unsaved Changes"
        description="You have unsaved changes. What would you like to do?"
        actions={
          <>
            <button style={{
              padding: '4px 12px',
              backgroundColor: '#ffb86c',
              border: '1px solid #ffb86c',
              color: '#0b0b0d',
              cursor: 'pointer',
            }}>
              Save Now
            </button>
            <button style={{
              padding: '4px 12px',
              backgroundColor: 'transparent',
              border: '1px solid #ffb86c',
              color: '#ffb86c',
              cursor: 'pointer',
            }}>
              Discard
            </button>
          </>
        }
      />
      <Alert
        variant="info"
        title="New Feature Available"
        description="Check out our new dashboard analytics!"
        actions={
          <a href="#" style={{ color: '#61dafb', textDecoration: 'underline' }}>
            Learn more →
          </a>
        }
      />
    </div>
  ),
};

export const DescriptionOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert variant="success">
        Operation completed successfully.
      </Alert>
      <Alert variant="danger">
        An unexpected error occurred. Please try again.
      </Alert>
      <Alert variant="info" showIcon={false}>
        Your profile was last updated 3 days ago.
      </Alert>
    </div>
  ),
};

export const ComplexContent: Story = {
  render: () => (
    <Alert
      variant="info"
      title="System Maintenance"
      closable
    >
      <div>
        <p style={{ margin: '0 0 8px 0' }}>
          We'll be performing scheduled maintenance on:
        </p>
        <ul style={{ margin: '0 0 8px 0', paddingLeft: '20px' }}>
          <li>Database servers: 2:00 AM - 2:30 AM EST</li>
          <li>API services: 2:30 AM - 3:00 AM EST</li>
          <li>CDN refresh: 3:00 AM - 3:15 AM EST</li>
        </ul>
        <p style={{ margin: 0 }}>
          During this time, some features may be temporarily unavailable.
        </p>
      </div>
    </Alert>
  ),
};

export const NotificationStack: Story = {
  render: () => {
    const [notifications, setNotifications] = useState([
      { id: 1, variant: 'success' as const, title: 'File uploaded', description: 'document.pdf has been uploaded successfully.' },
      { id: 2, variant: 'info' as const, title: 'New message', description: 'You have 3 unread messages in your inbox.' },
      { id: 3, variant: 'warning' as const, title: 'Storage limit', description: 'You\'re using 80% of your storage quota.' },
    ]);

    return (
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>
        {notifications.map(notification => (
          <Alert
            key={notification.id}
            variant={notification.variant}
            title={notification.title}
            description={notification.description}
            size="small"
            closable
            onClose={() => setNotifications(notifications.filter(n => n.id !== notification.id))}
          />
        ))}
      </div>
    );
  },
};

export const StatusMessages: Story = {
  render: () => (
    <div style={{
      padding: '24px',
      backgroundColor: '#1f1d20',
      border: '1px solid #3a3a3a',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <h3 style={{ color: '#bdbdbd', marginTop: 0 }}>System Status</h3>
      
      <Alert
        variant="success"
        title="All Systems Operational"
        description="All services are running normally."
        borderPosition="all"
        icon="✓"
      />
      
      <Alert
        variant="warning"
        title="Degraded Performance"
        description="API response times are higher than usual."
        borderPosition="all"
        icon="⚠"
      />
      
      <Alert
        variant="danger"
        title="Service Outage"
        description="Authentication service is currently unavailable."
        borderPosition="all"
        icon="✕"
      />
    </div>
  ),
};