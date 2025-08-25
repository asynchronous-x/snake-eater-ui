import React from 'react';
import './loading.css';
export interface LoadingProps {
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
export declare const Loading: React.FC<LoadingProps>;
//# sourceMappingURL=Loading.d.ts.map