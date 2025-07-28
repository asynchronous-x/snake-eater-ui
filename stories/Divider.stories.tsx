import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Divider } from './Divider';

const meta = {
  title: 'Components/Divider',
  component: Divider,
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
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: { type: 'select' },
      options: ['solid', 'dashed', 'dotted', 'double', 'accent'],
    },
    thickness: {
      control: { type: 'select' },
      options: ['thin', 'medium', 'thick'],
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'muted', 'primary', 'secondary'],
    },
    decorated: { control: 'boolean' },
    decorationStyle: {
      control: { type: 'select' },
      options: ['dots', 'diamond', 'plus', 'arrows'],
    },
    spacing: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '16px' }}>Solid (default)</p>
        <Divider />
      </div>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '16px' }}>Dashed</p>
        <Divider variant="dashed" />
      </div>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '16px' }}>Dotted</p>
        <Divider variant="dotted" />
      </div>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '16px' }}>Double</p>
        <Divider variant="double" />
      </div>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '16px' }}>Accent (Waveform)</p>
        <Divider variant="accent" />
      </div>
    </div>
  ),
};

export const Thickness: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '16px' }}>Thin</p>
        <Divider thickness="thin" />
      </div>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '16px' }}>Medium</p>
        <Divider thickness="medium" />
      </div>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '16px' }}>Thick</p>
        <Divider thickness="thick" />
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '16px' }}>Default</p>
        <Divider color="default" />
      </div>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '16px' }}>Muted</p>
        <Divider color="muted" />
      </div>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '16px' }}>Primary</p>
        <Divider color="primary" />
      </div>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '16px' }}>Secondary</p>
        <Divider color="secondary" />
      </div>
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <Divider>OR</Divider>
      <Divider variant="dashed">SECTION</Divider>
      <Divider color="primary">CONTINUE</Divider>
      <Divider thickness="medium">
        <span style={{ fontSize: '20px' }}>⚡</span>
      </Divider>
    </div>
  ),
};

export const Decorated: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <Divider decorated decorationStyle="dots" />
      <Divider decorated decorationStyle="diamond" color="primary" />
      <Divider decorated decorationStyle="plus" variant="dashed" />
      <Divider decorated decorationStyle="arrows" thickness="medium" />
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div>
      <p style={{ color: '#bdbdbd' }}>Small spacing</p>
      <Divider spacing="small" />
      <p style={{ color: '#bdbdbd' }}>Medium spacing (default)</p>
      <Divider spacing="medium" />
      <p style={{ color: '#bdbdbd' }}>Large spacing</p>
      <Divider spacing="large" />
      <p style={{ color: '#bdbdbd' }}>Content below divider</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', height: '200px', alignItems: 'stretch' }}>
      <div style={{ flex: 1, color: '#bdbdbd' }}>
        <p>Left content</p>
        <p>Some text here</p>
      </div>
      <Divider orientation="vertical" />
      <div style={{ flex: 1, color: '#bdbdbd' }}>
        <p>Right content</p>
        <p>Some text here</p>
      </div>
    </div>
  ),
};

export const VerticalVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', height: '150px', alignItems: 'stretch' }}>
      <div style={{ color: '#bdbdbd' }}>Solid</div>
      <Divider orientation="vertical" />
      <div style={{ color: '#bdbdbd' }}>Dashed</div>
      <Divider orientation="vertical" variant="dashed" />
      <div style={{ color: '#bdbdbd' }}>Dotted</div>
      <Divider orientation="vertical" variant="dotted" />
      <div style={{ color: '#bdbdbd' }}>Double</div>
      <Divider orientation="vertical" variant="double" />
      <div style={{ color: '#bdbdbd' }}>Thick</div>
      <Divider orientation="vertical" thickness="thick" />
      <div style={{ color: '#bdbdbd' }}>Accent</div>
      <Divider orientation="vertical" variant="accent" />
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div style={{
      backgroundColor: '#1f1d20',
      border: '1px solid #3a3a3a',
      padding: '24px',
      maxWidth: '400px',
    }}>
      <h3 style={{ color: '#bdbdbd', margin: '0 0 16px 0' }}>Account Settings</h3>
      <p style={{ color: '#8e8e90', margin: '0 0 16px 0' }}>
        Manage your account preferences and security settings.
      </p>
      <Divider />
      <div style={{ marginTop: '16px' }}>
        <p style={{ color: '#bdbdbd', margin: '0 0 8px 0' }}>Email Notifications</p>
        <p style={{ color: '#8e8e90', margin: '0' }}>Enabled</p>
      </div>
      <Divider variant="dotted" spacing="small" />
      <div style={{ marginTop: '16px' }}>
        <p style={{ color: '#bdbdbd', margin: '0 0 8px 0' }}>Two-Factor Auth</p>
        <p style={{ color: '#8e8e90', margin: '0' }}>Disabled</p>
      </div>
      <Divider>Security</Divider>
      <div style={{ marginTop: '16px' }}>
        <p style={{ color: '#bdbdbd', margin: '0 0 8px 0' }}>Last Login</p>
        <p style={{ color: '#8e8e90', margin: '0' }}>2 hours ago</p>
      </div>
    </div>
  ),
};