import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { KeyboardKey } from './KeyboardKey';

const meta = {
  title: 'Data Display/KeyboardKey',
  component: KeyboardKey,
  parameters: {
    layout: 'centered',
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
      options: ['default', 'modifier', 'action', 'danger', 'space'],
    },
    pressed: { control: 'boolean' },
    disabled: { control: 'boolean' },
    width: { control: { type: 'number', min: 1, max: 10, step: 0.5 } },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
    },
  },
} satisfies Meta<typeof KeyboardKey>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'A',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <KeyboardKey size="small">S</KeyboardKey>
      <KeyboardKey size="medium">M</KeyboardKey>
      <KeyboardKey size="large">L</KeyboardKey>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <KeyboardKey>Default</KeyboardKey>
      <KeyboardKey variant="modifier">Ctrl</KeyboardKey>
      <KeyboardKey variant="action">Enter</KeyboardKey>
      <KeyboardKey variant="danger">Delete</KeyboardKey>
      <KeyboardKey variant="space" width={4}>
        Space
      </KeyboardKey>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <KeyboardKey>Normal</KeyboardKey>
      <KeyboardKey pressed>Pressed</KeyboardKey>
      <KeyboardKey disabled>Disabled</KeyboardKey>
      <KeyboardKey onClick={() => console.log('Clicked')}>Clickable</KeyboardKey>
    </div>
  ),
};

export const KeyboardShortcuts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <KeyboardKey variant="modifier">Ctrl</KeyboardKey>
        <span style={{ color: '#8a8a8a' }}>+</span>
        <KeyboardKey>C</KeyboardKey>
        <span style={{ color: '#bdbdbd', marginLeft: '16px' }}>Copy</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <KeyboardKey variant="modifier">Ctrl</KeyboardKey>
        <span style={{ color: '#8a8a8a' }}>+</span>
        <KeyboardKey>V</KeyboardKey>
        <span style={{ color: '#bdbdbd', marginLeft: '16px' }}>Paste</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <KeyboardKey variant="modifier">Ctrl</KeyboardKey>
        <span style={{ color: '#8a8a8a' }}>+</span>
        <KeyboardKey variant="modifier">Shift</KeyboardKey>
        <span style={{ color: '#8a8a8a' }}>+</span>
        <KeyboardKey>K</KeyboardKey>
        <span style={{ color: '#bdbdbd', marginLeft: '16px' }}>Command Palette</span>
      </div>
    </div>
  ),
};

export const SpecialKeys: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <KeyboardKey variant="modifier">Tab</KeyboardKey>
        <KeyboardKey variant="modifier" width={1.5}>
          Shift
        </KeyboardKey>
        <KeyboardKey variant="modifier">Ctrl</KeyboardKey>
        <KeyboardKey variant="modifier">Alt</KeyboardKey>
        <KeyboardKey variant="modifier" width={1.5}>
          Cmd
        </KeyboardKey>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <KeyboardKey variant="action" width={2}>
          Enter
        </KeyboardKey>
        <KeyboardKey variant="danger" width={1.5}>
          Delete
        </KeyboardKey>
        <KeyboardKey variant="danger">Esc</KeyboardKey>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <KeyboardKey>↑</KeyboardKey>
        <KeyboardKey>↓</KeyboardKey>
        <KeyboardKey>←</KeyboardKey>
        <KeyboardKey>→</KeyboardKey>
      </div>
    </div>
  ),
};

export const VirtualKeyboard: Story = {
  render: () => {
    const [pressed, setPressed] = React.useState<string | null>(null);

    const handleKeyPress = (key: string) => {
      console.log('Key pressed:', key);
      setPressed(key);
      setTimeout(() => setPressed(null), 100);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* First row - numbers */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='].map((key) => (
            <KeyboardKey key={key} onClick={() => handleKeyPress(key)} pressed={pressed === key}>
              {key}
            </KeyboardKey>
          ))}
          <KeyboardKey
            variant="danger"
            width={2}
            onClick={() => handleKeyPress('Backspace')}
            pressed={pressed === 'Backspace'}
          >
            ←
          </KeyboardKey>
        </div>

        {/* Second row - QWERTY */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <KeyboardKey
            variant="modifier"
            width={1.5}
            onClick={() => handleKeyPress('Tab')}
            pressed={pressed === 'Tab'}
          >
            Tab
          </KeyboardKey>
          {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'].map((key) => (
            <KeyboardKey key={key} onClick={() => handleKeyPress(key)} pressed={pressed === key}>
              {key}
            </KeyboardKey>
          ))}
        </div>

        {/* Third row - ASDF */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <KeyboardKey
            variant="modifier"
            width={1.75}
            onClick={() => handleKeyPress('Caps')}
            pressed={pressed === 'Caps'}
          >
            Caps
          </KeyboardKey>
          {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'"].map((key) => (
            <KeyboardKey key={key} onClick={() => handleKeyPress(key)} pressed={pressed === key}>
              {key}
            </KeyboardKey>
          ))}
          <KeyboardKey
            variant="action"
            width={2.25}
            onClick={() => handleKeyPress('Enter')}
            pressed={pressed === 'Enter'}
          >
            Enter
          </KeyboardKey>
        </div>

        {/* Fourth row - ZXCV */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <KeyboardKey
            variant="modifier"
            width={2.25}
            onClick={() => handleKeyPress('Shift')}
            pressed={pressed === 'Shift'}
          >
            Shift
          </KeyboardKey>
          {['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'].map((key) => (
            <KeyboardKey key={key} onClick={() => handleKeyPress(key)} pressed={pressed === key}>
              {key}
            </KeyboardKey>
          ))}
          <KeyboardKey
            variant="modifier"
            width={2.75}
            onClick={() => handleKeyPress('Shift')}
            pressed={pressed === 'Shift'}
          >
            Shift
          </KeyboardKey>
        </div>

        {/* Space bar row */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <KeyboardKey
            variant="modifier"
            width={1.25}
            onClick={() => handleKeyPress('Ctrl')}
            pressed={pressed === 'Ctrl'}
          >
            Ctrl
          </KeyboardKey>
          <KeyboardKey
            variant="modifier"
            width={1.25}
            onClick={() => handleKeyPress('Win')}
            pressed={pressed === 'Win'}
          >
            Win
          </KeyboardKey>
          <KeyboardKey
            variant="modifier"
            width={1.25}
            onClick={() => handleKeyPress('Alt')}
            pressed={pressed === 'Alt'}
          >
            Alt
          </KeyboardKey>
          <KeyboardKey
            variant="space"
            width={6.25}
            onClick={() => handleKeyPress('Space')}
            pressed={pressed === 'Space'}
          ></KeyboardKey>
          <KeyboardKey
            variant="modifier"
            width={1.25}
            onClick={() => handleKeyPress('Alt')}
            pressed={pressed === 'Alt'}
          >
            Alt
          </KeyboardKey>
          <KeyboardKey
            variant="modifier"
            width={1.25}
            onClick={() => handleKeyPress('Fn')}
            pressed={pressed === 'Fn'}
          >
            Fn
          </KeyboardKey>
          <KeyboardKey
            variant="modifier"
            width={1.25}
            onClick={() => handleKeyPress('Menu')}
            pressed={pressed === 'Menu'}
          >
            ☰
          </KeyboardKey>
          <KeyboardKey
            variant="modifier"
            width={1.25}
            onClick={() => handleKeyPress('Ctrl')}
            pressed={pressed === 'Ctrl'}
          >
            Ctrl
          </KeyboardKey>
        </div>
      </div>
    );
  },
};
