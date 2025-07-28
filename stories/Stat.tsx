import React from 'react';
import './stat.css';

interface StatProps {
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
export const Stat: React.FC<StatProps> = ({
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
    className
  ].filter(Boolean).join(' ');

  const changeClasses = [
    'snake-stat__change',
    change && `snake-stat__change--${change.type}`
  ].filter(Boolean).join(' ');

  const getChangeIcon = () => {
    if (!change) return null;
    switch (change.type) {
      case 'increase': return '↑';
      case 'decrease': return '↓';
      default: return '→';
    }
  };

  return (
    <div className={statClasses}>
      <div className="snake-stat__corner snake-stat__corner--top-left" />
      <div className="snake-stat__corner snake-stat__corner--top-right" />
      
      {icon && (
        <div className="snake-stat__icon">
          {icon}
        </div>
      )}
      
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