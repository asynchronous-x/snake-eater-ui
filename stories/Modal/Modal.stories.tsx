import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Toggle } from '../Toggle/Toggle';

const meta = {
  title: 'Feedback/Modal',
  component: Modal,
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
      options: ['small', 'medium', 'large', 'full'],
    },
    closeOnOverlayClick: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Default Modal">
          <p>This is a default modal with standard styling and corner decorations.</p>
          <p>Click the close button or press Escape to close.</p>
        </Modal>
      </>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal with Footer</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirm Action"
          footer={
            <>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Confirm
              </Button>
            </>
          }
        >
          <p>Are you sure you want to proceed with this action?</p>
          <p>This action cannot be undone.</p>
        </Modal>
      </>
    );
  },
};

export const Small: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Small Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Small Modal" size="small">
          <p>This is a small modal, perfect for simple confirmations.</p>
        </Modal>
      </>
    );
  },
};

export const Large: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Large Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Large Modal" size="large">
          <h3>Extended Content</h3>
          <p>This large modal can contain more detailed information and complex layouts.</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </p>
        </Modal>
      </>
    );
  },
};

export const NoCloseButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Modal without Close Button</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="No Close Button"
          showCloseButton={false}
          footer={
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              I Understand
            </Button>
          }
        >
          <p>This modal doesn't have a close button in the header.</p>
          <p>You must click the button below or press Escape to close.</p>
        </Modal>
      </>
    );
  },
};

export const NoOverlayClose: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Modal without Overlay Close</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Important Message"
          closeOnOverlayClick={false}
        >
          <p>Clicking outside this modal won't close it.</p>
          <p>You must use the close button or press Escape.</p>
        </Modal>
      </>
    );
  },
};

export const FormModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="User Settings"
          footer={
            <>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Save Changes
              </Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input label="Display Name" placeholder="Enter your name" fullWidth />
            <Input label="Email" type="email" placeholder="user@example.com" fullWidth />
            <Toggle label="Email notifications" helperText="Receive updates about your account" />
            <Toggle label="Dark mode" helperText="Use dark theme across the application" checked />
          </div>
        </Modal>
      </>
    );
  },
};

export const ScrollableContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Scrollable Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Terms of Service"
          size="large"
          footer={
            <>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Decline
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Accept
              </Button>
            </>
          }
        >
          <div style={{ maxHeight: '400px' }}>
            <h3>1. Introduction</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>

            <h3>2. Use of Service</h3>
            <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>

            <h3>3. Privacy Policy</h3>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco...</p>

            <h3>4. User Responsibilities</h3>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit...</p>

            <h3>5. Limitations</h3>
            <p>Excepteur sint occaecat cupidatat non proident...</p>

            <h3>6. Termination</h3>
            <p>Sunt in culpa qui officia deserunt mollit anim id est laborum...</p>

            <h3>7. Contact Information</h3>
            <p>For questions about these terms, please contact us...</p>
          </div>
        </Modal>
      </>
    );
  },
};

export const DangerModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button variant="danger" onClick={() => setIsOpen(true)}>
          Delete Account
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="⚠️ Delete Account"
          footer={
            <>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => setIsOpen(false)}>
                Delete Account
              </Button>
            </>
          }
        >
          <p style={{ color: '#ff5555' }}>
            <strong>Warning:</strong> This action is permanent and cannot be undone.
          </p>
          <p>Deleting your account will:</p>
          <ul>
            <li>Remove all your data</li>
            <li>Cancel any active subscriptions</li>
            <li>Delete your profile and settings</li>
          </ul>
          <p>Are you absolutely sure you want to proceed?</p>
        </Modal>
      </>
    );
  },
};
