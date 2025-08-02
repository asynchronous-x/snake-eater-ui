import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Slider } from './Slider';

const meta = {
  title: 'Forms/Slider',
  component: Slider,
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
      options: ['default', 'success', 'warning', 'danger', 'info'],
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    valueLabelPosition: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'tooltip'],
    },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    showValue: { control: 'boolean' },
    showTicks: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(50);

    return <Slider value={value} onChange={setValue} />;
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(30);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Slider value={value} onChange={setValue} showValue valueLabelPosition="bottom" />
        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            onClick={() => setValue(0)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#1f1d20',
              border: '1px solid #3a3a3a',
              color: '#bdbdbd',
              cursor: 'pointer',
            }}
          >
            Reset
          </button>
          <button
            onClick={() => setValue(50)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#1f1d20',
              border: '1px solid #3a3a3a',
              color: '#bdbdbd',
              cursor: 'pointer',
            }}
          >
            50%
          </button>
          <button
            onClick={() => setValue(100)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#1f1d20',
              border: '1px solid #3a3a3a',
              color: '#bdbdbd',
              cursor: 'pointer',
            }}
          >
            Max
          </button>
        </div>
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <Slider value={50} variant="default" label="Default" />
      <Slider value={60} variant="success" label="Success" />
      <Slider value={70} variant="warning" label="Warning" />
      <Slider value={30} variant="danger" label="Danger" />
      <Slider value={80} variant="info" label="Info" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <Slider value={40} size="small" label="Small" />
      <Slider value={50} size="medium" label="Medium" />
      <Slider value={60} size="large" label="Large" />
    </div>
  ),
};

export const WithValue: Story = {
  render: () => {
    const [value1, setValue1] = useState(25);
    const [value2, setValue2] = useState(50);
    const [value3, setValue3] = useState(75);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h4 style={{ color: '#bdbdbd', marginBottom: '12px' }}>Top Position</h4>
          <Slider value={value1} onChange={setValue1} showValue valueLabelPosition="top" />
        </div>
        <div>
          <h4 style={{ color: '#bdbdbd', marginBottom: '12px' }}>Bottom Position</h4>
          <Slider value={value2} onChange={setValue2} showValue valueLabelPosition="bottom" />
        </div>
        <div>
          <h4 style={{ color: '#bdbdbd', marginBottom: '12px' }}>Tooltip (hover to see)</h4>
          <Slider value={value3} onChange={setValue3} showValue valueLabelPosition="tooltip" />
        </div>
      </div>
    );
  },
};

export const WithTicks: Story = {
  render: () => {
    const [value, setValue] = useState(60);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <Slider
          value={value}
          onChange={setValue}
          showTicks
          tickInterval={10}
          label="With tick marks"
        />
        <Slider
          value={value}
          onChange={setValue}
          showTicks
          tickInterval={25}
          label="Custom tick interval (25)"
        />
      </div>
    );
  },
};

export const WithMarks: Story = {
  render: () => {
    const [value, setValue] = useState(50);

    const marks = [
      { value: 0, label: 'Min' },
      { value: 25, label: '25%' },
      { value: 50, label: 'Mid' },
      { value: 75, label: '75%' },
      { value: 100, label: 'Max' },
    ];

    return (
      <div style={{ marginBottom: '40px' }}>
        <Slider value={value} onChange={setValue} marks={marks} label="Custom marks with labels" />
      </div>
    );
  },
};

export const Steps: Story = {
  render: () => {
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(50);
    const [value3, setValue3] = useState(5);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <Slider
          value={value1}
          onChange={setValue1}
          step={10}
          showValue
          valueLabelPosition="bottom"
          label="Step: 10"
        />
        <Slider
          value={value2}
          onChange={setValue2}
          step={25}
          showValue
          valueLabelPosition="bottom"
          label="Step: 25"
        />
        <Slider
          value={value3}
          onChange={setValue3}
          min={0}
          max={10}
          step={0.5}
          showValue
          valueLabelPosition="bottom"
          label="Step: 0.5"
        />
      </div>
    );
  },
};

