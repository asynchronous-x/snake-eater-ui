import React from 'react';
import './table.css';
interface TableColumn<T> {
    key: keyof T | string;
    header: React.ReactNode;
    render?: (value: any, row: T, index: number) => React.ReactNode;
    width?: string;
    align?: 'left' | 'center' | 'right';
    sortable?: boolean;
}
export interface TableProps<T> {
    /** Table data */
    data: T[];
    /** Column definitions */
    columns: TableColumn<T>[];
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Table variant */
    variant?: 'default' | 'striped' | 'bordered';
    /** Sticky header */
    stickyHeader?: boolean;
    /** Row selection */
    selectable?: boolean;
    /** Selected rows */
    selectedRows?: number[];
    /** Selection change handler */
    onSelectionChange?: (selectedRows: number[]) => void;
    /** Row click handler */
    onRowClick?: (row: T, index: number) => void;
    /** Sort handler */
    onSort?: (column: string, direction: 'asc' | 'desc') => void;
    /** Current sort column */
    sortColumn?: string;
    /** Current sort direction */
    sortDirection?: 'asc' | 'desc';
    /** Loading state */
    loading?: boolean;
    /** Empty state message */
    emptyMessage?: string;
    /** Additional CSS classes */
    className?: string;
}
/** Table component for displaying tabular data */
export declare function Table<T extends Record<string, any>>({ data, columns, size, variant, stickyHeader, selectable, selectedRows, onSelectionChange, onRowClick, onSort, sortColumn, sortDirection, loading, emptyMessage, className, }: TableProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Table.d.ts.map