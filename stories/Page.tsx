import React from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Filter } from './Filter';
import { SubCard } from './SubCard';
import { Input } from './Input';
import { Select } from './Select';
import { Toggle } from './Toggle';
import { Badge } from './Badge';
import { Modal } from './Modal';
import { Tooltip } from './Tooltip';
import { Progress } from './Progress';
import { Tabs } from './Tabs';
import { RadioButton } from './RadioButton';
import { Accordion } from './Accordion';
import { IconButton } from './IconButton';
import { Loading } from './Loading';
import { Checkbox } from './Checkbox';
import { Table } from './Table';
import { Code } from './Code';
import { Link } from './Link';
import { Breadcrumb } from './Breadcrumb';
import { Stat } from './Stat';
import { Textarea } from './Textarea';
import { Heading } from './Heading';
import { Text } from './Text';
import { Alert } from './Alert';
import './page.css';

interface User {
  name: string;
  avatar?: string;
}

export const Page: React.FC = () => {
  const [user, setUser] = React.useState<User | undefined>();
  const [showModal, setShowModal] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState('forms');
  const [toggleValue, setToggleValue] = React.useState(false);
  const [selectValue, setSelectValue] = React.useState('');
  const [radioValue, setRadioValue] = React.useState('option1');
  const [checkboxValues, setCheckboxValues] = React.useState({
    terms: false,
    newsletter: false,
    updates: true,
  });

  return (
    <div className="snake-page">

      <main className="snake-page__content">
        <section className="snake-page__hero">
          <Heading as="h1" size="2xl" variant="secondary" align="center" decorated decorationPosition="bottom">
            SNAKE EATER UI
          </Heading>
          <Text size="lg" variant="muted" align="center" style={{ marginTop: '16px' }}>
            A comprehensive dark-themed component library with cyberpunk aesthetics
          </Text>
          <div style={{ marginTop: '24px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Button variant="cyber" size="large" onClick={() => setShowModal(true)}>View Components</Button>
            <Link href="#examples" variant="primary" size="large">Get Started →</Link>
          </div>
        </section>

        <Alert
          variant="info"
          title="New Components Available!"
          description="We've added 20+ new components including forms, data display, and typography."
          closable
          style={{ marginBottom: '32px' }}
        />

        <section className="snake-page__section">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Documentation', href: '/docs' },
              { label: 'Components' },
            ]}
            style={{ marginBottom: '24px' }}
          />
          
          <div className="snake-grid" style={{ gap: '24px', marginBottom: '32px' }}>
            <Stat
              label="Total Components"
              value="40+"
              change={{ value: '+12', type: 'increase' }}
              icon="🧩"
              variant="centered"
            />
            <Stat
              label="Design Variants"
              value="150+"
              icon="🎨"
              variant="centered"
              color="info"
            />
            <Stat
              label="TypeScript Ready"
              value="100%"
              icon="✓"
              variant="centered"
              color="success"
            />
            <Stat
              label="Bundle Size"
              value="< 50KB"
              icon="📦"
              variant="centered"
              color="warning"
            />
          </div>
          
          <Card size="large">
            <Heading as="h2" decorated decorationPosition="left">Design Principles</Heading>
            <div className="snake-grid" style={{ marginTop: '24px', gap: '16px' }}>
              <Text>
                <Text as="strong" variant="primary">Dark Theme First</Text> - Optimized for reduced eye strain with carefully selected color palettes
              </Text>
              <Text>
                <Text as="strong" variant="primary">Sharp Aesthetics</Text> - Boxy design with no rounded corners for a distinctive look
              </Text>
              <Text>
                <Text as="strong" variant="primary">Minimalist Approach</Text> - Clean interfaces with purposeful use of space and elements
              </Text>
              <Text>
                <Text as="strong" variant="primary">High Contrast</Text> - Ensuring excellent readability and accessibility
              </Text>
            </div>
          </Card>
        </section>

        <section className="snake-page__section" id="examples">
          <Heading as="h2" size="xl" decorated decorationPosition="bottom">Component Showcase</Heading>
          
          <Tabs
            tabs={[
              { id: 'forms', label: 'Form Controls' },
              { id: 'display', label: 'Data Display' },
              { id: 'feedback', label: 'Feedback' },
              { id: 'navigation', label: 'Navigation' },
              { id: 'typography', label: 'Typography' },
            ]}
            value={selectedTab}
            onChange={setSelectedTab}
            variant="boxed"
            style={{ marginTop: '32px' }}
          />
          
          {selectedTab === 'forms' && (
            <Card style={{ marginTop: '24px' }}>
              <div className="snake-grid" style={{ gap: '32px' }}>
                <div>
                  <Heading as="h3" size="md">Input Fields</Heading>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                    <Input label="Username" placeholder="Enter username" leftIcon="👤" />
                    <Input label="Email" type="email" placeholder="user@example.com" leftIcon="✉️" error="Invalid email format" />
                    <Textarea label="Bio" placeholder="Tell us about yourself..." rows={3} showCount maxLength={200} />
                  </div>
                </div>
                
                <div>
                  <Heading as="h3" size="md">Selection Controls</Heading>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                    <Select
                      label="Country"
                      options={[
                        { value: 'us', label: 'United States' },
                        { value: 'uk', label: 'United Kingdom' },
                        { value: 'ca', label: 'Canada' },
                      ]}
                      value={selectValue}
                      onChange={setSelectValue}
                      placeholder="Select country"
                    />
                    <Toggle
                      label="Enable notifications"
                      checked={toggleValue}
                      onChange={setToggleValue}
                      helperText="Get updates about new features"
                    />
                    <div>
                      <RadioButton
                        name="plan"
                        options={[
                          { value: 'basic', label: 'Basic Plan' },
                          { value: 'pro', label: 'Pro Plan' },
                          { value: 'enterprise', label: 'Enterprise' },
                        ]}
                        value={radioValue}
                        onChange={setRadioValue}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Heading as="h3" size="md">Checkboxes</Heading>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                    <Checkbox
                      label="Accept terms and conditions"
                      checked={checkboxValues.terms}
                      onChange={(e) => setCheckboxValues({ ...checkboxValues, terms: e.target.checked })}
                    />
                    <Checkbox
                      label="Subscribe to newsletter"
                      checked={checkboxValues.newsletter}
                      onChange={(e) => setCheckboxValues({ ...checkboxValues, newsletter: e.target.checked })}
                      variant="info"
                    />
                    <Checkbox
                      label="Receive product updates"
                      checked={checkboxValues.updates}
                      onChange={(e) => setCheckboxValues({ ...checkboxValues, updates: e.target.checked })}
                      variant="success"
                    />
                  </div>
                </div>
                
                <div>
                  <Heading as="h3" size="md">Action Buttons</Heading>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
                    <Button variant="primary">Save Changes</Button>
                    <Button variant="secondary">Cancel</Button>
                    <IconButton icon="⚙️" tooltip="Settings" />
                    <IconButton icon="🗑️" variant="danger" tooltip="Delete" />
                  </div>
                </div>
              </div>
            </Card>
          )}
          
          {selectedTab === 'display' && (
            <Card style={{ marginTop: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                  <Heading as="h3" size="md">Badges & Progress</Heading>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '16px' }}>
                    <Badge variant="default">Default</Badge>
                    <Badge variant="success" style="solid">Active</Badge>
                    <Badge variant="warning" style="outline">Pending</Badge>
                    <Badge variant="danger" style="dot">Urgent</Badge>
                    <Badge variant="info" clickable onClick={() => alert('Clicked!')}>Clickable</Badge>
                  </div>
                  <Progress value={65} showValue style={{ marginTop: '16px' }} />
                  <Progress value={85} variant="success" showValue size="small" style={{ marginTop: '8px' }} />
                </div>
                
                <div>
                  <Heading as="h3" size="md">Loading States</Heading>
                  <div style={{ display: 'flex', gap: '32px', alignItems: 'center', marginTop: '16px' }}>
                    <Loading type="dots" size="small" />
                    <Loading type="bars" />
                    <Loading type="pulse" variant="info" />
                    <Loading type="grid" size="large" variant="success" />
                  </div>
                </div>
                
                <div>
                  <Heading as="h3" size="md">Code Display</Heading>
                  <Code language="javascript" showLineNumbers style={{ marginTop: '16px' }}>
{`function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`}
                  </Code>
                </div>
                
                <div>
                  <Heading as="h3" size="md">Data Table</Heading>
                  <Table
                    data={[
                      { id: 1, name: 'John Doe', role: 'Admin', status: 'Active' },
                      { id: 2, name: 'Jane Smith', role: 'User', status: 'Active' },
                      { id: 3, name: 'Bob Johnson', role: 'User', status: 'Inactive' },
                    ]}
                    columns={[
                      { key: 'id', header: 'ID', width: '60px' },
                      { key: 'name', header: 'Name' },
                      { key: 'role', header: 'Role' },
                      { key: 'status', header: 'Status', render: (value) => (
                        <Badge variant={value === 'Active' ? 'success' : 'danger'} style="dot">
                          {value}
                        </Badge>
                      )},
                    ]}
                    size="small"
                    style={{ marginTop: '16px' }}
                  />
                </div>
              </div>
            </Card>
          )}
          
          {selectedTab === 'feedback' && (
            <Card style={{ marginTop: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                  <Heading as="h3" size="md">Tooltips</Heading>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                    <Tooltip content="This is a tooltip">
                      <Button>Hover me</Button>
                    </Tooltip>
                    <Tooltip content="Click to see tooltip" trigger="click">
                      <Button variant="secondary">Click me</Button>
                    </Tooltip>
                    <Tooltip content={<div><strong>Rich content</strong><br />With multiple lines</div>}>
                      <IconButton icon="ℹ️" />
                    </Tooltip>
                  </div>
                </div>
                
                <div>
                  <Heading as="h3" size="md">Alerts</Heading>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                    <Alert variant="success" title="Success!" description="Your changes have been saved." />
                    <Alert variant="warning" title="Warning" description="Your session will expire soon." closable />
                    <Alert variant="danger" title="Error" description="Failed to load resource." />
                    <Alert variant="info" description="Tip: Use keyboard shortcuts for faster navigation." showIcon={false} />
                  </div>
                </div>
                
                <div>
                  <Heading as="h3" size="md">Modal Dialog</Heading>
                  <Button variant="primary" onClick={() => setShowModal(true)} style={{ marginTop: '16px' }}>
                    Open Modal
                  </Button>
                </div>
              </div>
            </Card>
          )}
          
          {selectedTab === 'navigation' && (
            <Card style={{ marginTop: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                  <Heading as="h3" size="md">Links</Heading>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '16px' }}>
                    <Link href="#" variant="default">Default Link</Link>
                    <Link href="#" variant="primary">Primary Link</Link>
                    <Link href="#" variant="subtle">Subtle Link</Link>
                    <Link href="#" variant="underline">Underline Link</Link>
                    <Link href="https://github.com" external>External Link</Link>
                  </div>
                </div>
                
                <div>
                  <Heading as="h3" size="md">Breadcrumbs</Heading>
                  <Breadcrumb
                    items={[
                      { label: 'Home', href: '/', icon: '🏠' },
                      { label: 'Products', href: '/products' },
                      { label: 'Electronics', href: '/electronics' },
                      { label: 'Laptops' },
                    ]}
                    style={{ marginTop: '16px' }}
                  />
                </div>
                
                <div>
                  <Heading as="h3" size="md">Accordion</Heading>
                  <Accordion
                    items={[
                      {
                        id: '1',
                        title: 'What is Snake Eater UI?',
                        content: 'A modern React component library with a cyberpunk aesthetic.',
                      },
                      {
                        id: '2',
                        title: 'How do I install it?',
                        content: 'Run npm install snake-eater-ui in your project directory.',
                      },
                      {
                        id: '3',
                        title: 'Is it customizable?',
                        content: 'Yes! All components support theming and custom styling.',
                      },
                    ]}
                    variant="boxed"
                    header
                    style={{ marginTop: '16px' }}
                  />
                </div>
              </div>
            </Card>
          )}
          
          {selectedTab === 'typography' && (
            <Card style={{ marginTop: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                  <Heading as="h3" size="md">Headings</Heading>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                    <Heading as="h1" size="2xl">Heading 2XL</Heading>
                    <Heading as="h2" size="xl" variant="primary">Heading XL Primary</Heading>
                    <Heading as="h3" size="lg" variant="secondary">Heading LG Secondary</Heading>
                    <Heading as="h4" size="md" decorated decorationPosition="left">Decorated Heading</Heading>
                  </div>
                </div>
                
                <div>
                  <Heading as="h3" size="md">Text Styles</Heading>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                    <Text size="lg">Large body text for emphasis</Text>
                    <Text>Regular body text for general content</Text>
                    <Text size="sm" variant="muted">Small muted text for secondary information</Text>
                    <Text variant="primary" weight="bold">Bold primary text for highlights</Text>
                    <Text italic underline>Italic underlined text</Text>
                    <Text mono variant="success">Monospace success text</Text>
                  </div>
                </div>
                
                <div>
                  <Heading as="h3" size="md">Special Text</Heading>
                  <div style={{ marginTop: '16px' }}>
                    <Text as="blockquote" size="lg" italic>
                      "Design is not just what it looks like and feels like. Design is how it works."
                    </Text>
                    <Text style={{ marginTop: '16px' }}>
                      You can use <Text as="mark">highlighted text</Text> for emphasis,
                      <Text as="del"> deleted text</Text> for removals, and
                      <Text as="ins"> inserted text</Text> for additions.
                    </Text>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </section>

        <section className="snake-page__section">
          <Heading as="h2" size="xl" decorated decorationPosition="bottom">Card Variants</Heading>
          <div className="snake-grid" style={{ marginTop: '32px', gap: '24px' }}>
            <Card>
              <Heading as="h3" size="md">Basic Card</Heading>
              <Text>A card with decorative corner elbows and dark styling.</Text>
            </Card>
            <Card interactive onClick={() => console.log('Interactive card clicked')}>
              <Heading as="h3" size="md">Interactive Card</Heading>
              <Text>Click me! This card responds to user interaction.</Text>
            </Card>
            <Card 
              header={<Heading as="h4" size="sm">Card with Header</Heading>}
              footer={
                <Button variant="cyber" size="small" fullWidth>
                  Learn More
                </Button>
              }
            >
              <Text>This card demonstrates the header and footer sections.</Text>
            </Card>
            <Card variant="grid">
              <Heading as="h3" size="md">Grid Card</Heading>
              <Text>Features a subtle grid overlay for added visual texture.</Text>
            </Card>
          </div>
          
          <div style={{ marginTop: '32px' }}>
            <Heading as="h3" size="md">SubCard Variants</Heading>
            <div className="snake-grid" style={{ marginTop: '16px', gap: '16px' }}>
              <SubCard>
                <Text as="strong">Default SubCard</Text>
                <Text size="sm" variant="muted">Features plus symbols in corners</Text>
              </SubCard>
              <SubCard variant="success" interactive>
                <Text as="strong" variant="success">Success State</Text>
                <Text size="sm">For positive actions</Text>
              </SubCard>
              <SubCard variant="warning">
                <Text as="strong" variant="warning">Warning State</Text>
                <Text size="sm">Important information</Text>
              </SubCard>
              <SubCard variant="danger" interactive>
                <Text as="strong" variant="danger">Danger State</Text>
                <Text size="sm">Critical actions</Text>
              </SubCard>
            </div>
          </div>
        </section>

        <section className="snake-page__section">
          <Card size="large" header={<Heading as="h2" size="lg">Live Examples</Heading>}>
            <div className="snake-grid" style={{ gap: '32px' }}>
              <div>
                <Heading as="h3" size="md">Filter Groups</Heading>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
                  <Filter active>All Items</Filter>
                  <Filter variant="success" icon="✓" count={12}>Completed</Filter>
                  <Filter variant="warning" icon="⚡" count={3}>In Progress</Filter>
                  <Filter variant="danger" icon="✕" count={2}>Failed</Filter>
                  <Filter disabled>Archived</Filter>
                </div>
              </div>
              
              <div>
                <Heading as="h3" size="md">Interactive Stats</Heading>
                <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                  <Stat
                    label="Revenue"
                    value="$45.2K"
                    change={{ value: '+12%', type: 'increase' }}
                    size="small"
                    variant="horizontal"
                  />
                  <Stat
                    label="Users"
                    value="1,234"
                    change={{ value: '+45', type: 'increase' }}
                    size="small"
                    variant="horizontal"
                    color="success"
                  />
                </div>
              </div>
              
              <div>
                <Heading as="h3" size="md">Quick Actions</Heading>
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                  <Tooltip content="Create new item">
                    <IconButton icon="➕" variant="primary" />
                  </Tooltip>
                  <Tooltip content="Edit selected">
                    <IconButton icon="✏️" variant="secondary" />
                  </Tooltip>
                  <Tooltip content="Delete selected">
                    <IconButton icon="🗑️" variant="danger" />
                  </Tooltip>
                  <Tooltip content="Share">
                    <IconButton icon="📤" />
                  </Tooltip>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Component Library Overview"
        size="large"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Text>
            Snake Eater UI is a comprehensive component library featuring over 40 components
            designed with a distinctive cyberpunk aesthetic.
          </Text>
          
          <div>
            <Heading as="h4" size="sm">Key Features</Heading>
            <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IconButton icon="⚡" size="small" disabled />
                <Text size="sm">Lightning fast performance</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IconButton icon="🎨" size="small" variant="info" disabled />
                <Text size="sm">Customizable themes</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IconButton icon="♿" size="small" variant="success" disabled />
                <Text size="sm">Fully accessible</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IconButton icon="📱" size="small" variant="warning" disabled />
                <Text size="sm">Responsive design</Text>
              </div>
            </div>
          </div>
          
          <div>
            <Heading as="h4" size="sm">Component Categories</Heading>
            <div style={{ marginTop: '12px' }}>
              <Progress value={100} label="Form Controls" showValue variant="success" size="small" style={{ marginBottom: '8px' }} />
              <Progress value={100} label="Data Display" showValue variant="info" size="small" style={{ marginBottom: '8px' }} />
              <Progress value={100} label="Feedback" showValue variant="warning" size="small" style={{ marginBottom: '8px' }} />
              <Progress value={100} label="Navigation" showValue variant="danger" size="small" style={{ marginBottom: '8px' }} />
              <Progress value={100} label="Typography" showValue size="small" />
            </div>
          </div>
          
          <Alert
            variant="info"
            description="All components support TypeScript out of the box and include comprehensive documentation."
            size="small"
          />
        </div>
        
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '24px' }}>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={() => console.log('Getting started!')}>Get Started</Button>
        </div>
      </Modal>
    </div>
  );
};