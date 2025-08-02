import React from 'react';
import './alert.css';

interface AlertProps {
  /** Alert title */
  title?: string;
  /** Alert description */
  description?: React.ReactNode;
  /** Alert variant */
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Show icon */
  showIcon?: boolean;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Closable alert */
  closable?: boolean;
  /** Close handler */
  onClose?: () => void;
  /** Action buttons */
  actions?: React.ReactNode;
  /** Border position */
  borderPosition?: 'left' | 'top' | 'all';
  /** Additional CSS classes */
  className?: string;
  /** Children content (alternative to description) */
  children?: React.ReactNode;
}

/** Alert component for displaying important messages */
export const Alert: React.FC<AlertProps> = ({
  title,
  description,
  variant = 'default',
  size = 'medium',
  showIcon = true,
  icon,
  closable = false,
  onClose,
  actions,
  borderPosition = 'left',
  className = '',
  children,
}) => {
  const alertClasses = [
    'snake-alert',
    `snake-alert--${variant}`,
    `snake-alert--${size}`,
    `snake-alert--border-${borderPosition}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const getDefaultIcon = () => {
    if (icon) return icon;

    switch (variant) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'danger':
        return '✕';
      case 'info':
        return 'ℹ';
      default:
        return '→';
    }
  };

  return (
    <div className={alertClasses} role="alert">
      {showIcon && <div className="snake-alert__icon">{getDefaultIcon()}</div>}

      <div className="snake-alert__content">
        {title && <div className="snake-alert__title">{title}</div>}
        {(description || children) && (
          <div className="snake-alert__description">{description || children}</div>
        )}
        {actions && <div className="snake-alert__actions">{actions}</div>}
      </div>

      {closable && (
        <button className="snake-alert__close" onClick={onClose} aria-label="Close alert">
          ✕
        </button>
      )}

      <div className="snake-alert__corner snake-alert__corner--top-left" />
      <div className="snake-alert__corner snake-alert__corner--top-right" />
      <div className="snake-alert__corner snake-alert__corner--bottom-left" />
      <div className="snake-alert__corner snake-alert__corner--bottom-right" />
    </div>
  );
};
