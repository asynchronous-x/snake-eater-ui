import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { Badge } from '../Badge/Badge';
import { Input } from '../Input/Input';

const meta = {
  title: 'Layout/Flex',
  component: Flex,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
    },
    align: {
      control: 'select',
      options: ['start', 'end', 'center', 'baseline', 'stretch'],
    },
    gap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    wrap: {
      control: 'select',
      options: [false, true, 'reverse'],
    },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    gap: 'md',
    children: (
      <>
        <Button variant="primary">Button 1</Button>
        <Button variant="secondary">Button 2</Button>
        <Button variant="ghost">Button 3</Button>
      </>
    ),
  },
};

export const Column: Story = {
  args: {
    direction: 'column',
    gap: 'md',
    children: (
      <>
        <Button fullWidth>Button 1</Button>
        <Button fullWidth variant="secondary">
          Button 2
        </Button>
        <Button fullWidth variant="ghost">
          Button 3
        </Button>
      </>
    ),
  },
};

export const JustifyCenter: Story = {
  args: {
    justify: 'center',
    gap: 'md',
    fullWidth: true,
    style: { minWidth: '400px', border: '1px solid var(--color-text-muted)', padding: '16px' },
    children: (
      <>
        <Badge variant="primary">Badge 1</Badge>
        <Badge variant="success">Badge 2</Badge>
        <Badge variant="danger">Badge 3</Badge>
      </>
    ),
  },
};

export const JustifyBetween: Story = {
  args: {
    justify: 'between',
    fullWidth: true,
    style: { minWidth: '400px', border: '1px solid var(--color-text-muted)', padding: '16px' },
    children: (
      <>
        <Button size="small">Left</Button>
        <Button size="small" variant="ghost">
          Right
        </Button>
      </>
    ),
  },
};

export const AlignCenter: Story = {
  args: {
    align: 'center',
    gap: 'md',
    style: { height: '200px', border: '1px solid var(--color-text-muted)', padding: '16px' },
    children: (
      <>
        <Card style={{ height: '60px', width: '100px' }}>Item 1</Card>
        <Card style={{ height: '100px', width: '100px' }}>Item 2</Card>
        <Card style={{ height: '80px', width: '100px' }}>Item 3</Card>
      </>
    ),
  },
};

export const Wrap: Story = {
  args: {
    wrap: true,
    gap: 'sm',
    style: { maxWidth: '300px', border: '1px solid var(--color-text-muted)', padding: '16px' },
    children: (
      <>
        <Badge>JavaScript</Badge>
        <Badge>TypeScript</Badge>
        <Badge>React</Badge>
        <Badge>Node.js</Badge>
        <Badge>Python</Badge>
        <Badge>Docker</Badge>
        <Badge>Kubernetes</Badge>
      </>
    ),
  },
};

export const NestedFlex: Story = {
  args: {
    direction: 'column',
    gap: 'lg',
    fullWidth: true,
    children: (
      <>
        <Flex justify="between" fullWidth>
          <Button variant="ghost">Cancel</Button>
          <Flex gap="sm">
            <Button variant="secondary">Save Draft</Button>
            <Button variant="primary">Publish</Button>
          </Flex>
        </Flex>
        <Flex direction="column" gap="md" fullWidth>
          <Input placeholder="Title" fullWidth />
          <Input placeholder="Description" fullWidth />
        </Flex>
      </>
    ),
  },
};

export const ResponsiveLayout: Story = {
  args: {
    wrap: true,
    gap: 'md',
    justify: 'center',
    children: (
      <>
        <Card style={{ minWidth: '250px', flex: '1' }}>
          <Flex direction="column" gap="sm">
            <h3 style={{ margin: 0 }}>Card 1</h3>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
              This card will wrap when space is limited
            </p>
          </Flex>
        </Card>
        <Card style={{ minWidth: '250px', flex: '1' }}>
          <Flex direction="column" gap="sm">
            <h3 style={{ margin: 0 }}>Card 2</h3>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
              Responsive layout with flex wrap
            </p>
          </Flex>
        </Card>
        <Card style={{ minWidth: '250px', flex: '1' }}>
          <Flex direction="column" gap="sm">
            <h3 style={{ margin: 0 }}>Card 3</h3>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
              Works great for responsive designs
            </p>
          </Flex>
        </Card>
      </>
    ),
  },
};

export const CustomGap: Story = {
  args: {
    gap: 32,
    children: (
      <>
        <Button>32px Gap</Button>
        <Button variant="secondary">Custom</Button>
        <Button variant="ghost">Spacing</Button>
      </>
    ),
  },
};

export const FlexGrowShrink: Story = {
  render: () => (
    <Flex gap="md" fullWidth style={{ minWidth: '500px' }}>
      <Flex grow={1} shrink={1} basis="0">
        <Card fullWidth>
          <p>Flex: 1 1 0</p>
          <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            Will grow and shrink
          </p>
        </Card>
      </Flex>
      <Flex grow={0} shrink={0} basis="200px">
        <Card fullWidth>
          <p>Flex: 0 0 200px</p>
          <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Fixed width</p>
        </Card>
      </Flex>
      <Flex grow={2} shrink={1} basis="0">
        <Card fullWidth>
          <p>Flex: 2 1 0</p>
          <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Grows 2x faster</p>
        </Card>
      </Flex>
    </Flex>
  ),
};
