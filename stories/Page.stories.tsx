import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { PageAnalytics } from './PageAnalytics';
import { PageProjects } from './PageProjects';
import { PageMonitor } from './PageMonitor';
import { PageMobile } from './PageMobile';

const meta = {
  title: 'Pages/Examples',
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
} satisfies Meta;

export default meta;

export const AnalyticsDashboard: StoryObj = {
  render: () => <PageAnalytics />,
  name: 'Analytics Dashboard',
};

export const ProjectManagement: StoryObj = {
  render: () => <PageProjects />,
  name: 'Project Management',
};

export const SystemMonitor: StoryObj = {
  render: () => <PageMonitor />,
  name: 'System Monitor',
};

export const MobileApp: StoryObj = {
  render: () => <PageMobile />,
  name: 'Mobile App',
  parameters: {
    viewport: {
      defaultViewport: 'iphone12',
    },
  },
};
