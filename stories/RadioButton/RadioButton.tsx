import React from 'react';
import { ErrorBoundary } from '../utils/ErrorBoundary';
import './radiobutton.css';

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
  helperText?: string;
}

export interface RadioButtonProps {
  /** Radio options */
  options: RadioOption[];
  /** Selected value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Group name */
  name: string;
  /** Group label */
  label?: string;
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Visual variant */
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  /** Error message */
  error?: string;
  /** Additional CSS classes */
  className?: string;
}

/** RadioButton component with dark theme styling */
const RadioButtonComponent: React.FC<RadioButtonProps> = ({
  options,
  value,
  onChange,
  name,
  label,
  direction = 'vertical',
  size = 'medium',
  variant = 'default',
  error,
  className = '',
}) => {
  const handleChange = (optionValue: string) => {
    onChange?.(optionValue);
  };

  const groupClasses = [
    'snake-radio-group',
    `snake-radio-group--${direction}`,
    `snake-radio-group--${size}`,
    error && 'snake-radio-group--error',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={groupClasses}
      role="radiogroup"
      aria-labelledby={label ? `${name}-label` : undefined}
    >
      {label && (
        <div className="snake-radio-group__label" id={`${name}-label`}>
          {label}
        </div>
      )}

      <div className="snake-radio-group__options">
        {options.map((option) => {
          const isChecked = value === option.value;
          const radioClasses = [
            'snake-radio',
            `snake-radio--${variant}`,
            isChecked && 'snake-radio--checked',
            option.disabled && 'snake-radio--disabled',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <label key={option.value} className={radioClasses}>
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isChecked}
                onChange={() => handleChange(option.value)}
                disabled={option.disabled}
                className="snake-radio__input"
              />
              <span className="snake-radio__control">
                <span className="snake-radio__dot" />
              </span>
              <div className="snake-radio__label-container">
                <span className="snake-radio__label">{option.label}</span>
                {option.helperText && (
                  <span className="snake-radio__helper-text">{option.helperText}</span>
                )}
              </div>
            </label>
          );
        })}
      </div>

      {error && <span className="snake-radio-group__error">{error}</span>}
    </div>
  );
};

/** RadioButton with error boundary */
export const RadioButton: React.FC<RadioButtonProps> = (props) => {
  return (
    <ErrorBoundary componentName="RadioButton" resetOnPropsChange>
      <RadioButtonComponent {...props} />
    </ErrorBoundary>
  );
};
