import React from 'react';
import './select.css';
interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export interface SelectProps {
    /** Select options */
    options: SelectOption[];
    /** Selected value */
    value?: string;
    /** Change handler */
    onChange?: (value: string) => void;
    /** Placeholder text */
    placeholder?: string;
    /** Label */
    label?: string;
    /** Helper text */
    helperText?: string;
    /** Error message */
    error?: string;
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Visual variant */
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
    /** Full width */
    fullWidth?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Additional CSS classes */
    className?: string;
}
/** Select component with custom dropdown */
export declare const Select: React.FC<SelectProps>;
export {};
//# sourceMappingURL=Select.d.ts.map