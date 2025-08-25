import React from 'react';
import './toggle.css';
export interface ToggleProps {
    /** Toggle state */
    checked?: boolean;
    /** Change handler */
    onChange?: (checked: boolean) => void;
    /** Label */
    label?: string;
    /** Helper text */
    helperText?: string;
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Visual variant */
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
    /** Disabled state */
    disabled?: boolean;
    /** Label position */
    labelPosition?: 'left' | 'right';
    /** Additional CSS classes */
    className?: string;
}
/** Toggle/Switch component with dark theme styling */
export declare const Toggle: React.FC<ToggleProps>;
//# sourceMappingURL=Toggle.d.ts.map