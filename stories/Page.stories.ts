import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './Page';

const meta = {
  title: 'Pages/Page',
  component: Page,
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
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Examples: Story = {};