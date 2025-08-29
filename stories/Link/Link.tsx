import React from 'react';
import { ErrorBoundary } from '../utils/ErrorBoundary';
import './link.css';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Link variant */
  variant?: 'default' | 'primary' | 'subtle' | 'underline';
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** External link indicator */
  external?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Show icon before text */
  startIcon?: React.ReactNode;
  /** Show icon after text */
  endIcon?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Children content */
  children: React.ReactNode;
}

/** Link component for navigation */
const LinkComponent: React.FC<LinkProps> = ({
  variant = 'default',
  size = 'medium',
  external = false,
  disabled = false,
  startIcon,
  endIcon,
  className = '',
  children,
  href,
  target,
  rel,
  ...props
}) => {
  const linkClasses = [
    'snake-link',
    `snake-link--${variant}`,
    `snake-link--${size}`,
    disabled && 'snake-link--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Ensure security for external links
  const linkTarget = external ? '_blank' : target;
  const linkRel = external ? `${rel || ''} noopener noreferrer`.trim() : rel;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    props.onClick?.(e);
  };

  return (
    <a
      className={linkClasses}
      href={disabled ? undefined : href}
      target={linkTarget}
      rel={linkRel}
      onClick={handleClick}
      aria-disabled={disabled}
      {...props}
    >
      {startIcon && <span className="snake-link__icon snake-link__icon--start">{startIcon}</span>}
      <span className="snake-link__text">{children}</span>
      {endIcon && <span className="snake-link__icon snake-link__icon--end">{endIcon}</span>}
      {external && !endIcon && <span className="snake-link__external">↗</span>}
    </a>
  );
};

/** Link with error boundary */
export const Link: React.FC<LinkProps> = (props) => {
  return (
    <ErrorBoundary componentName="Link" resetOnPropsChange>
      <LinkComponent {...props} />
    </ErrorBoundary>
  );
};
