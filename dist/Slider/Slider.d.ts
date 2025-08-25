import React from 'react';
import './slider.css';
export interface SliderProps {
    /** Current value */
    value?: number;
    /** Value change handler */
    onChange?: (value: number) => void;
    /** Minimum value */
    min?: number;
    /** Maximum value */
    max?: number;
    /** Step increment */
    step?: number;
    /** Show value label */
    showValue?: boolean;
    /** Value label position */
    valueLabelPosition?: 'top' | 'bottom' | 'tooltip';
    /** Show tick marks */
    showTicks?: boolean;
    /** Tick interval */
    tickInterval?: number;
    /** Custom marks */
    marks?: Array<{
        value: number;
        label?: string;
    }>;
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Color variant */
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
    /** Orientation */
    orientation?: 'horizontal' | 'vertical';
    /** Disabled state */
    disabled?: boolean;
    /** Label */
    label?: string;
    /** Format value function */
    formatValue?: (value: number) => string;
    /** Additional CSS classes */
    className?: string;
}
/** Slider component for selecting numeric values */
export declare const Slider: React.FC<SliderProps>;
//# sourceMappingURL=Slider.d.ts.map