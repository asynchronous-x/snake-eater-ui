import type { Meta, StoryObj } from '@storybook/react';

import { Header } from './Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
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
  args: {
    onLogin: () => console.log('Login clicked'),
    onLogout: () => console.log('Logout clicked'),
    onCreateAccount: () => console.log('Create account clicked'),
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

export const LoggedOut: Story = {};

export const WithAvatar: Story = {
  args: {
    user: {
      name: 'Jane Doe',
      avatar: 'https://via.placeholder.com/32',
    },
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'My Dark App',
  },
};