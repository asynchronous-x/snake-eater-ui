/**
 * React-specific prop validation utilities (TSX file for JSX support)
 */

import React from 'react';
import { validateProps } from './propValidation';

type ValidationSchema = Parameters<typeof validateProps>[1];

/**
 * Hook for prop validation
 */
export function usePropValidation(
  componentName: string,
  schema: ValidationSchema,
  throwOnError = false,
) {
  return (props: Record<string, any>) => {
    React.useEffect(() => {
      if (process.env.NODE_ENV === 'development') {
        validateProps(props, schema, componentName, throwOnError);
      }
    }, [props]);
  };
}

/**
 * HOC for prop validation
 */
export function withPropValidation<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string,
  schema: ValidationSchema,
): React.ComponentType<P> {
  return (props: P) => {
    React.useEffect(() => {
      if (process.env.NODE_ENV === 'development') {
        validateProps(props as Record<string, any>, schema, componentName);
      }
    }, [props]);

    return <Component {...props} />;
  };
}
