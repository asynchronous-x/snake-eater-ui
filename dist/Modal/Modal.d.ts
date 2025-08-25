import React from 'react';
import './modal.css';
export interface ModalProps {
    /** Modal visibility */
    isOpen: boolean;
    /** Close handler */
    onClose: () => void;
    /** Modal title */
    title?: string;
    /** Modal content */
    children: React.ReactNode;
    /** Footer content */
    footer?: React.ReactNode;
    /** Size variant */
    size?: 'small' | 'medium' | 'large' | 'full';
    /** Close on overlay click */
    closeOnOverlayClick?: boolean;
    /** Show close button */
    showCloseButton?: boolean;
    /** Additional CSS classes */
    className?: string;
}
/** Modal/Dialog component with dark theme styling */
export declare const Modal: React.FC<ModalProps>;
//# sourceMappingURL=Modal.d.ts.map