import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SpiderGraph } from './SpiderGraph';
import { Button } from '../Button/Button';

const meta = {
  title: 'Data Display/SpiderGraph',
  component: SpiderGraph,
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
    size: { control: { type: 'number', min: 200, max: 600, step: 50 } },
    levels: { control: { type: 'number', min: 3, max: 10, step: 1 } },
    showValues: { control: 'boolean' },
    showLabels: { control: 'boolean' },
    showGrid: { control: 'boolean' },
    showAxes: { control: 'boolean' },
    showDots: { control: 'boolean' },
    animate: { control: 'boolean' },
    fillOpacity: { control: { type: 'number', min: 0, max: 1, step: 0.1 } },
    strokeWidth: { control: { type: 'number', min: 1, max: 5, step: 0.5 } },
    variant: {
      control: { type: 'select' },
      options: ['default', 'minimal', 'detailed', 'cyber'],
    },
  },
} satisfies Meta<typeof SpiderGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultData = [
  { label: 'Speed', value: 85 },
  { label: 'Power', value: 70 },
  { label: 'Defense', value: 60 },
  { label: 'Agility', value: 90 },
  { label: 'Stamina', value: 75 },
];

export const Default: Story = {
  args: {
    data: defaultData,
    size: 300,
  },
};

export const CharacterStats: Story = {
  render: () => {
    const stats = [
      { label: 'STR', value: 75 },
      { label: 'DEX', value: 90 },
      { label: 'CON', value: 65 },
      { label: 'INT', value: 80 },
      { label: 'WIS', value: 70 },
      { label: 'CHA', value: 85 },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        <h3 style={{ color: '#bdbdbd', margin: 0 }}>Character Attributes</h3>
        <SpiderGraph data={stats} size={350} fillColor="#50fa7b" strokeColor="#50fa7b" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            fontSize: '12px',
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label} style={{ display: 'flex', gap: '8px', color: '#8a8a8a' }}>
              <span>{stat.label}:</span>
              <span style={{ color: '#50fa7b', fontWeight: 'bold' }}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ color: '#bdbdbd', marginBottom: '16px' }}>Default</h4>
        <SpiderGraph data={defaultData} size={250} variant="default" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ color: '#bdbdbd', marginBottom: '16px' }}>Minimal</h4>
        <SpiderGraph data={defaultData} size={250} variant="minimal" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ color: '#bdbdbd', marginBottom: '16px' }}>Detailed</h4>
        <SpiderGraph data={defaultData} size={250} variant="detailed" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ color: '#bdbdbd', marginBottom: '16px' }}>Cyber</h4>
        <SpiderGraph data={defaultData} size={250} variant="cyber" />
      </div>
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <SpiderGraph data={defaultData.slice(0, 3)} size={200} />
      <SpiderGraph data={defaultData.slice(0, 4)} size={300} />
      <SpiderGraph data={defaultData} size={400} />
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px' }}>
      <SpiderGraph
        data={defaultData}
        size={280}
        fillColor="#ff5555"
        strokeColor="#ff5555"
        gridColor="#5a5a5a"
      />
      <SpiderGraph
        data={defaultData}
        size={280}
        fillColor="#f1fa8c"
        strokeColor="#f1fa8c"
        gridColor="#4a4a3a"
      />
      <SpiderGraph
        data={defaultData}
        size={280}
        fillColor="#61dafb"
        strokeColor="#61dafb"
        gridColor="#3a4a5a"
      />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [data, setData] = React.useState([
      { label: 'Health', value: 80 },
      { label: 'Attack', value: 65 },
      { label: 'Defense', value: 70 },
      { label: 'Speed', value: 85 },
      { label: 'Magic', value: 55 },
    ]);

    const randomize = () => {
      setData(
        data.map((d) => ({
          ...d,
          value: Math.floor(Math.random() * 70) + 30,
        })),
      );
    };

    const maximize = () => {
      setData(data.map((d) => ({ ...d, value: 100 })));
    };

    const reset = () => {
      setData([
        { label: 'Health', value: 80 },
        { label: 'Attack', value: 65 },
        { label: 'Defense', value: 70 },
        { label: 'Speed', value: 85 },
        { label: 'Magic', value: 55 },
      ]);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        <SpiderGraph data={data} size={350} animate />
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="small" onClick={randomize}>
            Randomize
          </Button>
          <Button size="small" onClick={maximize}>
            Max Stats
          </Button>
          <Button size="small" variant="ghost" onClick={reset}>
            Reset
          </Button>
        </div>
      </div>
    );
  },
};

