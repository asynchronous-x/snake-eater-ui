import React from 'react';
import './link.css';
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Link variant */
    variant?: 'default' | 'primary' | 'subtle' | 'underline';
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** External link indicator */
    external?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Show icon before text */
    startIcon?: React.ReactNode;
    /** Show icon after text */
    endIcon?: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
    /** Children content */
    children: React.ReactNode;
}
/** Link component for navigation */
export declare const Link: React.FC<LinkProps>;
//# sourceMappingURL=Link.d.ts.map