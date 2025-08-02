import React from 'react';
import './card.css';

interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Optional header content */
  header?: React.ReactNode;
  /** Optional footer content */
  footer?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Whether the card is interactive (hoverable) */
  interactive?: boolean;
  /** Click handler for interactive cards */
  onClick?: () => void;
  /** Card variant */
  variant?: 'default' | 'grid';
}

/** Card component with decorative corner elbows */
export const Card: React.FC<CardProps> = ({
  children,
  header,
  footer,
  className = '',
  size = 'medium',
  interactive = false,
  onClick,
  variant = 'default',
}) => {
  const classes = [
    'snake-card-component',
    `snake-card-component--${size}`,
    `snake-card-component--${variant}`,
    interactive && 'snake-card-component--interactive',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const Component = interactive ? 'button' : 'div';

  return (
    <Component
      className={classes}
      onClick={interactive ? onClick : undefined}
      type={interactive ? 'button' : undefined}
    >
      {variant === 'grid' && <div className="snake-card-component__grid" />}

      <div className="snake-card-component__elbow snake-card-component__elbow--top-left" />
      <div className="snake-card-component__elbow snake-card-component__elbow--top-right" />
      <div className="snake-card-component__elbow snake-card-component__elbow--bottom-left" />
      <div className="snake-card-component__elbow snake-card-component__elbow--bottom-right" />

      {header && <div className="snake-card-component__header">{header}</div>}

      <div className="snake-card-component__content">{children}</div>

      {footer && <div className="snake-card-component__footer">{footer}</div>}
    </Component>
  );
};
