import React, { useEffect, useState } from 'react';
import './toast.css';

interface ToastProps {
  /** Toast content */
  message: string;
  /** Toast variant */
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  /** Toast position */
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  /** Duration in milliseconds (0 for persistent) */
  duration?: number;
  /** Show close button */
  closable?: boolean;
  /** Close handler */
  onClose?: () => void;
  /** Show icon */
  showIcon?: boolean;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Action button */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Progress bar */
  showProgress?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/** Toast component for notifications */
export const Toast: React.FC<ToastProps> = ({
  message,
  variant = 'default',
  position = 'bottom-right',
  duration = 3000,
  closable = true,
  onClose,
  showIcon = true,
  icon,
  action,
  showProgress = false,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300);
      }, duration);

      if (showProgress) {
        const interval = setInterval(() => {
          setProgress((prev) => {
            const newProgress = prev - 100 / (duration / 100);
            return newProgress > 0 ? newProgress : 0;
          });
        }, 100);

        return () => {
          clearTimeout(timer);
          clearInterval(interval);
        };
      }

      return () => clearTimeout(timer);
    }
  }, [duration, onClose, showProgress]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

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

  const toastClasses = [
    'snake-toast',
    `snake-toast--${variant}`,
    `snake-toast--${position}`,
    !isVisible && 'snake-toast--hidden',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={toastClasses} role="alert">
      {showIcon && <div className="snake-toast__icon">{getDefaultIcon()}</div>}

      <div className="snake-toast__content">
        <div className="snake-toast__message">{message}</div>
        {action && (
          <button className="snake-toast__action" onClick={action.onClick}>
            {action.label}
          </button>
        )}
      </div>

      {closable && (
        <button className="snake-toast__close" onClick={handleClose} aria-label="Close">
          ✕
        </button>
      )}

      {showProgress && duration > 0 && (
        <div className="snake-toast__progress">
          <div className="snake-toast__progress-bar" style={{ width: `${progress}%` }} />
        </div>
      )}

      <div className="snake-toast__corner snake-toast__corner--top-left" />
      <div className="snake-toast__corner snake-toast__corner--top-right" />
      <div className="snake-toast__corner snake-toast__corner--bottom-left" />
      <div className="snake-toast__corner snake-toast__corner--bottom-right" />
    </div>
  );
};

// Toast container component for managing multiple toasts
interface ToastContainerProps {
  toasts: Array<{
    id: string;
    message: string;
    variant?: ToastProps['variant'];
    duration?: number;
    action?: ToastProps['action'];
  }>;
  position?: ToastProps['position'];
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  position = 'bottom-right',
  onClose,
}) => {
  const containerClasses = ['snake-toast-container', `snake-toast-container--${position}`].join(
    ' ',
  );

  return (
    <div className={containerClasses}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          variant={toast.variant}
          duration={toast.duration}
          action={toast.action}
          position={position}
          onClose={() => onClose(toast.id)}
          showProgress
        />
      ))}
    </div>
  );
};
