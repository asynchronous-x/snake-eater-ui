import React from 'react';
import './loading.css';

interface LoadingProps {
  /** Loading type */
  type?: 'dots' | 'bars' | 'pulse' | 'grid';
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Color variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  /** Show text label */
  text?: string;
  /** Full screen overlay */
  fullscreen?: boolean;
  /** Backdrop for inline loading */
  backdrop?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/** Loading component for indicating loading states */
export const Loading: React.FC<LoadingProps> = ({
  type = 'grid',
  size = 'medium',
  variant = 'default',
  text,
  fullscreen = false,
  backdrop = false,
  className = '',
}) => {
  const loadingClasses = [
    'snake-loading',
    `snake-loading--${type}`,
    `snake-loading--${size}`,
    `snake-loading--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderLoader = () => {
    switch (type) {
      case 'dots':
        return (
          <div className="snake-loading__dots">
            <span className="snake-loading__dot" />
            <span className="snake-loading__dot" />
            <span className="snake-loading__dot" />
          </div>
        );

      case 'bars':
        return (
          <div className="snake-loading__bars">
            <span className="snake-loading__bar" />
            <span className="snake-loading__bar" />
            <span className="snake-loading__bar" />
            <span className="snake-loading__bar" />
          </div>
        );

      case 'pulse':
        return (
          <div className="snake-loading__pulse">
            <span className="snake-loading__pulse-ring" />
            <span className="snake-loading__pulse-ring" />
          </div>
        );

      case 'grid':
        return (
          <div className="snake-loading__grid">
            {[...Array(9)].map((_, i) => (
              <span key={i} className="snake-loading__grid-cell" />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const content = (
    <div className={loadingClasses}>
      <div className="snake-loading__content">
        {renderLoader()}
        {text && <div className="snake-loading__text">{text}</div>}
      </div>
    </div>
  );

  if (fullscreen) {
    return <div className="snake-loading__fullscreen">{content}</div>;
  }

  if (backdrop) {
    return <div className="snake-loading__backdrop">{content}</div>;
  }

  return content;
};
