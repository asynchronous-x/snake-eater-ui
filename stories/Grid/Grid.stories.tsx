import type { Meta, StoryObj } from '@storybook/react';
import { Grid, GridItem } from './Grid';
import { Card } from '../Card/Card';
import { Text } from '../Text/Text';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Stat } from '../Stat/Stat';

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    columns: 3,
    gap: 'md',
    children: (
      <>
        <Card>
          <Text>Grid Item 1</Text>
        </Card>
        <Card>
          <Text>Grid Item 2</Text>
        </Card>
        <Card>
          <Text>Grid Item 3</Text>
        </Card>
        <Card>
          <Text>Grid Item 4</Text>
        </Card>
        <Card>
          <Text>Grid Item 5</Text>
        </Card>
        <Card>
          <Text>Grid Item 6</Text>
        </Card>
      </>
    ),
  },
};

export const ResponsiveColumns: Story = {
  args: {
    minColumnWidth: '250px',
    gap: 'lg',
    children: (
      <>
        {[...Array(8)].map((_, i) => (
          <Card key={i}>
            <Text>Responsive Item {i + 1}</Text>
          </Card>
        ))}
      </>
    ),
  },
};

export const WithGridItems: Story = {
  render: () => (
    <Grid columns={12} gap="md">
      <GridItem colSpan={6}>
        <Card>
          <Text>6 Columns</Text>
        </Card>
      </GridItem>
      <GridItem colSpan={6}>
        <Card>
          <Text>6 Columns</Text>
        </Card>
      </GridItem>
      <GridItem colSpan={4}>
        <Card>
          <Text>4 Columns</Text>
        </Card>
      </GridItem>
      <GridItem colSpan={4}>
        <Card>
          <Text>4 Columns</Text>
        </Card>
      </GridItem>
      <GridItem colSpan={4}>
        <Card>
          <Text>4 Columns</Text>
        </Card>
      </GridItem>
      <GridItem colSpan={3}>
        <Card>
          <Text>3 Columns</Text>
        </Card>
      </GridItem>
      <GridItem colSpan={9}>
        <Card>
          <Text>9 Columns</Text>
        </Card>
      </GridItem>
      <GridItem colSpan="full">
        <Card>
          <Text>Full Width</Text>
        </Card>
      </GridItem>
    </Grid>
  ),
};

export const DashboardLayout: Story = {
  render: () => (
    <Grid columns={12} rows={3} gap="lg" style={{ minHeight: '500px' }}>
      <GridItem colSpan={3} rowSpan={3}>
        <Card fullHeight>
          <Text weight="semibold" style={{ marginBottom: 'var(--spacing-md)' }}>
            Sidebar
          </Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
            <Button fullWidth>Dashboard</Button>
            <Button fullWidth variant="ghost">
              Analytics
            </Button>
            <Button fullWidth variant="ghost">
              Settings
            </Button>
          </div>
        </Card>
      </GridItem>
      <GridItem colSpan={9}>
        <Card>
          <Text weight="semibold">Header</Text>
        </Card>
      </GridItem>
      <GridItem colSpan={9} rowSpan={2}>
        <Card fullHeight>
          <Text weight="semibold" style={{ marginBottom: 'var(--spacing-md)' }}>
            Main Content
          </Text>
          <Grid columns={3} gap="md">
            <Stat label="Total Users" value="1,234" />
            <Stat label="Active Sessions" value="567" />
            <Stat label="Revenue" value="$12,345" />
          </Grid>
        </Card>
      </GridItem>
    </Grid>
  ),
};

export const FormLayout: Story = {
  render: () => (
    <Card>
      <Grid columns={2} gap="md">
        <GridItem>
          <Text size="sm" color="secondary" style={{ marginBottom: 'var(--spacing-xs)' }}>
            First Name
          </Text>
          <Input placeholder="John" fullWidth />
        </GridItem>
        <GridItem>
          <Text size="sm" color="secondary" style={{ marginBottom: 'var(--spacing-xs)' }}>
            Last Name
          </Text>
          <Input placeholder="Doe" fullWidth />
        </GridItem>
        <GridItem colSpan="full">
          <Text size="sm" color="secondary" style={{ marginBottom: 'var(--spacing-xs)' }}>
            Email
          </Text>
          <Input type="email" placeholder="john.doe@example.com" fullWidth />
        </GridItem>
        <GridItem colSpan="full">
          <Text size="sm" color="secondary" style={{ marginBottom: 'var(--spacing-xs)' }}>
            Address
          </Text>
          <Input placeholder="123 Main St" fullWidth />
        </GridItem>
        <GridItem>
          <Text size="sm" color="secondary" style={{ marginBottom: 'var(--spacing-xs)' }}>
            City
          </Text>
          <Input placeholder="New York" fullWidth />
        </GridItem>
        <GridItem>
          <Text size="sm" color="secondary" style={{ marginBottom: 'var(--spacing-xs)' }}>
            ZIP Code
          </Text>
          <Input placeholder="10001" fullWidth />
        </GridItem>
        <GridItem colSpan="full" justifySelf="end">
          <Button>Submit</Button>
        </GridItem>
      </Grid>
    </Card>
  ),
};

