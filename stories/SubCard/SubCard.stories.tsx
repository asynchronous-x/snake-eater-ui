import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SubCard } from './SubCard';
import { Button } from '../Button/Button';

const meta = {
  title: 'Layout/SubCard',
  component: SubCard,
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
      options: ['default', 'success', 'warning', 'danger', 'info', 'inactive'],
    },
    interactive: { control: 'boolean' },
    cornerColor: { control: 'color' },
    transitionIn: { control: 'boolean' },
    transitionType: {
      control: { type: 'select' },
      options: ['expand', 'fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right'],
    },
    transitionSpeed: { control: { type: 'number', min: 100, max: 2000, step: 100 } },
    transitionDelay: { control: { type: 'number', min: 0, max: 1000, step: 50 } },
  },
} satisfies Meta<typeof SubCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <h3>SubCard Title</h3>
        <p>
          This is a SubCard component with plus symbols in the corners. It provides an alternative
          card styling.
        </p>
      </>
    ),
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: (
      <>
        <h3>Success Status</h3>
        <p>Operation completed successfully. All systems are operational.</p>
      </>
    ),
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    header: <h3>Warning</h3>,
    children: <p>Some services are experiencing degraded performance. Monitor closely.</p>,
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    interactive: true,
    onClick: () => console.log('Danger card clicked'),
    children: (
      <>
        <h3>Critical Alert</h3>
        <p>System failure detected. Immediate action required.</p>
      </>
    ),
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: (
      <>
        <h3>Information</h3>
        <p>New updates are available. Review the changelog for details.</p>
      </>
    ),
  },
};

export const Inactive: Story = {
  args: {
    variant: 'inactive',
    interactive: true,
    children: (
      <>
        <h3>Disabled Feature</h3>
        <p>This feature is currently unavailable. It will be enabled in a future update.</p>
      </>
    ),
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: <h3>Task Details</h3>,
    children: (
      <>
        <p>This SubCard demonstrates all three sections with custom styling.</p>
        <p>The plus symbols adapt to the card's color variant.</p>
      </>
    ),
    footer: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button size="small" variant="primary">
          Approve
        </Button>
        <Button size="small" variant="ghost">
          Reject
        </Button>
      </div>
    ),
  },
};

export const Interactive: Story = {
  args: {
    interactive: true,
    onClick: () => console.log('SubCard clicked'),
    children: (
      <>
        <h3>Interactive SubCard</h3>
        <p>Click me! The card and corner symbols respond to interaction.</p>
      </>
    ),
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    variant: 'success',
    children: <p>Small SubCard with proportionally sized corner symbols.</p>,
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    variant: 'info',
    header: <h2>Large SubCard</h2>,
    children: (
      <>
        <p>This is a large SubCard with bigger corner symbols.</p>
        <p>Perfect for featured content or important notifications.</p>
      </>
    ),
  },
};

export const VariantShowcase: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      }}
    >
      <SubCard>
        <h4>Default</h4>
        <p>Standard appearance</p>
      </SubCard>
      <SubCard variant="success">
        <h4>Success</h4>
        <p>Positive feedback</p>
      </SubCard>
      <SubCard variant="warning">
        <h4>Warning</h4>
        <p>Caution required</p>
      </SubCard>
      <SubCard variant="danger">
        <h4>Danger</h4>
        <p>Critical issue</p>
      </SubCard>
      <SubCard variant="info">
        <h4>Info</h4>
        <p>Informational</p>
      </SubCard>
      <SubCard variant="inactive">
        <h4>Inactive</h4>
        <p>Disabled state</p>
      </SubCard>
    </div>
  ),
};

export const InteractiveVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      }}
    >
      <SubCard interactive onClick={() => console.log('Default clicked')}>
        <h4>Click Me</h4>
        <p>Interactive default</p>
      </SubCard>
      <SubCard variant="success" interactive onClick={() => console.log('Success clicked')}>
        <h4>Success Action</h4>
        <p>Click to proceed</p>
      </SubCard>
      <SubCard variant="danger" interactive onClick={() => console.log('Danger clicked')}>
        <h4>Delete Item</h4>
        <p>Click to remove</p>
      </SubCard>
      <SubCard variant="inactive" interactive onClick={() => console.log('Inactive clicked')}>
        <h4>Unavailable</h4>
        <p>Cannot interact</p>
      </SubCard>
    </div>
  ),
};

