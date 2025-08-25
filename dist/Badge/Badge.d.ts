import React from 'react';
import './badge.css';
export interface BadgeProps {
    /** Badge content */
    children: React.ReactNode;
    /** Visual variant */
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'ghost';
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Style variant */
    style?: 'solid' | 'outline' | 'dot';
    /** Icon to display */
    icon?: React.ReactNode;
    /** Clickable badge */
    onClick?: () => void;
    /** Additional CSS classes */
    className?: string;
}
/** Badge component for status indicators and labels */
export declare const Badge: React.FC<BadgeProps>;
//# sourceMappingURL=Badge.d.ts.map