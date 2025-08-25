import React from 'react';
import './toggle.css';

export interface ToggleProps {
  /** Toggle state */
  checked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Label */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Visual variant */
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  /** Disabled state */
  disabled?: boolean;
  /** Label position */
  labelPosition?: 'left' | 'right';
  /** Additional CSS classes */
  className?: string;
}

/** Toggle/Switch component with dark theme styling */
export const Toggle: React.FC<ToggleProps> = ({
  checked = false,
  onChange,
  label,
  helperText,
  size = 'medium',
  variant = 'default',
  disabled = false,
  labelPosition = 'right',
  className = '',
}) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const toggleClasses = [
    'snake-toggle',
    `snake-toggle--${size}`,
    `snake-toggle--${variant}`,
    checked && 'snake-toggle--checked',
    disabled && 'snake-toggle--disabled',
  ]
    .filter(Boolean)
    .join(' ');

  const wrapperClasses = [
    'snake-toggle-wrapper',
    `snake-toggle-wrapper--${labelPosition}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={toggleClasses}
        onClick={handleClick}
        disabled={disabled}
      >
        <span className="snake-toggle__track">
          <span className="snake-toggle__thumb" />
        </span>
      </button>
      {label && (
        <div className="snake-toggle__label-container">
          <label className="snake-toggle__label" onClick={handleClick}>
            {label}
          </label>
          {helperText && <span className="snake-toggle__helper-text">{helperText}</span>}
        </div>
      )}
    </div>
  );
};
