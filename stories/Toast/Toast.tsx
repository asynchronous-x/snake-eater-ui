import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from '../utils/ErrorBoundary';
import './toast.css';

// Icon components from pixel-icon-library
const AngleRightIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <polygon points="7 19 7 17 8 17 8 16 9 16 9 15 10 15 10 14 11 14 11 13 12 13 12 11 11 11 11 10 10 10 10 9 9 9 9 8 8 8 8 7 7 7 7 5 8 5 8 4 10 4 10 5 11 5 11 6 12 6 12 7 13 7 13 8 14 8 14 9 15 9 15 10 16 10 16 11 17 11 17 13 16 13 16 14 15 14 15 15 14 15 14 16 13 16 13 17 12 17 12 18 11 18 11 19 10 19 10 20 8 20 8 19 7 19" />
  </svg>
);

const CheckIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <polygon points="23 5 23 6 22 6 22 7 21 7 21 8 20 8 20 9 19 9 19 10 18 10 18 11 17 11 17 12 16 12 16 13 15 13 15 14 14 14 14 15 13 15 13 16 12 16 12 17 11 17 11 18 10 18 10 19 8 19 8 18 7 18 7 17 6 17 6 16 5 16 5 15 4 15 4 14 3 14 3 13 2 13 2 12 1 12 1 11 2 11 2 10 3 10 3 9 4 9 4 10 5 10 5 11 6 11 6 12 7 12 7 13 8 13 8 14 10 14 10 13 11 13 11 12 12 12 12 11 13 11 13 10 14 10 14 9 15 9 15 8 16 8 16 7 17 7 17 6 18 6 18 5 19 5 19 4 20 4 20 3 21 3 21 4 22 4 22 5 23 5" />
  </svg>
);

const ExclamationTriangleIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="m22,20v-2h-1v-2h-1v-2h-1v-2h-1v-2h-1v-2h-1v-2h-1v-2h-1v-2h-1v-1h-2v1h-1v2h-1v2h-1v2h-1v2h-1v2h-1v2h-1v2h-1v2h-1v2h-1v2h1v1h20v-1h1v-2h-1Zm-12-9h4v3h-1v3h-2v-3h-1v-3Zm1,7h2v2h-2v-2Z" />
  </svg>
);

const TimesIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <polygon points="15 13 16 13 16 14 17 14 17 15 18 15 18 16 19 16 19 17 20 17 20 18 21 18 21 19 22 19 22 20 21 20 21 21 20 21 20 22 19 22 19 21 18 21 18 20 17 20 17 19 16 19 16 18 15 18 15 17 14 17 14 16 13 16 13 15 11 15 11 16 10 16 10 17 9 17 9 18 8 18 8 19 7 19 7 20 6 20 6 21 5 21 5 22 4 22 4 21 3 21 3 20 2 20 2 19 3 19 3 18 4 18 4 17 5 17 5 16 6 16 6 15 7 15 7 14 8 14 8 13 9 13 9 11 8 11 8 10 7 10 7 9 6 9 6 8 5 8 5 7 4 7 4 6 3 6 3 5 2 5 2 4 3 4 3 3 4 3 4 2 5 2 5 3 6 3 6 4 7 4 7 5 8 5 8 6 9 6 9 7 10 7 10 8 11 8 11 9 13 9 13 8 14 8 14 7 15 7 15 6 16 6 16 5 17 5 17 4 18 4 18 3 19 3 19 2 20 2 20 3 21 3 21 4 22 4 22 5 21 5 21 6 20 6 20 7 19 7 19 8 18 8 18 9 17 9 17 10 16 10 16 11 15 11 15 13" />
  </svg>
);

const InfoCircleIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="m22,9v-2h-1v-2h-1v-1h-1v-1h-2v-1h-2v-1h-6v1h-2v1h-2v1h-1v1h-1v2h-1v2h-1v6h1v2h1v2h1v1h1v1h2v1h2v1h6v-1h2v-1h2v-1h1v-1h1v-2h1v-2h1v-6h-1Zm-11-3h2v2h-2v-2Zm-1,9h1v-5h-1v-1h3v6h1v2h-4v-2Z" />
  </svg>
);

export interface ToastProps {
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
const ToastComponent: React.FC<ToastProps> = ({
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
        return <CheckIcon />;
      case 'warning':
        return <ExclamationTriangleIcon />;
      case 'danger':
        return <TimesIcon />;
      case 'info':
        return <InfoCircleIcon />;
      default:
        return <AngleRightIcon />;
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
          <TimesIcon />
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

/** Toast with error boundary */
export const Toast: React.FC<ToastProps> = (props) => {
  return (
    <ErrorBoundary componentName="Toast" resetOnPropsChange>
      <ToastComponent {...props} />
    </ErrorBoundary>
  );
};
