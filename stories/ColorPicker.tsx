import React, { useState, useRef, useEffect } from 'react';
import './colorpicker.css';

interface ColorPickerProps {
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
export const ColorPicker: React.FC<ColorPickerProps> = ({
  value = '#50fa7b',
  onChange,
  showAlpha = false,
  presets = [
    '#50fa7b', '#ffb86c', '#ff5555', '#61dafb',
    '#bd93f9', '#ff79c6', '#f1fa8c', '#8be9fd',
    '#bdbdbd', '#8e8e90', '#3a3a3a', '#1f1d20',
  ],
  size = 'medium',
  showInput = true,
  disabled = false,
  inline = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(inline);
  const [currentColor, setCurrentColor] = useState(value);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [brightness, setBrightness] = useState(50);
  const [alpha, setAlpha] = useState(100);
  const pickerRef = useRef<HTMLDivElement>(null);
  const saturationRef = useRef<HTMLDivElement>(null);

  // Convert hex to HSB
  useEffect(() => {
    const hexToHsb = (hex: string) => {
      const rgb = hexToRgb(hex);
      if (!rgb) return;
      
      const r = rgb.r / 255;
      const g = rgb.g / 255;
      const b = rgb.b / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const delta = max - min;
      
      let h = 0;
      let s = max === 0 ? 0 : delta / max;
      let v = max;
      
      if (delta !== 0) {
        if (max === r) {
          h = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
        } else if (max === g) {
          h = ((b - r) / delta + 2) / 6;
        } else {
          h = ((r - g) / delta + 4) / 6;
        }
      }
      
      setHue(Math.round(h * 360));
      setSaturation(Math.round(s * 100));
      setBrightness(Math.round(v * 100));
    };
    
    hexToHsb(value);
  }, [value]);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const hsbToHex = (h: number, s: number, b: number) => {
    const hNorm = h / 360;
    const sNorm = s / 100;
    const bNorm = b / 100;
    
    const i = Math.floor(hNorm * 6);
    const f = hNorm * 6 - i;
    const p = bNorm * (1 - sNorm);
    const q = bNorm * (1 - f * sNorm);
    const t = bNorm * (1 - (1 - f) * sNorm);
    
    let r = 0, g = 0, b_out = 0;
    
    switch (i % 6) {
      case 0: r = bNorm; g = t; b_out = p; break;
      case 1: r = q; g = bNorm; b_out = p; break;
      case 2: r = p; g = bNorm; b_out = t; break;
      case 3: r = p; g = q; b_out = bNorm; break;
      case 4: r = t; g = p; b_out = bNorm; break;
      case 5: r = bNorm; g = p; b_out = q; break;
    }
    
    const toHex = (n: number) => {
      const hex = Math.round(n * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b_out)}`;
  };

  const updateColor = (h: number, s: number, b: number, a: number) => {
    const hex = hsbToHex(h, s, b);
    setCurrentColor(hex);
    onChange?.(hex);
  };

  const handleSaturationClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !saturationRef.current) return;
    
    const rect = saturationRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    
    const newSaturation = Math.round((x / rect.width) * 100);
    const newBrightness = Math.round((1 - y / rect.height) * 100);
    
    setSaturation(newSaturation);
    setBrightness(newBrightness);
    updateColor(hue, newSaturation, newBrightness, alpha);
  };

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHue = parseInt(e.target.value);
    setHue(newHue);
    updateColor(newHue, saturation, brightness, alpha);
  };

  const handleAlphaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAlpha = parseInt(e.target.value);
    setAlpha(newAlpha);
    updateColor(hue, saturation, brightness, newAlpha);
  };

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    if (/^#[0-9A-F]{6}$/i.test(hex)) {
      setCurrentColor(hex);
      onChange?.(hex);
    }
  };

  const handlePresetClick = (color: string) => {
    if (disabled) return;
    setCurrentColor(color);
    onChange?.(color);
  };

  useEffect(() => {
    if (!inline) {
      const handleClickOutside = (event: MouseEvent) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }
  }, [isOpen, inline]);

  const pickerClasses = [
    'snake-colorpicker',
    `snake-colorpicker--${size}`,
    disabled && 'snake-colorpicker--disabled',
    inline && 'snake-colorpicker--inline',
    className
  ].filter(Boolean).join(' ');

  const panelClasses = [
    'snake-colorpicker__panel',
    isOpen && 'snake-colorpicker__panel--open',
  ].filter(Boolean).join(' ');

  return (
    <div ref={pickerRef} className={pickerClasses}>
      {!inline && (
        <button
          className="snake-colorpicker__trigger"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <div 
            className="snake-colorpicker__trigger-color" 
            style={{ backgroundColor: currentColor }}
          />
          <span className="snake-colorpicker__trigger-value">{currentColor}</span>
          <span className="snake-colorpicker__trigger-arrow">▼</span>
        </button>
      )}
      
      {(isOpen || inline) && (
        <div className={panelClasses}>
          <div 
            ref={saturationRef}
            className="snake-colorpicker__saturation"
            style={{ backgroundColor: hsbToHex(hue, 100, 100) }}
            onClick={handleSaturationClick}
          >
            <div className="snake-colorpicker__saturation-white" />
            <div className="snake-colorpicker__saturation-black" />
            <div 
              className="snake-colorpicker__saturation-pointer"
              style={{
                left: `${saturation}%`,
                top: `${100 - brightness}%`,
              }}
            />
          </div>
          
          <div className="snake-colorpicker__controls">
            <div className="snake-colorpicker__slider">
              <label>Hue</label>
              <input
                type="range"
                min="0"
                max="360"
                value={hue}
                onChange={handleHueChange}
                className="snake-colorpicker__hue-slider"
                disabled={disabled}
              />
            </div>
            
            {showAlpha && (
              <div className="snake-colorpicker__slider">
                <label>Alpha</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={alpha}
                  onChange={handleAlphaChange}
                  className="snake-colorpicker__alpha-slider"
                  disabled={disabled}
                />
              </div>
            )}
          </div>
          
          {showInput && (
            <div className="snake-colorpicker__input-wrapper">
              <input
                type="text"
                value={currentColor}
                onChange={handleHexInput}
                className="snake-colorpicker__hex-input"
                placeholder="#000000"
                disabled={disabled}
              />
            </div>
          )}
          
          {presets.length > 0 && (
            <div className="snake-colorpicker__presets">
              {presets.map((color, index) => (
                <button
                  key={index}
                  className="snake-colorpicker__preset"
                  style={{ backgroundColor: color }}
                  onClick={() => handlePresetClick(color)}
                  disabled={disabled}
                  title={color}
                />
              ))}
            </div>
          )}
          
          <div className="snake-colorpicker__corner snake-colorpicker__corner--top-left" />
          <div className="snake-colorpicker__corner snake-colorpicker__corner--top-right" />
          <div className="snake-colorpicker__corner snake-colorpicker__corner--bottom-left" />
          <div className="snake-colorpicker__corner snake-colorpicker__corner--bottom-right" />
        </div>
      )}
    </div>
  );
};