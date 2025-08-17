import React, { useState, useEffect } from 'react';
import './card.css';

interface CardProps {
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
  /** Card variant */
  variant?: 'default' | 'grid' | 'transparent';
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

/** Card component with decorative corner elbows */
export const Card: React.FC<CardProps> = ({
  children,
  header,
  footer,
  className = '',
  size = 'medium',
  interactive = false,
  onClick,
  variant = 'default',
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
    'snake-card-component',
    `snake-card-component--${size}`,
    `snake-card-component--${variant}`,
    interactive && 'snake-card-component--interactive',
    transitionIn && 'snake-card-component--transition',
    transitionIn && `snake-card-component--transition-${transitionType}`,
    isVisible && 'snake-card-component--visible',
    isAnimating && 'snake-card-component--animating',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const Component = interactive ? 'button' : 'div';

  const transitionStyle = transitionIn ? {
    '--transition-speed': `${transitionSpeed}ms`,
  } as React.CSSProperties : undefined;

  return (
    <Component
      className={classes}
      onClick={interactive ? onClick : undefined}
      type={interactive ? 'button' : undefined}
      style={transitionStyle}
    >
      {variant === 'grid' && <div className="snake-card-component__grid" />}

      <div className="snake-card-component__elbow snake-card-component__elbow--top-left" />
      <div className="snake-card-component__elbow snake-card-component__elbow--top-right" />
      <div className="snake-card-component__elbow snake-card-component__elbow--bottom-left" />
      <div className="snake-card-component__elbow snake-card-component__elbow--bottom-right" />

      {header && <div className="snake-card-component__header">{header}</div>}

      <div className="snake-card-component__content">{children}</div>

      {footer && <div className="snake-card-component__footer">{footer}</div>}
    </Component>
  );
};
