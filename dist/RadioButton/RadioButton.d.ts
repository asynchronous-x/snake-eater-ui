import React from 'react';
import './radiobutton.css';
interface RadioOption {
    value: string;
    label: string;
    disabled?: boolean;
    helperText?: string;
}
export interface RadioButtonProps {
    /** Radio options */
    options: RadioOption[];
    /** Selected value */
    value?: string;
    /** Change handler */
    onChange?: (value: string) => void;
    /** Group name */
    name: string;
    /** Group label */
    label?: string;
    /** Layout direction */
    direction?: 'horizontal' | 'vertical';
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Visual variant */
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
    /** Error message */
    error?: string;
    /** Additional CSS classes */
    className?: string;
}
/** RadioButton component with dark theme styling */
export declare const RadioButton: React.FC<RadioButtonProps>;
export {};
//# sourceMappingURL=RadioButton.d.ts.map