import React from 'react';
import './pininput.css';
export interface PinInputProps {
    /** Number of input fields */
    length?: number;
    /** Callback when all fields are filled */
    onComplete?: (value: string) => void;
    /** Callback when value changes */
    onChange?: (value: string) => void;
    /** Type of input */
    type?: 'numeric' | 'alphanumeric';
    /** Whether to mask the input */
    masked?: boolean;
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Whether the input is disabled */
    disabled?: boolean;
    /** Error state */
    error?: boolean;
    /** Success state */
    success?: boolean;
    /** Auto focus first input */
    autoFocus?: boolean;
    /** Additional CSS classes */
    className?: string;
    /** Placeholder for each input */
    placeholder?: string;
    /** Initial value */
    value?: string;
}
/** Pin Input component for OTP, verification codes, etc. */
export declare const PinInput: React.FC<PinInputProps>;
//# sourceMappingURL=PinInput.d.ts.map