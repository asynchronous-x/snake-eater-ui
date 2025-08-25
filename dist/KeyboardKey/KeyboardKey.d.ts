import React from 'react';
import './keyboardkey.css';
export interface KeyboardKeyProps {
    /** The key label to display */
    children: React.ReactNode;
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Key variant */
    variant?: 'default' | 'modifier' | 'action' | 'danger' | 'space';
    /** Whether the key is pressed */
    pressed?: boolean;
    /** Whether the key is disabled */
    disabled?: boolean;
    /** Click handler */
    onClick?: () => void;
    /** Additional CSS classes */
    className?: string;
    /** Width multiplier for special keys */
    width?: number;
    /** Icon to display alongside text */
    icon?: React.ReactNode;
    /** Position of icon */
    iconPosition?: 'left' | 'right' | 'top' | 'bottom';
}
/** Keyboard Key component for displaying keyboard shortcuts or virtual keyboards */
export declare const KeyboardKey: React.FC<KeyboardKeyProps>;
//# sourceMappingURL=KeyboardKey.d.ts.map