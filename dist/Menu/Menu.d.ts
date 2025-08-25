import React from 'react';
import './menu.css';
interface MenuItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    shortcut?: string;
    disabled?: boolean;
    danger?: boolean;
    divider?: boolean;
    submenu?: MenuItem[];
}
export interface MenuProps {
    /** Menu items */
    items: MenuItem[];
    /** Trigger element */
    trigger?: React.ReactNode;
    /** Open state (controlled mode) */
    isOpen?: boolean;
    /** Open state change handler */
    onOpenChange?: (open: boolean) => void;
    /** Menu placement */
    placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'right-start' | 'left-start';
    /** Menu size */
    size?: 'small' | 'medium' | 'large';
    /** Click handler */
    onItemClick?: (itemId: string) => void;
    /** Show arrow */
    showArrow?: boolean;
    /** Additional CSS classes */
    className?: string;
}
/** Menu component for dropdown navigation */
export declare const Menu: React.FC<MenuProps>;
export {};
//# sourceMappingURL=Menu.d.ts.map