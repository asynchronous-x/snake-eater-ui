import React from 'react';
import './text.css';
export interface TextProps {
    /** HTML element to render */
    as?: 'p' | 'span' | 'div' | 'blockquote' | 'figcaption' | 'small' | 'strong' | 'em' | 'mark' | 'del' | 'ins' | 'sub' | 'sup';
    /** Text size */
    size?: '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
    /** Color variant */
    variant?: 'default' | 'primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'danger' | 'info';
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
export declare const Text: React.FC<TextProps>;
//# sourceMappingURL=Text.d.ts.map