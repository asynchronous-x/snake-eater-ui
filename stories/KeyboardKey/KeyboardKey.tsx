import React from 'react';
import './keyboardkey.css';

export interface KeyboardKeyProps {
  /** The key label to display */
  children: React.ReactNode;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Key variant */
  variant?: 'default' | 'modifier' | 'action' | 'danger' | 'space';
  /** Whether the key is pressed */
  pressed?: boolean;
  /** Whether the key is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Width multiplier for special keys */
  width?: number;
  /** Icon to display alongside text */
  icon?: React.ReactNode;
  /** Position of icon */
  iconPosition?: 'left' | 'right' | 'top' | 'bottom';
}

/** Keyboard Key component for displaying keyboard shortcuts or virtual keyboards */
export const KeyboardKey: React.FC<KeyboardKeyProps> = ({
  children,
  size = 'medium',
  variant = 'default',
  pressed = false,
  disabled = false,
  onClick,
  className = '',
  width = 1,
  icon,
  iconPosition = 'left',
}) => {
  const classes = [
    'snake-keyboard-key',
    `snake-keyboard-key--${size}`,
    `snake-keyboard-key--${variant}`,
    pressed && 'snake-keyboard-key--pressed',
    disabled && 'snake-keyboard-key--disabled',
    onClick && 'snake-keyboard-key--clickable',
    icon && `snake-keyboard-key--with-icon`,
    icon && `snake-keyboard-key--icon-${iconPosition}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = width !== 1 ? { '--key-width': width } as React.CSSProperties : undefined;

  const Component = onClick ? 'button' : 'kbd';

  return (
    <Component
      className={classes}
      onClick={onClick}
      disabled={onClick ? disabled : undefined}
      style={style}
    >
      {icon && <span className="snake-keyboard-key__icon">{icon}</span>}
      <span className="snake-keyboard-key__label">{children}</span>
    </Component>
  );
};