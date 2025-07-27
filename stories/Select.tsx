import React, { useState, useRef, useEffect } from 'react';
import './select.css';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
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

  const selectedOption = options.find(opt => opt.value === value);

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
  ].filter(Boolean).join(' ');

  const wrapperClasses = [
    'snake-select-wrapper',
    fullWidth && 'snake-select-wrapper--full-width',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses} ref={selectRef}>
      {label && (
        <label className="snake-select__label">
          {label}
        </label>
      )}
      <button
        type="button"
        className={selectClasses}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className="snake-select__value">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="snake-select__arrow">▼</span>
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
              ].filter(Boolean).join(' ')}
              onClick={() => !option.disabled && handleSelect(option.value)}
              disabled={option.disabled}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      
      {(error || helperText) && (
        <span className={`snake-select__helper-text ${error ? 'snake-select__helper-text--error' : ''}`}>
          {error || helperText}
        </span>
      )}
    </div>
  );
};