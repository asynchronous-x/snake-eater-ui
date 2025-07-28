import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Text } from './Text';

const meta = {
  title: 'Typography/Text',
  component: Text,
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
    as: {
      control: { type: 'select' },
      options: ['p', 'span', 'div', 'blockquote', 'figcaption', 'small', 'strong', 'em', 'mark', 'del', 'ins', 'sub', 'sup'],
    },
    size: {
      control: { type: 'select' },
      options: ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'muted', 'success', 'warning', 'danger', 'info'],
    },
    weight: {
      control: { type: 'select' },
      options: ['normal', 'medium', 'bold'],
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify'],
    },
    transform: {
      control: { type: 'select' },
      options: ['none', 'uppercase', 'lowercase', 'capitalize'],
    },
    leading: {
      control: { type: 'select' },
      options: ['tight', 'normal', 'relaxed', 'loose'],
    },
    tracking: {
      control: { type: 'select' },
      options: ['tight', 'normal', 'wide'],
    },
    italic: { control: 'boolean' },
    underline: { control: 'boolean' },
    strike: { control: 'boolean' },
    mono: { control: 'boolean' },
    truncate: { control: 'boolean' },
    clamp: { control: 'number' },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog. Snake Eater UI provides a comprehensive set of components for building modern web applications.',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text size="2xl">2XL: The quick brown fox</Text>
      <Text size="xl">XL: The quick brown fox</Text>
      <Text size="lg">Large: The quick brown fox</Text>
      <Text size="md">Medium: The quick brown fox</Text>
      <Text size="sm">Small: The quick brown fox</Text>
      <Text size="xs">XS: The quick brown fox</Text>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text variant="default">Default text color</Text>
      <Text variant="primary">Primary text color</Text>
      <Text variant="secondary">Secondary text color</Text>
      <Text variant="muted">Muted text color</Text>
      <Text variant="success">Success text color</Text>
      <Text variant="warning">Warning text color</Text>
      <Text variant="danger">Danger text color</Text>
      <Text variant="info">Info text color</Text>
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text weight="normal">Normal weight text</Text>
      <Text weight="medium">Medium weight text</Text>
      <Text weight="bold">Bold weight text</Text>
    </div>
  ),
};

export const TextAlignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      <Text align="left">Left aligned text</Text>
      <Text align="center">Center aligned text</Text>
      <Text align="right">Right aligned text</Text>
      <Text align="justify">
        Justified text alignment. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Text>
    </div>
  ),
};

export const TextDecorations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text italic>Italic text style</Text>
      <Text underline>Underlined text</Text>
      <Text strike>Strikethrough text</Text>
      <Text mono>Monospace font family</Text>
      <Text italic underline>Combined italic and underline</Text>
    </div>
  ),
};

export const LineHeight: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div>
        <Text size="sm" variant="muted">Tight leading (1.25)</Text>
        <Text leading="tight">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </div>
      <div>
        <Text size="sm" variant="muted">Normal leading (1.5)</Text>
        <Text leading="normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </div>
      <div>
        <Text size="sm" variant="muted">Relaxed leading (1.625)</Text>
        <Text leading="relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </div>
      <div>
        <Text size="sm" variant="muted">Loose leading (2)</Text>
        <Text leading="loose">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </div>
    </div>
  ),
};

export const Truncation: Story = {
  render: () => (
    <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <Text size="sm" variant="muted">Single line truncation</Text>
        <Text truncate>
          This is a very long text that will be truncated with an ellipsis when it exceeds the container width. 
          The truncation happens at the end of the line.
        </Text>
      </div>
      <div>
        <Text size="sm" variant="muted">Multi-line clamp (2 lines)</Text>
        <Text clamp={2}>
          This is a longer piece of text that will be clamped after two lines. 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          This part will be hidden.
        </Text>
      </div>
      <div>
        <Text size="sm" variant="muted">Multi-line clamp (3 lines)</Text>
        <Text clamp={3}>
          This is a longer piece of text that will be clamped after three lines. 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          This part will be hidden.
        </Text>
      </div>
    </div>
  ),
};

export const SemanticElements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Text as="blockquote">
        "The best way to predict the future is to invent it." - Alan Kay
      </Text>
      
      <Text>
        Regular text with <Text as="strong" size="md">strong emphasis</Text> and 
        <Text as="em" size="md"> italic emphasis</Text>.
      </Text>
      
      <Text>
        This is <Text as="mark" size="md">highlighted text</Text> and 
        this is <Text as="del" size="md">deleted text</Text> with 
        <Text as="ins" size="md"> inserted text</Text>.
      </Text>
      
      <Text>
        Chemical formula: H<Text as="sub">2</Text>O and 
        mathematical expression: x<Text as="sup">2</Text> + y<Text as="sup">2</Text> = z<Text as="sup">2</Text>
      </Text>
      
      <Text as="small" variant="muted">
        This is small print text, often used for legal disclaimers or footnotes.
      </Text>
    </div>
  ),
};

export const ArticleExample: Story = {
  render: () => (
    <article style={{ maxWidth: '600px' }}>
      <Text size="lg" weight="bold" as="p">
        Introduction to Snake Eater UI
      </Text>
      
      <Text variant="muted" size="sm" as="p" style={{ marginTop: '8px' }}>
        Published on January 15, 2024 • 5 min read
      </Text>
      
      <Text as="p" leading="relaxed" style={{ marginTop: '24px' }}>
        Snake Eater UI is a modern React component library designed with a distinctive 
        cyberpunk aesthetic. It features sharp corners, thin borders, and a dark color 
        scheme that makes your applications stand out.
      </Text>
      
      <Text as="p" leading="relaxed" style={{ marginTop: '16px' }}>
        The library includes over <Text as="strong">40 components</Text> ranging from 
        basic elements like buttons and inputs to complex components like data tables 
        and modal dialogs. Each component is built with 
        <Text as="em"> accessibility</Text> and <Text as="em">performance</Text> in mind.
      </Text>
      
      <Text as="blockquote" variant="secondary" italic style={{ marginTop: '24px' }}>
        "Design is not just what it looks like and feels like. Design is how it works."
      </Text>
      
      <Text as="p" leading="relaxed" style={{ marginTop: '16px' }}>
        Whether you're building a dashboard, a SaaS application, or a portfolio site, 
        Snake Eater UI provides the tools you need to create stunning interfaces with 
        minimal effort.
      </Text>
    </article>
  ),
};

export const PricingCard: Story = {
  render: () => (
    <div style={{
      padding: '32px',
      backgroundColor: '#1f1d20',
      border: '1px solid #3a3a3a',
      maxWidth: '300px',
    }}>
      <Text variant="primary" weight="bold" transform="uppercase" tracking="wide" size="sm">
        Professional
      </Text>
      
      <Text size="2xl" weight="bold" style={{ marginTop: '8px' }}>
        $29<Text as="span" size="lg" variant="muted">/month</Text>
      </Text>
      
      <Text variant="muted" size="sm" style={{ marginTop: '16px' }}>
        Perfect for growing teams and businesses
      </Text>
      
      <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Text size="sm">✓ Unlimited projects</Text>
        <Text size="sm">✓ Advanced analytics</Text>
        <Text size="sm">✓ Priority support</Text>
        <Text size="sm">✓ Custom integrations</Text>
      </div>
    </div>
  ),
};