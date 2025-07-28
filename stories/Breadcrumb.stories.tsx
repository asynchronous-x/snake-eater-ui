import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0b0b0d' },
        { name: 'card', value: '#1f1d20' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    separator: { control: 'text' },
    maxItems: { control: 'number' },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Laptops', href: '/products/electronics/laptops' },
    ],
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Breadcrumb
        size="small"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Docs', href: '/docs' },
          { label: 'Components', href: '/docs/components' },
        ]}
      />
      <Breadcrumb
        size="medium"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Docs', href: '/docs' },
          { label: 'Components', href: '/docs/components' },
        ]}
      />
      <Breadcrumb
        size="large"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Docs', href: '/docs' },
          { label: 'Components', href: '/docs/components' },
        ]}
      />
    </div>
  ),
};

export const DifferentSeparators: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Electronics', href: '/products/electronics' },
        ]}
        separator="/"
      />
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Electronics', href: '/products/electronics' },
        ]}
        separator=">"
      />
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Electronics', href: '/products/electronics' },
        ]}
        separator="→"
      />
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Electronics', href: '/products/electronics' },
        ]}
        separator="•"
      />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/', icon: '🏠' },
        { label: 'Settings', href: '/settings', icon: '⚙️' },
        { label: 'Profile', href: '/settings/profile', icon: '👤' },
        { label: 'Security', icon: '🔒' },
      ]}
    />
  ),
};

export const MaxItemsCollapsed: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ color: '#8e8e90', marginBottom: '8px' }}>All items shown:</p>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Category', href: '/category' },
            { label: 'Subcategory', href: '/category/sub' },
            { label: 'Product', href: '/category/sub/product' },
            { label: 'Details' },
          ]}
        />
      </div>
      <div>
        <p style={{ color: '#8e8e90', marginBottom: '8px' }}>Max 4 items (collapsed):</p>
        <Breadcrumb
          maxItems={4}
          items={[
            { label: 'Home', href: '/' },
            { label: 'Category', href: '/category' },
            { label: 'Subcategory', href: '/category/sub' },
            { label: 'Product', href: '/category/sub/product' },
            { label: 'Details' },
          ]}
        />
      </div>
      <div>
        <p style={{ color: '#8e8e90', marginBottom: '8px' }}>Max 3 items (more collapsed):</p>
        <Breadcrumb
          maxItems={3}
          items={[
            { label: 'Home', href: '/' },
            { label: 'Category', href: '/category' },
            { label: 'Subcategory', href: '/category/sub' },
            { label: 'Product', href: '/category/sub/product' },
            { label: 'Details' },
          ]}
        />
      </div>
    </div>
  ),
};

export const NoLinks: Story = {
  args: {
    items: [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' },
      { label: 'Current Step' },
    ],
  },
};

export const Interactive: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = React.useState('/home/documents/projects/snake-ui');
    
    const items = currentPath.split('/').filter(Boolean).map((segment, index, array) => ({
      label: segment,
      href: '/' + array.slice(0, index + 1).join('/'),
    }));

    return (
      <div>
        <Breadcrumb
          items={items}
          onItemClick={(item) => {
            if (item.href) {
              setCurrentPath(item.href);
            }
          }}
        />
        <p style={{ color: '#8e8e90', marginTop: '16px', fontSize: '14px' }}>
          Current path: {currentPath}
        </p>
      </div>
    );
  },
};

export const FileSystemExample: Story = {
  render: () => (
    <div style={{
      padding: '16px',
      backgroundColor: '#1f1d20',
      border: '1px solid #3a3a3a',
    }}>
      <Breadcrumb
        items={[
          { label: 'root', href: '/', icon: '💾' },
          { label: 'users', href: '/users', icon: '📁' },
          { label: 'john', href: '/users/john', icon: '👤' },
          { label: 'documents', href: '/users/john/documents', icon: '📁' },
          { label: 'report.pdf', icon: '📄' },
        ]}
        separator="/"
      />
    </div>
  ),
};

export const ECommerceExample: Story = {
  render: () => (
    <div style={{
      padding: '24px',
      backgroundColor: '#1f1d20',
      border: '1px solid #3a3a3a',
    }}>
      <Breadcrumb
        items={[
          { label: 'All Products', href: '/products' },
          { label: 'Electronics', href: '/products/electronics' },
          { label: 'Computers', href: '/products/electronics/computers' },
          { label: 'Laptops', href: '/products/electronics/computers/laptops' },
          { label: 'Gaming Laptops' },
        ]}
        separator=">"
        size="small"
      />
      <h1 style={{ color: '#bdbdbd', marginTop: '16px', marginBottom: '8px' }}>
        Gaming Laptops
      </h1>
      <p style={{ color: '#8e8e90' }}>
        High-performance laptops for gaming enthusiasts
      </p>
    </div>
  ),
};

export const CustomRenderer: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Projects', href: '/projects' },
        { label: 'Snake Eater UI', href: '/projects/snake-ui' },
        { label: 'Components' },
      ]}
      renderItem={(item, index, isLast) => {
        if (isLast) {
          return (
            <span style={{
              color: '#50fa7b',
              fontWeight: 'bold',
              padding: '2px 8px',
              backgroundColor: 'rgba(80, 250, 123, 0.1)',
              border: '1px solid rgba(80, 250, 123, 0.3)',
            }}>
              {item.label}
            </span>
          );
        }
        
        return (
          <a
            href={item.href}
            style={{
              color: '#8e8e90',
              textDecoration: 'none',
              padding: '2px 4px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#bdbdbd';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#8e8e90';
            }}
          >
            {item.label}
          </a>
        );
      }}
    />
  ),
};

export const WizardSteps: Story = {
  render: () => {
    const steps = [
      { label: 'Account', href: '#account' },
      { label: 'Profile', href: '#profile' },
      { label: 'Preferences', href: '#preferences' },
      { label: 'Review' },
    ];

    return (
      <div style={{
        padding: '32px',
        backgroundColor: '#1f1d20',
        border: '1px solid #3a3a3a',
      }}>
        <h3 style={{ color: '#bdbdbd', marginTop: 0, marginBottom: '24px' }}>
          Setup Wizard
        </h3>
        <Breadcrumb
          items={steps}
          separator="→"
        />
        <div style={{ marginTop: '32px', color: '#8e8e90' }}>
          <p>Please review your information before completing setup.</p>
        </div>
      </div>
    );
  },
};