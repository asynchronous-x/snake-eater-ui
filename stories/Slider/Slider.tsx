import React, { useState, useRef, useEffect } from 'react';
import './slider.css';

export interface SliderProps {
  /** Current value */
  value?: number;
  /** Value change handler */
  onChange?: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Show value label */
  showValue?: boolean;
  /** Value label position */
  valueLabelPosition?: 'top' | 'bottom' | 'tooltip';
  /** Show tick marks */
  showTicks?: boolean;
  /** Tick interval */
  tickInterval?: number;
  /** Custom marks */
  marks?: Array<{ value: number; label?: string }>;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Color variant */
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Disabled state */
  disabled?: boolean;
  /** Label */
  label?: string;
  /** Format value function */
  formatValue?: (value: number) => string;
  /** Additional CSS classes */
  className?: string;
}

/** Slider component for selecting numeric values */
export const Slider: React.FC<SliderProps> = ({
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  showValue = false,
  valueLabelPosition = 'top',
  showTicks = false,
  tickInterval = 10,
  marks,
  size = 'medium',
  variant = 'default',
  orientation = 'horizontal',
  disabled = false,
  label,
  formatValue = (v) => v.toString(),
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const percentage = ((internalValue - min) / (max - min)) * 100;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    updateValue(e);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !disabled) {
      updateValue(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateValue = (e: React.MouseEvent | MouseEvent) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    let percentage: number;

    if (orientation === 'horizontal') {
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      percentage = x / rect.width;
    } else {
      const y = Math.max(0, Math.min(rect.height - (e.clientY - rect.top), rect.height));
      percentage = y / rect.height;
    }

    const newValue = Math.round((min + percentage * (max - min)) / step) * step;
    const clampedValue = Math.max(min, Math.min(max, newValue));

    setInternalValue(clampedValue);
    onChange?.(clampedValue);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    let newValue = internalValue;
    const bigStep = step * 10;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(min, internalValue - step);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(max, internalValue + step);
        break;
      case 'PageDown':
        newValue = Math.max(min, internalValue - bigStep);
        break;
      case 'PageUp':
        newValue = Math.min(max, internalValue + bigStep);
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }

    e.preventDefault();
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const renderTicks = () => {
    if (!showTicks && !marks) return null;

    const tickMarks = marks || [];

    if (showTicks && !marks) {
      for (let i = min; i <= max; i += tickInterval) {
        tickMarks.push({ value: i });
      }
    }

    return tickMarks.map((mark) => {
      const markPercentage = ((mark.value - min) / (max - min)) * 100;
      const style =
        orientation === 'horizontal'
          ? { left: `${markPercentage}%` }
          : { bottom: `${markPercentage}%` };

      return (
        <div key={mark.value} className="snake-slider__tick" style={style}>
          {mark.label && <span className="snake-slider__tick-label">{mark.label}</span>}
        </div>
      );
    });
  };

  const sliderClasses = [
    'snake-slider',
    `snake-slider--${size}`,
    `snake-slider--${variant}`,
    `snake-slider--${orientation}`,
    disabled && 'snake-slider--disabled',
    isDragging && 'snake-slider--dragging',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const thumbStyle =
    orientation === 'horizontal' ? { left: `${percentage}%` } : { bottom: `${percentage}%` };

  const fillStyle =
    orientation === 'horizontal' ? { width: `${percentage}%` } : { height: `${percentage}%` };

  return (
    <div className={sliderClasses}>
      {label && <label className="snake-slider__label">{label}</label>}

      <div className="snake-slider__container">
        {showValue && valueLabelPosition === 'top' && (
          <div className="snake-slider__value snake-slider__value--top">
            {formatValue(internalValue)}
          </div>
        )}

        <div
          ref={sliderRef}
          className="snake-slider__wrapper"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <div ref={trackRef} className="snake-slider__track" onMouseDown={handleMouseDown}>
            <div className="snake-slider__fill" style={fillStyle} />
            {renderTicks()}

            <div
              className="snake-slider__thumb"
              style={thumbStyle}
              tabIndex={disabled ? -1 : 0}
              role="slider"
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={internalValue}
              aria-disabled={disabled}
              onKeyDown={handleKeyDown}
            >
              {showValue && valueLabelPosition === 'tooltip' && showTooltip && (
                <div className="snake-slider__tooltip">{formatValue(internalValue)}</div>
              )}
            </div>
          </div>

          <div className="snake-slider__corner snake-slider__corner--start-top" />
          <div className="snake-slider__corner snake-slider__corner--start-bottom" />
          <div className="snake-slider__corner snake-slider__corner--end-top" />
          <div className="snake-slider__corner snake-slider__corner--end-bottom" />
        </div>

        {showValue && valueLabelPosition === 'bottom' && (
          <div className="snake-slider__value snake-slider__value--bottom">
            {formatValue(internalValue)}
          </div>
        )}
      </div>
    </div>
  );
};