export const CustomCornerColor: Story = {
  args: {
    cornerColor: '#f1fa8c',
    children: (
      <>
        <h3>Custom Corner Color</h3>
        <p>This SubCard has yellow corner symbols while maintaining the default card styling.</p>
      </>
    ),
  },
};

export const MixedStyles: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      }}
    >
      <SubCard variant="success" cornerColor="#ff5555">
        <h4>Success with Red Corners</h4>
        <p>Green card with red corner symbols</p>
      </SubCard>
      <SubCard variant="danger" cornerColor="#50fa7b">
        <h4>Danger with Green Corners</h4>
        <p>Red card with green corner symbols</p>
      </SubCard>
      <SubCard variant="info" cornerColor="#f1fa8c">
        <h4>Info with Yellow Corners</h4>
        <p>Blue card with yellow corner symbols</p>
      </SubCard>
      <SubCard cornerColor="#61dafb">
        <h4>Default with Blue Corners</h4>
        <p>Default card with custom blue corners</p>
      </SubCard>
    </div>
  ),
};

export const AlignedRow: Story = {
  render: () => (
    <>
      <h3 style={{ marginBottom: '20px', color: '#bdbdbd' }}>Perfect Corner Alignment</h3>
      <p style={{ marginBottom: '20px', color: '#8a8a8a' }}>
        When SubCards are placed directly adjacent (no gap), the corner accents align perfectly:
      </p>
      <div className="snake-subcard-row">
        <SubCard>
          <h4>Card One</h4>
          <p>The corners align perfectly when cards touch.</p>
        </SubCard>
        <SubCard variant="success">
          <h4>Card Two</h4>
          <p>Notice how the + symbols stack at the borders.</p>
        </SubCard>
        <SubCard variant="info">
          <h4>Card Three</h4>
          <p>Creates a continuous visual line.</p>
        </SubCard>
      </div>

      <h3 style={{ marginTop: '40px', marginBottom: '20px', color: '#bdbdbd' }}>Grid Layout</h3>
      <div className="snake-subcard-grid snake-subcard-grid--3" style={{ marginBottom: '20px' }}>
        <SubCard size="small">
          <h5>Grid Item 1</h5>
          <p>Small size</p>
        </SubCard>
        <SubCard size="small" variant="warning">
          <h5>Grid Item 2</h5>
          <p>Small size</p>
        </SubCard>
        <SubCard size="small" variant="danger">
          <h5>Grid Item 3</h5>
          <p>Small size</p>
        </SubCard>
        <SubCard size="small" variant="info">
          <h5>Grid Item 4</h5>
          <p>Small size</p>
        </SubCard>
        <SubCard size="small" variant="success">
          <h5>Grid Item 5</h5>
          <p>Small size</p>
        </SubCard>
        <SubCard size="small">
          <h5>Grid Item 6</h5>
          <p>Small size</p>
        </SubCard>
      </div>
    </>
  ),
};

export const TransitionExpand: Story = {
  args: {
    transitionIn: true,
    transitionType: 'expand',
    transitionSpeed: 500,
    variant: 'success',
    children: (
      <>
        <h3>Horizontal Expand Animation</h3>
        <p>The card expands horizontally from the center with rotating plus corners.</p>
        <p>This creates a dramatic reveal effect with staggered corner animations.</p>
      </>
    ),
  },
};

export const TransitionFade: Story = {
  args: {
    transitionIn: true,
    transitionType: 'fade',
    transitionSpeed: 300,
    variant: 'info',
    children: (
      <>
        <h3>Fade In Effect</h3>
        <p>Simple opacity transition for a subtle entrance.</p>
      </>
    ),
  },
};

export const TransitionSlideUp: Story = {
  args: {
    transitionIn: true,
    transitionType: 'slide-up',
    transitionSpeed: 400,
    children: (
      <>
        <h3>Slide Up Animation</h3>
        <p>The card slides up from below while fading in.</p>
      </>
    ),
  },
};

