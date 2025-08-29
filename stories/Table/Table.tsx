import React from 'react';
import './table.css';

// Icon component for ChevronDown from pixel-icon-library
const ChevronDownIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <polygon points="23 8 23 9 22 9 22 10 21 10 21 11 20 11 20 12 19 12 19 13 18 13 18 14 17 14 17 15 16 15 16 16 15 16 15 17 14 17 14 18 13 18 13 19 11 19 11 18 10 18 10 17 9 17 9 16 8 16 8 15 7 15 7 14 6 14 6 13 5 13 5 12 4 12 4 11 3 11 3 10 2 10 2 9 1 9 1 8 2 8 2 7 3 7 3 6 4 6 4 7 5 7 5 8 6 8 6 9 7 9 7 10 8 10 8 11 9 11 9 12 10 12 10 13 11 13 11 14 13 14 13 13 14 13 14 12 15 12 15 11 16 11 16 10 17 10 17 9 18 9 18 8 19 8 19 7 20 7 20 6 21 6 21 7 22 7 22 8 23 8" />
  </svg>
);

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
    className,
  ]
    .filter(Boolean)
    .join(' ');

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
      onSelectionChange(selectedRows.filter((i) => i !== index));
    } else {
      onSelectionChange([...selectedRows, index]);
    }
  };

  const handleSort = (column: string) => {
    if (!onSort) return;

    const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
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
                  column.sortable && 'snake-table__cell--sortable',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ width: column.width }}
                onClick={() => column.sortable && handleSort(column.key as string)}
              >
                <div className="snake-table__header-content">
                  {column.header}
                  {column.sortable && (
                    <ChevronDownIcon
                      className={[
                        'snake-table__sort-icon',
                        sortColumn === column.key && `snake-table__sort-icon--${sortDirection}`,
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    />
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
                  onRowClick && 'snake-table__row--clickable',
                ]
                  .filter(Boolean)
                  .join(' ')}
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
                      column.align && `snake-table__cell--${column.align}`,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {/* Only add corner accent on bottom-right of each cell for bordered variant */}
                    {variant === 'bordered' &&
                      rowIndex < data.length - 1 &&
                      colIndex < columns.length - 1 && (
                        <span className="snake-table__corner">+</span>
                      )}
                    {column.render
                      ? column.render(getValue(row, column.key as string), row, rowIndex)
                      : getValue(row, column.key as string)}
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
