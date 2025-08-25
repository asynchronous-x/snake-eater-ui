import React, { useRef, useEffect } from 'react';
import './textarea.css';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Label for the textarea */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Visual variant */
  variant?: 'default' | 'ghost' | 'bordered';
  /** Full width */
  fullWidth?: boolean;
  /** Auto-resize to content */
  autoResize?: boolean;
  /** Minimum rows for auto-resize */
  minRows?: number;
  /** Maximum rows for auto-resize */
  maxRows?: number;
  /** Show character count */
  showCount?: boolean;
  /** Resize behavior */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  /** Additional CSS classes */
  className?: string;
}

/** Textarea component for multi-line text input */
export const Textarea: React.FC<TextareaProps> = ({
  label,
  helperText,
  error,
  size = 'medium',
  variant = 'default',
  fullWidth = false,
  autoResize = false,
  minRows = 3,
  maxRows = 10,
  showCount = false,
  resize = 'vertical',
  disabled = false,
  maxLength,
  value,
  onChange,
  className = '',
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [charCount, setCharCount] = React.useState(value ? String(value).length : 0);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea || !autoResize) return;

    // Reset height to get accurate scrollHeight
    textarea.style.height = 'auto';

    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
    const minHeight = minRows * lineHeight;
    const maxHeight = maxRows * lineHeight;

    const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${newHeight}px`;
  };

  useEffect(() => {
    adjustHeight();
  }, [value, autoResize]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    onChange?.(e);
    adjustHeight();
  };

  const wrapperClasses = [
    'snake-textarea-wrapper',
    `snake-textarea-wrapper--${size}`,
    fullWidth && 'snake-textarea-wrapper--full-width',
    error && 'snake-textarea-wrapper--error',
    disabled && 'snake-textarea-wrapper--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const textareaClasses = [
    'snake-textarea',
    `snake-textarea--${variant}`,
    autoResize && 'snake-textarea--auto-resize',
  ]
    .filter(Boolean)
    .join(' ');

  const resizeStyle = autoResize ? 'none' : resize;

  return (
    <div className={wrapperClasses}>
      {label && <label className="snake-textarea__label">{label}</label>}

      <div className="snake-textarea__container">
        <textarea
          ref={textareaRef}
          className={textareaClasses}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          rows={autoResize ? minRows : props.rows}
          style={{ resize: resizeStyle }}
          {...props}
        />

        <div className="snake-textarea__corner snake-textarea__corner--top-left" />
        <div className="snake-textarea__corner snake-textarea__corner--top-right" />
        <div className="snake-textarea__corner snake-textarea__corner--bottom-left" />
        <div className="snake-textarea__corner snake-textarea__corner--bottom-right" />
      </div>

      <div className="snake-textarea__footer">
        {error ? (
          <span className="snake-textarea__error">{error}</span>
        ) : helperText ? (
          <span className="snake-textarea__helper">{helperText}</span>
        ) : null}

        {showCount && (
          <span className="snake-textarea__count">
            {charCount}
            {maxLength && `/${maxLength}`}
          </span>
        )}
      </div>
    </div>
  );
};
