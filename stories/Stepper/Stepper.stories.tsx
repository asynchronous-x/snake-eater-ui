import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Stepper } from './Stepper';
import { Button } from '../Button/Button';

const meta = {
  title: 'Navigation/Stepper',
  component: Stepper,
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
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'pills'],
    },
    showNumbers: { control: 'boolean' },
    clickable: { control: 'boolean' },
    showConnectors: { control: 'boolean' },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSteps = [
  { label: 'Account Details', description: 'Enter your account information' },
  { label: 'Personal Info', description: 'Tell us about yourself' },
  { label: 'Preferences', description: 'Customize your experience' },
  { label: 'Review', description: 'Review and confirm' },
];

export const Default: Story = {
  args: {
    steps: defaultSteps,
    activeStep: 1,
  },
};

export const Interactive: Story = {
  render: () => {
    const [activeStep, setActiveStep] = React.useState(0);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <Stepper
          steps={defaultSteps}
          activeStep={activeStep}
          clickable
          onStepClick={setActiveStep}
        />
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Button
            variant="ghost"
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
          >
            Previous
          </Button>
          <Button
            variant="primary"
            onClick={() => setActiveStep(Math.min(defaultSteps.length - 1, activeStep + 1))}
            disabled={activeStep === defaultSteps.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    const [activeStep, setActiveStep] = React.useState(1);

    return (
      <div style={{ display: 'flex', gap: '48px' }}>
        <div style={{ width: '300px' }}>
          <Stepper
            steps={defaultSteps}
            activeStep={activeStep}
            orientation="vertical"
            clickable
            onStepClick={setActiveStep}
          />
        </div>
        <div
          style={{ flex: 1, padding: '20px', border: '1px solid #3a3a3a', background: '#1f1d20' }}
        >
          <h2 style={{ color: '#bdbdbd', marginBottom: '16px' }}>
            Step {activeStep + 1}: {defaultSteps[activeStep].label}
          </h2>
          <p style={{ color: '#8a8a8a' }}>{defaultSteps[activeStep].description}</p>
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ color: '#bdbdbd', marginBottom: '16px' }}>Small</h3>
        <Stepper steps={defaultSteps} activeStep={1} size="small" />
      </div>
      <div>
        <h3 style={{ color: '#bdbdbd', marginBottom: '16px' }}>Medium (default)</h3>
        <Stepper steps={defaultSteps} activeStep={1} size="medium" />
      </div>
      <div>
        <h3 style={{ color: '#bdbdbd', marginBottom: '16px' }}>Large</h3>
        <Stepper steps={defaultSteps} activeStep={1} size="large" />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ color: '#bdbdbd', marginBottom: '16px' }}>Default</h3>
        <Stepper steps={defaultSteps} activeStep={2} variant="default" />
      </div>
      <div>
        <h3 style={{ color: '#bdbdbd', marginBottom: '16px' }}>Compact</h3>
        <Stepper steps={defaultSteps} activeStep={2} variant="compact" />
      </div>
      <div>
        <h3 style={{ color: '#bdbdbd', marginBottom: '16px' }}>Pills</h3>
        <Stepper steps={defaultSteps} activeStep={2} variant="pills" />
      </div>
    </div>
  ),
};

export const WithError: Story = {
  render: () => {
    const stepsWithError = [
      { label: 'Account Details', description: 'Completed successfully' },
      { label: 'Personal Info', description: 'Completed successfully' },
      { label: 'Verification', description: 'Verification failed', error: true },
      { label: 'Complete', description: 'Cannot proceed' },
    ];

    return <Stepper steps={stepsWithError} activeStep={2} />;
  },
};

export const WithIcons: Story = {
  render: () => {
    const stepsWithIcons = [
      { label: 'Upload', icon: '📁' },
      { label: 'Process', icon: '⚙️' },
      { label: 'Review', icon: '👁️' },
      { label: 'Deploy', icon: '🚀' },
    ];

    return <Stepper steps={stepsWithIcons} activeStep={1} showNumbers={false} />;
  },
};

export const NoConnectors: Story = {
  render: () => <Stepper steps={defaultSteps} activeStep={1} showConnectors={false} />,
};

export const CompleteProcess: Story = {
  render: () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<number[]>([]);

    const handleNext = () => {
      setCompleted([...completed, activeStep]);
      setActiveStep(activeStep + 1);
    };

    const handleReset = () => {
      setActiveStep(0);
      setCompleted([]);
    };

    const processSteps = [
      { label: 'Initialize', description: 'Setting up environment' },
      { label: 'Configure', description: 'Applying settings' },
      { label: 'Validate', description: 'Checking configuration' },
      { label: 'Execute', description: 'Running process' },
      { label: 'Complete', description: 'Process finished' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <Stepper steps={processSteps} activeStep={activeStep} />

        <div style={{ textAlign: 'center' }}>
          {activeStep < processSteps.length ? (
            <>
              <h3 style={{ color: '#bdbdbd', marginBottom: '8px' }}>
                {processSteps[activeStep].label}
              </h3>
              <p style={{ color: '#8a8a8a', marginBottom: '24px' }}>
                {processSteps[activeStep].description}
              </p>
              <Button variant="primary" onClick={handleNext}>
                {activeStep === processSteps.length - 1 ? 'Finish' : 'Continue'}
              </Button>
            </>
          ) : (
            <>
              <h3 style={{ color: '#50fa7b', marginBottom: '24px' }}>✓ Process Complete!</h3>
              <Button onClick={handleReset}>Start Over</Button>
            </>
          )}
        </div>
      </div>
    );
  },
};
