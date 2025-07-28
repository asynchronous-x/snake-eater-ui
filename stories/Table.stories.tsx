import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Table } from './Table';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
}

const sampleData: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-14',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'User',
    status: 'inactive',
    lastLogin: '2023-12-20',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Editor',
    status: 'active',
    lastLogin: '2024-01-13',
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'User',
    status: 'pending',
    lastLogin: '2024-01-10',
  },
];

const meta = {
  title: 'Data Display/Table',
  component: Table,
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
    variant: {
      control: { type: 'select' },
      options: ['default', 'striped', 'bordered'],
    },
    stickyHeader: { control: 'boolean' },
    selectable: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns: [
      { key: 'id', header: 'ID', width: '60px' },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'role', header: 'Role' },
      { key: 'status', header: 'Status' },
      { key: 'lastLogin', header: 'Last Login' },
    ],
  },
};

export const WithCustomRender: Story = {
  args: {
    data: sampleData,
    columns: [
      { key: 'id', header: 'ID', width: '60px' },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'role', header: 'Role' },
      {
        key: 'status',
        header: 'Status',
        render: (value: string) => {
          const statusColors = {
            active: '#50fa7b',
            inactive: '#ff5555',
            pending: '#ffb86c',
          };
          return (
            <span
              style={{
                color: statusColors[value as keyof typeof statusColors],
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: '0.85em',
              }}
            >
              {value}
            </span>
          );
        },
      },
      { key: 'lastLogin', header: 'Last Login', align: 'right' },
    ],
  },
};

export const Selectable: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    return (
      <div>
        <div style={{ marginBottom: '16px', color: '#8e8e90' }}>
          Selected: {selectedRows.length} row(s)
        </div>
        <Table
          data={sampleData}
          columns={[
            { key: 'id', header: 'ID', width: '60px' },
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            { key: 'role', header: 'Role' },
            { key: 'status', header: 'Status' },
          ]}
          selectable
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
        />
      </div>
    );
  },
};

export const Sortable: Story = {
  render: () => {
    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [data, setData] = useState(sampleData);

    const handleSort = (column: string, direction: 'asc' | 'desc') => {
      setSortColumn(column);
      setSortDirection(direction);

      const sorted = [...data].sort((a, b) => {
        const aVal = a[column as keyof User];
        const bVal = b[column as keyof User];

        if (aVal < bVal) return direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return direction === 'asc' ? 1 : -1;
        return 0;
      });

      setData(sorted);
    };

    return (
      <Table
        data={data}
        columns={[
          { key: 'id', header: 'ID', width: '60px', sortable: true },
          { key: 'name', header: 'Name', sortable: true },
          { key: 'email', header: 'Email', sortable: true },
          { key: 'role', header: 'Role', sortable: true },
          { key: 'status', header: 'Status', sortable: true },
          { key: 'lastLogin', header: 'Last Login', sortable: true },
        ]}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />
    );
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ color: '#bdbdbd', marginBottom: '16px' }}>Default</h3>
        <Table
          data={sampleData.slice(0, 3)}
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            { key: 'role', header: 'Role' },
          ]}
        />
      </div>
      <div>
        <h3 style={{ color: '#bdbdbd', marginBottom: '16px' }}>Striped</h3>
        <Table
          data={sampleData.slice(0, 3)}
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            { key: 'role', header: 'Role' },
          ]}
          variant="striped"
        />
      </div>
      <div>
        <h3 style={{ color: '#bdbdbd', marginBottom: '16px' }}>Bordered</h3>
        <Table
          data={sampleData.slice(0, 3)}
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            { key: 'role', header: 'Role' },
          ]}
          variant="bordered"
        />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ color: '#bdbdbd', marginBottom: '16px' }}>Small</h3>
        <Table
          data={sampleData.slice(0, 3)}
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            { key: 'status', header: 'Status' },
          ]}
          size="small"
        />
      </div>
      <div>
        <h3 style={{ color: '#bdbdbd', marginBottom: '16px' }}>Medium</h3>
        <Table
          data={sampleData.slice(0, 3)}
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            { key: 'status', header: 'Status' },
          ]}
          size="medium"
        />
      </div>
      <div>
        <h3 style={{ color: '#bdbdbd', marginBottom: '16px' }}>Large</h3>
        <Table
          data={sampleData.slice(0, 3)}
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            { key: 'status', header: 'Status' },
          ]}
          size="large"
        />
      </div>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    data: [],
    columns: [
      { key: 'id', header: 'ID', width: '60px' },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'role', header: 'Role' },
      { key: 'status', header: 'Status' },
    ],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: [
      { key: 'id', header: 'ID', width: '60px' },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'role', header: 'Role' },
      { key: 'status', header: 'Status' },
    ],
    emptyMessage: 'No users found',
  },
};

export const ClickableRows: Story = {
  render: () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    return (
      <div>
        <Table
          data={sampleData}
          columns={[
            { key: 'id', header: 'ID', width: '60px' },
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            { key: 'role', header: 'Role' },
            { key: 'status', header: 'Status' },
          ]}
          onRowClick={(row) => setSelectedUser(row)}
        />
        {selectedUser && (
          <div
            style={{
              marginTop: '16px',
              padding: '16px',
              backgroundColor: '#1f1d20',
              border: '1px solid #3a3a3a',
              color: '#bdbdbd',
            }}
          >
            Selected: {selectedUser.name} ({selectedUser.email})
          </div>
        )}
      </div>
    );
  },
};

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export const ProductTable: Story = {
  render: () => {
    const products: Product[] = [
      { id: 'PRD-001', name: 'Gaming Keyboard', price: 129.99, stock: 45, category: 'Peripherals' },
      { id: 'PRD-002', name: 'Wireless Mouse', price: 79.99, stock: 0, category: 'Peripherals' },
      { id: 'PRD-003', name: 'USB-C Hub', price: 49.99, stock: 120, category: 'Accessories' },
      { id: 'PRD-004', name: 'Webcam HD', price: 89.99, stock: 15, category: 'Video' },
      { id: 'PRD-005', name: 'Monitor Stand', price: 34.99, stock: 80, category: 'Accessories' },
    ];

    return (
      <Table
        data={products}
        columns={[
          { key: 'id', header: 'SKU', width: '100px' },
          { key: 'name', header: 'Product Name' },
          { key: 'category', header: 'Category' },
          {
            key: 'price',
            header: 'Price',
            align: 'right',
            render: (value: number) => `$${value.toFixed(2)}`,
          },
          {
            key: 'stock',
            header: 'Stock',
            align: 'center',
            render: (value: number) => (
              <span
                style={{
                  color: value === 0 ? '#ff5555' : value < 20 ? '#ffb86c' : '#50fa7b',
                  fontWeight: 'bold',
                }}
              >
                {value === 0 ? 'Out of Stock' : value}
              </span>
            ),
          },
        ]}
        variant="striped"
        stickyHeader
      />
    );
  },
};
