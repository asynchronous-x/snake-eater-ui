import type { Meta, StoryObj } from '@storybook/react';
import { Spacer } from './Spacer';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { Flex } from '../Flex/Flex';
import { Badge } from '../Badge/Badge';

const meta = {
  title: 'Layout/Spacer',
  component: Spacer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    grow: {
      control: 'number',
      description: 'Flex grow value - defaults to 1 to fill available space',
    },
  },
} satisfies Meta<typeof Spacer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Flex style={{ width: '400px', border: '1px solid var(--color-text-muted)', padding: '16px' }}>
      <Button size="small">Left</Button>
      <Spacer />
      <Button size="small" variant="ghost">
        Right
      </Button>
    </Flex>
  ),
};

export const MultipleSpacers: Story = {
  render: () => (
    <Flex style={{ width: '500px', border: '1px solid var(--color-text-muted)', padding: '16px' }}>
      <Button size="small">Start</Button>
      <Spacer />
      <Button size="small" variant="secondary">
        Center
      </Button>
      <Spacer />
      <Button size="small" variant="ghost">
        End
      </Button>
    </Flex>
  ),
};

export const NavigationBar: Story = {
  render: () => (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 24px',
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-text-muted)',
        minWidth: '600px',
      }}
    >
      <strong>Logo</strong>
      <Spacer />
      <Flex gap="lg">
        <a href="#" style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}>
          Home
        </a>
        <a href="#" style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}>
          About
        </a>
        <a href="#" style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}>
          Services
        </a>
        <a href="#" style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}>
          Contact
        </a>
      </Flex>
      <Spacer />
      <Button size="small" variant="primary">
        Sign In
      </Button>
    </nav>
  ),
};

export const ToolbarLayout: Story = {
  render: () => (
    <Flex
      style={{
        width: '600px',
        padding: '8px',
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-text-muted)',
      }}
    >
      <Flex gap="sm">
        <Button size="small" variant="ghost">
          File
        </Button>
        <Button size="small" variant="ghost">
          Edit
        </Button>
        <Button size="small" variant="ghost">
          View
        </Button>
      </Flex>
      <Spacer />
      <Flex gap="sm">
        <Button size="small" variant="ghost">
          Settings
        </Button>
        <Button size="small" variant="ghost">
          Help
        </Button>
      </Flex>
    </Flex>
  ),
};

export const CardFooter: Story = {
  render: () => (
    <Card style={{ width: '400px' }}>
      <h3 style={{ margin: '0 0 16px 0' }}>Card Title</h3>
      <p style={{ margin: '0 0 16px 0', color: 'var(--color-text-secondary)' }}>
        This is some card content that demonstrates using a Spacer in a card footer.
      </p>
      <Flex>
        <Button size="small" variant="ghost">
          Cancel
        </Button>
        <Spacer />
        <Button size="small" variant="primary">
          Confirm
        </Button>
      </Flex>
    </Card>
  ),
};

export const VerticalLayout: Story = {
  render: () => (
    <Flex
      direction="column"
      style={{
        height: '400px',
        width: '300px',
        border: '1px solid var(--color-text-muted)',
        padding: '16px',
      }}
    >
      <Card>
        <h4 style={{ margin: 0 }}>Header</h4>
      </Card>
      <Spacer />
      <Card>
        <p style={{ margin: 0 }}>Footer - pushed to bottom</p>
      </Card>
    </Flex>
  ),
};

export const CustomGrowValues: Story = {
  render: () => (
    <div>
      <h4 style={{ marginBottom: '16px' }}>Different grow values</h4>
      <Flex
        style={{
          width: '500px',
          marginBottom: '16px',
          border: '1px solid var(--color-text-muted)',
          padding: '8px',
        }}
      >
        <Badge>Start</Badge>
        <Spacer grow={1} />
        <Badge variant="success">1x grow</Badge>
        <Spacer grow={2} />
        <Badge variant="danger">2x grow</Badge>
      </Flex>
      <Flex style={{ width: '500px', border: '1px solid var(--color-text-muted)', padding: '8px' }}>
        <Badge>Equal</Badge>
        <Spacer />
        <Badge>Distribution</Badge>
        <Spacer />
        <Badge>Of Space</Badge>
      </Flex>
    </div>
  ),
};

export const ResponsiveToolbar: Story = {
  render: () => (
    <Flex
      style={{
        minWidth: '320px',
        padding: '12px',
        background: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-text-muted)',
      }}
    >
      <Flex gap="sm" align="center">
        <Button size="small" variant="ghost">
          ⚙️
        </Button>
        <span style={{ fontSize: '14px' }}>Project Name</span>
      </Flex>
      <Spacer />
      <Flex gap="sm">
        <Button size="small" variant="secondary">
          Save
        </Button>
        <Button size="small" variant="primary">
          Deploy
        </Button>
      </Flex>
    </Flex>
  ),
};

export const ChatInterface: Story = {
  render: () => (
    <Flex
      direction="column"
      style={{ height: '300px', width: '400px', border: '1px solid var(--color-text-muted)' }}
    >
      <Flex style={{ padding: '12px', borderBottom: '1px solid var(--color-text-muted)' }}>
        <strong>Chat Room</strong>
        <Spacer />
        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
          3 users online
        </span>
      </Flex>
      <Spacer />
      <Flex style={{ padding: '12px', borderTop: '1px solid var(--color-text-muted)' }} gap="sm">
        <input
          type="text"
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: '8px',
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-text-muted)',
            color: 'var(--color-text-primary)',
          }}
        />
        <Button variant="primary">Send</Button>
      </Flex>
    </Flex>
  ),
};
