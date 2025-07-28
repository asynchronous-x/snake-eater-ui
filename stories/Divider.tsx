import React from 'react';
import './divider.css';

interface DividerProps {
  /** Orientation of the divider */
  orientation?: 'horizontal' | 'vertical';
  /** Style variant */
  variant?: 'solid' | 'dashed' | 'dotted' | 'double';
  /** Thickness of the divider */
  thickness?: 'thin' | 'medium' | 'thick';
  /** Color variant */
  color?: 'default' | 'muted' | 'primary' | 'secondary';
  /** Add decorative elements */
  decorated?: boolean;
  /** Decoration style */
  decorationStyle?: 'dots' | 'diamond' | 'plus' | 'arrows';
  /** Text or element to display in the center */
  children?: React.ReactNode;
  /** Spacing around the divider */
  spacing?: 'small' | 'medium' | 'large';
  /** Additional CSS classes */
  className?: string;
  /** Additional styles */
  style?: React.CSSProperties;
}

/** Divider component for visual separation */
export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  thickness = 'thin',
  color = 'default',
  decorated = false,
  decorationStyle = 'dots',
  children,
  spacing = 'medium',
  className = '',
  style,
}) => {
  const dividerClasses = [
    'snake-divider',
    `snake-divider--${orientation}`,
    `snake-divider--${variant}`,
    `snake-divider--${thickness}`,
    `snake-divider--${color}`,
    `snake-divider--spacing-${spacing}`,
    decorated && `snake-divider--decorated`,
    decorated && `snake-divider--decoration-${decorationStyle}`,
    children && 'snake-divider--with-content',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={dividerClasses} 
      style={style}
      role="separator"
      aria-orientation={orientation}
    >
      {children && (
        <>
          <div className="snake-divider__line snake-divider__line--start" />
          <div className="snake-divider__content">{children}</div>
          <div className="snake-divider__line snake-divider__line--end" />
        </>
      )}
      {!children && <div className="snake-divider__line" />}
    </div>
  );
};