import type { Meta, StoryObj } from '@storybook/react';
import { StreamGraph } from './StreamGraph';

const meta = {
  title: 'Data Display/StreamGraph',
  component: StreamGraph,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of data points with x and series values',
    },
    keys: {
      control: 'object',
      description: 'Keys for the data series to display',
    },
    colors: {
      control: 'object',
      description: 'Colors for each series',
    },
    width: {
      control: { type: 'range', min: 300, max: 800, step: 50 },
      description: 'Width of the graph in pixels',
    },
    height: {
      control: { type: 'range', min: 200, max: 600, step: 50 },
      description: 'Height of the graph in pixels',
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
    showLegend: {
      control: 'boolean',
      description: 'Show legend',
    },
    animate: {
      control: 'boolean',
      description: 'Animate streams on mount',
    },
    animateLegend: {
      control: 'boolean',
      description: 'Animate legend expand on mount',
    },
    curve: {
      control: 'radio',
      options: ['linear', 'smooth', 'step'],
      description: 'Curve type for streams',
    },
    offset: {
      control: 'radio',
      options: ['silhouette', 'wiggle', 'expand', 'zero'],
      description: 'Stream offset type',
    },
    variant: {
      control: 'radio',
      options: ['default', 'minimal', 'detailed', 'interactive'],
      description: 'Visual variant',
    },
    gridColor: {
      control: 'color',
      description: 'Grid line color',
    },
  },
} satisfies Meta<typeof StreamGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

// Generate sample time series data
const generateTimeSeriesData = (points: number = 20) => {
  return Array.from({ length: points }, (_, i) => ({
    x: `${i * 5}`,
    series1: Math.sin(i * 0.3) * 20 + 30 + Math.random() * 10,
    series2: Math.cos(i * 0.2) * 15 + 25 + Math.random() * 8,
    series3: Math.sin(i * 0.4) * 10 + 20 + Math.random() * 5,
    series4: Math.cos(i * 0.35) * 12 + 18 + Math.random() * 6,
  }));
};

const timeSeriesData = generateTimeSeriesData();

export const Default: Story = {
  args: {
    data: timeSeriesData,
    keys: ['series1', 'series2', 'series3', 'series4'],
    width: 600,
    height: 400,
    showGrid: true,
    showLabels: true,
    showLegend: true,
    animate: true,
    curve: 'smooth',
    offset: 'silhouette',
  },
};

export const Minimal: Story = {
  args: {
    data: timeSeriesData,
    keys: ['series1', 'series2', 'series3'],
    variant: 'minimal',
    width: 500,
    height: 300,
    curve: 'smooth',
    offset: 'silhouette',
  },
};

export const Detailed: Story = {
  args: {
    data: timeSeriesData,
    keys: ['series1', 'series2', 'series3', 'series4'],
    variant: 'detailed',
    width: 650,
    height: 450,
    curve: 'smooth',
    offset: 'silhouette',
  },
};

export const LinearCurve: Story = {
  args: {
    data: timeSeriesData.slice(0, 10),
    keys: ['series1', 'series2', 'series3'],
    width: 600,
    height: 350,
    curve: 'linear',
    offset: 'silhouette',
  },
};

export const StepCurve: Story = {
  args: {
    data: timeSeriesData.slice(0, 12),
    keys: ['series1', 'series2', 'series3'],
    width: 600,
    height: 350,
    curve: 'step',
    offset: 'silhouette',
  },
};

export const WiggleOffset: Story = {
  args: {
    data: timeSeriesData,
    keys: ['series1', 'series2', 'series3', 'series4'],
    width: 600,
    height: 400,
    offset: 'wiggle',
    curve: 'smooth',
  },
};

export const ExpandOffset: Story = {
  args: {
    data: timeSeriesData,
    keys: ['series1', 'series2', 'series3', 'series4'],
    width: 600,
    height: 400,
    offset: 'expand',
    curve: 'smooth',
    formatLabel: (value) => `${value}%`,
  },
};

export const ZeroOffset: Story = {
  args: {
    data: timeSeriesData,
    keys: ['series1', 'series2', 'series3', 'series4'],
    width: 600,
    height: 400,
    offset: 'zero',
    curve: 'smooth',
  },
};

