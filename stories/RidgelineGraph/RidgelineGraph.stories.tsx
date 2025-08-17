import type { Meta, StoryObj } from '@storybook/react';
import { RidgelineGraph } from './RidgelineGraph';

const meta = {
  title: 'Data Display/RidgelineGraph',
  component: RidgelineGraph,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of data series with labels and values',
    },
    width: {
      control: { type: 'range', min: 400, max: 800, step: 50 },
      description: 'Width of the graph in pixels',
    },
    height: {
      control: { type: 'range', min: 300, max: 600, step: 50 },
      description: 'Height of the graph in pixels',
    },
    ridgeHeight: {
      control: { type: 'range', min: 40, max: 100, step: 10 },
      description: 'Height of each ridge',
    },
    overlap: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Overlap between ridges (0-1)',
    },
    curve: {
      control: 'radio',
      options: ['linear', 'smooth', 'step'],
      description: 'Curve type for ridges',
    },
    colors: {
      control: 'object',
      description: 'Colors for ridges',
    },
    showAxes: {
      control: 'boolean',
      description: 'Show axes',
    },
    showGrid: {
      control: 'boolean',
      description: 'Show grid lines',
    },
    showLabels: {
      control: 'boolean',
      description: 'Show ridge labels',
    },
    showValues: {
      control: 'boolean',
      description: 'Show values on hover',
    },
    animate: {
      control: 'boolean',
      description: 'Animate ridges on mount',
    },
    fill: {
      control: 'boolean',
      description: 'Fill ridges',
    },
    fillOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Fill opacity',
    },
    strokeWidth: {
      control: { type: 'range', min: 1, max: 5, step: 1 },
      description: 'Stroke width',
    },
    variant: {
      control: 'radio',
      options: ['default', 'minimal', 'detailed', 'interactive', 'scrolling'],
      description: 'Visual variant',
    },
    xLabels: {
      control: 'object',
      description: 'X-axis labels',
    },
    yLabel: {
      control: 'text',
      description: 'Y-axis label',
    },
    title: {
      control: 'text',
      description: 'Graph title',
    },
    maxRidges: {
      control: { type: 'range', min: 5, max: 20, step: 1 },
      description: 'Maximum ridges for scrolling variant',
    },
    scrollInterval: {
      control: { type: 'range', min: 500, max: 5000, step: 500 },
      description: 'Scroll interval in ms',
    },
  },
} satisfies Meta<typeof RidgelineGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

// Generate sample distribution data
const generateDistribution = (label: string, count: number, mean: number, stdDev: number) => {
  const values = [];
  for (let i = 0; i < count; i++) {
    const x = (i / count) * 10 - 5;
    const value = Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2))) / (stdDev * Math.sqrt(2 * Math.PI));
    values.push(value * 10); // Scale for visibility
  }
  return { label, values };
};

// Generate time series data
const generateTimeSeries = (label: string, count: number, amplitude: number, frequency: number, noise: number) => {
  const values = [];
  for (let i = 0; i < count; i++) {
    const base = amplitude * Math.sin((i / count) * Math.PI * 2 * frequency);
    const randomNoise = (Math.random() - 0.5) * noise;
    values.push(Math.max(0, base + amplitude + randomNoise));
  }
  return { label, values };
};

// Sample data for different stories
const distributionData = [
  generateDistribution('Category A', 50, -2, 1),
  generateDistribution('Category B', 50, -1, 0.8),
  generateDistribution('Category C', 50, 0, 1.2),
  generateDistribution('Category D', 50, 1, 0.9),
  generateDistribution('Category E', 50, 2, 1.1),
];

const timeSeriesData = [
  generateTimeSeries('Sensor 1', 60, 3, 2, 1),
  generateTimeSeries('Sensor 2', 60, 2.5, 3, 0.8),
  generateTimeSeries('Sensor 3', 60, 3.5, 1.5, 1.2),
  generateTimeSeries('Sensor 4', 60, 2, 2.5, 0.6),
  generateTimeSeries('Sensor 5', 60, 4, 1, 1.5),
];

const monthlyData = [
  { label: 'January', values: [2, 3, 5, 7, 6, 4, 3, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 3, 4] },
  { label: 'February', values: [3, 4, 6, 8, 7, 5, 4, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 4, 5] },
  { label: 'March', values: [4, 5, 7, 9, 8, 6, 5, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 5, 6] },
  { label: 'April', values: [5, 6, 8, 10, 9, 7, 6, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 6, 7] },
  { label: 'May', values: [6, 7, 9, 11, 10, 8, 7, 6, 7, 8, 9, 10, 11, 10, 9, 8, 7, 6, 7, 8] },
];

