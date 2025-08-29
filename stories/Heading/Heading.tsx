import React from 'react';
import { ErrorBoundary } from '../utils/ErrorBoundary';
import './heading.css';

export interface HeadingProps {
  /** Heading level */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Visual size (overrides semantic level) */
  size?: '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Color variant */
  variant?: 'default' | 'primary' | 'secondary' | 'muted';
  /** Font weight */
  weight?: 'normal' | 'medium' | 'bold';
  /** Add decorative line */
  decorated?: boolean;
  /** Decoration position */
  decorationPosition?: 'left' | 'bottom' | 'both';
  /** Text transform */
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  /** Truncate with ellipsis */
  truncate?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Children content */
  children: React.ReactNode;
}

/** Heading component for titles and headers */
const HeadingComponent: React.FC<HeadingProps> = ({
  as = 'h2',
  size,
  align = 'left',
  variant = 'default',
  weight = 'bold',
  decorated = false,
  decorationPosition = 'left',
  transform = 'none',
  truncate = false,
  className = '',
  children,
}) => {
  const Component = as;

  const headingClasses = [
    'snake-heading',
    size ? `snake-heading--${size}` : `snake-heading--${as}`,
    `snake-heading--${variant}`,
    `snake-heading--${align}`,
    `snake-heading--weight-${weight}`,
    transform !== 'none' && `snake-heading--${transform}`,
    truncate && 'snake-heading--truncate',
    decorated && 'snake-heading--decorated',
    decorated && `snake-heading--decorated-${decorationPosition}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={headingClasses}>
      {decorated && decorationPosition === 'left' && (
        <span className="snake-heading__decoration snake-heading__decoration--left" />
      )}
      <span className="snake-heading__text">{children}</span>
      {decorated && decorationPosition === 'bottom' && (
        <span className="snake-heading__decoration snake-heading__decoration--bottom" />
      )}
      {decorated && decorationPosition === 'both' && (
        <>
          <span className="snake-heading__decoration snake-heading__decoration--left" />
          <span className="snake-heading__decoration snake-heading__decoration--bottom" />
        </>
      )}
    </Component>
  );
};

/** Heading with error boundary */
export const Heading: React.FC<HeadingProps> = (props) => {
  return (
    <ErrorBoundary componentName="Heading" resetOnPropsChange>
      <HeadingComponent {...props} />
    </ErrorBoundary>
  );
};
