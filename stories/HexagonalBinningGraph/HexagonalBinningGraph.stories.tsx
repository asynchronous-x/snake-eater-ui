import type { Meta, StoryObj } from '@storybook/react';
import { HexagonalBinningGraph } from './HexagonalBinningGraph';

const meta = {
  title: 'Data Display/HexagonalBinningGraph',
  component: HexagonalBinningGraph,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of data points with x and y coordinates',
    },
    width: {
      control: { type: 'range', min: 400, max: 800, step: 50 },
      description: 'Width of the graph in pixels',
    },
    height: {
      control: { type: 'range', min: 300, max: 600, step: 50 },
      description: 'Height of the graph in pixels',
    },
    hexRadius: {
      control: { type: 'range', min: 8, max: 20, step: 2 },
      description: 'Hexagon radius in pixels',
    },
    xDomain: {
      control: 'object',
      description: 'X-axis range [min, max]',
    },
    yDomain: {
      control: 'object',
      description: 'Y-axis range [min, max]',
    },
    colors: {
      control: 'object',
      description: 'Color scale for density',
    },
    showAxes: {
      control: 'boolean',
      description: 'Show axes',
    },
    showGrid: {
      control: 'boolean',
      description: 'Show grid lines',
    },
    showValues: {
      control: 'boolean',
      description: 'Show values in hexagons',
    },
    showLegend: {
      control: 'boolean',
      description: 'Show legend',
    },
    animate: {
      control: 'boolean',
      description: 'Animate hexagons on mount',
    },
    animateLegend: {
      control: 'boolean',
      description: 'Animate legend on mount',
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
} satisfies Meta<typeof HexagonalBinningGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

// Generate sample data
const generateScatterData = (count: number, xRange: [number, number], yRange: [number, number]) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      x: Math.random() * (xRange[1] - xRange[0]) + xRange[0],
      y: Math.random() * (yRange[1] - yRange[0]) + yRange[0],
    });
  }
  return data;
};

// Generate clustered data
const generateClusteredData = (clusters: number, pointsPerCluster: number) => {
  const data = [];
  for (let c = 0; c < clusters; c++) {
    const centerX = Math.random() * 8 + 1;
    const centerY = Math.random() * 8 + 1;
    for (let i = 0; i < pointsPerCluster; i++) {
      data.push({
        x: centerX + (Math.random() - 0.5) * 2,
        y: centerY + (Math.random() - 0.5) * 2,
      });
    }
  }
  return data;
};

// Generate normal distribution data
const generateNormalData = (count: number, meanX: number, meanY: number, stdDev: number) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    // Box-Muller transform for normal distribution
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);
    
    data.push({
      x: meanX + z0 * stdDev,
      y: meanY + z1 * stdDev,
    });
  }
  return data;
};

const scatterData = generateScatterData(500, [0, 10], [0, 10]);
const clusteredData = generateClusteredData(4, 100);
const normalData = generateNormalData(800, 5, 5, 1.5);

export const Default: Story = {
  args: {
    data: scatterData,
    width: 600,
    height: 400,
    hexRadius: 12,
    showAxes: true,
    showGrid: false,
    showLegend: true,
    animate: true,
    xLabel: 'X Axis',
    yLabel: 'Y Axis',
  },
};

export const Clustered: Story = {
  args: {
    data: clusteredData,
    width: 650,
    height: 450,
    hexRadius: 14,
    showAxes: true,
    showGrid: true,
    showLegend: true,
    animate: true,
    title: 'Clustered Data Distribution',
    xLabel: 'Variable A',
    yLabel: 'Variable B',
  },
};

export const NormalDistribution: Story = {
  args: {
    data: normalData,
    width: 600,
    height: 400,
    hexRadius: 10,
    xDomain: [0, 10],
    yDomain: [0, 10],
    showAxes: true,
    showGrid: false,
    showLegend: true,
    animate: true,
    title: 'Normal Distribution',
  },
};

