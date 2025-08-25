import React from 'react';
import './text.css';

export interface TextProps {
  /** HTML element to render */
  as?:
    | 'p'
    | 'span'
    | 'div'
    | 'blockquote'
    | 'figcaption'
    | 'small'
    | 'strong'
    | 'em'
    | 'mark'
    | 'del'
    | 'ins'
    | 'sub'
    | 'sup';
  /** Text size */
  size?: '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  /** Color variant */
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'muted'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info';
  /** Font weight */
  weight?: 'normal' | 'medium' | 'bold';
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** Text transform */
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  /** Font style */
  italic?: boolean;
  /** Underline decoration */
  underline?: boolean;
  /** Strike through */
  strike?: boolean;
  /** Monospace font */
  mono?: boolean;
  /** Truncate with ellipsis */
  truncate?: boolean;
  /** Line clamp (multi-line truncation) */
  clamp?: number;
  /** Line height */
  leading?: 'tight' | 'normal' | 'relaxed' | 'loose';
  /** Letter spacing */
  tracking?: 'tight' | 'normal' | 'wide';
  /** Additional CSS classes */
  className?: string;
  /** Children content */
  children: React.ReactNode;
}

/** Text component for body text and inline elements */
export const Text: React.FC<TextProps> = ({
  as = 'p',
  size = 'md',
  variant = 'default',
  weight = 'normal',
  align = 'left',
  transform = 'none',
  italic = false,
  underline = false,
  strike = false,
  mono = false,
  truncate = false,
  clamp,
  leading = 'normal',
  tracking = 'normal',
  className = '',
  children,
}) => {
  const Component = as;

  const textClasses = [
    'snake-text',
    `snake-text--${size}`,
    `snake-text--${variant}`,
    `snake-text--weight-${weight}`,
    `snake-text--align-${align}`,
    `snake-text--leading-${leading}`,
    `snake-text--tracking-${tracking}`,
    transform !== 'none' && `snake-text--${transform}`,
    italic && 'snake-text--italic',
    underline && 'snake-text--underline',
    strike && 'snake-text--strike',
    mono && 'snake-text--mono',
    truncate && 'snake-text--truncate',
    clamp && 'snake-text--clamp',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = clamp
    ? ({
      '--line-clamp': clamp,
      WebkitLineClamp: clamp,
    } as React.CSSProperties)
    : undefined;

  return (
    <Component className={textClasses} style={style}>
      {children}
    </Component>
  );
};