export const NamedAreas: Story = {
  render: () => (
    <Grid
      columns="200px 1fr 200px"
      rows="auto 1fr auto"
      areas={['header header header', 'sidebar main aside', 'footer footer footer']}
      gap="md"
      style={{ minHeight: '400px' }}
    >
      <GridItem area="header">
        <Card>
          <Text weight="semibold">Header</Text>
        </Card>
      </GridItem>
      <GridItem area="sidebar">
        <Card fullHeight>
          <Text weight="semibold">Sidebar</Text>
        </Card>
      </GridItem>
      <GridItem area="main">
        <Card fullHeight>
          <Text weight="semibold">Main Content</Text>
        </Card>
      </GridItem>
      <GridItem area="aside">
        <Card fullHeight>
          <Text weight="semibold">Aside</Text>
        </Card>
      </GridItem>
      <GridItem area="footer">
        <Card>
          <Text weight="semibold">Footer</Text>
        </Card>
      </GridItem>
    </Grid>
  ),
};

export const DifferentGaps: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
      <div>
        <Text weight="semibold" style={{ marginBottom: 'var(--spacing-md)' }}>
          Column Gap Only
        </Text>
        <Grid columns={4} columnGap="lg" rowGap="none">
          {[...Array(8)].map((_, i) => (
            <Card key={i}>
              <Text size="sm">Item {i + 1}</Text>
            </Card>
          ))}
        </Grid>
      </div>
      <div>
        <Text weight="semibold" style={{ marginBottom: 'var(--spacing-md)' }}>
          Row Gap Only
        </Text>
        <Grid columns={4} columnGap="none" rowGap="lg">
          {[...Array(8)].map((_, i) => (
            <Card key={i}>
              <Text size="sm">Item {i + 1}</Text>
            </Card>
          ))}
        </Grid>
      </div>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
      <div>
        <Text weight="semibold" style={{ marginBottom: 'var(--spacing-md)' }}>
          Center Aligned Items
        </Text>
        <Grid
          columns={3}
          gap="md"
          alignItems="center"
          justifyItems="center"
          style={{ height: '200px' }}
        >
          <Card style={{ padding: 'var(--spacing-xs)' }}>
            <Text size="sm">Centered</Text>
          </Card>
          <Card style={{ padding: 'var(--spacing-sm)' }}>
            <Text>Centered</Text>
          </Card>
          <Card style={{ padding: 'var(--spacing-md)' }}>
            <Text size="lg">Centered</Text>
          </Card>
        </Grid>
      </div>
      <div>
        <Text weight="semibold" style={{ marginBottom: 'var(--spacing-md)' }}>
          Individual Alignment
        </Text>
        <Grid columns={3} gap="md" style={{ height: '150px', background: 'var(--color-bg-card)' }}>
          <GridItem alignSelf="start" justifySelf="start">
            <Card>
              <Text size="sm">Top Left</Text>
            </Card>
          </GridItem>
          <GridItem alignSelf="center" justifySelf="center">
            <Card>
              <Text size="sm">Center</Text>
            </Card>
          </GridItem>
          <GridItem alignSelf="end" justifySelf="end">
            <Card>
              <Text size="sm">Bottom Right</Text>
            </Card>
          </GridItem>
        </Grid>
      </div>
    </div>
  ),
};

export const ComplexPositioning: Story = {
  render: () => (
    <Grid columns={6} rows={4} gap="md" style={{ minHeight: '400px' }}>
      <GridItem colStart={1} colEnd={3} rowStart={1} rowEnd={3}>
        <Card fullHeight>
          <Text>2x2 Block</Text>
        </Card>
      </GridItem>
      <GridItem colStart={3} colEnd={5}>
        <Card>
          <Text>2 Columns</Text>
        </Card>
      </GridItem>
      <GridItem colStart={5} colEnd={7} rowStart={1} rowEnd={5}>
        <Card fullHeight>
          <Text>Tall Sidebar</Text>
        </Card>
      </GridItem>
      <GridItem colStart={3} colEnd={5} rowStart={2} rowEnd={4}>
        <Card fullHeight>
          <Text>Center Block</Text>
        </Card>
      </GridItem>
      <GridItem colStart={1} colEnd={3} rowStart={3} rowEnd={5}>
        <Card fullHeight>
          <Text>Bottom Left</Text>
        </Card>
      </GridItem>
      <GridItem colStart={3} colEnd={5}>
        <Card>
          <Text>Bottom Center</Text>
        </Card>
      </GridItem>
    </Grid>
  ),
};

export const AutoFlow: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
      <div>
        <Text weight="semibold" style={{ marginBottom: 'var(--spacing-md)' }}>
          Row Dense
        </Text>
        <Grid columns={3} gap="md" autoFlow="row dense">
          <GridItem colSpan={2}>
            <Card>
              <Text>Wide Item 1</Text>
            </Card>
          </GridItem>
          <Card>
            <Text>Item 2</Text>
          </Card>
          <Card>
            <Text>Item 3</Text>
          </Card>
          <GridItem colSpan={2}>
            <Card>
              <Text>Wide Item 4</Text>
            </Card>
          </GridItem>
          <Card>
            <Text>Item 5</Text>
          </Card>
        </Grid>
      </div>
      <div>
        <Text weight="semibold" style={{ marginBottom: 'var(--spacing-md)' }}>
          Column Flow
        </Text>
        <Grid columns={3} rows={3} gap="md" autoFlow="column" style={{ height: '200px' }}>
          {[...Array(7)].map((_, i) => (
            <Card key={i}>
              <Text size="sm">Item {i + 1}</Text>
            </Card>
          ))}
        </Grid>
      </div>
    </div>
  ),
};
