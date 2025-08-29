import React from 'react';
import './flex.css';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction of the flex container */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  /** Horizontal alignment of items */
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  /** Vertical alignment of items */
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  /** Allow items to wrap */
  wrap?: boolean | 'reverse';
  /** Gap between items */
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
  /** Flex grow value */
  grow?: number;
  /** Flex shrink value */
  shrink?: number;
  /** Flex basis value */
  basis?: string | number;
  /** Display as inline-flex instead of flex */
  inline?: boolean;
  /** Fill parent width */
  fullWidth?: boolean;
  /** Fill parent height */
  fullHeight?: boolean;
  /** Child elements */
  children: React.ReactNode;
}

export const Flex: React.FC<FlexProps> = ({
  direction = 'row',
  justify = 'start',
  align = 'stretch',
  wrap = false,
  gap,
  grow,
  shrink,
  basis,
  inline = false,
  fullWidth = false,
  fullHeight = false,
  children,
  className = '',
  style,
  ...props
}) => {
  const classes = [
    'snake-flex',
    `snake-flex--direction-${direction}`,
    `snake-flex--justify-${justify}`,
    `snake-flex--align-${align}`,
    wrap === true && 'snake-flex--wrap',
    wrap === 'reverse' && 'snake-flex--wrap-reverse',
    gap && typeof gap === 'string' && `snake-flex--gap-${gap}`,
    inline && 'snake-flex--inline',
    fullWidth && 'snake-flex--full-width',
    fullHeight && 'snake-flex--full-height',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const flexStyle: React.CSSProperties = {
    ...style,
    ...(typeof gap === 'number' && { gap: `${gap}px` }),
    ...(grow !== undefined && { flexGrow: grow }),
    ...(shrink !== undefined && { flexShrink: shrink }),
    ...(basis !== undefined && { flexBasis: typeof basis === 'number' ? `${basis}px` : basis }),
  };

  return (
    <div className={classes} style={flexStyle} {...props}>
      {children}
    </div>
  );
};
