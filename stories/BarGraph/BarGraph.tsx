import React, { useMemo } from 'react';
import './bargraph.css';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
  subLabel?: string;
}

interface BarGraphProps {
  /** Array of data points */
  data: DataPoint[];
  /** Maximum value for the scale (auto-calculated if not provided) */
  maxValue?: number;
  /** Height of the graph in pixels */
  height?: number;
  /** Width of the graph in pixels (for horizontal orientation) */
  width?: number;
  /** Width of each bar */
  barWidth?: number;
  /** Gap between bars */
  gap?: number;
  /** Show values on top of bars */
  showValues?: boolean;
  /** Show grid lines */
  showGrid?: boolean;
  /** Number of grid lines */
  gridLines?: number;
  /** Show x-axis labels */
  showLabels?: boolean;
  /** Show y-axis scale */
  showScale?: boolean;
  /** Orientation of the graph */
  orientation?: 'vertical' | 'horizontal';
  /** Animation on mount */
  animate?: boolean;
  /** Bar color (can be overridden per data point) */
  barColor?: string;
  /** Grid color */
  gridColor?: string;
  /** Size variant */
  variant?: 'default' | 'minimal' | 'detailed';
  /** Value formatter function */
  formatValue?: (value: number) => string;
  /** Additional CSS classes */
  className?: string;
}

