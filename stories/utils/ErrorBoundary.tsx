import React, { Component, ErrorInfo, ReactNode } from 'react';
import { errorLogger, ErrorCategory, ErrorLevel } from './errorLogger';
import './errorboundary.css';

interface Props {
  children: ReactNode;
  componentName?: string;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number>;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorCount: number;
}

export class ErrorBoundary extends Component<Props, State> {
  private resetTimeoutId: NodeJS.Timeout | null = null;
  private previousResetKeys: Array<string | number> = [];

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    };
    this.previousResetKeys = props.resetKeys || [];
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
      errorCount: 0,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { componentName = 'Unknown', onError } = this.props;

    // Log to error logger
    errorLogger.critical(
      ErrorCategory.RENDER_ERROR,
      `Component tree error: ${error.message}`,
      {
        componentName,
        additionalInfo: {
          componentStack: errorInfo.componentStack,
          errorBoundary: 'ErrorBoundary',
          errorCount: this.state.errorCount + 1,
        },
      },
      error,
    );

    // Update state
    this.setState((prevState) => ({
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }));

    // Call custom error handler if provided
    if (onError) {
      onError(error, errorInfo);
    }

    // Auto-reset after 5 seconds if error count is low
    if (this.state.errorCount < 3) {
      this.scheduleReset(5000);
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;

    // Reset on prop changes if enabled
    if (hasError && resetOnPropsChange && prevProps.children !== this.props.children) {
      this.resetErrorBoundary();
    }

    // Reset on key changes
    if (hasError && resetKeys) {
      const hasResetKeyChanged = resetKeys.some((key, idx) => key !== this.previousResetKeys[idx]);

      if (hasResetKeyChanged) {
        this.resetErrorBoundary();
        this.previousResetKeys = [...resetKeys];
      }
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  scheduleReset = (delay: number) => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }

    this.resetTimeoutId = setTimeout(() => {
      this.resetErrorBoundary();
    }, delay);
  };

  resetErrorBoundary = () => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
      this.resetTimeoutId = null;
    }

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    const { hasError, error, errorInfo, errorCount } = this.state;
    const { fallback, children, componentName = 'Component' } = this.props;

    if (hasError && error) {
      // Custom fallback if provided
      if (fallback) {
        return <>{fallback}</>;
      }

      // Default error UI
      return (
        <div className="snake-error-boundary">
          <div className="snake-error-boundary__header">
            <span className="snake-error-boundary__icon">⚠</span>
            <h3 className="snake-error-boundary__title">Component Error</h3>
          </div>

          <div className="snake-error-boundary__content">
            <p className="snake-error-boundary__component">
              Component: <code>{componentName}</code>
            </p>

            <p className="snake-error-boundary__message">{error.message}</p>

            {process.env.NODE_ENV === 'development' && (
              <details className="snake-error-boundary__details">
                <summary>Error Details</summary>
                <pre className="snake-error-boundary__stack">{error.stack}</pre>
                {errorInfo && (
                  <pre className="snake-error-boundary__component-stack">
                    {errorInfo.componentStack}
                  </pre>
                )}
              </details>
            )}

            <div className="snake-error-boundary__actions">
              <button
                className="snake-error-boundary__reset"
                onClick={this.resetErrorBoundary}
                disabled={errorCount >= 3}
              >
                {errorCount >= 3 ? 'Too Many Errors' : 'Reset Component'}
              </button>

              {errorCount > 0 && errorCount < 3 && (
                <span className="snake-error-boundary__count">Error count: {errorCount}</span>
              )}
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

/**
 * Hook to use error boundary
 */
export function useErrorBoundary() {
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return {
    throwError: setError,
    resetError: () => setError(null),
  };
}
