import React from 'react';
import './progress.css';

interface ProgressProps {
  /** Current progress value (0-100) */
  value?: number;
  /** Maximum value */
  max?: number;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Color variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'cyber';
  /** Show percentage label */
  showLabel?: boolean;
  /** Label position */
  labelPosition?: 'outside' | 'top' | 'bottom';
  /** Progress type */
  type?: 'linear' | 'striped' | 'animated' | 'segmented';
  /** Number of segments for segmented type */
  segments?: number;
  /** Custom label text */
  label?: string;
  /** Format value function */
  formatValue?: (value: number, max: number) => string;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label */
  ariaLabel?: string;
}

/** Progress component for displaying progress indicators */
export const Progress: React.FC<ProgressProps> = ({
  value = 0,
  max = 100,
  size = 'medium',
  variant = 'default',
  showLabel = false,
  labelPosition = 'bottom',
  type = 'linear',
  segments = 10,
  label,
  formatValue = (val, max) => `${Math.round((val / max) * 100)}%`,
  indeterminate = false,
  className = '',
  ariaLabel,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const progressClasses = [
    'snake-progress',
    `snake-progress--${size}`,
    `snake-progress--${variant}`,
    `snake-progress--${type}`,
    indeterminate && 'snake-progress--indeterminate',
    showLabel && `snake-progress--label-${labelPosition}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderSegments = () => {
    if (type !== 'segmented') return null;

    const segmentElements = [];
    const filledSegments = Math.floor((percentage / 100) * segments);

    for (let i = 0; i < segments; i++) {
      segmentElements.push(
        <div
          key={i}
          className={`snake-progress__segment ${i < filledSegments ? 'snake-progress__segment--filled' : ''}`}
        />,
      );
    }

    return segmentElements;
  };

  const renderProgressBar = () => {
    if (type === 'segmented') {
      return <div className="snake-progress__segments">{renderSegments()}</div>;
    }

    return (
      <>
        <div
          className="snake-progress__fill"
          style={!indeterminate ? { width: `${percentage}%` } : undefined}
        />
        {type === 'striped' && <div className="snake-progress__stripes" />}
      </>
    );
  };

  return (
    <div className={progressClasses}>
      {showLabel && labelPosition === 'top' && (
        <div className="snake-progress__label snake-progress__label--top">
          {label || formatValue(value, max)}
        </div>
      )}

      <div
        className="snake-progress__container"
        role="progressbar"
        aria-valuenow={!indeterminate ? value : undefined}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={ariaLabel || 'Progress'}
      >
        <div className="snake-progress__track">{renderProgressBar()}</div>

        {showLabel && labelPosition === 'outside' && (
          <span className="snake-progress__label snake-progress__label--outside">
            {label || formatValue(value, max)}
          </span>
        )}

        <div className="snake-progress__corner snake-progress__corner--top-left" />
        <div className="snake-progress__corner snake-progress__corner--top-right" />
        <div className="snake-progress__corner snake-progress__corner--bottom-left" />
        <div className="snake-progress__corner snake-progress__corner--bottom-right" />
      </div>

      {showLabel && labelPosition === 'bottom' && (
        <div className="snake-progress__label snake-progress__label--bottom">
          {label || formatValue(value, max)}
        </div>
      )}
    </div>
  );
};
