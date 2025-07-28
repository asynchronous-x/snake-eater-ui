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

interface TableProps<T> {
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
export function Table<T extends Record<string, any>>({
  data,
  columns,
  size = 'medium',
  variant = 'default',
  stickyHeader = false,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  onRowClick,
  onSort,
  sortColumn,
  sortDirection,
  loading = false,
  emptyMessage = 'No data available',
  className = '',
}: TableProps<T>) {
  const tableClasses = [
    'snake-table',
    `snake-table--${size}`,
    `snake-table--${variant}`,
    stickyHeader && 'snake-table--sticky-header',
    className
  ].filter(Boolean).join(' ');

  const handleSelectAll = () => {
    if (!onSelectionChange) return;
    
    if (selectedRows.length === data.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(data.map((_, index) => index));
    }
  };

  const handleSelectRow = (index: number) => {
    if (!onSelectionChange) return;
    
    if (selectedRows.includes(index)) {
      onSelectionChange(selectedRows.filter(i => i !== index));
    } else {
      onSelectionChange([...selectedRows, index]);
    }
  };

  const handleSort = (column: string) => {
    if (!onSort) return;
    
    const newDirection = 
      sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(column, newDirection);
  };

  const getValue = (row: T, key: string) => {
    const keys = key.split('.');
    let value: any = row;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value;
  };

  return (
    <div className="snake-table-wrapper">
      <table className={tableClasses}>
        <thead className="snake-table__head">
          <tr className="snake-table__row">
            {selectable && (
              <th className="snake-table__cell snake-table__cell--checkbox">
                <input
                  type="checkbox"
                  className="snake-table__checkbox"
                  checked={selectedRows.length === data.length && data.length > 0}
                  indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                  onChange={handleSelectAll}
                  disabled={loading || data.length === 0}
                />
              </th>
            )}
            {columns.map((column, index) => (
              <th
                key={index}
                className={[
                  'snake-table__cell',
                  'snake-table__cell--header',
                  column.align && `snake-table__cell--${column.align}`,
                  column.sortable && 'snake-table__cell--sortable'
                ].filter(Boolean).join(' ')}
                style={{ width: column.width }}
                onClick={() => column.sortable && handleSort(column.key as string)}
              >
                <div className="snake-table__header-content">
                  {column.header}
                  {column.sortable && (
                    <span className={[
                      'snake-table__sort-icon',
                      sortColumn === column.key && `snake-table__sort-icon--${sortDirection}`
                    ].filter(Boolean).join(' ')}>
                      ▼
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="snake-table__body">
          {loading ? (
            <tr>
              <td 
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="snake-table__cell snake-table__cell--loading"
              >
                <div className="snake-table__loading">
                  <span className="snake-table__loading-bar" />
                  <span className="snake-table__loading-bar" />
                  <span className="snake-table__loading-bar" />
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td 
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="snake-table__cell snake-table__cell--empty"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={[
                  'snake-table__row',
                  selectedRows.includes(rowIndex) && 'snake-table__row--selected',
                  onRowClick && 'snake-table__row--clickable'
                ].filter(Boolean).join(' ')}
                onClick={() => onRowClick?.(row, rowIndex)}
              >
                {selectable && (
                  <td className="snake-table__cell snake-table__cell--checkbox">
                    <input
                      type="checkbox"
                      className="snake-table__checkbox"
                      checked={selectedRows.includes(rowIndex)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleSelectRow(rowIndex);
                      }}
                    />
                  </td>
                )}
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={[
                      'snake-table__cell',
                      column.align && `snake-table__cell--${column.align}`
                    ].filter(Boolean).join(' ')}
                  >
                    {column.render
                      ? column.render(getValue(row, column.key as string), row, rowIndex)
                      : getValue(row, column.key as string)
                    }
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}