export const Interactive: Story = {
  args: {
    data: clusteredData,
    variant: 'interactive',
    width: 650,
    height: 450,
    hexRadius: 14,
    showAxes: true,
    showLegend: true,
    animate: true,
    onHexClick: (bin, index) => {
      console.log(`Clicked hexagon with ${bin.count} points at (${bin.x.toFixed(1)}, ${bin.y.toFixed(1)})`);
    },
  },
};

export const Minimal: Story = {
  args: {
    data: scatterData,
    variant: 'minimal',
    width: 500,
    height: 350,
    hexRadius: 10,
    animate: false,
  },
};

export const Detailed: Story = {
  args: {
    data: clusteredData,
    variant: 'detailed',
    width: 700,
    height: 500,
    hexRadius: 16,
    showValues: true,
    title: 'Detailed Density Map',
    xLabel: 'X Coordinate',
    yLabel: 'Y Coordinate',
  },
};

export const LargeHexagons: Story = {
  args: {
    data: generateScatterData(300, [0, 10], [0, 10]),
    width: 600,
    height: 400,
    hexRadius: 20,
    showAxes: true,
    showLegend: true,
    animate: true,
  },
};

export const SmallHexagons: Story = {
  args: {
    data: generateNormalData(1000, 5, 5, 2),
    width: 600,
    height: 400,
    hexRadius: 8,
    showAxes: true,
    showLegend: true,
    animate: true,
  },
};

export const WithValues: Story = {
  args: {
    data: generateClusteredData(3, 50),
    width: 600,
    height: 400,
    hexRadius: 16,
    showAxes: true,
    showValues: true,
    showLegend: true,
    animate: true,
  },
};

export const CustomColors: Story = {
  args: {
    data: normalData,
    width: 600,
    height: 400,
    hexRadius: 12,
    colors: ['#1a1a1a', '#3a1a1a', '#5a1a1a', '#7a1a1a', '#9a1a1a', '#ff5555'],
    showAxes: true,
    showLegend: true,
    animate: true,
    title: 'Heat Map',
  },
};

export const DenseData: Story = {
  args: {
    data: generateNormalData(2000, 5, 5, 1),
    width: 650,
    height: 450,
    hexRadius: 10,
    xDomain: [0, 10],
    yDomain: [0, 10],
    showAxes: true,
    showGrid: true,
    showLegend: true,
    animate: true,
    title: 'High Density Region',
  },
};

export const SparseData: Story = {
  args: {
    data: generateScatterData(100, [0, 10], [0, 10]),
    width: 600,
    height: 400,
    hexRadius: 14,
    showAxes: true,
    showLegend: true,
    showValues: true,
    animate: true,
    title: 'Sparse Distribution',
  },
};

export const NoAnimation: Story = {
  args: {
    data: clusteredData,
    width: 600,
    height: 400,
    hexRadius: 12,
    showAxes: true,
    showLegend: true,
    animate: false,
    animateLegend: false,
  },
};

export const CorrelatedData: Story = {
  args: {
    data: Array.from({ length: 500 }, () => {
      const x = Math.random() * 10;
      const y = x * 0.8 + (Math.random() - 0.5) * 3;
      return { x, y: Math.max(0, Math.min(10, y)) };
    }),
    width: 650,
    height: 450,
    hexRadius: 12,
    showAxes: true,
    showGrid: true,
    showLegend: true,
    animate: true,
    title: 'Correlated Variables',
    xLabel: 'Independent Variable',
    yLabel: 'Dependent Variable',
  },
};

export const MultiModal: Story = {
  args: {
    data: [
      ...generateNormalData(300, 3, 3, 0.8),
      ...generateNormalData(300, 7, 7, 0.8),
      ...generateNormalData(200, 3, 7, 0.6),
      ...generateNormalData(200, 7, 3, 0.6),
    ],
    width: 700,
    height: 500,
    hexRadius: 11,
    xDomain: [0, 10],
    yDomain: [0, 10],
    showAxes: true,
    showLegend: true,
    animate: true,
    title: 'Multi-Modal Distribution',
  },
};