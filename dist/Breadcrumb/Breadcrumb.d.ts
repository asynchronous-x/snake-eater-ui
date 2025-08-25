import React from 'react';
import './breadcrumb.css';
interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: React.ReactNode;
}
export interface BreadcrumbProps {
    /** Breadcrumb items */
    items: BreadcrumbItem[];
    /** Separator character */
    separator?: React.ReactNode;
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Maximum items to display (0 = no limit) */
    maxItems?: number;
    /** Custom item renderer */
    renderItem?: (item: BreadcrumbItem, index: number, isLast: boolean) => React.ReactNode;
    /** Click handler for items */
    onItemClick?: (item: BreadcrumbItem, index: number) => void;
    /** Additional CSS classes */
    className?: string;
}
/** Breadcrumb component for navigation hierarchy */
export declare const Breadcrumb: React.FC<BreadcrumbProps>;
export {};
//# sourceMappingURL=Breadcrumb.d.ts.map