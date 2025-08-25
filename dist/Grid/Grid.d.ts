import React from 'react';
import './grid.css';
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Number of columns in the grid */
    columns?: number | string;
    /** Number of rows in the grid */
    rows?: number | string;
    /** Gap between grid items */
    gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    /** Column gap (overrides gap for columns) */
    columnGap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    /** Row gap (overrides gap for rows) */
    rowGap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    /** Align items within grid cells */
    alignItems?: 'start' | 'center' | 'end' | 'stretch';
    /** Justify items within grid cells */
    justifyItems?: 'start' | 'center' | 'end' | 'stretch';
    /** Align content within the grid container */
    alignContent?: 'start' | 'center' | 'end' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly';
    /** Justify content within the grid container */
    justifyContent?: 'start' | 'center' | 'end' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly';
    /** Auto flow direction */
    autoFlow?: 'row' | 'column' | 'row dense' | 'column dense';
    /** Template areas for named grid areas */
    areas?: string[];
    /** Minimum column width for auto-fit/auto-fill */
    minColumnWidth?: string;
    /** Make grid full width */
    fullWidth?: boolean;
    /** Make grid full height */
    fullHeight?: boolean;
    children: React.ReactNode;
}
interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Column span */
    colSpan?: number | 'full';
    /** Row span */
    rowSpan?: number;
    /** Column start position */
    colStart?: number | 'auto';
    /** Column end position */
    colEnd?: number | 'auto';
    /** Row start position */
    rowStart?: number | 'auto';
    /** Row end position */
    rowEnd?: number | 'auto';
    /** Grid area name */
    area?: string;
    /** Align self within grid cell */
    alignSelf?: 'start' | 'center' | 'end' | 'stretch';
    /** Justify self within grid cell */
    justifySelf?: 'start' | 'center' | 'end' | 'stretch';
    children: React.ReactNode;
}
export declare const Grid: React.FC<GridProps>;
export declare const GridItem: React.FC<GridItemProps>;
export {};
//# sourceMappingURL=Grid.d.ts.map