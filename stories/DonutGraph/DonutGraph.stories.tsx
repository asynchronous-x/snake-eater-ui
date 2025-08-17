import type { Meta, StoryObj } from '@storybook/react';
import { DonutGraph } from './DonutGraph';

const meta = {
  title: 'Data Display/DonutGraph',
  component: DonutGraph,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of data segments with label and value',
    },
    size: {
      control: { type: 'range', min: 200, max: 500, step: 50 },
      description: 'Size of the graph in pixels',
    },
    thickness: {
      control: { type: 'range', min: 20, max: 100, step: 10 },
      description: 'Thickness of the donut ring',
    },
    innerRadius: {
      control: { type: 'range', min: 20, max: 70, step: 5 },
      description: 'Inner radius percentage',
    },
    colors: {
      control: 'object',
      description: 'Colors for segments',
    },
    showCenterValue: {
      control: 'boolean',
      description: 'Show center value',
    },
    centerValue: {
      control: 'text',
      description: 'Center value text',
    },
    centerLabel: {
      control: 'text',
      description: 'Center label text',
    },
    showLegend: {
      control: 'boolean',
      description: 'Show legend',
    },
    showValues: {
      control: 'boolean',
      description: 'Show values on segments',
    },
    showLabels: {
      control: 'boolean',
      description: 'Show labels on segments',
    },
    animate: {
      control: 'boolean',
      description: 'Animate segments on mount',
    },
    animateLegend: {
      control: 'boolean',
      description: 'Animate legend on mount',
    },
    segmentGap: {
      control: { type: 'range', min: 0, max: 20, step: 2 },
      description: 'Gap between segments in pixels',
    },
    type: {
      control: 'radio',
      options: ['full', 'semi'],
      description: 'Graph type',
    },
    variant: {
      control: 'radio',
      options: ['default', 'minimal', 'detailed', 'interactive'],
      description: 'Visual variant',
    },
  },
} satisfies Meta<typeof DonutGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  { label: 'Desktop', value: 45 },
  { label: 'Mobile', value: 35 },
  { label: 'Tablet', value: 20 },
];

const categoryData = [
  { label: 'Engineering', value: 120 },
  { label: 'Design', value: 45 },
  { label: 'Marketing', value: 60 },
  { label: 'Sales', value: 80 },
  { label: 'Support', value: 35 },
];

export const Default: Story = {
  args: {
    data: sampleData,
    size: 300,
    thickness: 60,
    innerRadius: 40,
    showCenterValue: true,
    showLegend: true,
    animate: true,
    segmentGap: 6,
  },
};

export const SemiCircle: Story = {
  args: {
    data: sampleData,
    type: 'semi',
    size: 350,
    thickness: 70,
    innerRadius: 35,
    showCenterValue: true,
    centerValue: '100%',
    centerLabel: 'Coverage',
    showLegend: true,
    animate: true,
  },
};

export const Interactive: Story = {
  args: {
    data: categoryData,
    variant: 'interactive',
    size: 350,
    thickness: 70,
    innerRadius: 45,
    showCenterValue: true,
    centerLabel: 'Total',
    showLegend: true,
    animate: true,
    onSegmentClick: (segment, index) => {
      console.log(`Clicked: ${segment.label} (value: ${segment.value})`);
    },
  },
};

export const InteractiveSemi: Story = {
  args: {
    data: sampleData,
    variant: 'interactive',
    type: 'semi',
    size: 400,
    thickness: 80,
    innerRadius: 40,
    showCenterValue: true,
    centerValue: '100%',
    centerLabel: 'Usage',
    showLegend: true,
    animate: true,
    onSegmentClick: (segment, index) => {
      console.log(`Selected: ${segment.label}`);
    },
  },
};

export const Minimal: Story = {
  args: {
    data: sampleData,
    variant: 'minimal',
    size: 250,
    thickness: 50,
    innerRadius: 50,
    animate: false,
  },
};

export const Detailed: Story = {
  args: {
    data: categoryData,
    variant: 'detailed',
    size: 380,
    thickness: 80,
    innerRadius: 35,
    showCenterValue: true,
    centerLabel: 'Employees',
    showLegend: true,
    showValues: true,
    animate: true,
  },
};

