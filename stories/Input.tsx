import React from 'react';
import './input.css';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input label */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Visual variant */
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  /** Full width */
  fullWidth?: boolean;
  /** Icon to display on the left */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right */
  rightIcon?: React.ReactNode;
}

/** Input component with dark theme styling */
export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  size = 'medium',
  variant = 'default',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled = false,
  ...props
}) => {
  const inputClasses = [
    'snake-input',
    `snake-input--${size}`,
    `snake-input--${variant}`,
    error && 'snake-input--error',
    fullWidth && 'snake-input--full-width',
    disabled && 'snake-input--disabled',
    leftIcon && 'snake-input--has-left-icon',
    rightIcon && 'snake-input--has-right-icon',
  ].filter(Boolean).join(' ');

  const wrapperClasses = [
    'snake-input-wrapper',
    fullWidth && 'snake-input-wrapper--full-width',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label className="snake-input__label">
          {label}
        </label>
      )}
      <div className="snake-input__container">
        {leftIcon && (
          <span className="snake-input__icon snake-input__icon--left">
            {leftIcon}
          </span>
        )}
        <input
          className={inputClasses}
          disabled={disabled}
          {...props}
        />
        {rightIcon && (
          <span className="snake-input__icon snake-input__icon--right">
            {rightIcon}
          </span>
        )}
      </div>
      {(error || helperText) && (
        <span className={`snake-input__helper-text ${error ? 'snake-input__helper-text--error' : ''}`}>
          {error || helperText}
        </span>
      )}
    </div>
  );
};