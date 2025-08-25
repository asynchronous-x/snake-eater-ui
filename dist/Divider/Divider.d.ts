import React from 'react';
import './divider.css';
export interface DividerProps {
    /** Orientation of the divider */
    orientation?: 'horizontal' | 'vertical';
    /** Style variant */
    variant?: 'solid' | 'dashed' | 'dotted' | 'double' | 'accent';
    /** Thickness of the divider */
    thickness?: 'thin' | 'medium' | 'thick';
    /** Color variant */
    color?: 'default' | 'muted' | 'primary' | 'secondary';
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
export declare const Divider: React.FC<DividerProps>;
//# sourceMappingURL=Divider.d.ts.map