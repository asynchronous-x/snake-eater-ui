import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Heading } from './Heading';

const meta = {
  title: 'Components/Heading',
  component: Heading,
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
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    size: {
      control: { type: 'select' },
      options: ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'],
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'muted'],
    },
    weight: {
      control: { type: 'select' },
      options: ['normal', 'medium', 'bold'],
    },
    decorationPosition: {
      control: { type: 'select' },
      options: ['left', 'bottom', 'both'],
    },
    transform: {
      control: { type: 'select' },
      options: ['none', 'uppercase', 'lowercase', 'capitalize'],
    },
    decorated: { control: 'boolean' },
    truncate: { control: 'boolean' },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Snake Eater UI',
  },
};

export const SemanticLevels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Heading as="h1">Heading Level 1</Heading>
      <Heading as="h2">Heading Level 2</Heading>
      <Heading as="h3">Heading Level 3</Heading>
      <Heading as="h4">Heading Level 4</Heading>
      <Heading as="h5">Heading Level 5</Heading>
      <Heading as="h6">Heading Level 6</Heading>
    </div>
  ),
};

export const VisualSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Heading size="2xl">2XL Size</Heading>
      <Heading size="xl">XL Size</Heading>
      <Heading size="lg">Large Size</Heading>
      <Heading size="md">Medium Size</Heading>
      <Heading size="sm">Small Size</Heading>
      <Heading size="xs">XS Size</Heading>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Heading variant="default">Default Variant</Heading>
      <Heading variant="primary">Primary Variant</Heading>
      <Heading variant="secondary">Secondary Variant</Heading>
      <Heading variant="muted">Muted Variant</Heading>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
      <Heading align="left">Left Aligned</Heading>
      <Heading align="center">Center Aligned</Heading>
      <Heading align="right">Right Aligned</Heading>
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Heading weight="normal">Normal Weight</Heading>
      <Heading weight="medium">Medium Weight</Heading>
      <Heading weight="bold">Bold Weight</Heading>
    </div>
  ),
};

export const Decorated: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <Heading decorated decorationPosition="left">
        Left Decoration
      </Heading>
      <Heading decorated decorationPosition="bottom">
        Bottom Decoration
      </Heading>
      <Heading decorated decorationPosition="both">
        Both Decorations
      </Heading>
      <Heading decorated decorationPosition="left" variant="primary">
        Primary with Decoration
      </Heading>
      <Heading decorated decorationPosition="bottom" variant="secondary" align="center">
        Centered with Decoration
      </Heading>
    </div>
  ),
};

export const TextTransform: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Heading transform="none">No Transform</Heading>
      <Heading transform="uppercase">Uppercase Transform</Heading>
      <Heading transform="lowercase">LOWERCASE TRANSFORM</Heading>
      <Heading transform="capitalize">capitalize each word</Heading>
    </div>
  ),
};

export const Truncated: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <Heading truncate>
        This is a very long heading that will be truncated with an ellipsis when it exceeds the container width
      </Heading>
    </div>
  ),
};

export const PageHeader: Story = {
  render: () => (
    <header style={{
      padding: '32px',
      backgroundColor: '#1f1d20',
      border: '1px solid #3a3a3a',
    }}>
      <Heading as="h1" size="xl" variant="primary" decorated decorationPosition="left">
        Dashboard
      </Heading>
      <p style={{ color: '#8e8e90', marginTop: '8px', marginBottom: 0 }}>
        Welcome back! Here's your overview for today.
      </p>
    </header>
  ),
};

export const SectionHeaders: Story = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <Heading as="h2" decorated decorationPosition="bottom">
        Features
      </Heading>
      <p style={{ color: '#8e8e90', marginTop: '16px', marginBottom: '32px' }}>
        Explore the powerful features of Snake Eater UI components.
      </p>
      
      <Heading as="h3" size="md" weight="medium">
        Component Library
      </Heading>
      <p style={{ color: '#8e8e90', marginTop: '8px', marginBottom: '24px' }}>
        A comprehensive set of dark-themed React components.
      </p>
      
      <Heading as="h3" size="md" weight="medium">
        Design System
      </Heading>
      <p style={{ color: '#8e8e90', marginTop: '8px', marginBottom: '24px' }}>
        Consistent styling with a cyberpunk aesthetic.
      </p>
    </div>
  ),
};

export const HeroSection: Story = {
  render: () => (
    <div style={{
      padding: '64px 32px',
      textAlign: 'center',
      background: 'linear-gradient(180deg, #1f1d20 0%, #0b0b0d 100%)',
      border: '1px solid #3a3a3a',
    }}>
      <Heading as="h1" size="2xl" variant="secondary" align="center">
        SNAKE EATER UI
      </Heading>
      <Heading as="h2" size="lg" variant="muted" align="center" weight="normal">
        Cyberpunk Component Library
      </Heading>
    </div>
  ),
};

export const CardHeaders: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
      <div style={{
        padding: '24px',
        backgroundColor: '#1f1d20',
        border: '1px solid #3a3a3a',
      }}>
        <Heading as="h3" size="md" variant="primary" transform="uppercase">
          Premium
        </Heading>
        <p style={{ color: '#8e8e90', marginTop: '8px' }}>
          Best for professionals
        </p>
      </div>
      <div style={{
        padding: '24px',
        backgroundColor: '#1f1d20',
        border: '1px solid #3a3a3a',
      }}>
        <Heading as="h3" size="md" variant="secondary" transform="uppercase">
          Standard
        </Heading>
        <p style={{ color: '#8e8e90', marginTop: '8px' }}>
          Great for teams
        </p>
      </div>
      <div style={{
        padding: '24px',
        backgroundColor: '#1f1d20',
        border: '1px solid #3a3a3a',
      }}>
        <Heading as="h3" size="md" transform="uppercase">
          Basic
        </Heading>
        <p style={{ color: '#8e8e90', marginTop: '8px' }}>
          Perfect for starters
        </p>
      </div>
    </div>
  ),
};