export const Default: Story = {
  args: {
    data: distributionData,
    width: 600,
    height: 400,
    ridgeHeight: 60,
    overlap: 0.6,
    curve: 'smooth',
    showAxes: true,
    showLabels: true,
    animate: true,
    fill: true,
    fillOpacity: 0.7,
    strokeWidth: 2,
  },
};

export const TimeSeries: Story = {
  args: {
    data: timeSeriesData,
    width: 650,
    height: 450,
    ridgeHeight: 70,
    overlap: 0.5,
    curve: 'smooth',
    showAxes: true,
    showGrid: true,
    showLabels: true,
    animate: true,
    fill: true,
    title: 'Sensor Readings Over Time',
    xLabels: ['0s', '10s', '20s', '30s', '40s', '50s', '60s'],
    yLabel: 'Sensors',
  },
};

export const Interactive: Story = {
  args: {
    data: distributionData,
    variant: 'interactive',
    width: 650,
    height: 450,
    ridgeHeight: 65,
    overlap: 0.6,
    curve: 'smooth',
    showAxes: true,
    showLabels: true,
    showValues: true,
    animate: true,
    fill: true,
    onRidgeClick: (series, index) => {
      console.log(`Clicked ridge: ${series.label} at index ${index}`);
    },
  },
};

export const Scrolling: Story = {
  args: {
    data: [
      generateTimeSeries('Stream 1', 40, 2, 2, 0.5),
      generateTimeSeries('Stream 2', 40, 2.5, 1.5, 0.6),
      generateTimeSeries('Stream 3', 40, 3, 2.5, 0.7),
    ],
    variant: 'scrolling',
    width: 700,
    height: 500,
    ridgeHeight: 50,
    overlap: 0.7,
    curve: 'smooth',
    maxRidges: 8,
    scrollInterval: 2000,
    generateNewData: () => {
      const amplitude = 2 + Math.random() * 2;
      const frequency = 1 + Math.random() * 2;
      const noise = 0.5 + Math.random() * 0.5;
      return generateTimeSeries(`Stream ${Date.now()}`, 40, amplitude, frequency, noise);
    },
    title: 'Live Data Stream',
    showAxes: true,
    showLabels: true,
    animate: true,
    fill: true,
  },
};

export const Minimal: Story = {
  args: {
    data: distributionData.slice(0, 3),
    variant: 'minimal',
    width: 500,
    height: 300,
    ridgeHeight: 50,
    overlap: 0.5,
    curve: 'linear',
    fill: true,
    fillOpacity: 0.5,
    strokeWidth: 1,
  },
};

export const Detailed: Story = {
  args: {
    data: monthlyData,
    variant: 'detailed',
    width: 700,
    height: 500,
    ridgeHeight: 70,
    overlap: 0.6,
    curve: 'smooth',
    showAxes: true,
    showGrid: true,
    showLabels: true,
    showValues: true,
    animate: true,
    fill: true,
    title: 'Monthly Activity Patterns',
    xLabels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    yLabel: 'Months',
  },
};

export const LinearCurve: Story = {
  args: {
    data: timeSeriesData,
    width: 600,
    height: 400,
    ridgeHeight: 60,
    overlap: 0.5,
    curve: 'linear',
    showAxes: true,
    showLabels: true,
    animate: true,
    fill: true,
    fillOpacity: 0.6,
    strokeWidth: 2,
    title: 'Linear Interpolation',
  },
};

export const StepCurve: Story = {
  args: {
    data: monthlyData.slice(0, 3),
    width: 600,
    height: 350,
    ridgeHeight: 60,
    overlap: 0.4,
    curve: 'step',
    showAxes: true,
    showLabels: true,
    animate: true,
    fill: true,
    fillOpacity: 0.5,
    strokeWidth: 2,
    title: 'Step Function',
  },
};

export const HighOverlap: Story = {
  args: {
    data: distributionData,
    width: 600,
    height: 400,
    ridgeHeight: 60,
    overlap: 0.9,
    curve: 'smooth',
    showAxes: true,
    showLabels: true,
    animate: true,
    fill: true,
    fillOpacity: 0.5,
    strokeWidth: 2,
    title: 'High Overlap',
  },
};

export const NoOverlap: Story = {
  args: {
    data: distributionData.slice(0, 3),
    width: 600,
    height: 400,
    ridgeHeight: 80,
    overlap: 0,
    curve: 'smooth',
    showAxes: true,
    showLabels: true,
    animate: true,
    fill: true,
    fillOpacity: 0.7,
    strokeWidth: 2,
    title: 'No Overlap',
  },
};

export const NoFill: Story = {
  args: {
    data: timeSeriesData,
    width: 600,
    height: 400,
    ridgeHeight: 60,
    overlap: 0.6,
    curve: 'smooth',
    showAxes: true,
    showLabels: true,
    animate: true,
    fill: false,
    strokeWidth: 3,
    title: 'Line Only',
  },
};

