import React from 'react';
import './badge.css';

export interface BadgeProps {
  /** Badge content */
  children: React.ReactNode;
  /** Visual variant */
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'ghost';
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Style variant */
  style?: 'solid' | 'outline' | 'dot';
  /** Icon to display */
  icon?: React.ReactNode;
  /** Clickable badge */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/** Badge component for status indicators and labels */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  style = 'solid',
  icon,
  onClick,
  className = '',
}) => {
  const Component = onClick ? 'button' : 'span';

  const badgeClasses = [
    'snake-badge',
    `snake-badge--${variant}`,
    `snake-badge--${size}`,
    `snake-badge--${style}`,
    onClick && 'snake-badge--clickable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={badgeClasses} onClick={onClick} type={onClick ? 'button' : undefined}>
      {style === 'dot' && <span className="snake-badge__dot" />}
      {icon && <span className="snake-badge__icon">{icon}</span>}
      <span className="snake-badge__text">{children}</span>
    </Component>
  );
};
