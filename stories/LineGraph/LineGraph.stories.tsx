import type { Meta, StoryObj } from '@storybook/react';
import { LineGraph } from './LineGraph';

const meta = {
  title: 'Data Display/LineGraph',
  component: LineGraph,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Data series to display',
    },
    width: {
      control: { type: 'range', min: 400, max: 800, step: 50 },
      description: 'Width of the graph in pixels',
    },
    height: {
      control: { type: 'range', min: 300, max: 600, step: 50 },
      description: 'Height of the graph in pixels',
    },
    showAxes: {
      control: 'boolean',
      description: 'Show axes',
    },
    showGrid: {
      control: 'boolean',
      description: 'Show grid lines',
    },
    showLegend: {
      control: 'boolean',
      description: 'Show legend',
    },
    showPoints: {
      control: 'boolean',
      description: 'Show data points',
    },
    showValues: {
      control: 'boolean',
      description: 'Show values on hover',
    },
    animate: {
      control: 'boolean',
      description: 'Animate on mount',
    },
    strokeWidth: {
      control: { type: 'range', min: 1, max: 5, step: 1 },
      description: 'Line width',
    },
    pointRadius: {
      control: { type: 'range', min: 2, max: 8, step: 1 },
      description: 'Point radius',
    },
    curve: {
      control: 'radio',
      options: ['linear', 'smooth', 'step'],
      description: 'Curve type',
    },
    fill: {
      control: 'boolean',
      description: 'Fill area under line',
    },
    fillOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Fill opacity',
    },
    variant: {
      control: 'radio',
      options: ['default', 'minimal', 'detailed', 'interactive'],
      description: 'Visual variant',
    },
    xLabel: {
      control: 'text',
      description: 'X-axis label',
    },
    yLabel: {
      control: 'text',
      description: 'Y-axis label',
    },
    title: {
      control: 'text',
      description: 'Graph title',
    },
  },
} satisfies Meta<typeof LineGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

// Generate sample data
const generateTimeSeries = (points: number, startValue: number = 50, volatility: number = 10) => {
  const data = [];
  let value = startValue;
  
  for (let i = 0; i < points; i++) {
    value += (Math.random() - 0.5) * volatility;
    value = Math.max(0, value);
    data.push({
      x: i,
      y: value,
    });
  }
  
  return data;
};

const generateSinWave = (points: number, amplitude: number = 30, frequency: number = 1, phase: number = 0) => {
  const data = [];
  
  for (let i = 0; i < points; i++) {
    const x = i;
    const y = amplitude * Math.sin((i / points) * Math.PI * 2 * frequency + phase) + amplitude;
    data.push({ x, y });
  }
  
  return data;
};

// Sample data
const singleSeries = {
  name: 'Revenue',
  data: generateTimeSeries(20, 100, 15),
};

const multiSeries = [
  {
    name: 'Product A',
    data: generateTimeSeries(20, 80, 10),
    color: '#8b2c2c',
  },
  {
    name: 'Product B',
    data: generateTimeSeries(20, 60, 8),
    color: '#6b3030',
  },
  {
    name: 'Product C',
    data: generateTimeSeries(20, 40, 12),
    color: '#4a4a4a',
  },
];

const sinWaves = [
  {
    name: 'Wave 1',
    data: generateSinWave(50, 30, 1, 0),
    color: '#8b2c2c',
  },
  {
    name: 'Wave 2',
    data: generateSinWave(50, 25, 1.5, Math.PI / 4),
    color: '#6b3030',
  },
  {
    name: 'Wave 3',
    data: generateSinWave(50, 20, 2, Math.PI / 2),
    color: '#7a7a7a',
  },
];

export const Default: Story = {
  args: {
    data: singleSeries,
    width: 600,
    height: 400,
    showAxes: true,
    showGrid: false,
    showPoints: true,
    animate: true,
    strokeWidth: 2,
    pointRadius: 4,
    curve: 'linear',
  },
};

export const MultiLine: Story = {
  args: {
    data: multiSeries,
    width: 650,
    height: 450,
    showAxes: true,
    showGrid: true,
    showLegend: true,
    showPoints: true,
    animate: true,
    strokeWidth: 2,
    pointRadius: 3,
    curve: 'smooth',
    title: 'Product Performance',
    xLabel: 'Time',
    yLabel: 'Sales',
  },
};

export const SmoothCurves: Story = {
  args: {
    data: sinWaves,
    width: 700,
    height: 400,
    showAxes: true,
    showGrid: false,
    showLegend: true,
    showPoints: false,
    animate: true,
    strokeWidth: 2,
    curve: 'smooth',
    title: 'Waveform Analysis',
  },
};

export const StepChart: Story = {
  args: {
    data: {
      name: 'Stock Price',
      data: generateTimeSeries(15, 150, 20),
    },
    width: 600,
    height: 400,
    showAxes: true,
    showGrid: true,
    showPoints: true,
    animate: true,
    strokeWidth: 2,
    pointRadius: 3,
    curve: 'step',
    title: 'Stock Price Movement',
    xLabel: 'Day',
    yLabel: 'Price ($)',
  },
};

