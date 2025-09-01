/**
 * Helper utilities for better prop autocomplete and type safety
 */

// Re-export common prop patterns for easy access
export type SnakeUIVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'cyber' | 'clipped';
export type SnakeUISize = 'small' | 'medium' | 'large';
export type SnakeUIPosition = 'top' | 'right' | 'bottom' | 'left';

// Helper function to create strongly-typed prop objects
export const createButtonProps = (props: {
  variant?: SnakeUIVariant;
  size?: SnakeUISize;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) => props;

// Template literal types for dynamic prop suggestions
export type SnakeUIColor = 
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info';

// Utility type for components with common props
export interface SnakeUICommonProps {
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

// Branded types for specific use cases
export type SnakeUIIconName = string & { _brand: 'icon' };
export const icon = (name: string): SnakeUIIconName => name as SnakeUIIconName;