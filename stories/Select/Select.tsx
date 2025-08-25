import React, { useState, useRef, useEffect } from 'react';
import './select.css';

// Icon component for ChevronDown from pixel-icon-library
const ChevronDownIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <polygon points="23 8 23 9 22 9 22 10 21 10 21 11 20 11 20 12 19 12 19 13 18 13 18 14 17 14 17 15 16 15 16 16 15 16 15 17 14 17 14 18 13 18 13 19 11 19 11 18 10 18 10 17 9 17 9 16 8 16 8 15 7 15 7 14 6 14 6 13 5 13 5 12 4 12 4 11 3 11 3 10 2 10 2 9 1 9 1 8 2 8 2 7 3 7 3 6 4 6 4 7 5 7 5 8 6 8 6 9 7 9 7 10 8 10 8 11 9 11 9 12 10 12 10 13 11 13 11 14 13 14 13 13 14 13 14 12 15 12 15 11 16 11 16 10 17 10 17 9 18 9 18 8 19 8 19 7 20 7 20 6 21 6 21 7 22 7 22 8 23 8"/>
  </svg>
);

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  /** Select options */
  options: SelectOption[];
  /** Selected value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Label */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Visual variant */
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  /** Full width */
  fullWidth?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/** Select component with custom dropdown */
export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  helperText,
  error,
  size = 'medium',
  variant = 'default',
  fullWidth = false,
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const selectClasses = [
    'snake-select',
    `snake-select--${size}`,
    `snake-select--${variant}`,
    isOpen && 'snake-select--open',
    error && 'snake-select--error',
    disabled && 'snake-select--disabled',
  ]
    .filter(Boolean)
    .join(' ');

  const wrapperClasses = [
    'snake-select-wrapper',
    fullWidth && 'snake-select-wrapper--full-width',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses} ref={selectRef}>
      {label && <label className="snake-select__label">{label}</label>}
      <button
        type="button"
        className={selectClasses}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className="snake-select__value">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDownIcon className="snake-select__arrow" />
      </button>

      {isOpen && (
        <div className="snake-select__dropdown">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={[
                'snake-select__option',
                option.value === value && 'snake-select__option--selected',
                option.disabled && 'snake-select__option--disabled',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => !option.disabled && handleSelect(option.value)}
              disabled={option.disabled}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {(error || helperText) && (
        <span
          className={`snake-select__helper-text ${error ? 'snake-select__helper-text--error' : ''}`}
        >
          {error || helperText}
        </span>
      )}
    </div>
  );
};
