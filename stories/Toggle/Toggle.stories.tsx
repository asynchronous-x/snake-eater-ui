import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Toggle } from './Toggle';

const meta = {
  title: 'Forms/Toggle',
  component: Toggle,
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
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'danger', 'info'],
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    onChange: (checked: boolean) => console.log('Toggle changed:', checked),
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const Checked: Story = {
  args: {
    label: 'Active toggle',
    checked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Dark mode',
    helperText: 'Reduces eye strain in low light',
    checked: true,
  },
};

export const LeftLabel: Story = {
  args: {
    label: 'Label on left',
    labelPosition: 'left',
  },
};

export const NoLabel: Story = {
  args: {},
};

export const Success: Story = {
  args: {
    variant: 'success',
    label: 'Feature enabled',
    checked: true,
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    label: 'Experimental feature',
    helperText: 'May contain bugs',
    checked: true,
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    label: 'Delete on exit',
    helperText: 'Permanently removes all data',
    checked: true,
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    label: 'Show hints',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled toggle',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled active',
    checked: true,
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Small toggle',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large toggle',
  },
};

export const ToggleGroup: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: true,
      autoSave: false,
      analytics: false,
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
        <h3 style={{ color: '#bdbdbd', margin: 0 }}>Settings</h3>

        <Toggle
          label="Push notifications"
          helperText="Get alerts for important updates"
          checked={settings.notifications}
          onChange={(checked) => setSettings({ ...settings, notifications: checked })}
        />

        <Toggle
          label="Dark mode"
          helperText="Easier on the eyes"
          variant="info"
          checked={settings.darkMode}
          onChange={(checked) => setSettings({ ...settings, darkMode: checked })}
        />

        <Toggle
          label="Auto-save"
          helperText="Save changes automatically"
          variant="success"
          checked={settings.autoSave}
          onChange={(checked) => setSettings({ ...settings, autoSave: checked })}
        />

        <Toggle
          label="Share analytics"
          helperText="Help us improve the product"
          checked={settings.analytics}
          onChange={(checked) => setSettings({ ...settings, analytics: checked })}
        />
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Toggle label="Default" />
      <Toggle label="Default checked" checked />
      <Toggle label="Success" variant="success" checked />
      <Toggle label="Warning" variant="warning" checked />
      <Toggle label="Danger" variant="danger" checked />
      <Toggle label="Info" variant="info" checked />
    </div>
  ),
};
