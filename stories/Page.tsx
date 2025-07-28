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
import { Menu } from './Menu';
import { Slider } from './Slider';
import { ColorPicker } from './ColorPicker';
import { Skeleton } from './Skeleton';
import { Toast } from './Toast';
import { Divider } from './Divider';
import './page.css';

type PageView = 'dashboard' | 'projects' | 'analytics' | 'settings' | 'terminal';

interface Project {
  id: number;
  name: string;
  status: 'active' | 'inactive' | 'completed';
  progress: number;
  lastUpdated: string;
  team: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface SystemMetric {
  name: string;
  value: number;
  max: number;
  unit: string;
}

export const Page: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>('dashboard');
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    '> System initialized',
    '> Connected to Snake Eater Network',
    '> Ready for input...'
  ]);
  const [showToast, setShowToast] = useState(false);
  const [systemLoad, setSystemLoad] = useState(65);
  const [themeColor, setThemeColor] = useState('#bd93f9');
  const [volumeLevel, setVolumeLevel] = useState(75);

  // Mock data
  const projects: Project[] = [
    { id: 1, name: 'Neural Interface v2.0', status: 'active', progress: 75, lastUpdated: '2 hours ago', team: ['Alice', 'Bob'], priority: 'high' },
    { id: 2, name: 'Quantum Processor', status: 'active', progress: 45, lastUpdated: '1 day ago', team: ['Charlie'], priority: 'critical' },
    { id: 3, name: 'Security Matrix', status: 'completed', progress: 100, lastUpdated: '3 days ago', team: ['David', 'Eve'], priority: 'medium' },
    { id: 4, name: 'Data Pipeline Alpha', status: 'inactive', progress: 20, lastUpdated: '1 week ago', team: ['Frank'], priority: 'low' },
  ];

  const systemMetrics: SystemMetric[] = [
    { name: 'CPU Usage', value: 72, max: 100, unit: '%' },
    { name: 'Memory', value: 8.2, max: 16, unit: 'GB' },
    { name: 'Network I/O', value: 145, max: 1000, unit: 'Mbps' },
    { name: 'Disk Usage', value: 456, max: 1000, unit: 'GB' },
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemLoad(prev => {
        const delta = (Math.random() - 0.5) * 10;
        return Math.max(0, Math.min(100, prev + delta));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (terminalInput.trim()) {
      setTerminalHistory([...terminalHistory, `> ${terminalInput}`, `Processing: ${terminalInput}...`]);
      setTerminalInput('');
    }
  };

  const renderSidebar = () => (
    <aside className="snake-page__sidebar">
      <div className="snake-page__logo">
        <Heading as="h2" size="lg" variant="cyber" align="center">
          SNAKE EATER
        </Heading>
        <Text size="sm" variant="muted" align="center">Control Panel</Text>
      </div>

      <Divider spacing="md" />

      <nav className="snake-page__nav">
        <Menu
          items={[
            { 
              id: 'dashboard', 
              label: 'Dashboard', 
              icon: '📊',
              onClick: () => setCurrentView('dashboard')
            },
            { 
              id: 'projects', 
              label: 'Projects', 
              icon: '🚀',
              onClick: () => setCurrentView('projects'),
              badge: projects.filter(p => p.status === 'active').length
            },
            { 
              id: 'analytics', 
              label: 'Analytics', 
              icon: '📈',
              onClick: () => setCurrentView('analytics')
            },
            { 
              id: 'terminal', 
              label: 'Terminal', 
              icon: '💻',
              onClick: () => setCurrentView('terminal')
            },
            { type: 'divider' },
            { 
              id: 'settings', 
              label: 'Settings', 
              icon: '⚙️',
              onClick: () => setCurrentView('settings')
            },
          ]}
          variant="vertical"
          activeItem={currentView}
        />
      </nav>

      <div className="snake-page__sidebar-footer">
        <SubCard variant="info" size="small">
          <Text size="sm" variant="info">System Status</Text>
          <Progress 
            value={systemLoad} 
            variant={systemLoad > 80 ? 'danger' : systemLoad > 60 ? 'warning' : 'success'}
            showLabel
            size="small"
          />
        </SubCard>
      </div>
    </aside>
  );

  const renderHeader = () => (
    <header className="snake-page__header">
      <div className="snake-page__header-left">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: '🏠' },
            { label: currentView.charAt(0).toUpperCase() + currentView.slice(1) }
          ]}
        />
      </div>

      <div className="snake-page__header-center">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search commands..."
          leftIcon="🔍"
          size="small"
          style={{ width: '300px' }}
        />
      </div>

      <div className="snake-page__header-right">
        <Tooltip content="Notifications">
          <IconButton 
            icon="🔔" 
            variant={notifications ? 'primary' : 'ghost'}
            onClick={() => setNotifications(!notifications)}
          />
        </Tooltip>
        <Tooltip content="Messages">
          <IconButton icon="💬" badge={3} />
        </Tooltip>
        <Tooltip content="Profile">
          <IconButton icon="👤" />
        </Tooltip>
      </div>
    </header>
  );

  const renderDashboard = () => (
    <div className="snake-page__dashboard">
      <div className="snake-page__stats-grid">
        <Stat
          label="Active Projects"
          value={projects.filter(p => p.status === 'active').length}
          icon="🚀"
          variant="centered"
          color="primary"
          change={{ value: '+2', type: 'increase' }}
        />
        <Stat
          label="Completion Rate"
          value="87%"
          icon="✓"
          variant="centered"
          color="success"
          change={{ value: '+5%', type: 'increase' }}
        />
        <Stat
          label="Team Members"
          value="12"
          icon="👥"
          variant="centered"
          color="info"
        />
        <Stat
          label="Alerts"
          value="3"
          icon="⚠️"
          variant="centered"
          color="warning"
          change={{ value: '-1', type: 'decrease' }}
        />
      </div>

      <div className="snake-page__dashboard-grid">
        <Card 
          header={<Heading as="h3" size="md">System Metrics</Heading>}
          size="large"
        >
          <div className="snake-page__metrics">
            {systemMetrics.map((metric) => (
              <div key={metric.name} className="snake-page__metric">
                <div className="snake-page__metric-header">
                  <Text size="sm" variant="muted">{metric.name}</Text>
                  <Text size="sm" variant="primary">{metric.value}{metric.unit}</Text>
                </div>
                <Progress
                  value={(metric.value / metric.max) * 100}
                  variant={
                    (metric.value / metric.max) > 0.8 ? 'danger' : 
                    (metric.value / metric.max) > 0.6 ? 'warning' : 'success'
                  }
                  size="small"
                />
              </div>
            ))}
          </div>
        </Card>

        <Card 
          header={<Heading as="h3" size="md">Recent Activity</Heading>}
        >
          <div className="snake-page__activity">
            <Alert variant="success" size="small" closable>
              Project "Neural Interface v2.0" reached 75% completion
            </Alert>
            <Alert variant="info" size="small" closable>
              New team member joined "Quantum Processor"
            </Alert>
            <Alert variant="warning" size="small" closable>
              Security scan scheduled for tomorrow
            </Alert>
          </div>
        </Card>

        <Card 
          header={<Heading as="h3" size="md">Quick Actions</Heading>}
        >
          <div className="snake-page__quick-actions">
            <Button variant="primary" fullWidth onClick={() => setShowProjectModal(true)}>
              New Project
            </Button>
            <Button variant="secondary" fullWidth>
              Generate Report
            </Button>
            <Button variant="cyber" fullWidth onClick={() => setShowToast(true)}>
              Deploy Changes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="snake-page__projects">
      <div className="snake-page__projects-header">
        <Heading as="h2" size="lg">Projects</Heading>
        <div className="snake-page__projects-filters">
          <Filter active>All</Filter>
          <Filter variant="success" count={projects.filter(p => p.status === 'active').length}>
            Active
          </Filter>
          <Filter variant="danger" count={projects.filter(p => p.status === 'inactive').length}>
            Inactive
          </Filter>
          <Filter variant="info" count={projects.filter(p => p.status === 'completed').length}>
            Completed
          </Filter>
        </div>
      </div>

      <Table
        data={projects}
        columns={[
          { 
            key: 'name', 
            header: 'Project Name',
            render: (value, row) => (
              <Link 
                href="#" 
                variant="primary"
                onClick={() => setSelectedProject(row)}
              >
                {value}
              </Link>
            )
          },
          { 
            key: 'status', 
            header: 'Status',
            render: (value) => (
              <Badge 
                variant={value === 'active' ? 'success' : value === 'completed' ? 'info' : 'danger'}
                style="dot"
              >
                {value}
              </Badge>
            )
          },
          { 
            key: 'progress', 
            header: 'Progress',
            render: (value) => (
              <Progress 
                value={value} 
                size="small"
                variant={value === 100 ? 'success' : value > 50 ? 'primary' : 'warning'}
                showLabel
              />
            )
          },
          { 
            key: 'priority', 
            header: 'Priority',
            render: (value) => (
              <Badge 
                variant={
                  value === 'critical' ? 'danger' : 
                  value === 'high' ? 'warning' : 
                  value === 'medium' ? 'info' : 'default'
                }
              >
                {value}
              </Badge>
            )
          },
          { key: 'team', header: 'Team', render: (value) => value.join(', ') },
          { key: 'lastUpdated', header: 'Last Updated' },
          {
            key: 'actions',
            header: 'Actions',
            render: (_, row) => (
              <div style={{ display: 'flex', gap: '4px' }}>
                <Tooltip content="Edit">
                  <IconButton icon="✏️" size="small" variant="ghost" />
                </Tooltip>
                <Tooltip content="Archive">
                  <IconButton icon="📦" size="small" variant="ghost" />
                </Tooltip>
                <Tooltip content="Delete">
                  <IconButton icon="🗑️" size="small" variant="ghost" />
                </Tooltip>
              </div>
            )
          }
        ]}
        striped
        hoverable
      />
    </div>
  );

  const renderAnalytics = () => (
    <div className="snake-page__analytics">
      <Tabs
        tabs={[
          { id: 'overview', label: 'Overview' },
          { id: 'performance', label: 'Performance' },
          { id: 'resources', label: 'Resources' },
          { id: 'logs', label: 'Logs' },
        ]}
        variant="pills"
      />

      <div className="snake-page__analytics-grid">
        <Card header={<Heading as="h3" size="md">Performance Trends</Heading>} size="large">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <Text size="sm" variant="muted">Response Time</Text>
              <Progress value={85} variant="success" type="striped" showLabel />
            </div>
            <div>
              <Text size="sm" variant="muted">Throughput</Text>
              <Progress value={72} variant="primary" type="animated" showLabel />
            </div>
            <div>
              <Text size="sm" variant="muted">Error Rate</Text>
              <Progress value={15} variant="danger" showLabel />
            </div>
          </div>
        </Card>

        <Card header={<Heading as="h3" size="md">Resource Allocation</Heading>}>
          <div className="snake-page__pie-chart">
            <Skeleton type="circle" size="large" />
            <Text size="sm" variant="muted" align="center" style={{ marginTop: '16px' }}>
              Chart visualization would go here
            </Text>
          </div>
        </Card>

        <Card header={<Heading as="h3" size="md">System Logs</Heading>} variant="grid">
          
        </Card>
      </div>
    </div>
  );

  const renderTerminal = () => (
    <div className="snake-page__terminal">
      <Card 
        variant="grid" 
        size="large"
        header={
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Heading as="h3" size="md">Terminal</Heading>
            <Badge variant="success" style="dot">Connected</Badge>
          </div>
        }
      >
        <div className="snake-page__terminal-output">
          <Code language="bash" style={{ background: 'transparent', border: 'none' }}>
            {terminalHistory.join('\n')}
          </Code>
        </div>
        <form onSubmit={handleTerminalSubmit} style={{ marginTop: '16px' }}>
          <Input
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            placeholder="Enter command..."
            leftIcon=">"
            rightIcon={
              <IconButton 
                icon="⏎" 
                size="small" 
                variant="ghost"
                type="submit"
              />
            }
            mono
          />
        </form>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="snake-page__settings">
      <Heading as="h2" size="lg">Settings</Heading>
      
      <Accordion
        items={[
          {
            id: 'appearance',
            title: 'Appearance',
            content: (
              <div className="snake-page__settings-section">
                <div className="snake-page__setting-item">
                  <div>
                    <Text>Dark Mode</Text>
                    <Text size="sm" variant="muted">Use dark theme across the interface</Text>
                  </div>
                  <Toggle checked={darkMode} onChange={setDarkMode} />
                </div>
                <div className="snake-page__setting-item">
                  <div>
                    <Text>Theme Color</Text>
                    <Text size="sm" variant="muted">Customize accent color</Text>
                  </div>
                  <ColorPicker value={themeColor} onChange={setThemeColor} />
                </div>
                <div className="snake-page__setting-item">
                  <div>
                    <Text>UI Density</Text>
                    <Text size="sm" variant="muted">Adjust interface spacing</Text>
                  </div>
                  <RadioButton
                    name="density"
                    options={[
                      { value: 'compact', label: 'Compact' },
                      { value: 'normal', label: 'Normal' },
                      { value: 'spacious', label: 'Spacious' },
                    ]}
                    defaultValue="normal"
                  />
                </div>
              </div>
            )
          },
          {
            id: 'notifications',
            title: 'Notifications',
            content: (
              <div className="snake-page__settings-section">
                <div className="snake-page__setting-item">
                  <div>
                    <Text>Push Notifications</Text>
                    <Text size="sm" variant="muted">Receive alerts and updates</Text>
                  </div>
                  <Toggle checked={notifications} onChange={setNotifications} />
                </div>
                <div className="snake-page__setting-item">
                  <div>
                    <Text>Email Digest</Text>
                    <Text size="sm" variant="muted">Weekly summary of activities</Text>
                  </div>
                  <Checkbox defaultChecked />
                </div>
                <div className="snake-page__setting-item">
                  <div>
                    <Text>Sound Effects</Text>
                    <Text size="sm" variant="muted">Play sounds for actions</Text>
                  </div>
                  <Checkbox />
                </div>
                <div className="snake-page__setting-item">
                  <div>
                    <Text>Volume Level</Text>
                    <Text size="sm" variant="muted">Adjust notification volume</Text>
                  </div>
                  <Slider 
                    value={volumeLevel} 
                    onChange={setVolumeLevel}
                    showValue
                    valueLabelPosition="outside"
                  />
                </div>
              </div>
            )
          },
          {
            id: 'security',
            title: 'Security',
            content: (
              <div className="snake-page__settings-section">
                <div className="snake-page__setting-item">
                  <div>
                    <Text>Two-Factor Authentication</Text>
                    <Text size="sm" variant="muted">Add an extra layer of security</Text>
                  </div>
                  <Button variant="secondary" size="small">Enable</Button>
                </div>
                <div className="snake-page__setting-item">
                  <div>
                    <Text>Session Timeout</Text>
                    <Text size="sm" variant="muted">Auto-logout after inactivity</Text>
                  </div>
                  <Select
                    options={[
                      { value: '15', label: '15 minutes' },
                      { value: '30', label: '30 minutes' },
                      { value: '60', label: '1 hour' },
                      { value: 'never', label: 'Never' },
                    ]}
                    defaultValue="30"
                    size="small"
                  />
                </div>
              </div>
            )
          },
          {
            id: 'advanced',
            title: 'Advanced',
            content: (
              <div className="snake-page__settings-section">
                <Alert variant="warning" size="small">
                  These settings are for advanced users. Proceed with caution.
                </Alert>
                <div className="snake-page__setting-item" style={{ marginTop: '16px' }}>
                  <div>
                    <Text>Developer Mode</Text>
                    <Text size="sm" variant="muted">Enable developer tools and options</Text>
                  </div>
                  <Toggle />
                </div>
                <div className="snake-page__setting-item">
                  <div>
                    <Text>API Key</Text>
                    <Text size="sm" variant="muted">Your personal API access token</Text>
                  </div>
                  <Input 
                    type="password" 
                    value="sk-1234567890abcdef"
                    size="small"
                    rightIcon={
                      <IconButton icon="📋" size="small" variant="ghost" />
                    }
                  />
                </div>
                <div className="snake-page__setting-item">
                  <div>
                    <Text>Export Data</Text>
                    <Text size="sm" variant="muted">Download all your data</Text>
                  </div>
                  <Button variant="secondary" size="small">Export</Button>
                </div>
              </div>
            )
          }
        ]}
        defaultOpenItems={['appearance']}
        variant="separated"
      />
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return renderDashboard();
      case 'projects':
        return renderProjects();
      case 'analytics':
        return renderAnalytics();
      case 'terminal':
        return renderTerminal();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="snake-page">
      {renderSidebar()}
      <div className="snake-page__main">
        {renderHeader()}
        <main className="snake-page__content">
          {renderContent()}
        </main>
      </div>

      <Modal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        title="Create New Project"
        size="medium"
      >
        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input label="Project Name" placeholder="Enter project name..." required />
          <Textarea label="Description" placeholder="Describe your project..." rows={3} />
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
          <div>
            <Text size="sm" variant="muted" style={{ marginBottom: '8px' }}>Team Members</Text>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Checkbox label="Alice" />
              <Checkbox label="Bob" />
              <Checkbox label="Charlie" />
              <Checkbox label="David" />
            </div>
          </div>
          <Divider />
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setShowProjectModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setShowProjectModal(false)}>
              Create Project
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.name || ''}
        size="large"
      >
        {selectedProject && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="snake-page__project-details">
              <SubCard>
                <Stat
                  label="Status"
                  value={selectedProject.status}
                  variant="horizontal"
                  color={selectedProject.status === 'active' ? 'success' : 'danger'}
                />
              </SubCard>
              <SubCard>
                <Stat
                  label="Progress"
                  value={`${selectedProject.progress}%`}
                  variant="horizontal"
                  color="info"
                />
              </SubCard>
              <SubCard>
                <Stat
                  label="Team Size"
                  value={selectedProject.team.length}
                  variant="horizontal"
                />
              </SubCard>
              <SubCard>
                <Stat
                  label="Priority"
                  value={selectedProject.priority}
                  variant="horizontal"
                  color="warning"
                />
              </SubCard>
            </div>

            <Card>
              <Heading as="h4" size="sm">Team Members</Heading>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                {selectedProject.team.map(member => (
                  <Badge key={member} variant="info">{member}</Badge>
                ))}
              </div>
            </Card>

            <Card>
              <Heading as="h4" size="sm">Recent Activity</Heading>
              <div style={{ marginTop: '12px' }}>
                <Loading type="pulse" size="small" text="Loading activity..." />
              </div>
            </Card>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setSelectedProject(null)}>
                Close
              </Button>
              <Button variant="primary">
                View Details
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Toast
        isOpen={showToast}
        onClose={() => setShowToast(false)}
        message="Deployment initiated successfully!"
        variant="success"
        position="bottom-right"
        duration={5000}
      />
    </div>
  );
};