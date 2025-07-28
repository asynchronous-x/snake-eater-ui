import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Select } from './Select';
import { Badge } from './Badge';
import { Progress } from './Progress';
import { Tabs } from './Tabs';
import { Table } from './Table';
import { IconButton } from './IconButton';
import { Alert } from './Alert';
import { Stat } from './Stat';
import { Heading } from './Heading';
import { Text } from './Text';
import { Divider } from './Divider';
import { List } from './List';
import './page.css';
import { SubCard } from './SubCard';

export const PageAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [showDetails, setShowDetails] = useState(false);
  const [alertsExpanded, setAlertsExpanded] = useState(true);

  const metrics = [
    { label: 'Total Requests', value: '2.4M', change: '+12.5%', trend: 'up' },
    { label: 'Avg Response Time', value: '124ms', change: '-8.2%', trend: 'down' },
    { label: 'Error Rate', value: '0.12%', change: '-0.03%', trend: 'down' },
    { label: 'Active Users', value: '8,421', change: '+234', trend: 'up' },
  ];

  const performanceData = [
    { endpoint: '/api/users', calls: '542K', avgTime: '89ms', p99: '234ms', errors: '0.08%' },
    { endpoint: '/api/data', calls: '1.2M', avgTime: '156ms', p99: '412ms', errors: '0.15%' },
    { endpoint: '/api/auth', calls: '234K', avgTime: '45ms', p99: '123ms', errors: '0.02%' },
    { endpoint: '/api/analytics', calls: '89K', avgTime: '234ms', p99: '567ms', errors: '0.45%' },
  ];

  return (
    <div className="snake-page">
      <div className="snake-page__example">
        <div className="snake-page__header">
          <div>
            <Heading as="h1" size="xl">Analytics Dashboard</Heading>
            <Text variant="muted">Real-time system performance metrics</Text>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              options={[
                { value: '1h', label: 'Last Hour' },
                { value: '24h', label: 'Last 24 Hours' },
                { value: '7d', label: 'Last 7 Days' },
                { value: '30d', label: 'Last 30 Days' },
              ]}
              size="small"
            />
            <Button variant="secondary" size="small">Export Report</Button>
            <Button variant="primary" size="small" onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? 'Hide' : 'Show'} Details
            </Button>
          </div>
        </div>

        <Divider variant="accent" spacing="large" />

        <Card>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '0' }}>
            {metrics.map((metric) => (
              <SubCard key={metric.label} variant="bordered" hoverable>
                <Stat
                  label={metric.label}
                  value={metric.value}
                  change={{
                    value: metric.change,
                    type: metric.trend === 'up' ? 'increase' : 'decrease'
                  }}
                  variant="stacked"
                  color={metric.trend === 'up' && metric.label !== 'Error Rate' ? 'success' :
                    metric.trend === 'down' && metric.label === 'Error Rate' ? 'success' : 'danger'}
                />
              </SubCard>
            ))}
          </div>
        </Card>

        <Divider variant="dashed" />


        <div className="snake-page__content-grid">
          <Card
            header={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Heading as="h3" size="md">Performance Overview</Heading>
                <Badge variant="success" style="dot">Live</Badge>
              </div>
            }
            size="large"
          >
            <Tabs
              tabs={[
                { id: 'endpoints', label: 'By Endpoint' },
                { id: 'regions', label: 'By Region' },
                { id: 'services', label: 'By Service' },
              ]}
              variant="underline"
              size="small"
            />

            <div style={{ marginTop: '20px' }}>
              <Table
                data={performanceData}
                columns={[
                  { key: 'endpoint', header: 'Endpoint' },
                  { key: 'calls', header: 'Total Calls', align: 'right' },
                  { key: 'avgTime', header: 'Avg Time', align: 'right' },
                  { key: 'p99', header: '99th Percentile', align: 'right' },
                  {
                    key: 'errors',
                    header: 'Error Rate',
                    align: 'right',
                    render: (value) => (
                      <Badge
                        variant={parseFloat(value) > 0.2 ? 'danger' : 'success'}
                        size="small"
                      >
                        {value}
                      </Badge>
                    )
                  },
                ]}
                size="small"
                variant="bordered"
              />
            </div>

            {showDetails && (
              <>
                <Divider spacing="small" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div>
                    <Text size="sm" variant="muted">Database Latency</Text>
                    <Progress value={23} variant="success" size="small" showLabel />
                  </div>
                  <div>
                    <Text size="sm" variant="muted">Cache Hit Rate</Text>
                    <Progress value={87} variant="primary" size="small" showLabel />
                  </div>
                  <div>
                    <Text size="sm" variant="muted">Queue Depth</Text>
                    <Progress value={45} variant="warning" size="small" showLabel />
                  </div>
                </div>
              </>
            )}
          </Card>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Card
              header={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Heading as="h3" size="md">System Alerts</Heading>
                  <IconButton
                    icon={alertsExpanded ? '−' : '+'}
                    size="small"
                    variant="ghost"
                    onClick={() => setAlertsExpanded(!alertsExpanded)}
                  />
                </div>
              }
            >
              {alertsExpanded && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Alert variant="danger" size="small">
                    High memory usage detected on server cluster A
                  </Alert>
                  <Alert variant="warning" size="small">
                    API rate limit approaching threshold (85%)
                  </Alert>
                  <Alert variant="info" size="small">
                    Scheduled maintenance window in 2 hours
                  </Alert>
                  <Alert variant="success" size="small">
                    All systems operational
                  </Alert>
                </div>
              )}
            </Card>

            <Card header={<Heading as="h3" size="md">Quick Actions</Heading>}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Button variant="secondary" size="small" fullWidth>
                  Clear Cache
                </Button>
                <Button variant="secondary" size="small" fullWidth>
                  Restart Services
                </Button>
                <Button variant="cyber" size="small" fullWidth>
                  Run Diagnostics
                </Button>
              </div>
            </Card>

            <Card header={<Heading as="h3" size="md">Traffic Distribution</Heading>}>
              <List
                items={[
                  { content: 'North America', meta: '45%' },
                  { content: 'Europe', meta: '28%' },
                  { content: 'Asia Pacific', meta: '18%' },
                  { content: 'Other Regions', meta: '9%' },
                ]}
                variant="simple"
                size="small"
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};