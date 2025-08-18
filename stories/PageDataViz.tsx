import React, { useState } from 'react';
import { Button } from './Button/Button';
import { Card } from './Card/Card';
import { Badge } from './Badge/Badge';
import { Heading } from './Heading/Heading';
import { Text } from './Text/Text';
import { Tabs } from './Tabs/Tabs';
import { LineGraph } from './LineGraph/LineGraph';
import { BarGraph } from './BarGraph/BarGraph';
import { DonutGraph } from './DonutGraph/DonutGraph';
import { StreamGraph } from './StreamGraph/StreamGraph';
import { HexagonalBinningGraph } from './HexagonalBinningGraph/HexagonalBinningGraph';
import { RidgelineGraph } from './RidgelineGraph/RidgelineGraph';
import { SpiderGraph } from './SpiderGraph/SpiderGraph';
import './page.css';

export const PageDataViz: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Multi-line data for comparison
  const comparisonData = [
    {
      name: 'Actual',
      data: Array.from({ length: 30 }, (_, i) => ({
        x: i,
        y: 50 + Math.sin(i / 5) * 20 + Math.random() * 10,
      })),
      color: '#8b2c2c',
    },
    {
      name: 'Predicted',
      data: Array.from({ length: 30 }, (_, i) => ({
        x: i,
        y: 50 + Math.sin(i / 5) * 20 + 5,
      })),
      color: '#4a4a4a',
    },
    {
      name: 'Baseline',
      data: Array.from({ length: 30 }, (_, i) => ({
        x: i,
        y: 50,
      })),
      color: '#7a7a7a',
    },
  ];

  // Stream data for flow visualization
  const streamData = Array.from({ length: 12 }, (_, i) => ({
    x: i,
    Frontend: 10 + i * 3.5 + Math.random() * 5,
    Backend: 8 + i * 3 + Math.random() * 4,
    Database: 5 + i * 2.5 + Math.random() * 3,
    Cache: 3 + i * 2 + Math.random() * 2,
    CDN: 2 + i * 1.8 + Math.random() * 2,
  }));
  
  const streamKeys = ['Frontend', 'Backend', 'Database', 'Cache', 'CDN'];

  // Hexbin data for density
  const generateScatterData = (count: number) => {
    const data = [];
    // Create clusters
    const clusters = [
      { x: 3, y: 3, spread: 1.5 },
      { x: 7, y: 7, spread: 1.2 },
      { x: 3, y: 7, spread: 1 },
      { x: 7, y: 3, spread: 1 },
    ];
    
    for (let i = 0; i < count; i++) {
      const cluster = clusters[Math.floor(Math.random() * clusters.length)];
      data.push({
        x: cluster.x + (Math.random() - 0.5) * cluster.spread * 2,
        y: cluster.y + (Math.random() - 0.5) * cluster.spread * 2,
      });
    }
    return data;
  };

  // Ridgeline data
  const ridgelineData = [
    { label: 'Morning', values: Array.from({ length: 50 }, (_, i) => 
      Math.exp(-Math.pow(i - 15, 2) / 50) * 10 + Math.random() * 2) },
    { label: 'Afternoon', values: Array.from({ length: 50 }, (_, i) => 
      Math.exp(-Math.pow(i - 25, 2) / 60) * 12 + Math.random() * 2) },
    { label: 'Evening', values: Array.from({ length: 50 }, (_, i) => 
      Math.exp(-Math.pow(i - 35, 2) / 70) * 15 + Math.random() * 2) },
    { label: 'Night', values: Array.from({ length: 50 }, (_, i) => 
      Math.exp(-Math.pow(i - 10, 2) / 40) * 8 + Math.random() * 2) },
  ];

  // Spider/Radar data
  const spiderData = [
    {
      category: 'Performance',
      current: 85,
      target: 90,
      benchmark: 75,
    },
    {
      category: 'Reliability',
      current: 92,
      target: 95,
      benchmark: 80,
    },
    {
      category: 'Scalability',
      current: 78,
      target: 85,
      benchmark: 70,
    },
    {
      category: 'Security',
      current: 88,
      target: 90,
      benchmark: 85,
    },
    {
      category: 'Usability',
      current: 90,
      target: 88,
      benchmark: 75,
    },
    {
      category: 'Cost',
      current: 70,
      target: 80,
      benchmark: 60,
    },
  ];

  // Category distribution
  const categoryData = [
    { label: 'Infrastructure', value: 35, color: '#8b2c2c' },
    { label: 'Development', value: 25, color: '#6b3030' },
    { label: 'Operations', value: 20, color: '#4a4a4a' },
    { label: 'Security', value: 12, color: '#7a7a7a' },
    { label: 'Other', value: 8, color: '#5a5a5a' },
  ];

  // Time series with multiple metrics
  const timeSeriesData = [
    { label: 'Q1', revenue: 120, profit: 45, costs: 75, growth: 12 },
    { label: 'Q2', revenue: 145, profit: 58, costs: 87, growth: 18 },
    { label: 'Q3', revenue: 168, profit: 72, costs: 96, growth: 22 },
    { label: 'Q4', revenue: 195, profit: 88, costs: 107, growth: 28 },
  ];

  return (
    <div className="snake-page">
      <div className="snake-page__example">
        <div className="snake-page__header">
          <div>
            <Heading as="h1" size="xl">Data Visualization Suite</Heading>
            <Text variant="muted">Advanced analytics and insights</Text>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="ghost" size="small">Export All</Button>
            <Button variant="primary" size="small">Configure</Button>
          </div>
        </div>

        <Tabs
          tabs={[
            { id: 'overview', label: 'Overview' },
            { id: 'trends', label: 'Trends' },
            { id: 'distribution', label: 'Distribution' },
            { id: 'comparison', label: 'Comparison' },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="boxed"
          size="medium"
        />

        {/* Main Grid Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
          {/* Line Graph - Comparison */}
          <Card header={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Heading as="h3" size="md">Performance Comparison</Heading>
              <Badge variant="ghost">Live</Badge>
            </div>
          }>
            <LineGraph
              data={comparisonData}
              width={450}
              height={280}
              showGrid={true}
              showLegend={true}
              curve="smooth"
              animate={true}
              variant="interactive"
            />
          </Card>

          {/* Stream Graph */}
          <Card header={<Heading as="h3" size="md">Service Flow</Heading>}>
            <StreamGraph
              data={streamData}
              keys={streamKeys}
              width={450}
              height={280}
              showAxes={true}
              showLegend={true}
              animate={true}
              variant="interactive"
            />
          </Card>

          {/* Hexagonal Binning */}
          <Card header={<Heading as="h3" size="md">Usage Density</Heading>}>
            <HexagonalBinningGraph
              data={generateScatterData(500)}
              width={450}
              height={300}
              hexRadius={12}
              showAxes={true}
              showLegend={true}
              animate={true}
              xLabel="Feature A"
              yLabel="Feature B"
            />
          </Card>

          {/* Spider Graph */}
          <Card header={<Heading as="h3" size="md">System Metrics</Heading>}>
            <SpiderGraph
              data={spiderData}
              width={450}
              height={300}
              showLegend={true}
              animate={true}
              variant="interactive"
            />
          </Card>
        </div>

        {/* Full Width Sections */}
        <div style={{ marginTop: '20px' }}>
          {/* Ridgeline Graph */}
          <Card header={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Heading as="h3" size="md">Activity Distribution</Heading>
              <Badge variant="success">Updated</Badge>
            </div>
          }>
            <RidgelineGraph
              data={ridgelineData}
              width={920}
              height={300}
              ridgeHeight={60}
              overlap={0.6}
              curve="smooth"
              showAxes={true}
              showLabels={true}
              animate={true}
              fill={true}
              fillOpacity={0.7}
              variant="interactive"
            />
          </Card>
        </div>

        {/* Bottom Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginTop: '20px' }}>
          {/* Bar Graph */}
          <Card header={<Heading as="h3" size="md">Quarterly Performance</Heading>}>
            <BarGraph
              data={timeSeriesData}
              width={600}
              height={250}
              orientation="vertical"
              showGrid={true}
              animate={true}
              variant="interactive"
            />
          </Card>

          {/* Donut Graph */}
          <Card header={<Heading as="h3" size="md">Resource Allocation</Heading>}>
            <DonutGraph
              data={categoryData}
              width={280}
              height={250}
              showLegend={true}
              showValues={true}
              animate={true}
              variant="interactive"
              type="semi-circle"
            />
          </Card>
        </div>

        {/* Summary Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '20px' }}>
          <Card>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Text variant="muted" size="small">Total Data Points</Text>
              <Heading as="h2" size="lg" style={{ marginTop: '8px' }}>2.4M</Heading>
              <Badge variant="success" size="small" style={{ marginTop: '8px' }}>+12%</Badge>
            </div>
          </Card>
          <Card>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Text variant="muted" size="small">Avg. Processing</Text>
              <Heading as="h2" size="lg" style={{ marginTop: '8px' }}>124ms</Heading>
              <Badge variant="ghost" size="small" style={{ marginTop: '8px' }}>Stable</Badge>
            </div>
          </Card>
          <Card>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Text variant="muted" size="small">Accuracy Rate</Text>
              <Heading as="h2" size="lg" style={{ marginTop: '8px' }}>98.7%</Heading>
              <Badge variant="success" size="small" style={{ marginTop: '8px' }}>+2.1%</Badge>
            </div>
          </Card>
          <Card>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Text variant="muted" size="small">Active Models</Text>
              <Heading as="h2" size="lg" style={{ marginTop: '8px' }}>16</Heading>
              <Badge variant="primary" size="small" style={{ marginTop: '8px' }}>All Active</Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};