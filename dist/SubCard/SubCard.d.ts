import React from 'react';
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
export declare const SubCard: React.FC<SubCardProps>;
//# sourceMappingURL=SubCard.d.ts.map