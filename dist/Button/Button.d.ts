import React from 'react';
import './button.css';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visual style variant */
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'cyber' | 'clipped';
    /** How large should the button be? */
    size?: 'small' | 'medium' | 'large';
    /** Is the button in a loading state? */
    loading?: boolean;
    /** Should the button fill its container? */
    fullWidth?: boolean;
    /** Button contents */
    children: React.ReactNode;
}
/** Primary UI component for user interaction */
export declare const Button: React.FC<ButtonProps>;
//# sourceMappingURL=Button.d.ts.map