export const WithLabelsAndValues: Story = {
  args: {
    data: sampleData,
    size: 350,
    thickness: 80,
    innerRadius: 40,
    showLabels: true,
    showValues: true,
    showLegend: false,
    showCenterValue: true,
    animate: true,
  },
};

export const CustomColors: Story = {
  args: {
    data: [
      { label: 'Success', value: 75, color: '#50fa7b' },
      { label: 'Warning', value: 20, color: '#f1fa8c' },
      { label: 'Error', value: 5, color: '#ff5555' },
    ],
    size: 300,
    thickness: 60,
    innerRadius: 40,
    showCenterValue: true,
    centerValue: '95%',
    centerLabel: 'Health',
    showLegend: true,
    animate: true,
  },
};

export const ThickRing: Story = {
  args: {
    data: sampleData,
    size: 300,
    thickness: 100,
    innerRadius: 20,
    showCenterValue: false,
    showLegend: true,
    showValues: true,
    animate: true,
  },
};

export const ThinRing: Story = {
  args: {
    data: categoryData,
    size: 350,
    thickness: 30,
    innerRadius: 65,
    showCenterValue: true,
    centerValue: '340',
    centerLabel: 'Total Staff',
    showLegend: true,
    animate: true,
  },
};

export const NoGaps: Story = {
  args: {
    data: sampleData,
    size: 300,
    thickness: 60,
    innerRadius: 40,
    segmentGap: 0,
    showCenterValue: true,
    showLegend: true,
    animate: true,
  },
};

export const LargeGaps: Story = {
  args: {
    data: categoryData,
    size: 350,
    thickness: 70,
    innerRadius: 40,
    segmentGap: 15,
    showCenterValue: true,
    showLegend: true,
    animate: true,
  },
};

export const NoAnimation: Story = {
  args: {
    data: sampleData,
    size: 300,
    thickness: 60,
    innerRadius: 40,
    animate: false,
    animateLegend: false,
    showCenterValue: true,
    showLegend: true,
  },
};

export const NoLegend: Story = {
  args: {
    data: sampleData,
    size: 300,
    thickness: 60,
    innerRadius: 40,
    showLegend: false,
    showCenterValue: true,
    centerValue: '100',
    centerLabel: 'Users',
    showLabels: true,
    animate: true,
  },
};

export const PercentageDisplay: Story = {
  args: {
    data: [
      { label: 'Completed', value: 65 },
      { label: 'In Progress', value: 25 },
      { label: 'Not Started', value: 10 },
    ],
    size: 320,
    thickness: 65,
    innerRadius: 40,
    showCenterValue: true,
    centerValue: '65%',
    centerLabel: 'Complete',
    showLegend: true,
    showValues: true,
    animate: true,
    formatValue: (value, total) => `${Math.round((value / total) * 100)}%`,
  },
};

export const ManySegments: Story = {
  args: {
    data: [
      { label: 'Segment A', value: 20 },
      { label: 'Segment B', value: 15 },
      { label: 'Segment C', value: 25 },
      { label: 'Segment D', value: 10 },
      { label: 'Segment E', value: 8 },
      { label: 'Segment F', value: 12 },
      { label: 'Segment G', value: 5 },
      { label: 'Segment H', value: 5 },
    ],
    size: 400,
    thickness: 80,
    innerRadius: 35,
    showCenterValue: true,
    showLegend: true,
    segmentGap: 4,
    animate: true,
  },
};

export const SemiCircleDetailed: Story = {
  args: {
    data: [
      { label: 'CPU', value: 45 },
      { label: 'Memory', value: 78 },
      { label: 'Disk', value: 62 },
      { label: 'Network', value: 34 },
    ],
    variant: 'detailed',
    type: 'semi',
    size: 400,
    thickness: 90,
    innerRadius: 30,
    showCenterValue: true,
    centerValue: '54.75',
    centerLabel: 'Avg Usage %',
    showLegend: true,
    showValues: true,
    animate: true,
  },
};