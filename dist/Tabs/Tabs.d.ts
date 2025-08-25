import React from 'react';
import './tabs.css';
interface Tab {
    id: string;
    label: string;
    content: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
}
export interface TabsProps {
    /** Tab items */
    tabs: Tab[];
    /** Active tab ID */
    activeTab?: string;
    /** Change handler */
    onChange?: (tabId: string) => void;
    /** Visual variant */
    variant?: 'default' | 'boxed' | 'underline';
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Full width tabs */
    fullWidth?: boolean;
    /** Additional CSS classes */
    className?: string;
}
/** Tabs component for organizing content */
export declare const Tabs: React.FC<TabsProps>;
export {};
//# sourceMappingURL=Tabs.d.ts.map