// Monthly data example
const monthlyData = [
  { x: 'Jan', desktop: 45, mobile: 35, tablet: 20 },
  { x: 'Feb', desktop: 50, mobile: 40, tablet: 22 },
  { x: 'Mar', desktop: 48, mobile: 45, tablet: 25 },
  { x: 'Apr', desktop: 52, mobile: 48, tablet: 28 },
  { x: 'May', desktop: 55, mobile: 52, tablet: 30 },
  { x: 'Jun', desktop: 58, mobile: 55, tablet: 32 },
  { x: 'Jul', desktop: 60, mobile: 58, tablet: 35 },
  { x: 'Aug', desktop: 62, mobile: 60, tablet: 38 },
  { x: 'Sep', desktop: 58, mobile: 62, tablet: 40 },
  { x: 'Oct', desktop: 55, mobile: 65, tablet: 42 },
  { x: 'Nov', desktop: 52, mobile: 68, tablet: 45 },
  { x: 'Dec', desktop: 50, mobile: 70, tablet: 48 },
];

export const MonthlyTraffic: Story = {
  args: {
    data: monthlyData,
    keys: ['desktop', 'mobile', 'tablet'],
    colors: ['#5a5a5a', '#8e8e90', '#3a3a3a'],
    width: 650,
    height: 400,
    showGrid: true,
    showLabels: true,
    showLegend: true,
    curve: 'smooth',
    offset: 'silhouette',
  },
};

// Product sales data
const productData = Array.from({ length: 24 }, (_, i) => ({
  x: `Q${Math.floor(i / 6) + 1} ${2020 + Math.floor(i / 6)}`,
  productA: Math.random() * 100 + 50,
  productB: Math.random() * 80 + 40,
  productC: Math.random() * 60 + 30,
  productD: Math.random() * 40 + 20,
  productE: Math.random() * 30 + 10,
}));

export const ProductSales: Story = {
  args: {
    data: productData,
    keys: ['productA', 'productB', 'productC', 'productD', 'productE'],
    colors: ['#2a2a2a', '#3a3a3a', '#4a4a4a', '#5a5a5a', '#6a6a6a'],
    width: 700,
    height: 450,
    offset: 'expand',
    curve: 'smooth',
    showGrid: true,
    gridLines: 4,
  },
};

export const CustomColors: Story = {
  args: {
    data: timeSeriesData.slice(0, 15),
    keys: ['series1', 'series2', 'series3'],
    colors: ['#ff5555', '#f1fa8c', '#50fa7b'],
    width: 600,
    height: 350,
    curve: 'smooth',
    offset: 'silhouette',
  },
};

export const NoAnimation: Story = {
  args: {
    data: timeSeriesData,
    keys: ['series1', 'series2', 'series3', 'series4'],
    width: 600,
    height: 400,
    animate: false,
    animateLegend: false,
    curve: 'smooth',
    offset: 'silhouette',
  },
};

export const NoLegendAnimation: Story = {
  args: {
    data: monthlyData,
    keys: ['desktop', 'mobile', 'tablet'],
    width: 600,
    height: 400,
    animate: true,
    animateLegend: false,
    curve: 'smooth',
    offset: 'silhouette',
    showLegend: true,
  },
};

export const LargeDataset: Story = {
  args: {
    data: generateTimeSeriesData(50),
    keys: ['series1', 'series2', 'series3', 'series4'],
    width: 700,
    height: 400,
    showGrid: true,
    gridLines: 8,
    curve: 'smooth',
    offset: 'silhouette',
  },
};

export const TwoSeries: Story = {
  args: {
    data: timeSeriesData,
    keys: ['series1', 'series2'],
    colors: ['#3a3a3a', '#6a6a6a'],
    width: 600,
    height: 350,
    curve: 'smooth',
    offset: 'silhouette',
  },
};

export const Interactive: Story = {
  args: {
    data: monthlyData,
    keys: ['desktop', 'mobile', 'tablet'],
    variant: 'interactive',
    width: 650,
    height: 400,
    showGrid: true,
    showLabels: true,
    showLegend: true,
    curve: 'smooth',
    offset: 'silhouette',
    onLayerClick: (key, index) => {
      console.log(`Clicked layer: ${key} (index: ${index})`);
    },
  },
};

export const InteractiveExpanded: Story = {
  args: {
    data: timeSeriesData,
    keys: ['series1', 'series2', 'series3', 'series4'],
    variant: 'interactive',
    width: 700,
    height: 450,
    offset: 'expand',
    curve: 'smooth',
    showGrid: true,
    gridLines: 5,
    onLayerClick: (key) => {
      console.log(`Selected: ${key}`);
    },
  },
};

export const InteractiveProducts: Story = {
  args: {
    data: productData.slice(0, 12),
    keys: ['productA', 'productB', 'productC', 'productD'],
    variant: 'interactive',
    width: 650,
    height: 400,
    curve: 'smooth',
    offset: 'wiggle',
    showGrid: true,
    showLabels: true,
    showLegend: true,
    onLayerClick: (key) => {
      alert(`Product selected: ${key}`);
    },
  },
};
