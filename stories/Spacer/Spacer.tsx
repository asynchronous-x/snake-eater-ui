import React from 'react';
import { ErrorBoundary } from '../utils/ErrorBoundary';
import './spacer.css';

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Flex grow value - defaults to 1 to fill available space */
  grow?: number;
}

const SpacerComponent: React.FC<SpacerProps> = ({ grow = 1, className = '', style, ...props }) => {
  const spacerStyle: React.CSSProperties = {
    ...style,
    flexGrow: grow,
  };

  return (
    <div
      className={`snake-spacer ${className}`.trim()}
      style={spacerStyle}
      {...props}
      aria-hidden="true"
    />
  );
};

/** Spacer with error boundary */
export const Spacer: React.FC<SpacerProps> = (props) => {
  return (
    <ErrorBoundary componentName="Spacer" resetOnPropsChange>
      <SpacerComponent {...props} />
    </ErrorBoundary>
  );
};
