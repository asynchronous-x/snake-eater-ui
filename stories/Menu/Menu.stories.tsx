import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Menu } from './Menu';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';

const meta = {
  title: 'Navigation/Menu',
  component: Menu,
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
    placement: {
      control: { type: 'select' },
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end', 'right-start', 'left-start'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    showArrow: { control: 'boolean' },
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems = [
  { id: 'new', label: 'New File', icon: '📄', shortcut: 'Ctrl+N' },
  { id: 'open', label: 'Open', icon: '📁', shortcut: 'Ctrl+O' },
  { id: 'save', label: 'Save', icon: '💾', shortcut: 'Ctrl+S' },
  { id: 'divider1', divider: true },
  { id: 'cut', label: 'Cut', icon: '✂️', shortcut: 'Ctrl+X' },
  { id: 'copy', label: 'Copy', icon: '📋', shortcut: 'Ctrl+C' },
  { id: 'paste', label: 'Paste', icon: '📌', shortcut: 'Ctrl+V', disabled: true },
  { id: 'divider2', divider: true },
  { id: 'delete', label: 'Delete', icon: '🗑️', danger: true },
];

export const Default: Story = {
  args: {
    items: basicItems,
    trigger: <Button>Open Menu</Button>,
  },
};

export const WithSubmenu: Story = {
  render: () => {
    const [lastAction, setLastAction] = useState('');

    const itemsWithSubmenu = [
      {
        id: 'file',
        label: 'File',
        icon: '📁',
        submenu: [
          { id: 'new', label: 'New', icon: '📄' },
          { id: 'open', label: 'Open', icon: '📂' },
          {
            id: 'recent',
            label: 'Recent Files',
            icon: '🕒',
            submenu: [
              { id: 'file1', label: 'document.txt' },
              { id: 'file2', label: 'image.png' },
              { id: 'file3', label: 'data.json' },
            ],
          },
          { id: 'divider1', divider: true },
          { id: 'save', label: 'Save', icon: '💾' },
          { id: 'saveAs', label: 'Save As...', icon: '💾' },
        ],
      },
      {
        id: 'edit',
        label: 'Edit',
        icon: '✏️',
        submenu: [
          { id: 'undo', label: 'Undo', shortcut: 'Ctrl+Z' },
          { id: 'redo', label: 'Redo', shortcut: 'Ctrl+Y' },
          { id: 'divider1', divider: true },
          { id: 'cut', label: 'Cut', shortcut: 'Ctrl+X' },
          { id: 'copy', label: 'Copy', shortcut: 'Ctrl+C' },
          { id: 'paste', label: 'Paste', shortcut: 'Ctrl+V' },
        ],
      },
      { id: 'view', label: 'View', icon: '👁️' },
      { id: 'divider1', divider: true },
      { id: 'settings', label: 'Settings', icon: '⚙️' },
      { id: 'help', label: 'Help', icon: '❓' },
    ];

    return (
      <div>
        <Menu
          items={itemsWithSubmenu}
          trigger={<Button variant="secondary">Application Menu</Button>}
          onItemClick={setLastAction}
        />
        {lastAction && (
          <p style={{ marginTop: '16px', color: '#bdbdbd' }}>Last action: {lastAction}</p>
        )}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Menu
        items={basicItems.slice(0, 4)}
        size="small"
        trigger={<Button size="small">Small Menu</Button>}
      />
      <Menu items={basicItems.slice(0, 4)} size="medium" trigger={<Button>Medium Menu</Button>} />
      <Menu
        items={basicItems.slice(0, 4)}
        size="large"
        trigger={<Button size="large">Large Menu</Button>}
      />
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '60px',
        padding: '100px',
        placeItems: 'center',
      }}
    >
      <Menu
        items={basicItems.slice(0, 3)}
        placement="top-start"
        trigger={<Button size="small">Top Start</Button>}
      />
      <Menu
        items={basicItems.slice(0, 3)}
        placement="top-end"
        trigger={<Button size="small">Top End</Button>}
      />
      <div />
      <Menu
        items={basicItems.slice(0, 3)}
        placement="left-start"
        trigger={<Button size="small">Left Start</Button>}
      />
      <div />
      <Menu
        items={basicItems.slice(0, 3)}
        placement="right-start"
        trigger={<Button size="small">Right Start</Button>}
      />
      <Menu
        items={basicItems.slice(0, 3)}
        placement="bottom-start"
        trigger={<Button size="small">Bottom Start</Button>}
      />
      <Menu
        items={basicItems.slice(0, 3)}
        placement="bottom-end"
        trigger={<Button size="small">Bottom End</Button>}
      />
    </div>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Menu items={basicItems} showArrow trigger={<Button>With Arrow</Button>} />
      <Menu
        items={basicItems}
        showArrow
        placement="top-start"
        trigger={<Button>Arrow Top</Button>}
      />
    </div>
  ),
};

export const ContextMenu: Story = {
  render: () => {
    const contextMenuItems = [
      { id: 'inspect', label: 'Inspect Element', icon: '🔍' },
      { id: 'view-source', label: 'View Source', icon: '📄' },
      { id: 'divider1', divider: true },
      { id: 'refresh', label: 'Refresh', icon: '🔄', shortcut: 'F5' },
      { id: 'fullscreen', label: 'Fullscreen', icon: '⛶', shortcut: 'F11' },
      { id: 'divider2', divider: true },
      {
        id: 'developer',
        label: 'Developer Tools',
        icon: '🛠️',
        submenu: [
          { id: 'console', label: 'Console' },
          { id: 'network', label: 'Network' },
          { id: 'performance', label: 'Performance' },
        ],
      },
    ];

    const [menuOpen, setMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      setMenuPosition({ x: e.clientX, y: e.clientY });
      setMenuOpen(true);
    };

    return (
      <div
        style={{
          height: '300px',
          backgroundColor: '#1f1d20',
          border: '1px solid #3a3a3a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
        onContextMenu={handleContextMenu}
      >
        <p style={{ color: '#8e8e90' }}>Right-click anywhere in this area</p>

        {menuOpen && (
          <div style={{ position: 'fixed', left: menuPosition.x, top: menuPosition.y }}>
            <Menu
              items={contextMenuItems}
              isOpen={menuOpen}
              onOpenChange={setMenuOpen}
              placement="bottom-start"
            />
          </div>
        )}
      </div>
    );
  },
};

export const IconButtonTrigger: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Menu items={basicItems} trigger={<IconButton icon="⚙️" />} />
      <Menu
        items={[
          { id: 'profile', label: 'Profile', icon: '👤' },
          { id: 'settings', label: 'Settings', icon: '⚙️' },
          { id: 'divider', divider: true },
          { id: 'logout', label: 'Logout', icon: '🚪', danger: true },
        ]}
        trigger={<IconButton icon="👤" variant="secondary" />}
        placement="bottom-end"
      />
    </div>
  ),
};

export const ControlledMenu: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <Button onClick={() => setIsOpen(true)} variant="primary">
            Open Menu
          </Button>
          <Button onClick={() => setIsOpen(false)} variant="secondary">
            Close Menu
          </Button>
        </div>

        <Menu
          items={basicItems}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          trigger={<Button>Controlled Menu</Button>}
        />
      </div>
    );
  },
};

export const LongList: Story = {
  render: () => {
    const longItems = Array.from({ length: 20 }, (_, i) => ({
      id: `item-${i}`,
      label: `Menu Item ${i + 1}`,
      icon: i % 3 === 0 ? '📄' : i % 3 === 1 ? '📁' : '⚙️',
    }));

    return <Menu items={longItems} trigger={<Button>Long Menu List</Button>} />;
  },
};
