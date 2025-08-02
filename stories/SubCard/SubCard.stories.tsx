import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SubCard } from './SubCard';
import { Button } from '../Button/Button';

const meta = {
  title: 'Layout/SubCard',
  component: SubCard,
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
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'danger', 'info', 'inactive'],
    },
    interactive: { control: 'boolean' },
    cornerColor: { control: 'color' },
  },
} satisfies Meta<typeof SubCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <h3>SubCard Title</h3>
        <p>
          This is a SubCard component with plus symbols in the corners. It provides an alternative
          card styling.
        </p>
      </>
    ),
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: (
      <>
        <h3>Success Status</h3>
        <p>Operation completed successfully. All systems are operational.</p>
      </>
    ),
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    header: <h3>Warning</h3>,
    children: <p>Some services are experiencing degraded performance. Monitor closely.</p>,
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    interactive: true,
    onClick: () => console.log('Danger card clicked'),
    children: (
      <>
        <h3>Critical Alert</h3>
        <p>System failure detected. Immediate action required.</p>
      </>
    ),
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: (
      <>
        <h3>Information</h3>
        <p>New updates are available. Review the changelog for details.</p>
      </>
    ),
  },
};

export const Inactive: Story = {
  args: {
    variant: 'inactive',
    interactive: true,
    children: (
      <>
        <h3>Disabled Feature</h3>
        <p>This feature is currently unavailable. It will be enabled in a future update.</p>
      </>
    ),
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: <h3>Task Details</h3>,
    children: (
      <>
        <p>This SubCard demonstrates all three sections with custom styling.</p>
        <p>The plus symbols adapt to the card's color variant.</p>
      </>
    ),
    footer: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button size="small" variant="primary">
          Approve
        </Button>
        <Button size="small" variant="ghost">
          Reject
        </Button>
      </div>
    ),
  },
};

export const Interactive: Story = {
  args: {
    interactive: true,
    onClick: () => console.log('SubCard clicked'),
    children: (
      <>
        <h3>Interactive SubCard</h3>
        <p>Click me! The card and corner symbols respond to interaction.</p>
      </>
    ),
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    variant: 'success',
    children: <p>Small SubCard with proportionally sized corner symbols.</p>,
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    variant: 'info',
    header: <h2>Large SubCard</h2>,
    children: (
      <>
        <p>This is a large SubCard with bigger corner symbols.</p>
        <p>Perfect for featured content or important notifications.</p>
      </>
    ),
  },
};

export const VariantShowcase: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      }}
    >
      <SubCard>
        <h4>Default</h4>
        <p>Standard appearance</p>
      </SubCard>
      <SubCard variant="success">
        <h4>Success</h4>
        <p>Positive feedback</p>
      </SubCard>
      <SubCard variant="warning">
        <h4>Warning</h4>
        <p>Caution required</p>
      </SubCard>
      <SubCard variant="danger">
        <h4>Danger</h4>
        <p>Critical issue</p>
      </SubCard>
      <SubCard variant="info">
        <h4>Info</h4>
        <p>Informational</p>
      </SubCard>
      <SubCard variant="inactive">
        <h4>Inactive</h4>
        <p>Disabled state</p>
      </SubCard>
    </div>
  ),
};

export const InteractiveVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      }}
    >
      <SubCard interactive onClick={() => console.log('Default clicked')}>
        <h4>Click Me</h4>
        <p>Interactive default</p>
      </SubCard>
      <SubCard variant="success" interactive onClick={() => console.log('Success clicked')}>
        <h4>Success Action</h4>
        <p>Click to proceed</p>
      </SubCard>
      <SubCard variant="danger" interactive onClick={() => console.log('Danger clicked')}>
        <h4>Delete Item</h4>
        <p>Click to remove</p>
      </SubCard>
      <SubCard variant="inactive" interactive onClick={() => console.log('Inactive clicked')}>
        <h4>Unavailable</h4>
        <p>Cannot interact</p>
      </SubCard>
    </div>
  ),
};

export const CustomCornerColor: Story = {
  args: {
    cornerColor: '#f1fa8c',
    children: (
      <>
        <h3>Custom Corner Color</h3>
        <p>This SubCard has yellow corner symbols while maintaining the default card styling.</p>
      </>
    ),
  },
};

export const MixedStyles: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      }}
    >
      <SubCard variant="success" cornerColor="#ff5555">
        <h4>Success with Red Corners</h4>
        <p>Green card with red corner symbols</p>
      </SubCard>
      <SubCard variant="danger" cornerColor="#50fa7b">
        <h4>Danger with Green Corners</h4>
        <p>Red card with green corner symbols</p>
      </SubCard>
      <SubCard variant="info" cornerColor="#f1fa8c">
        <h4>Info with Yellow Corners</h4>
        <p>Blue card with yellow corner symbols</p>
      </SubCard>
      <SubCard cornerColor="#61dafb">
        <h4>Default with Blue Corners</h4>
        <p>Default card with custom blue corners</p>
      </SubCard>
    </div>
  ),
};
