import React from 'react';
import './drawer.css';
export interface DrawerProps {
    /** Whether the drawer is open */
    open: boolean;
    /** Callback when the drawer should close */
    onClose: () => void;
    /** Position of the drawer */
    position?: 'left' | 'right' | 'top' | 'bottom';
    /** Size of the drawer */
    size?: 'small' | 'medium' | 'large' | 'full';
    /** Content of the drawer */
    children: React.ReactNode;
    /** Whether to show overlay */
    overlay?: boolean;
    /** Whether clicking overlay closes drawer */
    closeOnOverlayClick?: boolean;
    /** Header content */
    header?: React.ReactNode;
    /** Footer content */
    footer?: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
    /** Whether to lock body scroll when open */
    lockScroll?: boolean;
}
/** Drawer component for slide-in panels */
export declare const Drawer: React.FC<DrawerProps>;
//# sourceMappingURL=Drawer.d.ts.map