import type { Meta, StoryObj } from '@storybook/react';
import { BarGraph } from './BarGraph';

const meta = {
  title: 'Data Display/BarGraph',
  component: BarGraph,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of data points with label and value',
    },
    maxValue: {
      control: 'number',
      description: 'Maximum value for the scale',
    },
    height: {
      control: { type: 'range', min: 100, max: 500, step: 10 },
      description: 'Height of the graph in pixels',
    },
    barWidth: {
      control: { type: 'range', min: 20, max: 80, step: 5 },
      description: 'Width of each bar',
    },
    gap: {
      control: { type: 'range', min: 0, max: 20, step: 2 },
      description: 'Gap between bars',
    },
    showValues: {
      control: 'boolean',
      description: 'Show values on bars',
    },
    showGrid: {
      control: 'boolean',
      description: 'Show grid lines',
    },
    gridLines: {
      control: { type: 'range', min: 2, max: 10, step: 1 },
      description: 'Number of grid lines',
    },
    showLabels: {
      control: 'boolean',
      description: 'Show x-axis labels',
    },
    showScale: {
      control: 'boolean',
      description: 'Show y-axis scale',
    },
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: 'Graph orientation',
    },
    animate: {
      control: 'boolean',
      description: 'Animate bars on mount',
    },
    variant: {
      control: 'radio',
      options: ['default', 'minimal', 'detailed'],
      description: 'Visual variant',
    },
    barColor: {
      control: 'color',
      description: 'Default bar color',
    },
    gridColor: {
      control: 'color',
      description: 'Grid line color',
    },
  },
} satisfies Meta<typeof BarGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  { label: 'Jan', value: 65 },
  { label: 'Feb', value: 85 },
  { label: 'Mar', value: 45 },
  { label: 'Apr', value: 90 },
  { label: 'May', value: 70 },
  { label: 'Jun', value: 55 },
];

export const Default: Story = {
  args: {
    data: sampleData,
    height: 300,
    showValues: true,
    showGrid: true,
    showLabels: true,
    showScale: true,
    animate: true,
  },
};

export const Horizontal: Story = {
  args: {
    data: sampleData,
    orientation: 'horizontal',
    height: 250,
    showValues: true,
    showGrid: true,
    showLabels: true,
    showScale: true,
    animate: true,
  },
};

export const Minimal: Story = {
  args: {
    data: sampleData,
    variant: 'minimal',
    height: 200,
  },
};

export const Detailed: Story = {
  args: {
    data: sampleData.map((item, index) => ({
      ...item,
      subLabel: `${index % 2 === 0 ? '+' : '-'}${Math.floor(Math.random() * 20 + 5)}%`,
    })),
    variant: 'detailed',
    height: 350,
    barWidth: 50,
  },
};

export const CustomColors: Story = {
  args: {
    data: [
      { label: 'Critical', value: 95, color: '#ff5555' },
      { label: 'Warning', value: 70, color: '#f1fa8c' },
      { label: 'Success', value: 85, color: '#50fa7b' },
      { label: 'Info', value: 60, color: '#8be9fd' },
      { label: 'Default', value: 45 },
    ],
    height: 300,
    showValues: true,
  },
};

export const LargeDataset: Story = {
  args: {
    data: Array.from({ length: 12 }, (_, i) => ({
      label: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
      value: Math.floor(Math.random() * 80 + 20),
    })),
    height: 300,
    barWidth: 30,
    gap: 4,
    showValues: false,
  },
};

export const WithSubLabels: Story = {
  args: {
    data: [
      { label: 'Q1', value: 250, subLabel: '2023' },
      { label: 'Q2', value: 320, subLabel: '2023' },
      { label: 'Q3', value: 280, subLabel: '2023' },
      { label: 'Q4', value: 390, subLabel: '2023' },
      { label: 'Q1', value: 410, subLabel: '2024' },
    ],
    maxValue: 500,
    height: 350,
    showValues: true,
    formatValue: (value) => `$${value}K`,
  },
};

export const NoAnimation: Story = {
  args: {
    data: sampleData,
    animate: false,
    height: 300,
  },
};

export const CustomGrid: Story = {
  args: {
    data: sampleData,
    height: 300,
    gridLines: 8,
    gridColor: '#ff5555',
    showValues: true,
  },
};

export const SmallBars: Story = {
  args: {
    data: Array.from({ length: 20 }, (_, i) => ({
      label: `${i + 1}`,
      value: Math.floor(Math.random() * 100),
    })),
    height: 250,
    barWidth: 15,
    gap: 2,
    showValues: false,
    showLabels: false,
  },
};

export const PercentageValues: Story = {
  args: {
    data: [
      { label: 'Task A', value: 100 },
      { label: 'Task B', value: 85 },
      { label: 'Task C', value: 67 },
      { label: 'Task D', value: 92 },
      { label: 'Task E', value: 45 },
    ],
    maxValue: 100,
    height: 300,
    formatValue: (value) => `${value}%`,
    barColor: '#50fa7b',
  },
};

export const HorizontalMinimal: Story = {
  args: {
    data: [
      { label: 'Performance', value: 85 },
      { label: 'Accessibility', value: 92 },
      { label: 'Best Practices', value: 78 },
      { label: 'SEO', value: 96 },
    ],
    orientation: 'horizontal',
    variant: 'minimal',
    height: 200,
    barWidth: 30,
    maxValue: 100,
  },
};

