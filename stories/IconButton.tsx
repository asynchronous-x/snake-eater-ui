import React from 'react';
import './iconbutton.css';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon content */
  icon: React.ReactNode;
  /** Button variant */
  variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Shape variant */
  shape?: 'square' | 'circle';
  /** Loading state */
  loading?: boolean;
  /** Tooltip text */
  tooltip?: string;
  /** Badge content */
  badge?: string | number;
  /** Badge variant */
  badgeVariant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

/** IconButton component for icon-only actions */
export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'default',
  size = 'medium',
  shape = 'square',
  loading = false,
  tooltip,
  badge,
  badgeVariant = 'danger',
  disabled = false,
  className = '',
  ...props
}) => {
  const buttonClasses = [
    'snake-icon-button',
    `snake-icon-button--${variant}`,
    `snake-icon-button--${size}`,
    `snake-icon-button--${shape}`,
    loading && 'snake-icon-button--loading',
    disabled && 'snake-icon-button--disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={buttonClasses}
      disabled={disabled || loading}
      title={tooltip}
      aria-label={tooltip}
      {...props}
    >
      <span className="snake-icon-button__content">
        {loading ? (
          <span className="snake-icon-button__loader" />
        ) : (
          icon
        )}
      </span>
      
      {badge !== undefined && !loading && (
        <span className={`snake-icon-button__badge snake-icon-button__badge--${badgeVariant}`}>
          {badge}
        </span>
      )}
      
      {shape === 'square' && (
        <>
          <span className="snake-icon-button__corner snake-icon-button__corner--top-left" />
          <span className="snake-icon-button__corner snake-icon-button__corner--top-right" />
          <span className="snake-icon-button__corner snake-icon-button__corner--bottom-left" />
          <span className="snake-icon-button__corner snake-icon-button__corner--bottom-right" />
        </>
      )}
    </button>
  );
};