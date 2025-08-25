import React from 'react';
import './iconbutton.css';
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Icon content */
    icon: React.ReactNode;
    /** Button variant */
    variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'danger';
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Shape variant */
    shape?: 'square' | 'circle';
    /** Loading state */
    loading?: boolean;
    /** Tooltip text */
    tooltip?: string;
    /** Badge content */
    badge?: string | number;
    /** Badge variant */
    badgeVariant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}
/** IconButton component for icon-only actions */
export declare const IconButton: React.FC<IconButtonProps>;
//# sourceMappingURL=IconButton.d.ts.map