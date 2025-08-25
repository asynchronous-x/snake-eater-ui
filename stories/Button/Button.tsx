import React from 'react';
import './button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'cyber' | 'clipped';
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Is the button in a loading state? */
  loading?: boolean;
  /** Should the button fill its container? */
  fullWidth?: boolean;
  /** Button contents */
  children: React.ReactNode;
}

/** Primary UI component for user interaction */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  fullWidth = false,
  disabled = false,
  children,
  className = '',
  ...props
}) => {
  const classes = [
    'snake-button',
    `snake-button--${variant}`,
    `snake-button--${size}`,
    fullWidth && 'snake-button--full-width',
    loading && 'snake-button--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} disabled={disabled || loading} {...props}>
      {loading ? <span className="snake-button__loader">Loading...</span> : children}
    </button>
  );
};
