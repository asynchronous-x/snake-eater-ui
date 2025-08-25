import React from 'react';
import './colorpicker.css';
export interface ColorPickerProps {
    /** Current color value */
    value?: string;
    /** Change handler */
    onChange?: (color: string) => void;
    /** Show alpha channel */
    showAlpha?: boolean;
    /** Preset colors */
    presets?: string[];
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Show hex input */
    showInput?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Inline mode (always open) */
    inline?: boolean;
    /** Additional CSS classes */
    className?: string;
}
/** ColorPicker component for color selection */
export declare const ColorPicker: React.FC<ColorPickerProps>;
//# sourceMappingURL=ColorPicker.d.ts.map