export const CustomColors: Story = {
  args: {
    data: distributionData,
    width: 600,
    height: 400,
    ridgeHeight: 60,
    overlap: 0.6,
    curve: 'smooth',
    colors: ['#ff5555', '#ff7979', '#ff9999', '#ffbbbb', '#ffdddd'],
    showAxes: true,
    showLabels: true,
    animate: true,
    fill: true,
    fillOpacity: 0.7,
    strokeWidth: 2,
    title: 'Custom Color Scheme',
  },
};

export const LargeDataset: Story = {
  args: {
    data: Array.from({ length: 10 }, (_, i) => 
      generateDistribution(`Ridge ${i + 1}`, 100, (i - 5) * 0.5, 0.8 + Math.random() * 0.4)
    ),
    width: 700,
    height: 600,
    ridgeHeight: 50,
    overlap: 0.7,
    curve: 'smooth',
    showAxes: true,
    showLabels: true,
    animate: true,
    fill: true,
    fillOpacity: 0.6,
    strokeWidth: 1,
    title: 'Large Dataset',
  },
};

export const NoAnimation: Story = {
  args: {
    data: distributionData,
    width: 600,
    height: 400,
    ridgeHeight: 60,
    overlap: 0.6,
    curve: 'smooth',
    showAxes: true,
    showLabels: true,
    animate: false,
    fill: true,
    fillOpacity: 0.7,
    strokeWidth: 2,
  },
};

export const PeakComparison: Story = {
  args: {
    data: [
      generateDistribution('Low Peak', 50, 0, 2),
      generateDistribution('Medium Peak', 50, 0, 1),
      generateDistribution('High Peak', 50, 0, 0.5),
      generateDistribution('Bimodal', 50, 0, 1),
    ].map((series, i) => {
      if (i === 3) {
        // Add second peak for bimodal
        const secondPeak = generateDistribution('', 50, 2, 0.7);
        series.values = series.values.map((v, j) => v + secondPeak.values[j] * 0.8);
      }
      return series;
    }),
    width: 650,
    height: 450,
    ridgeHeight: 70,
    overlap: 0.5,
    curve: 'smooth',
    showAxes: true,
    showGrid: true,
    showLabels: true,
    animate: true,
    fill: true,
    fillOpacity: 0.6,
    strokeWidth: 2,
    title: 'Distribution Comparison',
  },
};

export const ActivityPattern: Story = {
  args: {
    data: [
      { label: 'Monday', values: [1, 2, 2, 3, 5, 7, 8, 9, 8, 7, 8, 9, 10, 9, 8, 7, 6, 7, 8, 6, 5, 4, 3, 2] },
      { label: 'Tuesday', values: [1, 2, 2, 3, 5, 7, 9, 10, 9, 8, 9, 10, 11, 10, 9, 8, 7, 8, 9, 7, 5, 4, 3, 2] },
      { label: 'Wednesday', values: [1, 2, 2, 3, 5, 7, 8, 9, 8, 7, 8, 9, 10, 9, 8, 7, 6, 7, 8, 6, 5, 4, 3, 2] },
      { label: 'Thursday', values: [1, 2, 2, 3, 5, 7, 9, 10, 9, 8, 9, 10, 11, 10, 9, 8, 7, 8, 9, 7, 5, 4, 3, 2] },
      { label: 'Friday', values: [1, 2, 2, 3, 5, 7, 8, 9, 8, 7, 8, 9, 10, 9, 8, 7, 6, 8, 10, 11, 10, 8, 5, 3] },
      { label: 'Saturday', values: [2, 3, 3, 4, 4, 5, 6, 7, 8, 9, 10, 11, 11, 10, 9, 8, 7, 8, 9, 8, 7, 6, 5, 3] },
      { label: 'Sunday', values: [3, 4, 4, 5, 5, 6, 6, 7, 8, 9, 10, 10, 10, 9, 8, 7, 6, 6, 5, 4, 3, 3, 2, 2] },
    ],
    width: 700,
    height: 500,
    ridgeHeight: 60,
    overlap: 0.6,
    curve: 'smooth',
    colors: ['#4a4a4a', '#4a4a4a', '#4a4a4a', '#4a4a4a', '#4a4a4a', '#8b2c2c', '#8b2c2c'],
    showAxes: true,
    showLabels: true,
    animate: true,
    fill: true,
    fillOpacity: 0.7,
    strokeWidth: 2,
    title: 'Weekly Activity Pattern',
    xLabels: ['00:00', '06:00', '12:00', '18:00', '24:00'],
    yLabel: 'Day of Week',
  },
};