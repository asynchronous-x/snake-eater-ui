import React from 'react';
import './progress.css';

interface ProgressProps {
  /** Progress value (0-100) */
  value: number;
  /** Maximum value */
  max?: number;
  /** Visual variant */
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Show percentage label */
  showLabel?: boolean;
  /** Label position */
  labelPosition?: 'inside' | 'outside';
  /** Animated stripes */
  animated?: boolean;
  /** Indeterminate progress */
  indeterminate?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/** Progress bar component for showing completion status */
export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  variant = 'default',
  size = 'medium',
  showLabel = false,
  labelPosition = 'outside',
  animated = false,
  indeterminate = false,
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const progressClasses = [
    'snake-progress',
    `snake-progress--${variant}`,
    `snake-progress--${size}`,
    animated && 'snake-progress--animated',
    indeterminate && 'snake-progress--indeterminate',
    className
  ].filter(Boolean).join(' ');

  const barClasses = [
    'snake-progress__bar',
    animated && 'snake-progress__bar--striped',
  ].filter(Boolean).join(' ');

  return (
    <div className={progressClasses}>
      {showLabel && labelPosition === 'outside' && (
        <span className="snake-progress__label snake-progress__label--outside">
          {indeterminate ? 'Loading...' : `${Math.round(percentage)}%`}
        </span>
      )}
      
      <div className="snake-progress__track">
        <div 
          className={barClasses}
          style={!indeterminate ? { width: `${percentage}%` } : undefined}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          {showLabel && labelPosition === 'inside' && percentage > 10 && (
            <span className="snake-progress__label snake-progress__label--inside">
              {`${Math.round(percentage)}%`}
            </span>
          )}
        </div>
        
        <div className="snake-progress__corner snake-progress__corner--top-left" />
        <div className="snake-progress__corner snake-progress__corner--top-right" />
        <div className="snake-progress__corner snake-progress__corner--bottom-left" />
        <div className="snake-progress__corner snake-progress__corner--bottom-right" />
      </div>
    </div>
  );
};