import React, { useRef, useState, useEffect } from 'react';
import './pininput.css';

interface PinInputProps {
  /** Number of input fields */
  length?: number;
  /** Callback when all fields are filled */
  onComplete?: (value: string) => void;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Type of input */
  type?: 'numeric' | 'alphanumeric';
  /** Whether to mask the input */
  masked?: boolean;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Success state */
  success?: boolean;
  /** Auto focus first input */
  autoFocus?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Placeholder for each input */
  placeholder?: string;
  /** Initial value */
  value?: string;
}

/** Pin Input component for OTP, verification codes, etc. */
export const PinInput: React.FC<PinInputProps> = ({
  length = 4,
  onComplete,
  onChange,
  type = 'numeric',
  masked = false,
  size = 'medium',
  disabled = false,
  error = false,
  success = false,
  autoFocus = false,
  className = '',
  placeholder = '○',
  value = '',
}) => {
  const [values, setValues] = useState<string[]>(() => {
    const initial = value.split('').slice(0, length);
    return Array(length).fill('').map((_, i) => initial[i] || '');
  });
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (value !== undefined) {
      const newValues = value.split('').slice(0, length);
      setValues(Array(length).fill('').map((_, i) => newValues[i] || ''));
    }
  }, [value, length]);

  useEffect(() => {
    const combined = values.join('');
    onChange?.(combined);
    
    if (combined.length === length && values.every(v => v !== '')) {
      onComplete?.(combined);
    }
  }, [values, length, onChange, onComplete]);

  const handleChange = (index: number, value: string) => {
    if (disabled) return;

    // Handle paste
    if (value.length > 1) {
      const pastedValues = value.split('').slice(0, length);
      const newValues = [...values];
      
      pastedValues.forEach((char, i) => {
        if (index + i < length) {
          if (type === 'numeric' && !/^\d$/.test(char)) return;
          if (type === 'alphanumeric' && !/^[a-zA-Z0-9]$/.test(char)) return;
          newValues[index + i] = char;
        }
      });
      
      setValues(newValues);
      
      // Focus last filled input or next empty one
      const lastFilledIndex = newValues.findLastIndex(v => v !== '');
      const nextIndex = Math.min(lastFilledIndex + 1, length - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    // Validate input
    if (value !== '') {
      if (type === 'numeric' && !/^\d$/.test(value)) return;
      if (type === 'alphanumeric' && !/^[a-zA-Z0-9]$/.test(value)) return;
    }

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    // Auto-focus next input
    if (value !== '' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    // Handle backspace
    if (e.key === 'Backspace') {
      if (values[index] === '' && index > 0) {
        // If current field is empty, go to previous field
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current field
        const newValues = [...values];
        newValues[index] = '';
        setValues(newValues);
      }
    }

    // Handle arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Handle delete
    if (e.key === 'Delete') {
      const newValues = [...values];
      newValues[index] = '';
      setValues(newValues);
    }
  };

  const handleFocus = (index: number) => {
    inputRefs.current[index]?.select();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const firstEmptyIndex = values.findIndex(v => v === '');
    const startIndex = firstEmptyIndex === -1 ? 0 : firstEmptyIndex;
    handleChange(startIndex, pastedData);
  };

  const classes = [
    'snake-pin-input',
    `snake-pin-input--${size}`,
    error && 'snake-pin-input--error',
    success && 'snake-pin-input--success',
    disabled && 'snake-pin-input--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type={masked ? 'password' : 'text'}
            inputMode={type === 'numeric' ? 'numeric' : 'text'}
            className={[
              'snake-pin-input__field',
              values[index] && 'snake-pin-input__field--filled',
            ]
              .filter(Boolean)
              .join(' ')}
            value={masked && values[index] ? '●' : values[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onFocus={() => handleFocus(index)}
            onPaste={handlePaste}
            disabled={disabled}
            maxLength={1}
            autoFocus={autoFocus && index === 0}
            placeholder={placeholder}
            aria-label={`Pin input ${index + 1} of ${length}`}
          />
        ))}
    </div>
  );
};