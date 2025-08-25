import React from 'react';
import './textarea.css';
export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
    /** Label for the textarea */
    label?: string;
    /** Helper text */
    helperText?: string;
    /** Error message */
    error?: string;
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Visual variant */
    variant?: 'default' | 'ghost' | 'bordered';
    /** Full width */
    fullWidth?: boolean;
    /** Auto-resize to content */
    autoResize?: boolean;
    /** Minimum rows for auto-resize */
    minRows?: number;
    /** Maximum rows for auto-resize */
    maxRows?: number;
    /** Show character count */
    showCount?: boolean;
    /** Resize behavior */
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
    /** Additional CSS classes */
    className?: string;
}
/** Textarea component for multi-line text input */
export declare const Textarea: React.FC<TextareaProps>;
//# sourceMappingURL=Textarea.d.ts.map