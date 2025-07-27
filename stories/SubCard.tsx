import React from 'react';
import './subcard.css';

interface SubCardProps {
  /** Card content */
  children: React.ReactNode;
  /** Optional header content */
  header?: React.ReactNode;
  /** Optional footer content */
  footer?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Whether the card is interactive (hoverable) */
  interactive?: boolean;
  /** Click handler for interactive cards */
  onClick?: () => void;
  /** Color variant */
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'inactive';
  /** Custom color for corner plus symbols */
  cornerColor?: string;
}

/** SubCard component with plus symbols in corners */
export const SubCard: React.FC<SubCardProps> = ({
  children,
  header,
  footer,
  className = '',
  size = 'medium',
  interactive = false,
  onClick,
  variant = 'default',
  cornerColor,
}) => {
  const classes = [
    'snake-subcard',
    `snake-subcard--${size}`,
    `snake-subcard--${variant}`,
    interactive && 'snake-subcard--interactive',
    className
  ].filter(Boolean).join(' ');

  const Component = interactive ? 'button' : 'div';

  return (
    <Component 
      className={classes}
      onClick={interactive ? onClick : undefined}
      type={interactive ? 'button' : undefined}
    >
      <div className="snake-subcard__corner snake-subcard__corner--top-left" style={cornerColor ? { color: cornerColor } : undefined}>＋</div>
      <div className="snake-subcard__corner snake-subcard__corner--top-right" style={cornerColor ? { color: cornerColor } : undefined}>＋</div>
      <div className="snake-subcard__corner snake-subcard__corner--bottom-left" style={cornerColor ? { color: cornerColor } : undefined}>＋</div>
      <div className="snake-subcard__corner snake-subcard__corner--bottom-right" style={cornerColor ? { color: cornerColor } : undefined}>＋</div>
      
      {header && (
        <div className="snake-subcard__header">
          {header}
        </div>
      )}
      
      <div className="snake-subcard__content">
        {children}
      </div>
      
      {footer && (
        <div className="snake-subcard__footer">
          {footer}
        </div>
      )}
    </Component>
  );
};