export const CustomRange: Story = {
  render: () => {
    const [value1, setValue1] = useState(50);
    const [value2, setValue2] = useState(0);
    const [value3, setValue3] = useState(20);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <Slider
          value={value1}
          onChange={setValue1}
          min={0}
          max={255}
          showValue
          label="RGB Value (0-255)"
        />
        <Slider
          value={value2}
          onChange={setValue2}
          min={-100}
          max={100}
          showValue
          label="Temperature (-100 to 100)"
          variant="info"
        />
        <Slider
          value={value3}
          onChange={setValue3}
          min={0}
          max={100}
          showValue
          label="Volume"
          formatValue={(v) => `${v}%`}
          variant="success"
        />
      </div>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    const [value1, setValue1] = useState(30);
    const [value2, setValue2] = useState(60);
    const [value3, setValue3] = useState(80);

    return (
      <div style={{ display: 'flex', gap: '60px', height: '300px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h4 style={{ color: '#bdbdbd', marginBottom: '12px' }}>Small</h4>
          <Slider
            value={value1}
            onChange={setValue1}
            orientation="vertical"
            size="small"
            variant="success"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h4 style={{ color: '#bdbdbd', marginBottom: '12px' }}>Medium</h4>
          <Slider
            value={value2}
            onChange={setValue2}
            orientation="vertical"
            showValue
            valueLabelPosition="tooltip"
            variant="warning"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h4 style={{ color: '#bdbdbd', marginBottom: '12px' }}>Large</h4>
          <Slider
            value={value3}
            onChange={setValue3}
            orientation="vertical"
            size="large"
            showTicks
            tickInterval={20}
            variant="danger"
          />
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Slider value={30} disabled label="Disabled slider" />
      <Slider value={70} disabled variant="success" showValue label="Disabled with value" />
    </div>
  ),
};

export const AudioMixer: Story = {
  render: () => {
    const [master, setMaster] = useState(80);
    const [music, setMusic] = useState(60);
    const [effects, setEffects] = useState(90);
    const [voice, setVoice] = useState(70);

    return (
      <div
        style={{
          backgroundColor: '#1f1d20',
          border: '1px solid #3a3a3a',
          padding: '24px',
          maxWidth: '400px',
        }}
      >
        <h3 style={{ color: '#bdbdbd', marginTop: 0, marginBottom: '24px' }}>Audio Mixer</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Slider
            value={master}
            onChange={setMaster}
            label="Master Volume"
            showValue
            valueLabelPosition="bottom"
            formatValue={(v) => `${v}%`}
            variant="default"
          />
          <Slider
            value={music}
            onChange={setMusic}
            label="Music"
            showValue
            valueLabelPosition="bottom"
            formatValue={(v) => `${v}%`}
            variant="info"
          />
          <Slider
            value={effects}
            onChange={setEffects}
            label="Sound Effects"
            showValue
            valueLabelPosition="bottom"
            formatValue={(v) => `${v}%`}
            variant="success"
          />
          <Slider
            value={voice}
            onChange={setVoice}
            label="Voice Chat"
            showValue
            valueLabelPosition="bottom"
            formatValue={(v) => `${v}%`}
            variant="warning"
          />
        </div>
      </div>
    );
  },
};

export const ColorPicker: Story = {
  render: () => {
    const [r, setR] = useState(80);
    const [g, setG] = useState(250);
    const [b, setB] = useState(123);

    const color = `rgb(${r}, ${g}, ${b})`;

    return (
      <div
        style={{
          backgroundColor: '#1f1d20',
          border: '1px solid #3a3a3a',
          padding: '24px',
          maxWidth: '400px',
        }}
      >
        <h3 style={{ color: '#bdbdbd', marginTop: 0, marginBottom: '24px' }}>RGB Color Picker</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Slider
            value={r}
            onChange={setR}
            min={0}
            max={255}
            label="Red"
            showValue
            variant="danger"
            size="small"
          />
          <Slider
            value={g}
            onChange={setG}
            min={0}
            max={255}
            label="Green"
            showValue
            variant="success"
            size="small"
          />
          <Slider
            value={b}
            onChange={setB}
            min={0}
            max={255}
            label="Blue"
            showValue
            variant="info"
            size="small"
          />
        </div>

        <div
          style={{
            marginTop: '24px',
            height: '60px',
            backgroundColor: color,
            border: '1px solid #3a3a3a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'monospace',
            fontSize: '14px',
            color: r + g + b > 380 ? '#000' : '#fff',
          }}
        >
          {color}
        </div>
      </div>
    );
  },
};
