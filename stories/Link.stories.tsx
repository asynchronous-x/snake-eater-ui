import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Link } from './Link';

const meta = {
  title: 'Navigation/Link',
  component: Link,
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
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'subtle', 'underline'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    external: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '#',
    children: 'Default Link',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Link href="#" variant="default">
        Default Link
      </Link>
      <Link href="#" variant="primary">
        Primary Link
      </Link>
      <Link href="#" variant="subtle">
        Subtle Link
      </Link>
      <Link href="#" variant="underline">
        Underline Link
      </Link>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Link href="#" size="small">
        Small Link
      </Link>
      <Link href="#" size="medium">
        Medium Link
      </Link>
      <Link href="#" size="large">
        Large Link
      </Link>
    </div>
  ),
};

export const ExternalLinks: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Link href="https://github.com" external>
        GitHub
      </Link>
      <Link href="https://github.com" external variant="primary">
        GitHub (Primary)
      </Link>
      <Link href="https://docs.example.com" external variant="subtle">
        Documentation
      </Link>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Link href="#" startIcon="🏠">
        Home
      </Link>
      <Link href="#" endIcon="→">
        Continue reading
      </Link>
      <Link href="#" startIcon="📚" endIcon="→">
        Browse documentation
      </Link>
      <Link href="#" variant="primary" startIcon="⚡">
        Quick start
      </Link>
      <Link href="https://github.com" external startIcon="🔗">
        External with icon
      </Link>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Link href="#">Normal Link</Link>
      <Link href="#" className="hover">
        Hover State (inspect in browser)
      </Link>
      <Link href="#" disabled>
        Disabled Link
      </Link>
      <Link href="#visited">Visited Link</Link>
    </div>
  ),
};

export const InParagraph: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <p style={{ color: '#bdbdbd', fontSize: '16px', lineHeight: '1.6' }}>
        Welcome to{' '}
        <Link href="#" variant="primary">
          Snake Eater UI
        </Link>
        , a modern component library with a cyberpunk aesthetic. Check out our{' '}
        <Link href="#" variant="underline">
          documentation
        </Link>{' '}
        to get started, or view the{' '}
        <Link href="https://github.com" external>
          source code on GitHub
        </Link>
        .
      </p>
      <p style={{ color: '#8e8e90', fontSize: '14px', lineHeight: '1.6', marginTop: '16px' }}>
        For more information,{' '}
        <Link href="#" variant="subtle">
          contact us
        </Link>{' '}
        or read our{' '}
        <Link href="#" variant="subtle">
          privacy policy
        </Link>
        .
      </p>
    </div>
  ),
};

export const NavigationMenu: Story = {
  render: () => (
    <nav
      style={{
        display: 'flex',
        gap: '24px',
        padding: '16px',
        backgroundColor: '#1f1d20',
        border: '1px solid #3a3a3a',
      }}
    >
      <Link href="#" variant="default">
        Home
      </Link>
      <Link href="#" variant="default">
        Products
      </Link>
      <Link href="#" variant="default">
        Services
      </Link>
      <Link href="#" variant="default">
        About
      </Link>
      <Link href="#" variant="primary">
        Contact
      </Link>
    </nav>
  ),
};

export const FooterLinks: Story = {
  render: () => (
    <footer
      style={{
        padding: '32px',
        backgroundColor: '#101010',
        border: '1px solid #3a3a3a',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
        <div>
          <h4 style={{ color: '#bdbdbd', marginBottom: '16px' }}>Product</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link href="#" variant="subtle" size="small">
              Features
            </Link>
            <Link href="#" variant="subtle" size="small">
              Pricing
            </Link>
            <Link href="#" variant="subtle" size="small">
              Documentation
            </Link>
            <Link href="#" variant="subtle" size="small">
              API Reference
            </Link>
          </div>
        </div>
        <div>
          <h4 style={{ color: '#bdbdbd', marginBottom: '16px' }}>Company</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link href="#" variant="subtle" size="small">
              About Us
            </Link>
            <Link href="#" variant="subtle" size="small">
              Blog
            </Link>
            <Link href="#" variant="subtle" size="small">
              Careers
            </Link>
            <Link href="#" variant="subtle" size="small">
              Press
            </Link>
          </div>
        </div>
        <div>
          <h4 style={{ color: '#bdbdbd', marginBottom: '16px' }}>Connect</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link href="https://github.com" external variant="subtle" size="small">
              GitHub
            </Link>
            <Link href="https://twitter.com" external variant="subtle" size="small">
              Twitter
            </Link>
            <Link href="https://discord.com" external variant="subtle" size="small">
              Discord
            </Link>
            <Link href="#" variant="subtle" size="small">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  ),
};

export const CallToAction: Story = {
  render: () => (
    <div
      style={{
        padding: '48px',
        backgroundColor: '#1f1d20',
        border: '1px solid #3a3a3a',
        textAlign: 'center',
      }}
    >
      <h2 style={{ color: '#bdbdbd', marginBottom: '16px' }}>Ready to get started?</h2>
      <p style={{ color: '#8e8e90', marginBottom: '24px' }}>
        Join thousands of developers using Snake Eater UI
      </p>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link href="#" variant="primary" size="large" startIcon="🚀">
          Get Started
        </Link>
        <Link href="#" variant="underline" size="large">
          View Examples
        </Link>
      </div>
    </div>
  ),
};
