import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Filter } from './Filter';
import { SubCard } from './SubCard';
import { Input } from './Input';
import { Select } from './Select';
import { Badge } from './Badge';
import { Modal } from './Modal';
import { Progress } from './Progress';
import { RadioButton } from './RadioButton';
import { Checkbox } from './Checkbox';
import { Table } from './Table';
import { Link } from './Link';
import { Textarea } from './Textarea';
import { Heading } from './Heading';
import { Text } from './Text';
import { Divider } from './Divider';
import './page.css';

export const PageProjects: React.FC = () => {
  const [selectedView, setSelectedView] = useState('board');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  
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
    'planning': 'info',
    'in-progress': 'warning',
    'review': 'primary',
    'completed': 'success',
  };

  const priorityColors = {
    'low': 'default',
    'medium': 'info',
    'high': 'warning',
    'critical': 'danger',
  };

  return (
    <div className="snake-page">
      <div className="snake-page__example">
        <div className="snake-page__header">
          <div>
            <Heading as="h1" size="xl">Project Management</Heading>
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
              count={projects.filter(p => p.status === 'planning').length}
            >
              Planning
            </Filter>
            <Filter 
              active={filterStatus === 'in-progress'}
              onClick={() => setFilterStatus('in-progress')}
              variant="warning"
              count={projects.filter(p => p.status === 'in-progress').length}
            >
              In Progress
            </Filter>
            <Filter 
              active={filterStatus === 'review'}
              onClick={() => setFilterStatus('review')}
              variant="primary"
              count={projects.filter(p => p.status === 'review').length}
            >
              Review
            </Filter>
            <Filter 
              active={filterStatus === 'completed'}
              onClick={() => setFilterStatus('completed')}
              variant="success"
              count={projects.filter(p => p.status === 'completed').length}
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
                      {projects.filter(p => p.status === status).length}
                    </Badge>
                  </div>
                  <Divider spacing="small" />
                  <div className="snake-page__kanban-items">
                    {projects
                      .filter(p => filterStatus === 'all' || p.status === filterStatus)
                      .filter(p => p.status === status)
                      .map((project) => (
                        <SubCard key={project.id} variant="default" hoverable>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <Text size="sm" weight="medium">{project.name}</Text>
                            <Badge 
                              variant={priorityColors[project.priority as keyof typeof priorityColors]}
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
                          <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
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
              data={projects.filter(p => filterStatus === 'all' || p.status === filterStatus)}
              columns={[
                { 
                  key: 'name', 
                  header: 'Project Name',
                  render: (value) => <Link href="#" variant="primary">{value}</Link>
                },
                { 
                  key: 'status', 
                  header: 'Status',
                  render: (value) => (
                    <Badge variant={statusColors[value as keyof typeof statusColors]} style="dot">
                      {value}
                    </Badge>
                  )
                },
                { 
                  key: 'priority', 
                  header: 'Priority',
                  render: (value) => (
                    <Badge variant={priorityColors[value as keyof typeof priorityColors]}>
                      {value}
                    </Badge>
                  )
                },
                { 
                  key: 'completion', 
                  header: 'Progress',
                  render: (value) => (
                    <Progress value={value} size="small" showLabel />
                  )
                },
                { key: 'assignees', header: 'Team', render: (value) => value.join(', ') },
                { key: 'dueDate', header: 'Due Date' },
                { 
                  key: 'tasks', 
                  header: 'Tasks',
                  render: (_, row) => `${row.completedTasks}/${row.tasks}`
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
              <Text size="sm" variant="muted" style={{ marginBottom: '8px' }}>Assign Team Members</Text>
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
    </div>
  );
};