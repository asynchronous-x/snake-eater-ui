import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Drawer } from './Drawer';
import { Button } from '../Button/Button';

const meta = {
  title: 'Navigation/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
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
    position: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'full'],
    },
    overlay: { control: 'boolean' },
    closeOnOverlayClick: { control: 'boolean' },
    lockScroll: { control: 'boolean' },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);

    return (
      <div style={{ padding: '20px' }}>
        <Button onClick={() => setOpen(true)}>Open Drawer</Button>
        <Drawer {...args} open={open} onClose={() => setOpen(false)}>
          <h2>Drawer Content</h2>
          <p>This is the drawer content. Click the X or press Escape to close.</p>
        </Drawer>
      </div>
    );
  },
};

export const WithHeaderFooter: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div style={{ padding: '20px' }}>
        <Button onClick={() => setOpen(true)}>Open Drawer with Header & Footer</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          header={<h2>Settings</h2>}
          footer={
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setOpen(false)}>
                Save Changes
              </Button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Username</label>
              <input
                type="text"
                style={{
                  width: '100%',
                  padding: '8px',
                  background: '#0b0b0d',
                  border: '1px solid #3a3a3a',
                  color: '#bdbdbd',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Email</label>
              <input
                type="email"
                style={{
                  width: '100%',
                  padding: '8px',
                  background: '#0b0b0d',
                  border: '1px solid #3a3a3a',
                  color: '#bdbdbd',
                }}
              />
            </div>
          </div>
        </Drawer>
      </div>
    );
  },
};

export const Positions: Story = {
  render: () => {
    const [leftOpen, setLeftOpen] = React.useState(false);
    const [rightOpen, setRightOpen] = React.useState(false);
    const [topOpen, setTopOpen] = React.useState(false);
    const [bottomOpen, setBottomOpen] = React.useState(false);

    return (
      <div style={{ padding: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <Button onClick={() => setLeftOpen(true)}>Left Drawer</Button>
        <Button onClick={() => setRightOpen(true)}>Right Drawer</Button>
        <Button onClick={() => setTopOpen(true)}>Top Drawer</Button>
        <Button onClick={() => setBottomOpen(true)}>Bottom Drawer</Button>

        <Drawer open={leftOpen} onClose={() => setLeftOpen(false)} position="left">
          <h2>Left Drawer</h2>
          <p>This drawer slides in from the left side.</p>
        </Drawer>

        <Drawer open={rightOpen} onClose={() => setRightOpen(false)} position="right">
          <h2>Right Drawer</h2>
          <p>This drawer slides in from the right side.</p>
        </Drawer>

        <Drawer open={topOpen} onClose={() => setTopOpen(false)} position="top">
          <h2>Top Drawer</h2>
          <p>This drawer slides in from the top.</p>
        </Drawer>

        <Drawer open={bottomOpen} onClose={() => setBottomOpen(false)} position="bottom">
          <h2>Bottom Drawer</h2>
          <p>This drawer slides in from the bottom.</p>
        </Drawer>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [smallOpen, setSmallOpen] = React.useState(false);
    const [mediumOpen, setMediumOpen] = React.useState(false);
    const [largeOpen, setLargeOpen] = React.useState(false);
    const [fullOpen, setFullOpen] = React.useState(false);

    return (
      <div style={{ padding: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <Button onClick={() => setSmallOpen(true)}>Small (250px)</Button>
        <Button onClick={() => setMediumOpen(true)}>Medium (400px)</Button>
        <Button onClick={() => setLargeOpen(true)}>Large (600px)</Button>
        <Button onClick={() => setFullOpen(true)}>Full Width</Button>

        <Drawer open={smallOpen} onClose={() => setSmallOpen(false)} size="small">
          <h2>Small Drawer</h2>
          <p>250px wide</p>
        </Drawer>

        <Drawer open={mediumOpen} onClose={() => setMediumOpen(false)} size="medium">
          <h2>Medium Drawer</h2>
          <p>400px wide (default)</p>
        </Drawer>

        <Drawer open={largeOpen} onClose={() => setLargeOpen(false)} size="large">
          <h2>Large Drawer</h2>
          <p>600px wide</p>
        </Drawer>

        <Drawer open={fullOpen} onClose={() => setFullOpen(false)} size="full">
          <h2>Full Width Drawer</h2>
          <p>Takes up the entire viewport width</p>
        </Drawer>
      </div>
    );
  },
};

export const NoOverlay: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div style={{ padding: '20px' }}>
        <Button onClick={() => setOpen(true)}>Open Drawer (No Overlay)</Button>
        <Drawer open={open} onClose={() => setOpen(false)} overlay={false}>
          <h2>No Overlay</h2>
          <p>This drawer appears without a background overlay.</p>
          <p>You can still interact with the page behind it.</p>
        </Drawer>
      </div>
    );
  },
};
