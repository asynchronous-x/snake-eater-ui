import React from 'react';
import { ErrorBoundary } from '../utils/ErrorBoundary';
import './skeleton.css';

export interface SkeletonProps {
  /** Skeleton variant */
  variant?: 'text' | 'rectangular' | 'circular' | 'button';
  /** Width of the skeleton */
  width?: string | number;
  /** Height of the skeleton */
  height?: string | number;
  /** Animation style */
  animation?: 'pulse' | 'wave' | 'none';
  /** Number of lines (for text variant) */
  lines?: number;
  /** Show corner decorations */
  decorated?: boolean;
  /** Intensity of the animation */
  intensity?: 'subtle' | 'normal' | 'strong';
  /** Additional CSS classes */
  className?: string;
  /** Additional styles */
  style?: React.CSSProperties;
}

/** Skeleton component for loading states */
const SkeletonComponent: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
  lines = 1,
  decorated = false,
  intensity = 'normal',
  className = '',
  style,
}) => {
  const skeletonClasses = [
    'snake-skeleton',
    `snake-skeleton--${variant}`,
    `snake-skeleton--${animation}`,
    `snake-skeleton--intensity-${intensity}`,
    decorated && 'snake-skeleton--decorated',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const getSkeletonStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = { ...style };

    if (width) {
      baseStyle.width = typeof width === 'number' ? `${width}px` : width;
    }

    if (height && variant !== 'text') {
      baseStyle.height = typeof height === 'number' ? `${height}px` : height;
    }

    return baseStyle;
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="snake-skeleton__text-group" style={style}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={skeletonClasses}
            style={{
              ...getSkeletonStyle(),
              width: i === lines - 1 ? '80%' : '100%',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={skeletonClasses} style={getSkeletonStyle()}>
      {decorated && (
        <>
          <div className="snake-skeleton__corner snake-skeleton__corner--top-left" />
          <div className="snake-skeleton__corner snake-skeleton__corner--top-right" />
          <div className="snake-skeleton__corner snake-skeleton__corner--bottom-left" />
          <div className="snake-skeleton__corner snake-skeleton__corner--bottom-right" />
        </>
      )}
    </div>
  );
};

/** Skeleton with error boundary */
export const Skeleton: React.FC<SkeletonProps> = (props) => {
  return (
    <ErrorBoundary componentName="Skeleton" resetOnPropsChange>
      <SkeletonComponent {...props} />
    </ErrorBoundary>
  );
};
