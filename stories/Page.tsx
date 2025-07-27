import React from 'react';
import { Header } from './Header';
import { Button } from './Button';
import { Card } from './Card';
import { Filter } from './Filter';
import { SubCard } from './SubCard';
import './page.css';

interface User {
  name: string;
  avatar?: string;
}

export const Page: React.FC = () => {
  const [user, setUser] = React.useState<User | undefined>();

  return (
    <div className="snake-page">
      <Header
        user={user}
        onLogin={() => setUser({ name: 'Jane Doe' })}
        onLogout={() => setUser(undefined)}
        onCreateAccount={() => setUser({ name: 'Jane Doe' })}
      />

      <main className="snake-page__content">
        <section className="snake-page__hero">
          <h1 className="snake-page__title">Snake Eater UI</h1>
          <p className="snake-page__subtitle">
            A dark-themed component library with boxy, minimalist design
          </p>
        </section>

        <section className="snake-page__section">
          <div className="snake-card">
            <h2>Design Principles</h2>
            <ul className="snake-list">
              <li>Dark theme optimized for reduced eye strain</li>
              <li>Boxy design with no rounded corners</li>
              <li>Thin borders for visual hierarchy</li>
              <li>Minimalist approach to UI elements</li>
              <li>High contrast for better readability</li>
            </ul>
          </div>
        </section>

        <section className="snake-page__section">
          <div className="snake-card">
            <h2>Component Examples</h2>
            <div className="snake-page__examples">
              <div className="snake-page__example">
                <h3>Buttons</h3>
                <div className="snake-page__button-group">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="cyber">Cyber</Button>
                </div>
              </div>
              
              <div className="snake-page__example">
                <h3>Button Sizes</h3>
                <div className="snake-page__button-group">
                  <Button size="small">Small</Button>
                  <Button size="medium">Medium</Button>
                  <Button size="large">Large</Button>
                </div>
              </div>

              <div className="snake-page__example">
                <h3>Button States</h3>
                <div className="snake-page__button-group">
                  <Button>Normal</Button>
                  <Button disabled>Disabled</Button>
                  <Button loading>Loading</Button>
                </div>
              </div>

              <div className="snake-page__example">
                <h3>Cyber Buttons</h3>
                <div className="snake-page__button-group">
                  <Button variant="cyber" size="small">Small Cyber</Button>
                  <Button variant="cyber" size="medium">Medium Cyber</Button>
                  <Button variant="cyber" size="large">Large Cyber</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="snake-page__section">
          <h2>Card Components</h2>
          <div className="snake-grid" style={{ marginTop: 'var(--spacing-lg)' }}>
            <Card>
              <h3>Basic Card</h3>
              <p>A card with decorative corner elbows and dark styling.</p>
            </Card>
            <Card interactive onClick={() => console.log('Interactive card clicked')}>
              <h3>Interactive Card</h3>
              <p>Click me! This card responds to user interaction.</p>
            </Card>
            <Card 
              header={<h4>Card with Header</h4>}
              footer={
                <Button variant="cyber" size="small" fullWidth>
                  Learn More
                </Button>
              }
            >
              <p>This card demonstrates the header and footer sections.</p>
            </Card>
            <Card variant="grid">
              <h3>Grid Card</h3>
              <p>Features a subtle grid overlay for added visual texture.</p>
            </Card>
          </div>
        </section>

        <section className="snake-page__section">
          <Card size="large" header={<h2>Feature Showcase</h2>}>
            <div className="snake-grid">
              <div>
                <h3>Corner Elbows</h3>
                <p>Each card features decorative corner elements in a lighter color (#8e8e90) that add visual interest.</p>
              </div>
              <div>
                <h3>Dark Theme</h3>
                <p>Cards use a darker background (#101010) than the base to create depth and hierarchy.</p>
              </div>
              <div>
                <h3>Flexible Sizes</h3>
                <p>Available in small, medium, and large sizes with proportional corner decorations.</p>
              </div>
            </div>
          </Card>
        </section>

        <section className="snake-page__section">
          <h2>Filter Components</h2>
          <Card style={{ marginTop: 'var(--spacing-lg)' }}>
            <h3>Filter States</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: 'var(--spacing-lg)' }}>
              <Filter>Default</Filter>
              <Filter active>Active</Filter>
              <Filter disabled>Disabled</Filter>
            </div>
            
            <h3>Filter Variants</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: 'var(--spacing-lg)' }}>
              <Filter variant="success" icon="✓" count={12}>Success</Filter>
              <Filter variant="warning" icon="⚠" count={3} active>Warning</Filter>
              <Filter variant="danger" icon="✕" count={2}>Danger</Filter>
              <Filter variant="info" icon="ℹ">Info</Filter>
            </div>
            
            <h3>Filter Sizes</h3>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Filter size="small" count={5}>Small</Filter>
              <Filter size="medium" count={10}>Medium</Filter>
              <Filter size="large" count={15}>Large</Filter>
            </div>
          </Card>
        </section>

        <section className="snake-page__section">
          <h2>SubCard Components</h2>
          <div className="snake-grid" style={{ marginTop: 'var(--spacing-lg)' }}>
            <SubCard>
              <h3>Default SubCard</h3>
              <p>Features plus symbols in corners instead of elbow borders.</p>
            </SubCard>
            <SubCard variant="success" interactive onClick={() => console.log('Success subcard clicked')}>
              <h3>Success State</h3>
              <p>Click for positive actions or confirmations.</p>
            </SubCard>
            <SubCard variant="warning">
              <h3>Warning State</h3>
              <p>Highlights important information that requires attention.</p>
            </SubCard>
            <SubCard variant="danger" interactive onClick={() => console.log('Danger subcard clicked')}>
              <h3>Danger State</h3>
              <p>For critical actions or error states.</p>
            </SubCard>
            <SubCard variant="info">
              <h3>Info State</h3>
              <p>Provides additional context or information.</p>
            </SubCard>
            <SubCard variant="inactive" interactive>
              <h3>Inactive State</h3>
              <p>Disabled or unavailable functionality.</p>
            </SubCard>
            <SubCard cornerColor="#f1fa8c">
              <h3>Custom Corner Color</h3>
              <p>Default card with yellow corner symbols.</p>
            </SubCard>
            <SubCard variant="success" cornerColor="#ff5555">
              <h3>Mixed Styling</h3>
              <p>Success variant with red corner symbols.</p>
            </SubCard>
          </div>
        </section>
      </main>
    </div>
  );
};