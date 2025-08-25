import React from 'react';
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
export declare const Skeleton: React.FC<SkeletonProps>;
//# sourceMappingURL=Skeleton.d.ts.map