import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from '../utils/ErrorBoundary';
import './subcard.css';

export interface SubCardProps {
  /** Card content */
  children: React.ReactNode;
  /** Optional header content */
  header?: React.ReactNode;
  /** Optional footer content */
  footer?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Whether the card is interactive (hoverable) */
  interactive?: boolean;
  /** Click handler for interactive cards */
  onClick?: () => void;
  /** Color variant */
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'inactive';
  /** Custom color for corner plus symbols */
  cornerColor?: string;
  /** Enable transition animation */
  transitionIn?: boolean;
  /** Type of transition animation */
  transitionType?: 'expand' | 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';
  /** Transition speed in milliseconds */
  transitionSpeed?: number;
  /** Delay before transition starts in milliseconds */
  transitionDelay?: number;
  /** Callback when transition completes */
  onTransitionComplete?: () => void;
}

/** SubCard component with plus symbols in corners */
const SubCardComponent: React.FC<SubCardProps> = ({
  children,
  header,
  footer,
  className = '',
  size = 'medium',
  interactive = false,
  onClick,
  variant = 'default',
  cornerColor,
  transitionIn = false,
  transitionType = 'expand',
  transitionSpeed = 300,
  transitionDelay = 0,
  onTransitionComplete,
}) => {
  const [isVisible, setIsVisible] = useState(!transitionIn);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (transitionIn) {
      const delayTimer = setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);

        const completeTimer = setTimeout(() => {
          setIsAnimating(false);
          onTransitionComplete?.();
        }, transitionSpeed);

        return () => clearTimeout(completeTimer);
      }, transitionDelay);

      return () => clearTimeout(delayTimer);
    }
  }, [transitionIn, transitionDelay, transitionSpeed, onTransitionComplete]);

  const classes = [
    'snake-subcard',
    `snake-subcard--${size}`,
    `snake-subcard--${variant}`,
    interactive && 'snake-subcard--interactive',
    transitionIn && 'snake-subcard--transition',
    transitionIn && `snake-subcard--transition-${transitionType}`,
    isVisible && 'snake-subcard--visible',
    isAnimating && 'snake-subcard--animating',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const Component = interactive ? 'button' : 'div';

  const transitionStyle = transitionIn
    ? ({
        '--transition-speed': `${transitionSpeed}ms`,
      } as React.CSSProperties)
    : undefined;

  return (
    <Component
      className={classes}
      onClick={interactive ? onClick : undefined}
      type={interactive ? 'button' : undefined}
      style={transitionStyle}
    >
      <div
        className="snake-subcard__corner snake-subcard__corner--top-left"
        style={cornerColor ? { color: cornerColor } : undefined}
      >
        ＋
      </div>
      <div
        className="snake-subcard__corner snake-subcard__corner--top-right"
        style={cornerColor ? { color: cornerColor } : undefined}
      >
        ＋
      </div>
      <div
        className="snake-subcard__corner snake-subcard__corner--bottom-left"
        style={cornerColor ? { color: cornerColor } : undefined}
      >
        ＋
      </div>
      <div
        className="snake-subcard__corner snake-subcard__corner--bottom-right"
        style={cornerColor ? { color: cornerColor } : undefined}
      >
        ＋
      </div>

      {header && <div className="snake-subcard__header">{header}</div>}

      <div className="snake-subcard__content">{children}</div>

      {footer && <div className="snake-subcard__footer">{footer}</div>}
    </Component>
  );
};

/** SubCard with error boundary */
export const SubCard: React.FC<SubCardProps> = (props) => {
  return (
    <ErrorBoundary componentName="SubCard" resetOnPropsChange>
      <SubCardComponent {...props} />
    </ErrorBoundary>
  );
};
