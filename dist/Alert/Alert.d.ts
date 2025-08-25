import React from 'react';
import './alert.css';
export interface AlertProps {
    /** Alert title */
    title?: string;
    /** Alert description */
    description?: React.ReactNode;
    /** Alert variant */
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Show icon */
    showIcon?: boolean;
    /** Custom icon */
    icon?: React.ReactNode;
    /** Closable alert */
    closable?: boolean;
    /** Close handler */
    onClose?: () => void;
    /** Action buttons */
    actions?: React.ReactNode;
    /** Border position */
    borderPosition?: 'left' | 'top' | 'all';
    /** Additional CSS classes */
    className?: string;
    /** Children content (alternative to description) */
    children?: React.ReactNode;
}
/** Alert component for displaying important messages */
export declare const Alert: React.FC<AlertProps>;
//# sourceMappingURL=Alert.d.ts.map