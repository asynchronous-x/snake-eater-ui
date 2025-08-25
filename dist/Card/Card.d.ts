import React from 'react';
import './card.css';
export interface CardProps {
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
export declare const Card: React.FC<CardProps>;
//# sourceMappingURL=Card.d.ts.map