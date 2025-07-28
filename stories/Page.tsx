import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Filter } from './Filter';
import { SubCard } from './SubCard';
import { Input } from './Input';
import { Select } from './Select';
import { Toggle } from './Toggle';
import { Badge } from './Badge';
import { Modal } from './Modal';
import { Tooltip } from './Tooltip';
import { Progress } from './Progress';
import { Tabs } from './Tabs';
import { RadioButton } from './RadioButton';
import { Accordion } from './Accordion';
import { IconButton } from './IconButton';
import { Loading } from './Loading';
import { Checkbox } from './Checkbox';
import { Table } from './Table';
import { Link } from './Link';
import { Breadcrumb } from './Breadcrumb';
import { Stat } from './Stat';
import { Textarea } from './Textarea';
import { Heading } from './Heading';
import { Text } from './Text';
import { Alert } from './Alert';
import { Slider } from './Slider';
import { ColorPicker } from './ColorPicker';
import { Skeleton } from './Skeleton';
import { Toast } from './Toast';
import { Divider } from './Divider';
import { List } from './List';
import './page.css';

type ExamplePage = 'analytics' | 'projects' | 'monitor';

export const Page: React.FC = () => {
  const [currentExample, setCurrentExample] = useState<ExamplePage>('analytics');

  // Analytics Dashboard state
  const [timeRange, setTimeRange] = useState('24h');
  const [showDetails, setShowDetails] = useState(false);
  const [alertsExpanded, setAlertsExpanded] = useState(true);

  // Project Management state
  const [selectedView, setSelectedView] = useState('board');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  // System Monitor state
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState('5');
  const [selectedServer, setSelectedServer] = useState('server-1');
  const [cpuUsage, setCpuUsage] = useState(72);
  const [memoryUsage, setMemoryUsage] = useState(58);
  const [networkUsage, setNetworkUsage] = useState(34);
  const [showAlert, setShowAlert] = useState(false);

  // System Monitor real-time updates effect
  useEffect(() => {
    if (!autoRefresh || currentExample !== 'monitor') return;

    const interval = setInterval(
      () => {
        setCpuUsage((prev) => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 10)));
        setMemoryUsage((prev) => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 8)));
        setNetworkUsage((prev) => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 15)));
      },
      parseInt(refreshInterval) * 1000,
    );

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, currentExample]);

  const renderAnalyticsDashboard = () => {
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
      <div className="snake-page__example">
        <div className="snake-page__header">
          <div>
            <Heading as="h1" size="xl">
              Analytics Dashboard
            </Heading>
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
            <Button variant="secondary" size="small">
              Export Report
            </Button>
            <Button variant="primary" size="small" onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? 'Hide' : 'Show'} Details
            </Button>
          </div>
        </div>

        <Divider variant="accent" spacing="large" />

        <div className="snake-page__metrics-grid">
          {metrics.map((metric) => (
            <Card key={metric.label} variant="bordered" hoverable>
              <Stat
                label={metric.label}
                value={metric.value}
                change={{
                  value: metric.change,
                  type: metric.trend === 'up' ? 'increase' : 'decrease',
                }}
                variant="stacked"
                color={
                  metric.trend === 'up' && metric.label !== 'Error Rate'
                    ? 'success'
                    : metric.trend === 'down' && metric.label === 'Error Rate'
                      ? 'success'
                      : 'danger'
                }
              />
            </Card>
          ))}
        </div>

        <div className="snake-page__content-grid">
          <Card
            header={
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Heading as="h3" size="md">
                  Performance Overview
                </Heading>
                <Badge variant="success" style="dot">
                  Live
                </Badge>
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
                      <Badge variant={parseFloat(value) > 0.2 ? 'danger' : 'success'} size="small">
                        {value}
                      </Badge>
                    ),
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
                    <Text size="sm" variant="muted">
                      Database Latency
                    </Text>
                    <Progress value={23} variant="success" size="small" showLabel />
                  </div>
                  <div>
                    <Text size="sm" variant="muted">
                      Cache Hit Rate
                    </Text>
                    <Progress value={87} variant="primary" size="small" showLabel />
                  </div>
                  <div>
                    <Text size="sm" variant="muted">
                      Queue Depth
                    </Text>
                    <Progress value={45} variant="warning" size="small" showLabel />
                  </div>
                </div>
              </>
            )}
          </Card>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Card
              header={
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Heading as="h3" size="md">
                    System Alerts
                  </Heading>
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

            <Card
              header={
                <Heading as="h3" size="md">
                  Quick Actions
                </Heading>
              }
            >
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

            <Card
              header={
                <Heading as="h3" size="md">
                  Traffic Distribution
                </Heading>
              }
            >
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
    );
  };

  const renderProjectManagement = () => {
    const projects = [
      {
        id: 1,
        name: 'Authentication System Upgrade',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2024-02-15',
        completion: 65,
        assignees: ['John D.', 'Sarah M.'],
        tasks: 12,
        completedTasks: 8,
      },
      {
        id: 2,
        name: 'Database Migration',
        status: 'planning',
        priority: 'critical',
        dueDate: '2024-02-28',
        completion: 20,
        assignees: ['Mike R.'],
        tasks: 8,
        completedTasks: 2,
      },
      {
        id: 3,
        name: 'API Documentation',
        status: 'review',
        priority: 'medium',
        dueDate: '2024-02-10',
        completion: 90,
        assignees: ['Lisa K.', 'Tom H.'],
        tasks: 15,
        completedTasks: 14,
      },
      {
        id: 4,
        name: 'Performance Optimization',
        status: 'completed',
        priority: 'high',
        dueDate: '2024-01-30',
        completion: 100,
        assignees: ['David L.'],
        tasks: 10,
        completedTasks: 10,
      },
    ];

    const statusColors = {
      planning: 'info',
      'in-progress': 'warning',
      review: 'primary',
      completed: 'success',
    };

    const priorityColors = {
      low: 'default',
      medium: 'info',
      high: 'warning',
      critical: 'danger',
    };

    return (
      <div className="snake-page__example">
        <div className="snake-page__header">
          <div>
            <Heading as="h1" size="xl">
              Project Management
            </Heading>
            <Text variant="muted">Track and manage all active projects</Text>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="primary" onClick={() => setShowNewTaskModal(true)}>
              New Project
            </Button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginTop: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Filter
              active={filterStatus === 'all'}
              onClick={() => setFilterStatus('all')}
              count={projects.length}
            >
              All Projects
            </Filter>
            <Filter
              active={filterStatus === 'planning'}
              onClick={() => setFilterStatus('planning')}
              variant="info"
              count={projects.filter((p) => p.status === 'planning').length}
            >
              Planning
            </Filter>
            <Filter
              active={filterStatus === 'in-progress'}
              onClick={() => setFilterStatus('in-progress')}
              variant="warning"
              count={projects.filter((p) => p.status === 'in-progress').length}
            >
              In Progress
            </Filter>
            <Filter
              active={filterStatus === 'review'}
              onClick={() => setFilterStatus('review')}
              variant="primary"
              count={projects.filter((p) => p.status === 'review').length}
            >
              Review
            </Filter>
            <Filter
              active={filterStatus === 'completed'}
              onClick={() => setFilterStatus('completed')}
              variant="success"
              count={projects.filter((p) => p.status === 'completed').length}
            >
              Completed
            </Filter>
          </div>

          <div style={{ marginLeft: 'auto' }}>
            <RadioButton
              name="view"
              options={[
                { value: 'board', label: 'Board' },
                { value: 'list', label: 'List' },
                { value: 'timeline', label: 'Timeline' },
              ]}
              value={selectedView}
              onChange={(value) => setSelectedView(value)}
              variant="pills"
            />
          </div>
        </div>

        {selectedView === 'board' && (
          <div className="snake-page__kanban-board">
            {['planning', 'in-progress', 'review', 'completed'].map((status) => (
              <div key={status} className="snake-page__kanban-column">
                <Card variant="bordered">
                  <div className="snake-page__kanban-header">
                    <Heading as="h4" size="sm" style={{ textTransform: 'capitalize' }}>
                      {status.replace('-', ' ')}
                    </Heading>
                    <Badge variant={statusColors[status as keyof typeof statusColors]} size="small">
                      {projects.filter((p) => p.status === status).length}
                    </Badge>
                  </div>
                  <Divider spacing="small" />
                  <div className="snake-page__kanban-items">
                    {projects
                      .filter((p) => filterStatus === 'all' || p.status === filterStatus)
                      .filter((p) => p.status === status)
                      .map((project) => (
                        <SubCard key={project.id} variant="default" hoverable>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              marginBottom: '8px',
                            }}
                          >
                            <Text size="sm" weight="medium">
                              {project.name}
                            </Text>
                            <Badge
                              variant={
                                priorityColors[project.priority as keyof typeof priorityColors]
                              }
                              size="small"
                            >
                              {project.priority}
                            </Badge>
                          </div>
                          <Progress
                            value={project.completion}
                            size="small"
                            variant={project.completion === 100 ? 'success' : 'primary'}
                            showLabel
                          />
                          <div
                            style={{
                              marginTop: '12px',
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Text size="xs" variant="muted">
                              {project.completedTasks}/{project.tasks} tasks
                            </Text>
                            <Text size="xs" variant="muted">
                              Due: {project.dueDate}
                            </Text>
                          </div>
                          <div style={{ marginTop: '8px' }}>
                            <Text size="xs" variant="secondary">
                              {project.assignees.join(', ')}
                            </Text>
                          </div>
                        </SubCard>
                      ))}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}

        {selectedView === 'list' && (
          <Card>
            <Table
              data={projects.filter((p) => filterStatus === 'all' || p.status === filterStatus)}
              columns={[
                {
                  key: 'name',
                  header: 'Project Name',
                  render: (value) => (
                    <Link href="#" variant="primary">
                      {value}
                    </Link>
                  ),
                },
                {
                  key: 'status',
                  header: 'Status',
                  render: (value) => (
                    <Badge variant={statusColors[value as keyof typeof statusColors]} style="dot">
                      {value}
                    </Badge>
                  ),
                },
                {
                  key: 'priority',
                  header: 'Priority',
                  render: (value) => (
                    <Badge variant={priorityColors[value as keyof typeof priorityColors]}>
                      {value}
                    </Badge>
                  ),
                },
                {
                  key: 'completion',
                  header: 'Progress',
                  render: (value) => <Progress value={value} size="small" showLabel />,
                },
                { key: 'assignees', header: 'Team', render: (value) => value.join(', ') },
                { key: 'dueDate', header: 'Due Date' },
                {
                  key: 'tasks',
                  header: 'Tasks',
                  render: (_, row) => `${row.completedTasks}/${row.tasks}`,
                },
              ]}
              striped
              hoverable
            />
          </Card>
        )}

        <Modal
          isOpen={showNewTaskModal}
          onClose={() => setShowNewTaskModal(false)}
          title="Create New Project"
          size="medium"
        >
          <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input label="Project Name" placeholder="Enter project name..." required />
            <Textarea label="Description" placeholder="Project description..." rows={3} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Select
                label="Priority"
                options={[
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' },
                  { value: 'critical', label: 'Critical' },
                ]}
                placeholder="Select priority"
              />
              <Input label="Due Date" type="date" />
            </div>
            <div>
              <Text size="sm" variant="muted" style={{ marginBottom: '8px' }}>
                Assign Team Members
              </Text>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Checkbox label="John D." />
                <Checkbox label="Sarah M." />
                <Checkbox label="Mike R." />
                <Checkbox label="Lisa K." />
                <Checkbox label="Tom H." />
                <Checkbox label="David L." />
              </div>
            </div>
            <Divider />
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setShowNewTaskModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setShowNewTaskModal(false)}>
                Create Project
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  };

  const renderSystemMonitor = () => {
    const servers = [
      {
        id: 'server-1',
        name: 'Production Server 1',
        status: 'online',
        uptime: '45 days',
        location: 'US-East',
      },
      {
        id: 'server-2',
        name: 'Production Server 2',
        status: 'online',
        uptime: '23 days',
        location: 'US-West',
      },
      {
        id: 'server-3',
        name: 'Database Server',
        status: 'online',
        uptime: '67 days',
        location: 'EU-Central',
      },
      {
        id: 'server-4',
        name: 'Backup Server',
        status: 'maintenance',
        uptime: '12 days',
        location: 'Asia-Pacific',
      },
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
      <div className="snake-page__example">
        <div className="snake-page__header">
          <div>
            <Heading as="h1" size="xl">
              System Monitor
            </Heading>
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
            <Button variant="danger" size="small" onClick={() => setShowAlert(true)}>
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
            <Card
              header={
                <Heading as="h3" size="md">
                  Server List
                </Heading>
              }
            >
              <List
                items={servers.map((server) => ({
                  id: server.id,
                  content: (
                    <div>
                      <Text size="sm">{server.name}</Text>
                      <Text size="xs" variant="muted">
                        {server.location}
                      </Text>
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

            <Card
              header={
                <Heading as="h3" size="md">
                  Quick Stats
                </Heading>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Stat label="Total Servers" value="4" variant="horizontal" size="small" />
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
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Heading as="h3" size="md">
                    Resource Usage
                  </Heading>
                  <Badge variant="success" style="dot">
                    Live
                  </Badge>
                </div>
              }
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <Text size="sm">CPU Usage</Text>
                    <Text size="sm" variant={cpuUsage > 80 ? 'danger' : 'primary'}>
                      {cpuUsage}%
                    </Text>
                  </div>
                  <Progress
                    value={cpuUsage}
                    variant={cpuUsage > 80 ? 'danger' : cpuUsage > 60 ? 'warning' : 'success'}
                    type="striped"
                    animated={cpuUsage > 80}
                  />
                </div>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <Text size="sm">Memory Usage</Text>
                    <Text size="sm" variant={memoryUsage > 80 ? 'danger' : 'primary'}>
                      {memoryUsage}%
                    </Text>
                  </div>
                  <Progress
                    value={memoryUsage}
                    variant={memoryUsage > 80 ? 'danger' : memoryUsage > 60 ? 'warning' : 'success'}
                    type="striped"
                    animated={memoryUsage > 80}
                  />
                </div>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <Text size="sm">Network I/O</Text>
                    <Text size="sm" variant="primary">
                      {networkUsage}%
                    </Text>
                  </div>
                  <Progress value={networkUsage} variant="primary" />
                </div>
              </div>

              <Divider spacing="md" />

              <div>
                <Heading as="h4" size="sm" style={{ marginBottom: '12px' }}>
                  Running Processes
                </Heading>
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
                      ),
                    },
                  ]}
                  size="small"
                />
              </div>
            </Card>

            <Card
              header={
                <Heading as="h3" size="md">
                  System Logs
                </Heading>
              }
            >
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <Filter variant="default" active>
                  All
                </Filter>
                <Filter variant="danger">Errors</Filter>
                <Filter variant="warning">Warnings</Filter>
                <Filter variant="info">Info</Filter>
              </div>

              <div
                style={{
                  backgroundColor: '#0a0a0c',
                  padding: '12px',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                }}
              >
                {systemLogs.map((log, index) => (
                  <div key={index} style={{ marginBottom: '8px' }}>
                    <span style={{ color: '#5a5a5a' }}>{log.time}</span>
                    <span
                      style={{
                        marginLeft: '12px',
                        color:
                          log.level === 'error'
                            ? '#ff5555'
                            : log.level === 'warning'
                              ? '#f1fa8c'
                              : '#50fa7b',
                      }}
                    >
                      [{log.level.toUpperCase()}]
                    </span>
                    <span style={{ marginLeft: '12px', color: '#bdbdbd' }}>{log.message}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card
              header={
                <Heading as="h3" size="md">
                  Server Actions
                </Heading>
              }
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <Button variant="secondary" size="small">
                  Restart Service
                </Button>
                <Button variant="secondary" size="small">
                  Clear Cache
                </Button>
                <Button variant="secondary" size="small">
                  View Logs
                </Button>
                <Button variant="cyber" size="small">
                  Run Diagnostics
                </Button>
                <Button variant="primary" size="small">
                  Deploy Update
                </Button>
                <Button variant="danger" size="small">
                  Force Stop
                </Button>
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
    );
  };

  return (
    <div className="snake-page">
      <div className="snake-page__nav-header">
        <Heading as="h2" size="lg" variant="cyber" align="center">
          Snake Eater UI Examples
        </Heading>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
          <Button
            variant={currentExample === 'analytics' ? 'primary' : 'ghost'}
            onClick={() => setCurrentExample('analytics')}
            size="small"
          >
            Analytics Dashboard
          </Button>
          <Button
            variant={currentExample === 'projects' ? 'primary' : 'ghost'}
            onClick={() => setCurrentExample('projects')}
            size="small"
          >
            Project Management
          </Button>
          <Button
            variant={currentExample === 'monitor' ? 'primary' : 'ghost'}
            onClick={() => setCurrentExample('monitor')}
            size="small"
          >
            System Monitor
          </Button>
        </div>
      </div>

      <Divider variant="dashed" spacing="large" />

      <div className="snake-page__example-container">
        {currentExample === 'analytics' && renderAnalyticsDashboard()}
        {currentExample === 'projects' && renderProjectManagement()}
        {currentExample === 'monitor' && renderSystemMonitor()}
      </div>
    </div>
  );
};
