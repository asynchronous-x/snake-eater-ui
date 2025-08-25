import React from 'react';
import './checkbox.css';
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    /** Checkbox label */
    label?: string;
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Color variant */
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
    /** Indeterminate state */
    indeterminate?: boolean;
    /** Helper text */
    helperText?: string;
    /** Error state */
    error?: boolean;
    /** Additional CSS classes */
    className?: string;
}
/** Checkbox component for boolean selections */
export declare const Checkbox: React.FC<CheckboxProps>;
//# sourceMappingURL=Checkbox.d.ts.map