import React from 'react';
import './stat.css';
export interface StatProps {
    /** Label for the stat */
    label: string;
    /** Value to display */
    value: string | number;
    /** Additional info or description */
    info?: string;
    /** Change value */
    change?: {
        value: string | number;
        type: 'increase' | 'decrease' | 'neutral';
    };
    /** Icon to display */
    icon?: React.ReactNode;
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Layout variant */
    variant?: 'default' | 'centered' | 'horizontal';
    /** Color variant */
    color?: 'default' | 'success' | 'warning' | 'danger' | 'info';
    /** Loading state */
    loading?: boolean;
    /** Additional CSS classes */
    className?: string;
}
/** Stat component for displaying statistics and metrics */
export declare const Stat: React.FC<StatProps>;
//# sourceMappingURL=Stat.d.ts.map