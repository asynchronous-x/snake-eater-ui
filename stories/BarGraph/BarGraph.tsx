import React, { useMemo, useState } from 'react';
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
  /** Height of the graph (defaults to 100% to fill parent) */
  height?: number | string;
  /** Width of the graph (defaults to 100% to fill parent) */
  width?: number | string;
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
  height = '100%',
  width = '100%',
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
  formatValue = (value) => value?.toString() || '0',
  onBarClick,
  onBarHover,
  className = '',
}) => {
  // State for interactive variant
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [selectedBar, setSelectedBar] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

  const calculatedMaxValue = useMemo(() => {
    if (maxValue) return maxValue;
    const values = data.map((d) => d.value || 0);
    return Math.max(...values, 0) * 1.1; // Add 10% padding
  }, [data, maxValue]);

  const scaleValues = useMemo(() => {
    return Array.from({ length: gridLines + 1 }, (_, i) => {
      return Math.round((calculatedMaxValue / gridLines) * i);
    });
  }, [calculatedMaxValue, gridLines]);

  const graphWidth = useMemo(() => {
    if (orientation === 'vertical') {
      // Use 100% width to fill parent for vertical orientation
      return '100%';
    }
    // For horizontal, use provided width
    return width;
  }, [orientation, width]);

  const graphHeight = useMemo(() => {
    if (orientation === 'vertical') {
      return height;
    }
    // For horizontal orientation, calculate based on data
    if (typeof height === 'number') {
      return height;
    }
    return data.length * (barWidth + gap) + gap;
  }, [orientation, height, data.length, barWidth, gap]);

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
    interactive: {
      showGrid: true,
      showScale: true,
      showValues: false,
      animate: true,
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
          const barHeight = ((point.value || 0) / calculatedMaxValue) * 100;
          return (
            <div
              key={`bar-${index}`}
              className={`snake-bar-graph__bar-container ${
                variant === 'interactive' && hoveredBar === index ? 'snake-bar-graph__bar-container--hovered' : ''
              } ${
                variant === 'interactive' && selectedBar === index ? 'snake-bar-graph__bar-container--selected' : ''
              }`}
              onMouseEnter={(e) => {
                if (variant === 'interactive') {
                  setHoveredBar(index);
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltipPosition({
                    x: rect.left + rect.width / 2,
                    y: rect.top - 10
                  });
                  onBarHover?.(point, index);
                }
              }}
              onMouseLeave={() => {
                if (variant === 'interactive') {
                  setHoveredBar(null);
                  setTooltipPosition(null);
                  onBarHover?.(null, null);
                }
              }}
              onClick={() => {
                if (variant === 'interactive') {
                  setSelectedBar(selectedBar === index ? null : index);
                  onBarClick?.(point, index);
                }
              }}
              style={{
                width: `${barWidth}px`,
                marginLeft: index === 0 ? `${gap}px` : 0,
                marginRight: `${gap}px`,
              }}
            >
              <div
                className={`snake-bar-graph__bar ${
                  variant === 'interactive' && hoveredBar === index ? 'snake-bar-graph__bar--hovered' : ''
                } ${
                  variant === 'interactive' && selectedBar === index ? 'snake-bar-graph__bar--selected' : ''
                }`}
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
          const barWidthPercent = ((point.value || 0) / calculatedMaxValue) * 100;
          return (
            <div
              key={`bar-${index}`}
              className={`snake-bar-graph__bar-container ${
                variant === 'interactive' && hoveredBar === index ? 'snake-bar-graph__bar-container--hovered' : ''
              } ${
                variant === 'interactive' && selectedBar === index ? 'snake-bar-graph__bar-container--selected' : ''
              }`}
              onMouseEnter={(e) => {
                if (variant === 'interactive') {
                  setHoveredBar(index);
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltipPosition({
                    x: rect.left + rect.width / 2,
                    y: rect.top - 10
                  });
                  onBarHover?.(point, index);
                }
              }}
              onMouseLeave={() => {
                if (variant === 'interactive') {
                  setHoveredBar(null);
                  setTooltipPosition(null);
                  onBarHover?.(null, null);
                }
              }}
              onClick={() => {
                if (variant === 'interactive') {
                  setSelectedBar(selectedBar === index ? null : index);
                  onBarClick?.(point, index);
                }
              }}
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
                className={`snake-bar-graph__bar ${
                  variant === 'interactive' && hoveredBar === index ? 'snake-bar-graph__bar--hovered' : ''
                } ${
                  variant === 'interactive' && selectedBar === index ? 'snake-bar-graph__bar--selected' : ''
                }`}
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
          width: graphWidth,
          height: typeof graphHeight === 'number' ? `${graphHeight}px` : graphHeight,
          maxWidth: '100%',
        }}
      >
        {orientation === 'vertical' ? renderVerticalBars() : renderHorizontalBars()}
      </div>

      <div className="snake-bar-graph__corner snake-bar-graph__corner--bottom-left" />
      <div className="snake-bar-graph__corner snake-bar-graph__corner--bottom-right" />
      
      {/* Tooltip for interactive variant */}
      {variant === 'interactive' && hoveredBar !== null && tooltipPosition && (
        <div 
          className="snake-bar-graph__tooltip"
          style={{
            position: 'fixed',
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="snake-bar-graph__tooltip-content">
            <div className="snake-bar-graph__tooltip-label">{data[hoveredBar].label}</div>
            <div className="snake-bar-graph__tooltip-value">{formatValue(data[hoveredBar].value)}</div>
            {data[hoveredBar].subLabel && (
              <div className="snake-bar-graph__tooltip-sublabel">{data[hoveredBar].subLabel}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};