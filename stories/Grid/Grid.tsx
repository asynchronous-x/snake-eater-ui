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
  alignContent?:
    | 'start'
    | 'center'
    | 'end'
    | 'stretch'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  /** Justify content within the grid container */
  justifyContent?:
    | 'start'
    | 'center'
    | 'end'
    | 'stretch'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
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

export const Grid: React.FC<GridProps> = ({
  columns = 12,
  rows,
  gap = 'md',
  columnGap,
  rowGap,
  alignItems = 'stretch',
  justifyItems = 'stretch',
  alignContent = 'start',
  justifyContent = 'start',
  autoFlow = 'row',
  areas,
  minColumnWidth,
  fullWidth = false,
  fullHeight = false,
  className = '',
  style,
  children,
  ...props
}) => {
  const classes = [
    'snake-grid',
    gap !== 'none' && !columnGap && !rowGap && `snake-grid--gap-${gap}`,
    columnGap && `snake-grid--column-gap-${columnGap}`,
    rowGap && `snake-grid--row-gap-${rowGap}`,
    `snake-grid--align-items-${alignItems}`,
    `snake-grid--justify-items-${justifyItems}`,
    `snake-grid--align-content-${alignContent}`,
    `snake-grid--justify-content-${justifyContent}`,
    autoFlow !== 'row' && `snake-grid--auto-flow-${autoFlow.replace(' ', '-')}`,
    fullWidth && 'snake-grid--full-width',
    fullHeight && 'snake-grid--full-height',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const gridStyle: React.CSSProperties = {
    ...style,
    '--grid-columns': minColumnWidth
      ? `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`
      : typeof columns === 'string'
        ? columns
        : `repeat(${columns}, 1fr)`,
    '--grid-rows': typeof rows === 'string' ? rows : rows ? `repeat(${rows}, 1fr)` : undefined,
    '--grid-areas': areas ? `"${areas.join('" "')}"` : undefined,
  } as React.CSSProperties;

  return (
    <div className={classes} style={gridStyle} {...props}>
      {children}
    </div>
  );
};

export const GridItem: React.FC<GridItemProps> = ({
  colSpan,
  rowSpan,
  colStart,
  colEnd,
  rowStart,
  rowEnd,
  area,
  alignSelf,
  justifySelf,
  className = '',
  style,
  children,
  ...props
}) => {
  const classes = [
    'snake-grid-item',
    alignSelf && `snake-grid-item--align-self-${alignSelf}`,
    justifySelf && `snake-grid-item--justify-self-${justifySelf}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const itemStyle: React.CSSProperties = {
    ...style,
    '--grid-column-span': colSpan === 'full' ? '-1' : colSpan,
    '--grid-row-span': rowSpan,
    '--grid-column-start': colStart,
    '--grid-column-end': colEnd === 'auto' ? 'auto' : colEnd,
    '--grid-row-start': rowStart,
    '--grid-row-end': rowEnd === 'auto' ? 'auto' : rowEnd,
    '--grid-area': area,
  } as React.CSSProperties;

  return (
    <div className={classes} style={itemStyle} {...props}>
      {children}
    </div>
  );
};