export const FilledArea: Story = {
  args: {
    data: {
      name: 'Temperature',
      data: generateSinWave(30, 15, 1, 0).map(p => ({ ...p, y: p.y + 10 })),
    },
    width: 600,
    height: 400,
    showAxes: true,
    showGrid: false,
    showPoints: false,
    animate: true,
    strokeWidth: 2,
    curve: 'smooth',
    fill: true,
    fillOpacity: 0.3,
    title: 'Temperature Over Time',
    xLabel: 'Hour',
    yLabel: 'Temperature (°C)',
  },
};

export const MultipleWithFill: Story = {
  args: {
    data: [
      {
        name: 'Income',
        data: generateTimeSeries(20, 120, 10).map((p, i) => ({ x: i, y: p.y })),
        color: '#50fa7b',
      },
      {
        name: 'Expenses',
        data: generateTimeSeries(20, 80, 8).map((p, i) => ({ x: i, y: p.y })),
        color: '#ff5555',
      },
    ],
    width: 650,
    height: 450,
    showAxes: true,
    showGrid: true,
    showLegend: true,
    showPoints: false,
    animate: true,
    strokeWidth: 2,
    curve: 'smooth',
    fill: true,
    fillOpacity: 0.2,
    title: 'Financial Overview',
    xLabel: 'Month',
    yLabel: 'Amount ($k)',
  },
};

export const Interactive: Story = {
  args: {
    data: multiSeries,
    variant: 'interactive',
    width: 650,
    height: 450,
    showAxes: true,
    showLegend: true,
    showPoints: true,
    showValues: true,
    animate: true,
    strokeWidth: 2,
    pointRadius: 4,
    curve: 'smooth',
    onPointClick: (point, series) => {
      console.log(`Clicked point in ${series}: (${point.x}, ${point.y})`);
    },
  },
};

export const Minimal: Story = {
  args: {
    data: singleSeries,
    variant: 'minimal',
    width: 500,
    height: 300,
    curve: 'smooth',
    animate: false,
  },
};

export const Detailed: Story = {
  args: {
    data: multiSeries,
    variant: 'detailed',
    width: 700,
    height: 500,
    curve: 'smooth',
    fill: true,
    fillOpacity: 0.1,
    title: 'Detailed Analytics',
    xLabel: 'Time Period',
    yLabel: 'Value',
  },
};

export const NoPoints: Story = {
  args: {
    data: sinWaves,
    width: 600,
    height: 400,
    showAxes: true,
    showGrid: false,
    showLegend: true,
    showPoints: false,
    animate: true,
    strokeWidth: 3,
    curve: 'smooth',
  },
};

export const NoAnimation: Story = {
  args: {
    data: multiSeries,
    width: 600,
    height: 400,
    showAxes: true,
    showGrid: true,
    showLegend: true,
    showPoints: true,
    animate: false,
    animateLegend: false,
    strokeWidth: 2,
    pointRadius: 4,
    curve: 'linear',
  },
};

export const CustomDomain: Story = {
  args: {
    data: {
      name: 'Bounded Data',
      data: generateTimeSeries(20, 50, 10),
    },
    width: 600,
    height: 400,
    xDomain: [0, 30],
    yDomain: [0, 100],
    showAxes: true,
    showGrid: true,
    showPoints: true,
    animate: true,
    strokeWidth: 2,
    pointRadius: 4,
    curve: 'linear',
    title: 'Custom Domain Range',
  },
};

export const Growth: Story = {
  args: {
    data: {
      name: 'User Growth',
      data: Array.from({ length: 30 }, (_, i) => ({
        x: i,
        y: Math.pow(1.15, i) * 10,
      })),
    },
    width: 650,
    height: 450,
    showAxes: true,
    showGrid: true,
    showPoints: false,
    animate: true,
    strokeWidth: 2,
    curve: 'smooth',
    fill: true,
    fillOpacity: 0.2,
    title: 'Exponential Growth',
    xLabel: 'Month',
    yLabel: 'Users (thousands)',
  },
};

export const Comparison: Story = {
  args: {
    data: [
      {
        name: 'Actual',
        data: generateTimeSeries(20, 75, 12),
        color: '#8b2c2c',
      },
      {
        name: 'Predicted',
        data: generateTimeSeries(20, 75, 5).map((p, i) => ({ x: p.x, y: p.y + i * 2 })),
        color: '#4a4a4a',
      },
    ],
    width: 650,
    height: 450,
    showAxes: true,
    showGrid: true,
    showLegend: true,
    showPoints: false,
    animate: true,
    strokeWidth: 2,
    curve: 'smooth',
    title: 'Actual vs Predicted',
    xLabel: 'Time',
    yLabel: 'Value',
  },
};

export const Seasonal: Story = {
  args: {
    data: {
      name: 'Seasonal Pattern',
      data: Array.from({ length: 48 }, (_, i) => ({
        x: i,
        y: 50 + 30 * Math.sin((i / 12) * Math.PI * 2) + (Math.random() - 0.5) * 10,
      })),
    },
    width: 700,
    height: 400,
    showAxes: true,
    showGrid: false,
    showPoints: false,
    animate: true,
    strokeWidth: 2,
    curve: 'smooth',
    fill: true,
    fillOpacity: 0.15,
    title: 'Seasonal Trends',
    xLabel: 'Month',
    yLabel: 'Activity Level',
    formatX: (v) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months[Math.floor(v) % 12];
    },
  },
};