export const PerformanceMetrics: Story = {
  render: () => {
    const metrics = [
      { label: 'CPU', value: 45 },
      { label: 'Memory', value: 67 },
      { label: 'Disk I/O', value: 35 },
      { label: 'Network', value: 82 },
      { label: 'GPU', value: 71 },
      { label: 'Temp', value: 58 },
    ];

    return (
      <div
        style={{
          padding: '24px',
          background: '#1f1d20',
          border: '1px solid #3a3a3a',
          display: 'inline-block',
        }}
      >
        <h3 style={{ color: '#bdbdbd', margin: '0 0 24px 0', textAlign: 'center' }}>
          System Performance
        </h3>
        <SpiderGraph
          data={metrics}
          size={400}
          levels={4}
          fillColor="#61dafb"
          strokeColor="#61dafb"
          fillOpacity={0.15}
          showValues
        />
        <div
          style={{
            marginTop: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
          }}
        >
          {metrics.map((metric) => (
            <div
              key={metric.label}
              style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}
            >
              <span style={{ color: '#8a8a8a' }}>{metric.label}:</span>
              <span
                style={{
                  color: metric.value > 75 ? '#ff5555' : metric.value > 50 ? '#f1fa8c' : '#50fa7b',
                  fontWeight: 'bold',
                  fontFamily: 'var(--font-family-mono)',
                }}
              >
                {metric.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const SkillComparison: Story = {
  render: () => {
    const skills = [
      { label: 'JavaScript', value: 90 },
      { label: 'TypeScript', value: 85 },
      { label: 'React', value: 95 },
      { label: 'Node.js', value: 75 },
      { label: 'Python', value: 60 },
      { label: 'SQL', value: 70 },
      { label: 'DevOps', value: 65 },
      { label: 'UI/UX', value: 80 },
    ];

    return (
      <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
        <SpiderGraph
          data={skills}
          size={450}
          variant="detailed"
          fillColor="#50fa7b"
          strokeColor="#50fa7b"
        />
        <div>
          <h3 style={{ color: '#bdbdbd', marginBottom: '16px' }}>Skill Proficiency</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {skills.map((skill) => (
              <div key={skill.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#8a8a8a', width: '100px', fontSize: '12px' }}>
                  {skill.label}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: '4px',
                    background: '#3a3a3a',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      height: '100%',
                      width: `${skill.value}%`,
                      background: '#50fa7b',
                      transition: 'width 0.5s ease',
                    }}
                  />
                </div>
                <span
                  style={{
                    color: '#50fa7b',
                    fontSize: '12px',
                    fontFamily: 'var(--font-family-mono)',
                    width: '35px',
                    textAlign: 'right',
                  }}
                >
                  {skill.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

export const MinimalThreePoint: Story = {
  args: {
    data: [
      { label: 'Speed', value: 90 },
      { label: 'Quality', value: 75 },
      { label: 'Cost', value: 60 },
    ],
    size: 300,
    variant: 'minimal',
    fillColor: '#f1fa8c',
    strokeColor: '#f1fa8c',
  },
};

export const CyberSecurity: Story = {
  render: () => {
    const threats = [
      { label: 'Malware', value: 35 },
      { label: 'Phishing', value: 78 },
      { label: 'DDoS', value: 45 },
      { label: 'Insider', value: 62 },
      { label: 'Zero-Day', value: 23 },
      { label: 'Ransomware', value: 89 },
    ];

    return (
      <div
        style={{
          background: 'linear-gradient(135deg, #0b0b0d 0%, #1a1a2e 100%)',
          padding: '32px',
          border: '2px solid #61dafb',
          boxShadow: '0 0 30px rgba(97, 218, 251, 0.3)',
        }}
      >
        <h2
          style={{
            color: '#61dafb',
            textAlign: 'center',
            margin: '0 0 32px 0',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontFamily: 'var(--font-family-mono)',
          }}
        >
          Threat Analysis
        </h2>
        <SpiderGraph data={threats} size={400} variant="cyber" animate />
        <div
          style={{
            marginTop: '24px',
            padding: '16px',
            background: 'rgba(97, 218, 251, 0.05)',
            border: '1px solid rgba(97, 218, 251, 0.3)',
          }}
        >
          <p style={{ color: '#61dafb', margin: 0, fontSize: '12px', textAlign: 'center' }}>
            THREAT LEVEL: <span style={{ color: '#ff5555', fontWeight: 'bold' }}>HIGH</span>
          </p>
        </div>
      </div>
    );
  },
};
