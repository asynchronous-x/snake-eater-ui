/**
 * Helper to apply error logging to components
 * This module provides utilities to wrap components with error boundaries and logging
 */

import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { useErrorLogger } from './errorLogger';
import { safeEventHandler } from './propValidation';

/**
 * HOC to wrap any component with error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string,
): React.ComponentType<P> {
  const WrappedComponent: React.FC<P> = (props) => {
    return (
      <ErrorBoundary componentName={componentName} resetOnPropsChange>
        <Component {...props} />
      </ErrorBoundary>
    );
  };

  WrappedComponent.displayName = `WithErrorBoundary(${componentName})`;
  return WrappedComponent;
}

/**
 * Hook to wrap all event handlers with error logging
 */
export function useSafeEventHandlers<P extends Record<string, any>>(
  props: P,
  componentName: string,
): P {
  const safeProps = { ...props };

  // Wrap all event handlers
  Object.keys(props).forEach((key) => {
    if (key.startsWith('on') && typeof props[key] === 'function') {
      safeProps[key] = safeEventHandler(props[key] as any, componentName, key);
    }
  });

  return safeProps;
}

/**
 * Generic component wrapper with error logging
 */
export function createSafeComponent<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string,
  validator?: (props: P, logger: ReturnType<typeof useErrorLogger>) => void,
): React.ComponentType<P> {
  const SafeComponent: React.FC<P> = (props) => {
    const logger = useErrorLogger(componentName);

    // Run custom validation if provided
    React.useEffect(() => {
      if (process.env.NODE_ENV === 'development' && validator) {
        validator(props, logger);
      }
    }, [props, logger]);

    // Wrap event handlers
    const safeProps = useSafeEventHandlers(props, componentName);

    return <Component {...safeProps} />;
  };

  // Wrap with error boundary
  return withErrorBoundary(SafeComponent, componentName);
}

/**
 * Batch update helper for multiple components
 */
export interface ComponentUpdate<P = any> {
  path: string;
  componentName: string;
  validator?: (props: P, logger: ReturnType<typeof useErrorLogger>) => void;
}

export function generateComponentUpdates(updates: ComponentUpdate[]): string {
  return updates
    .map((update) => {
      return `
// Update ${update.componentName} component
import { createSafeComponent } from '../utils/applyErrorLogging';

${
  update.validator
    ? `
const validate${update.componentName} = (props: ${update.componentName}Props, logger) => {
  ${update.validator.toString()}
};
`
    : ''
}

export const ${update.componentName} = createSafeComponent(
  ${update.componentName}Component,
  '${update.componentName}'
  ${update.validator ? `, validate${update.componentName}` : ''}
);
`;
    })
    .join('\n\n');
}