/** BarGraph component for data visualization */
export const BarGraph: React.FC<BarGraphProps> = ({
  data,
  maxValue,
  height = 300,
  width = 400,
  barWidth = 40,
  gap = 8,
  showValues = true,
  showGrid = true,
  gridLines = 5,
  showLabels = true,
  showScale = true,
  orientation = 'vertical',
  animate = true,
  barColor = '#3a3a3a',
  gridColor = '#3a3a3a',
  variant = 'default',
  formatValue = (value) => value.toString(),
  className = '',
}) => {
  const calculatedMaxValue = useMemo(() => {
    if (maxValue) return maxValue;
    return Math.max(...data.map((d) => d.value)) * 1.1; // Add 10% padding
  }, [data, maxValue]);

  const scaleValues = useMemo(() => {
    return Array.from({ length: gridLines + 1 }, (_, i) => {
      return Math.round((calculatedMaxValue / gridLines) * i);
    });
  }, [calculatedMaxValue, gridLines]);

  const graphWidth = useMemo(() => {
    if (orientation === 'vertical') {
      return data.length * (barWidth + gap) + gap;
    }
    // For horizontal, use provided width
    return width;
  }, [data.length, barWidth, gap, orientation, width]);

  const graphHeight = orientation === 'vertical' ? height : data.length * (barWidth + gap) + gap;

  const classes = [
    'snake-bar-graph',
    `snake-bar-graph--${orientation}`,
    `snake-bar-graph--${variant}`,
    animate && 'snake-bar-graph--animated',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const variantStyles = {
    minimal: {
      showGrid: false,
      showScale: false,
      showValues: false,
    },
    detailed: {
      showGrid: true,
      showScale: true,
      showValues: true,
      gridLines: 10,
    },
  };

  const variantProps = variant !== 'default' ? variantStyles[variant] || {} : {};
  const finalShowGrid = variantProps.showGrid ?? showGrid;
  const finalShowScale = variantProps.showScale ?? showScale;
  const finalShowValues = variantProps.showValues ?? showValues;
  const finalGridLines = variantProps.gridLines ?? gridLines;
  const finalBarColor = variantProps.barColor ?? barColor;
  const finalGridColor = variantProps.gridColor ?? gridColor;

  const renderVerticalBars = () => (
    <>
      {/* Grid lines */}
      {finalShowGrid && (
        <div className="snake-bar-graph__grid">
          {Array.from({ length: finalGridLines + 1 }, (_, i) => {
            const position = (i / finalGridLines) * 100;
            return (
              <div
                key={`grid-${i}`}
                className="snake-bar-graph__grid-line"
                style={{
                  bottom: `${position}%`,
                  borderColor: finalGridColor,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Y-axis scale */}
      {finalShowScale && (
        <div className="snake-bar-graph__scale">
          {scaleValues.reverse().map((value, i) => (
            <div
              key={`scale-${i}`}
              className="snake-bar-graph__scale-value"
              style={{
                top: `${(i / finalGridLines) * 100}%`,
              }}
            >
              {formatValue(value)}
            </div>
          ))}
        </div>
      )}

      {/* Bars */}
      <div className="snake-bar-graph__bars">
        {data.map((point, index) => {
          const barHeight = (point.value / calculatedMaxValue) * 100;
          return (
            <div
              key={`bar-${index}`}
              className="snake-bar-graph__bar-container"
              style={{
                width: `${barWidth}px`,
                marginLeft: index === 0 ? `${gap}px` : 0,
                marginRight: `${gap}px`,
              }}
            >
              <div
                className="snake-bar-graph__bar"
                style={{
                  height: `${barHeight}%`,
                  backgroundColor: point.color || finalBarColor,
                  borderColor: point.color || finalBarColor,
                  animationDelay: animate ? `${index * 50}ms` : '0',
                }}
              >
                {finalShowValues && (
                  <div className="snake-bar-graph__value">{formatValue(point.value)}</div>
                )}
              </div>
              {showLabels && (
                <div className="snake-bar-graph__label">
                  <span className="snake-bar-graph__label-text">{point.label}</span>
                  {point.subLabel && (
                    <span className="snake-bar-graph__sublabel">{point.subLabel}</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );

  const renderHorizontalBars = () => (
    <>
      {/* Grid lines */}
      {finalShowGrid && (
        <div className="snake-bar-graph__grid">
          {Array.from({ length: finalGridLines + 1 }, (_, i) => {
            const position = (i / finalGridLines) * 100;
            return (
              <div
                key={`grid-${i}`}
                className="snake-bar-graph__grid-line"
                style={{
                  left: `${position}%`,
                  borderColor: finalGridColor,
                }}
              />
            );
          })}
        </div>
      )}

      {/* X-axis scale */}
      {finalShowScale && (
        <div className="snake-bar-graph__scale">
          {scaleValues.map((value, i) => (
            <div
              key={`scale-${i}`}
              className="snake-bar-graph__scale-value"
              style={{
                left: `${(i / finalGridLines) * 100}%`,
              }}
            >
              {formatValue(value)}
            </div>
          ))}
        </div>
      )}

      {/* Bars */}
      <div className="snake-bar-graph__bars">
        {data.map((point, index) => {
          const barWidthPercent = (point.value / calculatedMaxValue) * 100;
          return (
            <div
              key={`bar-${index}`}
              className="snake-bar-graph__bar-container"
              style={{
                height: `${barWidth}px`,
                marginTop: index === 0 ? `${gap}px` : 0,
                marginBottom: `${gap}px`,
              }}
            >
              {showLabels && (
                <div className="snake-bar-graph__label">
                  <span className="snake-bar-graph__label-text">{point.label}</span>
                  {point.subLabel && (
                    <span className="snake-bar-graph__sublabel">{point.subLabel}</span>
                  )}
                </div>
              )}
              <div
                className="snake-bar-graph__bar"
                style={{
                  width: `${barWidthPercent}%`,
                  backgroundColor: point.color || finalBarColor,
                  borderColor: point.color || finalBarColor,
                  animationDelay: animate ? `${index * 50}ms` : '0',
                }}
              >
                {finalShowValues && (
                  <div className="snake-bar-graph__value">{formatValue(point.value)}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  return (
    <div className={classes}>
      <div className="snake-bar-graph__corner snake-bar-graph__corner--top-left" />
      <div className="snake-bar-graph__corner snake-bar-graph__corner--top-right" />
      
      <div
        className="snake-bar-graph__content"
        style={{
          width: orientation === 'vertical' ? `${graphWidth}px` : `${graphWidth}px`,
          height: `${graphHeight}px`,
        }}
      >
        {orientation === 'vertical' ? renderVerticalBars() : renderHorizontalBars()}
      </div>

      <div className="snake-bar-graph__corner snake-bar-graph__corner--bottom-left" />
      <div className="snake-bar-graph__corner snake-bar-graph__corner--bottom-right" />
    </div>
  );
};