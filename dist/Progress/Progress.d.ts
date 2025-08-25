import React from 'react';
import './progress.css';
export interface ProgressProps {
    /** Current progress value (0-100) */
    value?: number;
    /** Maximum value */
    max?: number;
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Color variant */
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'cyber';
    /** Show percentage label */
    showLabel?: boolean;
    /** Label position */
    labelPosition?: 'outside' | 'top' | 'bottom';
    /** Progress type */
    type?: 'linear' | 'striped' | 'animated' | 'segmented';
    /** Number of segments for segmented type */
    segments?: number;
    /** Custom label text */
    label?: string;
    /** Format value function */
    formatValue?: (value: number, max: number) => string;
    /** Indeterminate state */
    indeterminate?: boolean;
    /** Additional CSS classes */
    className?: string;
    /** ARIA label */
    ariaLabel?: string;
}
/** Progress component for displaying progress indicators */
export declare const Progress: React.FC<ProgressProps>;
//# sourceMappingURL=Progress.d.ts.map