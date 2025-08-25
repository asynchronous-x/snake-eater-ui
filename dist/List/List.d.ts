import React from 'react';
import './list.css';
interface ListItem {
    /** The text content of the list item */
    content: React.ReactNode;
    /** Optional subitems */
    subitems?: ListItem[];
    /** Click handler for interactive items */
    onClick?: () => void;
}
export interface ListProps {
    /** Array of list items */
    items: ListItem[];
    /** Starting number for the list */
    startNumber?: number;
    /** Number of digits to pad numbers with zeros */
    numberPadding?: number;
    /** Custom number format function */
    formatNumber?: (num: number) => string;
    /** Color for subitem arrows */
    arrowColor?: string;
    /** Show numbers */
    showNumbers?: boolean;
    /** List type */
    type?: 'ordered' | 'unordered';
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Display text in uppercase */
    uppercase?: boolean;
    /** Make top-level items interactive */
    interactive?: boolean;
    /** Additional CSS classes */
    className?: string;
}
/** List component with customizable numbering and styling */
export declare const List: React.FC<ListProps>;
export {};
//# sourceMappingURL=List.d.ts.map