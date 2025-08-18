import React, { useState, useEffect } from 'react';
import { Button } from './Button/Button';
import { Card } from './Card/Card';
import { Badge } from './Badge/Badge';
import { Alert } from './Alert/Alert';
import { Progress } from './Progress/Progress';
import { Stat } from './Stat/Stat';
import { Heading } from './Heading/Heading';
import { Text } from './Text/Text';
import { LineGraph } from './LineGraph/LineGraph';
import { BarGraph } from './BarGraph/BarGraph';
import { RidgelineGraph } from './RidgelineGraph/RidgelineGraph';
import { Loading } from './Loading/Loading';
import './page.css';

export const PageRealtime: React.FC = () => {
  const [liveData, setLiveData] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(true);
  const [cpuUsage, setCpuUsage] = useState(45);
  const [memoryUsage, setMemoryUsage] = useState(62);
  const [diskUsage, setDiskUsage] = useState(78);
  const [networkIn, setNetworkIn] = useState(124);
  const [networkOut, setNetworkOut] = useState(89);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update metrics
      setCpuUsage(prev => Math.max(10, Math.min(95, prev + (Math.random() - 0.5) * 10)));
      setMemoryUsage(prev => Math.max(30, Math.min(90, prev + (Math.random() - 0.5) * 5)));
      setDiskUsage(prev => Math.max(60, Math.min(85, prev + (Math.random() - 0.5) * 2)));
      setNetworkIn(prev => Math.max(50, Math.min(200, prev + (Math.random() - 0.5) * 20)));
      setNetworkOut(prev => Math.max(40, Math.min(150, prev + (Math.random() - 0.5) * 15)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Generate scrolling data for RidgelineGraph
  const generateNewData = () => ({
    label: new Date().toLocaleTimeString(),
    values: Array.from({ length: 40 }, () => Math.random() * 100),
  });

  // Real-time line graph data
  const cpuTrend = {
    name: 'CPU Usage',
    data: Array.from({ length: 60 }, (_, i) => ({
      x: i,
      y: 45 + Math.sin(i / 10) * 20 + Math.random() * 10,
    })),
  };

  const memoryTrend = {
    name: 'Memory Usage',
    data: Array.from({ length: 60 }, (_, i) => ({
      x: i,
      y: 62 + Math.cos(i / 8) * 15 + Math.random() * 8,
    })),
  };

  // Server status data
  const serverStatus = [
    { label: 'Web-01', cpu: 45, memory: 62, status: 'healthy' },
    { label: 'Web-02', cpu: 52, memory: 68, status: 'healthy' },
    { label: 'API-01', cpu: 78, memory: 85, status: 'warning' },
    { label: 'API-02', cpu: 38, memory: 45, status: 'healthy' },
    { label: 'DB-01', cpu: 92, memory: 88, status: 'critical' },
    { label: 'Cache-01', cpu: 25, memory: 40, status: 'healthy' },
  ];

  // Active processes
  const processes = [
    { name: 'nginx', cpu: 2.5, memory: 128, threads: 4, status: 'running' },
    { name: 'node', cpu: 15.2, memory: 512, threads: 8, status: 'running' },
    { name: 'postgres', cpu: 8.7, memory: 2048, threads: 12, status: 'running' },
    { name: 'redis', cpu: 1.2, memory: 256, threads: 4, status: 'running' },
    { name: 'elasticsearch', cpu: 12.5, memory: 1024, threads: 16, status: 'running' },
  ];

  return (
    <div className="snake-page">
      <div className="snake-page__example">
        {/* Header */}
        <div className="snake-page__header">
          <div>
            <Heading as="h1" size="xl">Real-time Monitoring</Heading>
            <Text variant="muted">System performance and health metrics</Text>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Badge variant={isConnected ? 'success' : 'danger'} style="dot">
              {isConnected ? 'Connected' : 'Disconnected'}
            </Badge>
            <Button variant="ghost" size="small">Pause</Button>
            <Button variant="primary" size="small">Configure Alerts</Button>
          </div>
        </div>

        {/* Alert Banner */}
        {diskUsage > 80 && (
          <Alert
            variant="warning"
            title="High Disk Usage"
            description="Disk usage is above 80%. Consider cleaning up old logs or expanding storage."
            dismissible
            style={{ marginTop: '20px' }}
          />
        )}

        {/* Primary Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', marginTop: '20px' }}>
          <Card>
            <Stat
              label="CPU Usage"
              value={`${cpuUsage.toFixed(1)}%`}
              variant="stacked"
              color={cpuUsage > 80 ? 'danger' : cpuUsage > 60 ? 'warning' : 'success'}
            />
            <Progress value={cpuUsage} max={100} size="small" style={{ marginTop: '10px' }} />
          </Card>
          <Card>
            <Stat
              label="Memory"
              value={`${memoryUsage.toFixed(1)}%`}
              variant="stacked"
              color={memoryUsage > 80 ? 'danger' : memoryUsage > 60 ? 'warning' : 'success'}
            />
            <Progress value={memoryUsage} max={100} size="small" style={{ marginTop: '10px' }} />
          </Card>
          <Card>
            <Stat
              label="Disk"
              value={`${diskUsage.toFixed(1)}%`}
              variant="stacked"
              color={diskUsage > 80 ? 'danger' : diskUsage > 60 ? 'warning' : 'success'}
            />
            <Progress value={diskUsage} max={100} size="small" style={{ marginTop: '10px' }} />
          </Card>
          <Card>
            <Stat
              label="Network In"
              value={`${networkIn.toFixed(0)} Mb/s`}
              variant="stacked"
            />
            <Progress value={networkIn} max={200} size="small" style={{ marginTop: '10px' }} />
          </Card>
          <Card>
            <Stat
              label="Network Out"
              value={`${networkOut.toFixed(0)} Mb/s`}
              variant="stacked"
            />
            <Progress value={networkOut} max={200} size="small" style={{ marginTop: '10px' }} />
          </Card>
        </div>

        {/* Real-time Graphs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
          <Card header={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Heading as="h3" size="md">CPU Trend</Heading>
              <Loading size="small" variant="spinner" />
            </div>
          }>
            <LineGraph
              data={cpuTrend}
              width={450}
              height={200}
              showGrid={true}
              curve="smooth"
              fill={true}
              fillOpacity={0.2}
              animate={true}
              formatY={(v) => `${v.toFixed(0)}%`}
            />
          </Card>

          <Card header={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Heading as="h3" size="md">Memory Trend</Heading>
              <Loading size="small" variant="spinner" />
            </div>
          }>
            <LineGraph
              data={memoryTrend}
              width={450}
              height={200}
              showGrid={true}
              curve="smooth"
              fill={true}
              fillOpacity={0.2}
              animate={true}
              formatY={(v) => `${v.toFixed(0)}%`}
            />
          </Card>
        </div>

        {/* Scrolling Ridgeline for Live Data */}
        <Card header={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Heading as="h3" size="md">Live Data Stream</Heading>
            <Badge variant="success" style="dot">Streaming</Badge>
          </div>
        } style={{ marginTop: '20px' }}>
          <RidgelineGraph
            data={[
              { label: 'Stream 1', values: Array.from({ length: 40 }, () => Math.random() * 100) },
              { label: 'Stream 2', values: Array.from({ length: 40 }, () => Math.random() * 100) },
              { label: 'Stream 3', values: Array.from({ length: 40 }, () => Math.random() * 100) },
            ]}
            variant="scrolling"
            width={920}
            height={300}
            maxRidges={10}
            scrollInterval={2000}
            generateNewData={generateNewData}
            showAxes={true}
            showLabels={true}
            animate={true}
            fill={true}
            curve="smooth"
          />
        </Card>

        {/* Server Status Grid */}
        <Card header={<Heading as="h3" size="md">Server Status</Heading>} style={{ marginTop: '20px' }}>
          <BarGraph
            data={serverStatus}
            width={920}
            height={200}
            orientation="horizontal"
            showGrid={true}
            animate={true}
          />
        </Card>

        {/* Process Table */}
        <Card header={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Heading as="h3" size="md">Active Processes</Heading>
            <Text variant="muted" size="small">Last updated: just now</Text>
          </div>
        } style={{ marginTop: '20px' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Process</th>
                <th>CPU %</th>
                <th>Memory (MB)</th>
                <th>Threads</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((process) => (
                <tr key={process.name}>
                  <td>{process.name}</td>
                  <td>{process.cpu.toFixed(1)}%</td>
                  <td>{process.memory}</td>
                  <td>{process.threads}</td>
                  <td>
                    <Badge variant="success" size="small">
                      {process.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Footer Stats */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', padding: '20px', background: '#1f1d20', border: '1px solid #3a3a3a' }}>
          <div>
            <Text variant="muted" size="small">Uptime</Text>
            <Text size="large">42 days, 16:24:38</Text>
          </div>
          <div>
            <Text variant="muted" size="small">Load Average</Text>
            <Text size="large">2.34, 2.18, 2.05</Text>
          </div>
          <div>
            <Text variant="muted" size="small">Total Processes</Text>
            <Text size="large">247</Text>
          </div>
          <div>
            <Text variant="muted" size="small">Active Connections</Text>
            <Text size="large">1,284</Text>
          </div>
        </div>
      </div>
    </div>
  );
};