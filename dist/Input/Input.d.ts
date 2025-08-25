import React from 'react';
import './input.css';
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** Input label */
    label?: string;
    /** Helper text below input */
    helperText?: string;
    /** Error message */
    error?: string;
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Visual variant */
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
    /** Full width */
    fullWidth?: boolean;
    /** Icon to display on the left */
    leftIcon?: React.ReactNode;
    /** Icon to display on the right */
    rightIcon?: React.ReactNode;
}
/** Input component with dark theme styling */
export declare const Input: React.FC<InputProps>;
//# sourceMappingURL=Input.d.ts.map