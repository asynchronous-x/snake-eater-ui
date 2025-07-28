import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Accordion } from './Accordion';

const meta = {
  title: 'Layout/Accordion',
  component: Accordion,
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
    variant: {
      control: { type: 'select' },
      options: ['default', 'boxed', 'minimal'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    multiple: { control: 'boolean' },
    header: { control: 'boolean' },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  {
    id: 'item1',
    title: 'What is Snake Eater UI?',
    content: 'Snake Eater UI is a dark-themed React component library featuring boxy, minimalist design with thin borders and no rounded corners. Built for modern web applications that demand a sleek, cyberpunk aesthetic.',
  },
  {
    id: 'item2',
    title: 'How do I install it?',
    content: 'You can install Snake Eater UI via npm or yarn. Simply run npm install snake-eater-ui or yarn add snake-eater-ui in your project directory.',
  },
  {
    id: 'item3',
    title: 'Is it customizable?',
    content: 'Yes! All components support various props for customization including size, variant, and color options. The design system is built on CSS custom properties for easy theming.',
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const Boxed: Story = {
  args: {
    items: sampleItems,
    variant: 'boxed',
  },
};

export const Minimal: Story = {
  args: {
    items: sampleItems,
    variant: 'minimal',
  },
};

export const Multiple: Story = {
  args: {
    items: sampleItems,
    multiple: true,
    defaultOpen: ['item1', 'item3'],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        id: 'features',
        icon: '✨',
        title: 'Features',
        content: 'Dark theme, sharp corners, minimal design, TypeScript support, and comprehensive documentation.',
      },
      {
        id: 'components',
        icon: '🧩',
        title: 'Components',
        content: 'Buttons, Cards, Inputs, Modals, Tooltips, Progress bars, and many more components available.',
      },
      {
        id: 'support',
        icon: '💬',
        title: 'Support',
        content: 'Get help through our GitHub issues, Discord community, or comprehensive documentation.',
      },
    ],
    variant: 'boxed',
  },
};

export const WithDisabled: Story = {
  args: {
    items: [
      {
        id: 'active1',
        title: 'Active Item 1',
        content: 'This item can be expanded.',
      },
      {
        id: 'disabled',
        title: 'Disabled Item',
        content: 'This content is not accessible.',
        disabled: true,
      },
      {
        id: 'active2',
        title: 'Active Item 2',
        content: 'This item can also be expanded.',
      },
    ],
  },
};

export const Small: Story = {
  args: {
    items: sampleItems,
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    items: sampleItems,
    size: 'large',
  },
};

export const ControlledAccordion: Story = {
  render: () => {
    const [openItems, setOpenItems] = useState<string[]>(['item1']);
    
    const items = [
      {
        id: 'item1',
        title: 'Controlled Item 1',
        content: 'This accordion is controlled by state.',
      },
      {
        id: 'item2',
        title: 'Controlled Item 2',
        content: 'Open/close state is managed externally.',
      },
      {
        id: 'item3',
        title: 'Controlled Item 3',
        content: 'You can programmatically control which items are open.',
      },
    ];

    return (
      <div>
        <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setOpenItems(['item1', 'item2', 'item3'])}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3a3a3a',
              border: '1px solid #4a4a4a',
              color: '#bdbdbd',
              cursor: 'pointer',
            }}
          >
            Open All
          </button>
          <button
            onClick={() => setOpenItems([])}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3a3a3a',
              border: '1px solid #4a4a4a',
              color: '#bdbdbd',
              cursor: 'pointer',
            }}
          >
            Close All
          </button>
        </div>
        <Accordion
          items={items}
          openItems={openItems}
          onChange={setOpenItems}
          multiple
        />
      </div>
    );
  },
};

export const FAQ: Story = {
  args: {
    items: [
      {
        id: 'pricing',
        title: 'What are the pricing options?',
        content: (
          <div>
            <p>We offer three pricing tiers:</p>
            <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
              <li>Basic: $9/month - 10 projects</li>
              <li>Pro: $29/month - Unlimited projects</li>
              <li>Enterprise: Custom pricing</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'refund',
        title: 'Is there a refund policy?',
        content: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied with our service, contact support for a full refund.',
      },
      {
        id: 'trial',
        title: 'Do you offer a free trial?',
        content: 'Absolutely! You can try all features free for 14 days. No credit card required.',
      },
      {
        id: 'cancel',
        title: 'Can I cancel anytime?',
        content: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access until the end of your billing period.',
      },
    ],
    variant: 'minimal',
  },
};

export const CodeExamples: Story = {
  args: {
    items: [
      {
        id: 'install',
        icon: '📦',
        title: 'Installation',
        content: (
          <pre style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.3)', 
            padding: '12px', 
            margin: 0,
            fontFamily: 'monospace',
            fontSize: '14px',
          }}>
{`npm install snake-eater-ui
# or
yarn add snake-eater-ui`}
          </pre>
        ),
      },
      {
        id: 'usage',
        icon: '💻',
        title: 'Basic Usage',
        content: (
          <pre style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.3)', 
            padding: '12px', 
            margin: 0,
            fontFamily: 'monospace',
            fontSize: '14px',
          }}>
{`import { Button, Card } from 'snake-eater-ui';

function App() {
  return (
    <Card>
      <Button variant="primary">
        Click me
      </Button>
    </Card>
  );
}`}
          </pre>
        ),
      },
      {
        id: 'theming',
        icon: '🎨',
        title: 'Custom Theming',
        content: (
          <pre style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.3)', 
            padding: '12px', 
            margin: 0,
            fontFamily: 'monospace',
            fontSize: '14px',
          }}>
{`:root {
  --color-primary: #50fa7b;
  --color-danger: #ff5555;
  --spacing-base: 8px;
}`}
          </pre>
        ),
      },
    ],
    variant: 'boxed',
    multiple: true,
  },
};

export const WithHeaderStyle: Story = {
  args: {
    items: sampleItems,
    header: true,
    variant: 'default',
  },
};

export const HeaderBoxed: Story = {
  args: {
    items: sampleItems,
    header: true,
    variant: 'boxed',
  },
};

export const HeaderMinimal: Story = {
  args: {
    items: sampleItems,
    header: true,
    variant: 'minimal',
  },
};