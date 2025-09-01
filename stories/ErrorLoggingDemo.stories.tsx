import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Button } from './Button/Button';
import { Input } from './Input/Input';
import { Select } from './Select/Select';
import { errorLogger } from './utils/errorLogger';
import './errordemo.css';

const meta = {
  title: 'Utils/Error Logging Demo',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstration of the error logging system and error boundaries in Snake Eater UI components.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Component that intentionally throws errors
const ErrorTrigger: React.FC<{ shouldError: boolean }> = ({ shouldError }) => {
  if (shouldError) {
    throw new Error('Intentional error for demonstration');
  }
  return <div>Component rendered successfully</div>;
};

// Demo component showing error logging features
const ErrorLoggingDemo = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [triggerError, setTriggerError] = useState(false);
  const [invalidProp, setInvalidProp] = useState(false);

  React.useEffect(() => {
    // Subscribe to error logs
    const handler = (entry: any) => {
      setLogs((prev) => [...prev, entry]);
    };

    errorLogger.addHandler(handler);

    return () => {
      errorLogger.removeHandler(handler);
    };
  }, []);

  const clearLogs = () => {
    setLogs([]);
    errorLogger.clearLogs();
  };

  const triggerPropError = () => {
    setInvalidProp(true);
    setTimeout(() => setInvalidProp(false), 100);
  };

  const triggerEventError = () => {
    // This will be caught by the safe event handler
    const button = document.createElement('button');
    button.onclick = () => {
      throw new Error('Event handler error');
    };
    button.click();
  };

  return (
    <div className="error-demo">
      <div className="error-demo__header">
        <h2>Error Logging System Demo</h2>
        <p>This demonstrates how the error logging system catches and reports errors.</p>
      </div>

      <div className="error-demo__content">
        <div className="error-demo__section">
          <h3>Test Actions</h3>
          <div className="error-demo__actions">
            <Button variant="danger" onClick={() => setTriggerError(true)}>
              Trigger Render Error
            </Button>

            <Button variant="warning" onClick={triggerPropError}>
              Trigger Prop Validation Error
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                // This will throw in the onClick handler
                throw new Error('Button click error!');
              }}
            >
              Trigger Event Handler Error
            </Button>

            <Button variant="ghost" onClick={clearLogs}>
              Clear Logs
            </Button>
          </div>
        </div>

        <div className="error-demo__section">
          <h3>Components with Invalid Props</h3>
          <div className="error-demo__invalid-props">
            {/* Button with invalid variant */}
            <Button variant={invalidProp ? ('invalid-variant' as any) : 'primary'}>
              {invalidProp ? 'Invalid Variant' : 'Valid Button'}
            </Button>

            {/* Input with invalid type */}
            <Input
              type={invalidProp ? ('invalid-type' as any) : 'text'}
              placeholder="Check console for validation warnings"
            />

            {/* Select with invalid size */}
            <Select
              size={invalidProp ? ('extra-large' as any) : 'medium'}
              options={[
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
              ]}
            />
          </div>
        </div>

        <div className="error-demo__section">
          <h3>Error Boundary Test</h3>
          {triggerError && (
            <div className="error-demo__boundary-test">
              <ErrorTrigger shouldError={triggerError} />
            </div>
          )}
          {triggerError && (
            <Button variant="primary" onClick={() => setTriggerError(false)}>
              Reset Error Boundary
            </Button>
          )}
        </div>

        <div className="error-demo__section">
          <h3>Error Logs ({logs.length})</h3>
          <div className="error-demo__logs">
            {logs.length === 0 ? (
              <p className="error-demo__no-logs">
                No errors logged yet. Try the test actions above!
              </p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className={`error-demo__log error-demo__log--${log.level}`}>
                  <div className="error-demo__log-header">
                    <span className="error-demo__log-level">{log.level.toUpperCase()}</span>
                    <span className="error-demo__log-component">{log.context.componentName}</span>
                    <span className="error-demo__log-category">{log.category}</span>
                    <span className="error-demo__log-time">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="error-demo__log-message">{log.message}</div>
                  {log.error && (
                    <details className="error-demo__log-details">
                      <summary>Stack Trace</summary>
                      <pre>{log.error.stack}</pre>
                    </details>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="error-demo__section">
          <h3>How It Works</h3>
          <div className="error-demo__info">
            <p>
              <strong>Error Boundaries:</strong> Each component is wrapped in an ErrorBoundary that
              catches render errors.
            </p>
            <p>
              <strong>Prop Validation:</strong> Props are validated in development mode with
              detailed error messages.
            </p>
            <p>
              <strong>Event Handler Safety:</strong> All event handlers are wrapped to catch and log
              errors.
            </p>
            <p>
              <strong>Error Logging:</strong> Errors are logged with context including component
              name, props, and stack traces.
            </p>
            <p>
              <strong>Development vs Production:</strong> In development, errors are logged to
              console. In production, errors are captured but don't crash the app.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: () => <ErrorLoggingDemo />,
};

export const WithInvalidProps: Story = {
  render: () => (
    <div className="error-demo">
      <h3>Components with Invalid Props (Check Console)</h3>
      <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
        <Button variant="invalid" as any>
          Invalid Variant Button
        </Button>
        <Button size="huge" as any>
          Invalid Size Button
        </Button>
        <Input type="invalid-type" as any placeholder="Invalid type" />
        <Select size="gigantic" as any options={[]} />
      </div>
    </div>
  ),
};

export const ErrorBoundaryRecovery: Story = {
  render: () => {
    const [shouldError, setShouldError] = useState(false);

    return (
      <div className="error-demo">
        <h3>Error Boundary Recovery Demo</h3>
        <Button onClick={() => setShouldError(!shouldError)}>
          {shouldError ? 'Reset' : 'Trigger Error'}
        </Button>

        {shouldError && (
          <div style={{ marginTop: '20px' }}>
            <ErrorTrigger shouldError={shouldError} />
          </div>
        )}
      </div>
    );
  },
};
