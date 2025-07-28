import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Filter } from './Filter';
import { Select } from './Select';
import { Toggle } from './Toggle';
import { Badge } from './Badge';
import { Progress } from './Progress';
import { Table } from './Table';
import { Alert } from './Alert';
import { Stat } from './Stat';
import { Heading } from './Heading';
import { Text } from './Text';
import { Divider } from './Divider';
import { List } from './List';
import { Toast } from './Toast';
import './page.css';

export const PageMonitor: React.FC = () => {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState('5');
  const [selectedServer, setSelectedServer] = useState('server-1');
  const [cpuUsage, setCpuUsage] = useState(72);
  const [memoryUsage, setMemoryUsage] = useState(58);
  const [networkUsage, setNetworkUsage] = useState(34);
  const [showAlert, setShowAlert] = useState(false);

  // Real-time updates effect
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 10)));
      setMemoryUsage(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 8)));
      setNetworkUsage(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 15)));
    }, parseInt(refreshInterval) * 1000);
    
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  const servers = [
    { id: 'server-1', name: 'Production Server 1', status: 'online', uptime: '45 days', location: 'US-East' },
    { id: 'server-2', name: 'Production Server 2', status: 'online', uptime: '23 days', location: 'US-West' },
    { id: 'server-3', name: 'Database Server', status: 'online', uptime: '67 days', location: 'EU-Central' },
    { id: 'server-4', name: 'Backup Server', status: 'maintenance', uptime: '12 days', location: 'Asia-Pacific' },
  ];

  const systemLogs = [
    { time: '10:45:23', level: 'info', message: 'System backup completed successfully' },
    { time: '10:42:15', level: 'warning', message: 'High memory usage detected (85%)' },
    { time: '10:38:47', level: 'error', message: 'Failed to connect to external API' },
    { time: '10:35:12', level: 'info', message: 'User authentication service restarted' },
    { time: '10:32:08', level: 'info', message: 'Database optimization completed' },
  ];

  const processes = [
    { name: 'nginx', cpu: '2.3%', memory: '124MB', threads: 4, status: 'running' },
    { name: 'postgres', cpu: '8.7%', memory: '2.1GB', threads: 12, status: 'running' },
    { name: 'node', cpu: '15.2%', memory: '512MB', threads: 8, status: 'running' },
    { name: 'redis', cpu: '0.8%', memory: '64MB', threads: 2, status: 'running' },
  ];

  return (
    <div className="snake-page">
      <div className="snake-page__example">
        <div className="snake-page__header">
          <div>
            <Heading as="h1" size="xl">System Monitor</Heading>
            <Text variant="muted">Real-time infrastructure monitoring</Text>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Text size="sm">Auto-refresh</Text>
              <Toggle checked={autoRefresh} onChange={setAutoRefresh} />
            </div>
            {autoRefresh && (
              <Select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(e.target.value)}
                options={[
                  { value: '1', label: '1s' },
                  { value: '5', label: '5s' },
                  { value: '10', label: '10s' },
                  { value: '30', label: '30s' },
                ]}
                size="small"
              />
            )}
            <Button 
              variant="danger" 
              size="small"
              onClick={() => setShowAlert(true)}
            >
              Emergency Stop
            </Button>
          </div>
        </div>

        <Divider variant="accent" spacing="large" />

        {showAlert && (
          <Alert variant="danger" closable onClose={() => setShowAlert(false)}>
            Emergency stop initiated. All non-critical processes have been paused.
          </Alert>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Card header={<Heading as="h3" size="md">Server List</Heading>}>
              <List
                items={servers.map(server => ({
                  id: server.id,
                  content: (
                    <div>
                      <Text size="sm">{server.name}</Text>
                      <Text size="xs" variant="muted">{server.location}</Text>
                    </div>
                  ),
                  meta: (
                    <Badge 
                      variant={server.status === 'online' ? 'success' : 'warning'} 
                      style="dot"
                      size="small"
                    >
                      {server.status}
                    </Badge>
                  ),
                  onClick: () => setSelectedServer(server.id),
                }))}
                variant="interactive"
                activeItem={selectedServer}
              />
            </Card>

            <Card header={<Heading as="h3" size="md">Quick Stats</Heading>}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Stat
                  label="Total Servers"
                  value="4"
                  variant="horizontal"
                  size="small"
                />
                <Stat
                  label="Active Connections"
                  value="1,247"
                  variant="horizontal"
                  size="small"
                  color="info"
                />
                <Stat
                  label="Avg Response Time"
                  value="87ms"
                  variant="horizontal"
                  size="small"
                  color="success"
                />
                <Stat
                  label="Error Rate"
                  value="0.02%"
                  variant="horizontal"
                  size="small"
                  color="success"
                />
              </div>
            </Card>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Card 
              header={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Heading as="h3" size="md">Resource Usage</Heading>
                  <Badge variant="success" style="dot">Live</Badge>
                </div>
              }
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Text size="sm">CPU Usage</Text>
                    <Text size="sm" variant={cpuUsage > 80 ? 'danger' : 'primary'}>{cpuUsage}%</Text>
                  </div>
                  <Progress 
                    value={cpuUsage} 
                    variant={cpuUsage > 80 ? 'danger' : cpuUsage > 60 ? 'warning' : 'success'}
                    type="striped"
                    animated={cpuUsage > 80}
                  />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Text size="sm">Memory Usage</Text>
                    <Text size="sm" variant={memoryUsage > 80 ? 'danger' : 'primary'}>{memoryUsage}%</Text>
                  </div>
                  <Progress 
                    value={memoryUsage} 
                    variant={memoryUsage > 80 ? 'danger' : memoryUsage > 60 ? 'warning' : 'success'}
                    type="striped"
                    animated={memoryUsage > 80}
                  />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Text size="sm">Network I/O</Text>
                    <Text size="sm" variant="primary">{networkUsage}%</Text>
                  </div>
                  <Progress 
                    value={networkUsage} 
                    variant="primary"
                  />
                </div>
              </div>

              <Divider spacing="md" />

              <div>
                <Heading as="h4" size="sm" style={{ marginBottom: '12px' }}>Running Processes</Heading>
                <Table
                  data={processes}
                  columns={[
                    { key: 'name', header: 'Process' },
                    { key: 'cpu', header: 'CPU', align: 'right' },
                    { key: 'memory', header: 'Memory', align: 'right' },
                    { key: 'threads', header: 'Threads', align: 'right' },
                    { 
                      key: 'status', 
                      header: 'Status',
                      render: (value) => (
                        <Badge variant="success" size="small" style="dot">
                          {value}
                        </Badge>
                      )
                    },
                  ]}
                  size="small"
                />
              </div>
            </Card>

            <Card header={<Heading as="h3" size="md">System Logs</Heading>}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <Filter variant="default" active>All</Filter>
                <Filter variant="danger">Errors</Filter>
                <Filter variant="warning">Warnings</Filter>
                <Filter variant="info">Info</Filter>
              </div>
              
              <div style={{ 
                backgroundColor: '#0a0a0c', 
                padding: '12px', 
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '12px',
                maxHeight: '200px',
                overflowY: 'auto'
              }}>
                {systemLogs.map((log, index) => (
                  <div key={index} style={{ marginBottom: '8px' }}>
                    <span style={{ color: '#5a5a5a' }}>{log.time}</span>
                    <span style={{ 
                      marginLeft: '12px',
                      color: log.level === 'error' ? '#ff5555' : 
                             log.level === 'warning' ? '#f1fa8c' : '#50fa7b'
                    }}>
                      [{log.level.toUpperCase()}]
                    </span>
                    <span style={{ marginLeft: '12px', color: '#bdbdbd' }}>{log.message}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card header={<Heading as="h3" size="md">Server Actions</Heading>}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <Button variant="secondary" size="small">Restart Service</Button>
                <Button variant="secondary" size="small">Clear Cache</Button>
                <Button variant="secondary" size="small">View Logs</Button>
                <Button variant="cyber" size="small">Run Diagnostics</Button>
                <Button variant="primary" size="small">Deploy Update</Button>
                <Button variant="danger" size="small">Force Stop</Button>
              </div>
            </Card>
          </div>
        </div>

        <Toast
          isOpen={showAlert}
          onClose={() => setShowAlert(false)}
          message="Emergency stop executed successfully"
          variant="danger"
          position="top-center"
          duration={5000}
        />
      </div>
    </div>
  );
};