export const TransitionShowcase: Story = {
  render: () => {
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
      setShow(true);
    }, []);

    return (
      <div>
        <div style={{ marginBottom: '32px' }}>
          <Button
            onClick={() => {
              setShow(false);
              setTimeout(() => setShow(true), 100);
            }}
          >
            Replay Animations
          </Button>
        </div>
        <div
          style={{
            display: 'grid',
            gap: '16px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          }}
        >
          <SubCard
            key={`expand-${show}`}
            transitionIn={show}
            transitionType="expand"
            transitionSpeed={500}
            transitionDelay={0}
            variant="success"
          >
            <h4>Expand (0ms delay)</h4>
            <p>Horizontal expansion with rotating corners</p>
          </SubCard>
          <SubCard
            key={`fade-${show}`}
            transitionIn={show}
            transitionType="fade"
            transitionSpeed={400}
            transitionDelay={100}
            variant="info"
          >
            <h4>Fade (100ms delay)</h4>
            <p>Simple opacity transition</p>
          </SubCard>
          <SubCard
            key={`slide-up-${show}`}
            transitionIn={show}
            transitionType="slide-up"
            transitionSpeed={400}
            transitionDelay={200}
            variant="warning"
          >
            <h4>Slide Up (200ms delay)</h4>
            <p>Slides from below</p>
          </SubCard>
          <SubCard
            key={`slide-down-${show}`}
            transitionIn={show}
            transitionType="slide-down"
            transitionSpeed={400}
            transitionDelay={300}
          >
            <h4>Slide Down (300ms delay)</h4>
            <p>Slides from above</p>
          </SubCard>
          <SubCard
            key={`slide-left-${show}`}
            transitionIn={show}
            transitionType="slide-left"
            transitionSpeed={400}
            transitionDelay={400}
            variant="danger"
          >
            <h4>Slide Left (400ms delay)</h4>
            <p>Slides from right</p>
          </SubCard>
          <SubCard
            key={`slide-right-${show}`}
            transitionIn={show}
            transitionType="slide-right"
            transitionSpeed={400}
            transitionDelay={500}
            cornerColor="#f1fa8c"
          >
            <h4>Slide Right (500ms delay)</h4>
            <p>Slides from left with custom corners</p>
          </SubCard>
        </div>
      </div>
    );
  },
};

export const StaggeredTransitions: Story = {
  render: () => {
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
      setShow(true);
    }, []);

    return (
      <div>
        <div style={{ marginBottom: '32px' }}>
          <Button
            onClick={() => {
              setShow(false);
              setTimeout(() => setShow(true), 100);
            }}
          >
            Replay Animation
          </Button>
        </div>
        <div className="snake-subcard-row">
          <SubCard
            key={`first-${show}`}
            transitionIn={show}
            transitionType="expand"
            transitionSpeed={600}
            transitionDelay={0}
            variant="success"
          >
            <h4>First Card</h4>
            <p>Appears immediately</p>
          </SubCard>
          <SubCard
            key={`second-${show}`}
            transitionIn={show}
            transitionType="expand"
            transitionSpeed={600}
            transitionDelay={150}
            variant="info"
          >
            <h4>Second Card</h4>
            <p>150ms delay</p>
          </SubCard>
          <SubCard
            key={`third-${show}`}
            transitionIn={show}
            transitionType="expand"
            transitionSpeed={600}
            transitionDelay={300}
            variant="warning"
          >
            <h4>Third Card</h4>
            <p>300ms delay</p>
          </SubCard>
        </div>
      </div>
    );
  },
};

export const TransitionWithCallback: Story = {
  render: () => {
    const [status, setStatus] = React.useState('Waiting...');
    const [key, setKey] = React.useState(0);

    return (
      <div>
        <div style={{ marginBottom: '32px', display: 'flex', gap: '16px', alignItems: 'center' }}>
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
        <SubCard
          key={key}
          transitionIn
          transitionType="expand"
          transitionSpeed={800}
          variant="success"
          onTransitionComplete={() => setStatus('Animation Complete!')}
        >
          <h3>Callback Example</h3>
          <p>Watch for the completion message above when the animation finishes.</p>
          <p>The expand animation has special effects on the corner plus symbols.</p>
        </SubCard>
      </div>
    );
  },
};

export const FastTransitions: Story = {
  render: () => {
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
      setShow(true);
    }, []);

    return (
      <div>
        <div style={{ marginBottom: '32px' }}>
          <Button
            onClick={() => {
              setShow(false);
              setTimeout(() => setShow(true), 100);
            }}
          >
            Replay Fast Cards
          </Button>
        </div>
        <div
          style={{
            display: 'grid',
            gap: '16px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <SubCard
              key={`card-${i}-${show}`}
              transitionIn={show}
              transitionType="expand"
              transitionSpeed={200}
              transitionDelay={i * 30}
              variant={['success', 'info', 'warning', 'danger', 'default', 'inactive'][i]}
              size="small"
            >
              <h5>Card {i + 1}</h5>
              <p>Fast {i * 30}ms delay</p>
            </SubCard>
          ))}
        </div>
      </div>
    );
  },
};
