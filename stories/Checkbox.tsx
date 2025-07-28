import React from 'react';
import './checkbox.css';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Checkbox label */
  label?: string;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Color variant */
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Helper text */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/** Checkbox component for boolean selections */
export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  size = 'medium',
  variant = 'default',
  indeterminate = false,
  helperText,
  error = false,
  disabled = false,
  className = '',
  onChange,
  ...props
}) => {
  const checkboxRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const wrapperClasses = [
    'snake-checkbox-wrapper',
    `snake-checkbox-wrapper--${size}`,
    disabled && 'snake-checkbox-wrapper--disabled',
    error && 'snake-checkbox-wrapper--error',
    className
  ].filter(Boolean).join(' ');

  const checkboxClasses = [
    'snake-checkbox',
    `snake-checkbox--${variant}`,
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      <label className="snake-checkbox__label">
        <input
          ref={checkboxRef}
          type="checkbox"
          className={checkboxClasses}
          disabled={disabled}
          onChange={onChange}
          {...props}
        />
        <span className="snake-checkbox__box">
          <span className="snake-checkbox__check" />
          <span className="snake-checkbox__indeterminate" />
        </span>
        {label && <span className="snake-checkbox__text">{label}</span>}
      </label>
      {helperText && (
        <div className="snake-checkbox__helper">{helperText}</div>
      )}
    </div>
  );
};