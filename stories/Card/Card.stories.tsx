import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card } from './Card';
import { Button } from '../Button/Button';

const meta = {
  title: 'Layout/Card',
  component: Card,
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
      options: ['default', 'grid', 'transparent'],
    },
    interactive: { control: 'boolean' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <h3>Card Title</h3>
        <p>
          This is a card component with decorative corner elbows. It features a dark background and
          subtle border styling.
        </p>
      </>
    ),
  },
};

export const WithHeader: Story = {
  args: {
    header: <h3>Card Header</h3>,
    children: <p>Card content goes here. The header is separated with a border.</p>,
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: <h3>Featured Content</h3>,
    children: (
      <>
        <p>This card demonstrates all three sections: header, content, and footer.</p>
        <p>Each section is visually separated with borders.</p>
      </>
    ),
    footer: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button size="small" variant="primary">
          Action
        </Button>
        <Button size="small" variant="ghost">
          Cancel
        </Button>
      </div>
    ),
  },
};

export const Interactive: Story = {
  args: {
    interactive: true,
    onClick: () => console.log('Card clicked'),
    children: (
      <>
        <h3>Interactive Card</h3>
        <p>This card is clickable. Hover to see the interactive state.</p>
      </>
    ),
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: <p>Small card with less padding and smaller corner elbows.</p>,
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    header: <h2>Large Card</h2>,
    children: (
      <>
        <p>This is a large card with more padding and larger corner elbows.</p>
        <p>The increased size makes it suitable for featured content or important information.</p>
      </>
    ),
  },
};

export const ComplexContent: Story = {
  args: {
    header: <h3>System Status</h3>,
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>CPU Usage</span>
          <span style={{ color: '#50fa7b' }}>42%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Memory</span>
          <span style={{ color: '#f1fa8c' }}>67%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Storage</span>
          <span style={{ color: '#ff5555' }}>89%</span>
        </div>
      </div>
    ),
    footer: (
      <Button variant="cyber" size="small" fullWidth>
        View Details
      </Button>
    ),
  },
};

export const GridVariant: Story = {
  args: {
    variant: 'grid',
    header: <h3>Grid Background</h3>,
    children: (
      <>
        <p>This card features a subtle grid overlay on the background.</p>
        <p>The grid pattern adds visual texture while maintaining readability.</p>
      </>
    ),
  },
};

export const TransparentVariant: Story = {
  args: {
    variant: 'transparent',
    children: (
      <>
        <h3>Transparent Card</h3>
        <p>This card has a transparent background with only corner accents visible.</p>
        <p>Perfect for overlaying content on textured or gradient backgrounds.</p>
      </>
    ),
  },
};

export const GridInteractive: Story = {
  args: {
    variant: 'grid',
    interactive: true,
    onClick: () => console.log('Grid card clicked'),
    size: 'large',
    children: (
      <>
        <h3>Interactive Grid Card</h3>
        <p>Combines the grid variant with interactive functionality.</p>
        <p>Click to trigger an action.</p>
      </>
    ),
  },
};

export const TransitionExpand: Story = {
  args: {
    transitionIn: true,
    transitionType: 'expand',
    transitionSpeed: 500,
    children: (
      <>
        <h3>Horizontal Expanding Card</h3>
        <p>
          This card expands horizontally from the center, like the sides are stretching outward.
        </p>
        <p>The corner decorations slide in from the sides with a subtle glow effect.</p>
      </>
    ),
  },
};

export const TransitionFade: Story = {
  args: {
    transitionIn: true,
    transitionType: 'fade',
    transitionSpeed: 400,
    children: (
      <>
        <h3>Fading Card</h3>
        <p>Simple fade-in animation for a subtle appearance.</p>
      </>
    ),
  },
};

export const TransitionSlides: Story = {
  render: () => {
    const [key, setKey] = React.useState(0);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <Button onClick={() => setKey((k) => k + 1)}>Replay Animations</Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          <Card
            key={`slide-up-${key}`}
            transitionIn
            transitionType="slide-up"
            transitionSpeed={400}
            transitionDelay={0}
          >
            <h4>Slide Up</h4>
            <p>Slides up from below</p>
          </Card>

          <Card
            key={`slide-down-${key}`}
            transitionIn
            transitionType="slide-down"
            transitionSpeed={400}
            transitionDelay={100}
          >
            <h4>Slide Down</h4>
            <p>Slides down from above</p>
          </Card>

          <Card
            key={`slide-left-${key}`}
            transitionIn
            transitionType="slide-left"
            transitionSpeed={400}
            transitionDelay={200}
          >
            <h4>Slide Left</h4>
            <p>Slides in from the right</p>
          </Card>

          <Card
            key={`slide-right-${key}`}
            transitionIn
            transitionType="slide-right"
            transitionSpeed={400}
            transitionDelay={300}
          >
            <h4>Slide Right</h4>
            <p>Slides in from the left</p>
          </Card>
        </div>
      </div>
    );
  },
};

export const StaggeredCards: Story = {
  render: () => {
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
      setShow(true);
    }, []);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Button
          onClick={() => {
            setShow(false);
            setTimeout(() => setShow(true), 100);
          }}
        >
          Replay Animation
        </Button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <Card
              key={`card-${index}-${show}`}
              transitionIn={show}
              transitionType="expand"
              transitionSpeed={300}
              transitionDelay={index * 100}
              size="small"
            >
              <h4>Card {index + 1}</h4>
              <p>Staggered animation with {index * 100}ms delay</p>
            </Card>
          ))}
        </div>
      </div>
    );
  },
};

export const CustomSpeed: Story = {
  render: () => {
    const [speed, setSpeed] = React.useState(300);
    const [key, setKey] = React.useState(0);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <label style={{ color: '#bdbdbd' }}>Animation Speed: {speed}ms</label>
          <input
            type="range"
            min="100"
            max="2000"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            style={{ width: '200px' }}
          />
          <Button size="small" onClick={() => setKey((k) => k + 1)}>
            Replay
          </Button>
        </div>

        <Card
          key={key}
          transitionIn
          transitionType="expand"
          transitionSpeed={speed}
          variant="grid"
          size="large"
        >
          <h3>Variable Speed Card</h3>
          <p>Adjust the slider to change the animation speed.</p>
          <p>Current speed: {speed}ms</p>
        </Card>
      </div>
    );
  },
};

export const TransitionCallback: Story = {
  render: () => {
    const [status, setStatus] = React.useState('Waiting...');
    const [key, setKey] = React.useState(0);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Button
            onClick={() => {
              setStatus('Animating...');
              setKey((k) => k + 1);
            }}
          >
            Trigger Animation
          </Button>
          <span style={{ color: '#8a8a8a' }}>Status: {status}</span>
        </div>

        <Card
          key={key}
          transitionIn
          transitionType="expand"
          transitionSpeed={1000}
          onTransitionComplete={() => setStatus('Animation Complete!')}
        >
          <h3>Callback Example</h3>
          <p>This card triggers a callback when the transition completes.</p>
          <p>Watch the status text above change when animation finishes.</p>
        </Card>
      </div>
    );
  },
};
