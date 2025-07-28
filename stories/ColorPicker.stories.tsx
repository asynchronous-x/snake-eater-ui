import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ColorPicker } from './ColorPicker';

const meta = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
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
    showAlpha: { control: 'boolean' },
    showInput: { control: 'boolean' },
    disabled: { control: 'boolean' },
    inline: { control: 'boolean' },
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '#50fa7b',
  },
};

export const Controlled: Story = {
  render: () => {
    const [color, setColor] = useState('#ffb86c');
    
    return (
      <div>
        <ColorPicker value={color} onChange={setColor} />
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div 
            style={{ 
              width: '100px', 
              height: '40px', 
              backgroundColor: color,
              border: '1px solid #3a3a3a',
            }} 
          />
          <span style={{ color: '#bdbdbd', fontFamily: 'monospace' }}>{color}</span>
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      <ColorPicker size="small" value="#ff5555" />
      <ColorPicker size="medium" value="#61dafb" />
      <ColorPicker size="large" value="#bd93f9" />
    </div>
  ),
};

export const WithAlpha: Story = {
  render: () => {
    const [color, setColor] = useState('#50fa7b');
    
    return (
      <div>
        <ColorPicker 
          value={color} 
          onChange={setColor}
          showAlpha
        />
        <p style={{ marginTop: '16px', color: '#8e8e90' }}>
          Alpha channel support for transparency control
        </p>
      </div>
    );
  },
};

export const CustomPresets: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px' }}>
      <div>
        <h4 style={{ color: '#bdbdbd', marginBottom: '12px' }}>Brand Colors</h4>
        <ColorPicker
          presets={[
            '#007bff', '#6610f2', '#e83e8c', '#fd7e14',
            '#28a745', '#20c997', '#ffc107', '#dc3545',
          ]}
        />
      </div>
      <div>
        <h4 style={{ color: '#bdbdbd', marginBottom: '12px' }}>Monochrome</h4>
        <ColorPicker
          presets={[
            '#000000', '#212529', '#495057', '#6c757d',
            '#adb5bd', '#ced4da', '#e9ecef', '#ffffff',
          ]}
        />
      </div>
    </div>
  ),
};

export const NoPresets: Story = {
  render: () => (
    <ColorPicker presets={[]} value="#ff79c6" />
  ),
};

export const NoInput: Story = {
  render: () => (
    <ColorPicker showInput={false} value="#f1fa8c" />
  ),
};

export const Inline: Story = {
  render: () => {
    const [color, setColor] = useState('#8be9fd');
    
    return (
      <div style={{ 
        backgroundColor: '#1f1d20',
        border: '1px solid #3a3a3a',
        padding: '24px',
        maxWidth: '320px',
      }}>
        <h3 style={{ color: '#bdbdbd', marginTop: 0, marginBottom: '16px' }}>
          Choose Theme Color
        </h3>
        <ColorPicker 
          value={color} 
          onChange={setColor}
          inline
        />
        <div style={{ 
          marginTop: '16px',
          padding: '12px',
          backgroundColor: color,
          color: '#000',
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
          Preview Text
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <ColorPicker value="#50fa7b" disabled />
      <ColorPicker value="#ff5555" disabled inline />
    </div>
  ),
};

export const MultipleColorPickers: Story = {
  render: () => {
    const [colors, setColors] = useState({
      primary: '#50fa7b',
      secondary: '#ffb86c',
      danger: '#ff5555',
      info: '#61dafb',
    });
    
    const updateColor = (key: string, value: string) => {
      setColors({ ...colors, [key]: value });
    };
    
    return (
      <div style={{ 
        backgroundColor: '#1f1d20',
        border: '1px solid #3a3a3a',
        padding: '24px',
      }}>
        <h3 style={{ color: '#bdbdbd', marginTop: 0, marginBottom: '16px' }}>
          Theme Configuration
        </h3>
        <div style={{ display: 'grid', gap: '16px' }}>
          {Object.entries(colors).map(([key, value]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <label style={{ 
                color: '#8e8e90', 
                width: '100px',
                textTransform: 'capitalize',
              }}>
                {key}:
              </label>
              <ColorPicker 
                value={value} 
                onChange={(color) => updateColor(key, color)}
                size="small"
              />
            </div>
          ))}
        </div>
        
        <div style={{ 
          marginTop: '24px',
          padding: '16px',
          backgroundColor: '#0b0b0d',
          border: '1px solid #3a3a3a',
        }}>
          <h4 style={{ color: '#bdbdbd', marginTop: 0, marginBottom: '12px' }}>Preview</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ 
              padding: '8px 16px',
              backgroundColor: colors.primary,
              border: 'none',
              color: '#000',
            }}>
              Primary
            </button>
            <button style={{ 
              padding: '8px 16px',
              backgroundColor: colors.secondary,
              border: 'none',
              color: '#000',
            }}>
              Secondary
            </button>
            <button style={{ 
              padding: '8px 16px',
              backgroundColor: colors.danger,
              border: 'none',
              color: '#fff',
            }}>
              Danger
            </button>
            <button style={{ 
              padding: '8px 16px',
              backgroundColor: colors.info,
              border: 'none',
              color: '#000',
            }}>
              Info
            </button>
          </div>
        </div>
      </div>
    );
  },
};