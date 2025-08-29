import React from 'react';
import { ErrorBoundary } from '../utils/ErrorBoundary';
import './stat.css';

// Icon components from pixel-icon-library
const AngleUpIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <polygon points="19 17 17 17 17 16 16 16 16 15 15 15 15 14 14 14 14 13 13 13 13 12 11 12 11 13 10 13 10 14 9 14 9 15 8 15 8 16 7 16 7 17 5 17 5 16 4 16 4 14 5 14 5 13 6 13 6 12 7 12 7 11 8 11 8 10 9 10 9 9 10 9 10 8 11 8 11 7 13 7 13 8 14 8 14 9 15 9 15 10 16 10 16 11 17 11 17 12 18 12 18 13 19 13 19 14 20 14 20 16 19 16 19 17" />
  </svg>
);

const AngleDownIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <polygon points="5 7 7 7 7 8 8 8 8 9 9 9 9 10 10 10 10 11 11 11 11 12 13 12 13 11 14 11 14 10 15 10 15 9 16 9 16 8 17 8 17 7 19 7 19 8 20 8 20 10 19 10 19 11 18 11 18 12 17 12 17 13 16 13 16 14 15 14 15 15 14 15 14 16 13 16 13 17 11 17 11 16 10 16 10 15 9 15 9 14 8 14 8 13 7 13 7 12 6 12 6 11 5 11 5 10 4 10 4 8 5 8 5 7" />
  </svg>
);

const AngleRightIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <polygon points="7 19 7 17 8 17 8 16 9 16 9 15 10 15 10 14 11 14 11 13 12 13 12 11 11 11 11 10 10 10 10 9 9 9 9 8 8 8 8 7 7 7 7 5 8 5 8 4 10 4 10 5 11 5 11 6 12 6 12 7 13 7 13 8 14 8 14 9 15 9 15 10 16 10 16 11 17 11 17 13 16 13 16 14 15 14 15 15 14 15 14 16 13 16 13 17 12 17 12 18 11 18 11 19 10 19 10 20 8 20 8 19 7 19" />
  </svg>
);

export interface StatProps {
  /** Label for the stat */
  label: string;
  /** Value to display */
  value: string | number;
  /** Additional info or description */
  info?: string;
  /** Change value */
  change?: {
    value: string | number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  /** Icon to display */
  icon?: React.ReactNode;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Layout variant */
  variant?: 'default' | 'centered' | 'horizontal';
  /** Color variant */
  color?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  /** Loading state */
  loading?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/** Stat component for displaying statistics and metrics */
const StatComponent: React.FC<StatProps> = ({
  label,
  value,
  info,
  change,
  icon,
  size = 'medium',
  variant = 'default',
  color = 'default',
  loading = false,
  className = '',
}) => {
  const statClasses = [
    'snake-stat',
    `snake-stat--${size}`,
    `snake-stat--${variant}`,
    `snake-stat--${color}`,
    loading && 'snake-stat--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const changeClasses = ['snake-stat__change', change && `snake-stat__change--${change.type}`]
    .filter(Boolean)
    .join(' ');

  const getChangeIcon = () => {
    if (!change) return null;
    switch (change.type) {
      case 'increase':
        return <AngleUpIcon />;
      case 'decrease':
        return <AngleDownIcon />;
      default:
        return <AngleRightIcon />;
    }
  };

  return (
    <div className={statClasses}>
      <div className="snake-stat__corner snake-stat__corner--top-left" />
      <div className="snake-stat__corner snake-stat__corner--top-right" />

      {icon && <div className="snake-stat__icon">{icon}</div>}

      <div className="snake-stat__content">
        <div className="snake-stat__label">{label}</div>

        {loading ? (
          <div className="snake-stat__value">
            <span className="snake-stat__loading-bar" />
          </div>
        ) : (
          <div className="snake-stat__value">{value}</div>
        )}

        {(info || change) && (
          <div className="snake-stat__footer">
            {info && <div className="snake-stat__info">{info}</div>}
            {change && (
              <div className={changeClasses}>
                <span className="snake-stat__change-icon">{getChangeIcon()}</span>
                <span className="snake-stat__change-value">{change.value}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="snake-stat__corner snake-stat__corner--bottom-left" />
      <div className="snake-stat__corner snake-stat__corner--bottom-right" />
    </div>
  );
};

/** Stat with error boundary */
export const Stat: React.FC<StatProps> = (props) => {
  return (
    <ErrorBoundary componentName="Stat" resetOnPropsChange>
      <StatComponent {...props} />
    </ErrorBoundary>
  );
};
