import React from 'react';
import './toast.css';
export interface ToastProps {
    /** Toast content */
    message: string;
    /** Toast variant */
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
    /** Toast position */
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    /** Duration in milliseconds (0 for persistent) */
    duration?: number;
    /** Show close button */
    closable?: boolean;
    /** Close handler */
    onClose?: () => void;
    /** Show icon */
    showIcon?: boolean;
    /** Custom icon */
    icon?: React.ReactNode;
    /** Action button */
    action?: {
        label: string;
        onClick: () => void;
    };
    /** Progress bar */
    showProgress?: boolean;
    /** Additional CSS classes */
    className?: string;
}
/** Toast component for notifications */
export declare const Toast: React.FC<ToastProps>;
interface ToastContainerProps {
    toasts: Array<{
        id: string;
        message: string;
        variant?: ToastProps['variant'];
        duration?: number;
        action?: ToastProps['action'];
    }>;
    position?: ToastProps['position'];
    onClose: (id: string) => void;
}
export declare const ToastContainer: React.FC<ToastContainerProps>;
export {};
//# sourceMappingURL=Toast.d.ts.map