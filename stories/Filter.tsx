import React from 'react';
import './filter.css';

interface FilterProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Filter label */
  children: React.ReactNode;
  /** Visual state variant */
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  /** Whether the filter is currently active */
  active?: boolean;
  /** Size of the filter */
  size?: 'small' | 'medium' | 'large';
  /** Optional icon to display before the label */
  icon?: React.ReactNode;
  /** Optional count/badge to display */
  count?: number | string;
}

/** Filter component with bracket styling */
export const Filter: React.FC<FilterProps> = ({
  children,
  variant = 'default',
  active = false,
  size = 'medium',
  disabled = false,
  icon,
  count,
  className = '',
  ...props
}) => {
  const classes = [
    'snake-filter',
    `snake-filter--${variant}`,
    `snake-filter--${size}`,
    active && 'snake-filter--active',
    disabled && 'snake-filter--disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      aria-pressed={active}
      {...props}
    >
      <span className="snake-filter__bracket snake-filter__bracket--left" />
      
      <span className="snake-filter__content">
        {icon && <span className="snake-filter__icon">{icon}</span>}
        <span className="snake-filter__label">{children}</span>
        {count !== undefined && (
          <span className="snake-filter__count">{count}</span>
        )}
      </span>
      
      <span className="snake-filter__bracket snake-filter__bracket--right" />
    </button>
  );
};