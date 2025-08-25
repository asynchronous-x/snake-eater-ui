import React from 'react';
import './filter.css';
export interface FilterProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Filter label */
    children: React.ReactNode;
    /** Visual state variant */
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
    /** Whether the filter is currently active */
    active?: boolean;
    /** Size of the filter */
    size?: 'small' | 'medium' | 'large';
    /** Optional icon to display before the label */
    icon?: React.ReactNode;
    /** Optional count/badge to display */
    count?: number | string;
}
/** Filter component with bracket styling */
export declare const Filter: React.FC<FilterProps>;
//# sourceMappingURL=Filter.d.ts.map