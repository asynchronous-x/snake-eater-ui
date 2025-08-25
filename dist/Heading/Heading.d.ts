import React from 'react';
import './heading.css';
export interface HeadingProps {
    /** Heading level */
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    /** Visual size (overrides semantic level) */
    size?: '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
    /** Text alignment */
    align?: 'left' | 'center' | 'right';
    /** Color variant */
    variant?: 'default' | 'primary' | 'secondary' | 'muted';
    /** Font weight */
    weight?: 'normal' | 'medium' | 'bold';
    /** Add decorative line */
    decorated?: boolean;
    /** Decoration position */
    decorationPosition?: 'left' | 'bottom' | 'both';
    /** Text transform */
    transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
    /** Truncate with ellipsis */
    truncate?: boolean;
    /** Additional CSS classes */
    className?: string;
    /** Children content */
    children: React.ReactNode;
}
/** Heading component for titles and headers */
export declare const Heading: React.FC<HeadingProps>;
//# sourceMappingURL=Heading.d.ts.map