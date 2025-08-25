import React from 'react';
import './accordion.css';
interface AccordionItem {
    id: string;
    title: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
}
export interface AccordionProps {
    /** Accordion items */
    items: AccordionItem[];
    /** Allow multiple items open */
    multiple?: boolean;
    /** Initially open items */
    defaultOpen?: string[];
    /** Controlled open items */
    openItems?: string[];
    /** Change handler */
    onChange?: (openItems: string[]) => void;
    /** Visual variant */
    variant?: 'default' | 'boxed' | 'minimal';
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Use header style with lighter background */
    header?: boolean;
    /** Additional CSS classes */
    className?: string;
}
/** Accordion component for collapsible content */
export declare const Accordion: React.FC<AccordionProps>;
export {};
//# sourceMappingURL=Accordion.d.ts.map