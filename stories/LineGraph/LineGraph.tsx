import React, { useMemo, useState, useEffect } from 'react';
import './linegraph.css';

interface DataPoint {
  x: number;
  y: number;
  label?: string;
}

interface DataSeries {
  name: string;
  data: DataPoint[];
  color?: string;
}

export interface LineGraphProps {
  /** Data series to display */
  data: DataSeries | DataSeries[];
  /** Width of the graph (defaults to 100% to fill parent) */
  width?: number | string;
  /** Height of the graph (defaults to 100% to fill parent) */
  height?: number | string;
  /** Show axes */
  showAxes?: boolean;
  /** Show grid */
  showGrid?: boolean;
  /** Show legend */
  showLegend?: boolean;
  /** Show data points */
  showPoints?: boolean;
  /** Show values on hover */
  showValues?: boolean;
  /** Animate on mount */
  animate?: boolean;
  /** Animate legend */
  animateLegend?: boolean;
  /** Line width */
  strokeWidth?: number;
  /** Point radius */
  pointRadius?: number;
  /** Curve type */
  curve?: 'linear' | 'smooth' | 'step';
  /** Fill area under line */
  fill?: boolean;
  /** Fill opacity */
  fillOpacity?: number;
  /** Grid color */
  gridColor?: string;
  /** Axis color */
  axisColor?: string;
  /** Size variant */
  variant?: 'default' | 'minimal' | 'detailed' | 'interactive';
  /** X-axis label */
  xLabel?: string;
  /** Y-axis label */
  yLabel?: string;
  /** Title */
  title?: string;
  /** X-axis domain [min, max] */
  xDomain?: [number, number];
  /** Y-axis domain [min, max] */
  yDomain?: [number, number];
  /** Format x-axis value */
  formatX?: (value: number) => string;
  /** Format y-axis value */
  formatY?: (value: number) => string;
  /** Callback when a point is clicked (for interactive variant) */
  onPointClick?: (point: DataPoint, seriesName: string) => void;
  /** Additional CSS classes */
  className?: string;
}

/** LineGraph component for time series and continuous data visualization */
export const LineGraph: React.FC<LineGraphProps> = ({
  data,
  width = '100%',
  height = '100%',
  showAxes = true,
  showGrid = false,
  showLegend = true,
  showPoints = true,
  showValues = false,
  animate = true,
  animateLegend = true,
  strokeWidth = 2,
  pointRadius = 4,
  curve = 'linear',
  fill = false,
  fillOpacity = 0.2,
  gridColor = '#3a3a3a',
  axisColor = '#5a5a5a',
  variant = 'default',
  xLabel,
  yLabel,
  title,
  xDomain,
  yDomain,
  formatX = (v) => v.toFixed(1),
  formatY = (v) => v.toFixed(1),
  onPointClick,
  className = '',
}) => {
  // Normalize data to array
  const series = Array.isArray(data) ? data : [data];
  
  // SVG dimensions - use a default viewBox size
  const svgWidth = 600;
  const svgHeight = 400;
  
  // State for interactive variant
  const [activeSeries, setActiveSeries] = useState<string | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<{
    x: number;
    y: number;
    value: DataPoint;
    series: string;
  } | null>(null);

  // Default colors
  const defaultColors = ['#8b2c2c', '#6b3030', '#4a4a4a', '#7a7a7a', '#d4d4d4'];

  // Calculate domains
  const { xMin, xMax, yMin, yMax } = useMemo(() => {
    const allPoints = series.flatMap(s => s.data);
    const xValues = allPoints.map(p => p.x);
    const yValues = allPoints.map(p => p.y);
    
    return {
      xMin: xDomain ? xDomain[0] : Math.min(...xValues),
      xMax: xDomain ? xDomain[1] : Math.max(...xValues),
      yMin: yDomain ? yDomain[0] : Math.min(0, ...yValues),
      yMax: yDomain ? yDomain[1] : Math.max(...yValues),
    };
  }, [series, xDomain, yDomain]);

  // Margins for axes and labels
  const margin = { top: 40, right: 40, bottom: 80, left: 80 };
  const plotWidth = svgWidth - margin.left - margin.right;
  const plotHeight = svgHeight - margin.top - margin.bottom;

  // Scale functions
  const xScale = (x: number) => ((x - xMin) / (xMax - xMin)) * plotWidth;
  const yScale = (y: number) => plotHeight - ((y - yMin) / (yMax - yMin)) * plotHeight;

  // Generate path for line
  const generatePath = (points: DataPoint[]) => {
    if (points.length === 0) return '';
    
    const scaledPoints = points.map(p => ({
      x: xScale(p.x),
      y: yScale(p.y),
    }));
    
    let path = '';
    
    if (curve === 'smooth') {
      // Cubic bezier curve
      path = scaledPoints.map((point, i) => {
        if (i === 0) return `M ${point.x} ${point.y}`;
        
        const prev = scaledPoints[i - 1];
        const cpx1 = prev.x + (point.x - prev.x) / 3;
        const cpy1 = prev.y;
        const cpx2 = prev.x + 2 * (point.x - prev.x) / 3;
        const cpy2 = point.y;
        
        return `C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${point.x} ${point.y}`;
      }).join(' ');
    } else if (curve === 'step') {
      path = scaledPoints.map((point, i) => {
        if (i === 0) return `M ${point.x} ${point.y}`;
        const prev = scaledPoints[i - 1];
        return `L ${point.x} ${prev.y} L ${point.x} ${point.y}`;
      }).join(' ');
    } else {
      // Linear
      path = scaledPoints.map((point, i) => 
        `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
      ).join(' ');
    }
    
    return path;
  };

  // Generate fill path
  const generateFillPath = (points: DataPoint[]) => {
    if (points.length === 0) return '';
    
    const linePath = generatePath(points);
    const lastPoint = points[points.length - 1];
    const firstPoint = points[0];
    
    return `${linePath} L ${xScale(lastPoint.x)} ${yScale(0)} L ${xScale(firstPoint.x)} ${yScale(0)} Z`;
  };

  const classes = [
    'snake-line-graph',
    `snake-line-graph--${variant}`,
    animate && 'snake-line-graph--animated',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const variantStyles = {
    minimal: {
      showAxes: false,
      showGrid: false,
      showLegend: false,
      showPoints: false,
      strokeWidth: 1,
    },
    detailed: {
      showAxes: true,
      showGrid: true,
      showLegend: true,
      showPoints: true,
      showValues: true,
      strokeWidth: 2,
    },
    interactive: {
      showAxes: true,
      showLegend: true,
      showPoints: true,
      showValues: true,
    },
  };

  const variantProps = variant !== 'default' ? variantStyles[variant] || {} : {};
  const finalShowAxes = variantProps.showAxes ?? showAxes;
  const finalShowGrid = variantProps.showGrid ?? showGrid;
  const finalShowLegend = variantProps.showLegend ?? showLegend;
  const finalShowPoints = variantProps.showPoints ?? showPoints;
  const finalShowValues = variantProps.showValues ?? showValues;
  const finalStrokeWidth = variantProps.strokeWidth ?? strokeWidth;

  const isInteractive = variant === 'interactive';

  // Generate axis ticks
  const xTicks = useMemo(() => {
    const tickCount = 10;
    const step = (xMax - xMin) / tickCount;
    return Array.from({ length: tickCount + 1 }, (_, i) => xMin + i * step);
  }, [xMin, xMax]);

  const yTicks = useMemo(() => {
    const tickCount = 8;
    const step = (yMax - yMin) / tickCount;
    return Array.from({ length: tickCount + 1 }, (_, i) => yMin + i * step);
  }, [yMin, yMax]);

  return (
    <div className={classes}>
      <div className="snake-line-graph__corner snake-line-graph__corner--top-left" />
      <div className="snake-line-graph__corner snake-line-graph__corner--top-right" />
      
      <div className="snake-line-graph__container">
        {title && (
          <div className="snake-line-graph__title">{title}</div>
        )}
        
        <svg
          width={typeof width === 'number' ? width : '100%'}
          height={typeof height === 'number' ? height : '100%'}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="snake-line-graph__svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Gradient definitions for fill */}
            {series.map((s, i) => {
              const color = s.color || defaultColors[i % defaultColors.length];
              return (
                <linearGradient key={`gradient-${i}`} id={`line-gradient-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={color} stopOpacity={fillOpacity} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              );
            })}
          </defs>
          
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {/* Grid */}
            {finalShowGrid && (
              <g className="snake-line-graph__grid">
                {xTicks.map((tick, i) => (
                  <line
                    key={`grid-x-${i}`}
                    x1={xScale(tick)}
                    y1={0}
                    x2={xScale(tick)}
                    y2={plotHeight}
                    stroke={gridColor}
                    strokeWidth="1"
                    strokeOpacity="0.3"
                    strokeDasharray="2 4"
                  />
                ))}
                {yTicks.map((tick, i) => (
                  <line
                    key={`grid-y-${i}`}
                    x1={0}
                    y1={yScale(tick)}
                    x2={plotWidth}
                    y2={yScale(tick)}
                    stroke={gridColor}
                    strokeWidth="1"
                    strokeOpacity="0.3"
                    strokeDasharray="2 4"
                  />
                ))}
              </g>
            )}

            {/* Lines and areas */}
            <g className="snake-line-graph__lines">
              {series.map((s, i) => {
                const color = s.color || defaultColors[i % defaultColors.length];
                const isActive = activeSeries === s.name;
                const isDimmed = isInteractive && activeSeries && !isActive;
                
                return (
                  <g 
                    key={`series-${i}`}
                    className={`snake-line-graph__series ${isActive ? 'snake-line-graph__series--active' : ''}`}
                    style={{
                      opacity: isDimmed ? 0.3 : 1,
                    }}
                  >
                    {/* Fill area */}
                    {fill && (
                      <path
                        d={generateFillPath(s.data)}
                        fill={`url(#line-gradient-${i})`}
                        className="snake-line-graph__area"
                      />
                    )}
                    
                    {/* Line */}
                    <path
                      d={generatePath(s.data)}
                      fill="none"
                      stroke={color}
                      strokeWidth={isActive ? finalStrokeWidth + 1 : finalStrokeWidth}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="snake-line-graph__line"
                      onClick={() => {
                        if (isInteractive) {
                          setActiveSeries(isActive ? null : s.name);
                        }
                      }}
                      style={{
                        cursor: isInteractive ? 'pointer' : 'default',
                      }}
                    />
                    
                    {/* Points */}
                    {finalShowPoints && s.data.map((point, j) => (
                      <circle
                        key={`point-${j}`}
                        cx={xScale(point.x)}
                        cy={yScale(point.y)}
                        r={isActive ? pointRadius + 1 : pointRadius}
                        fill={color}
                        stroke="#0b0b0d"
                        strokeWidth="1"
                        className="snake-line-graph__point"
                        onClick={() => {
                          if (isInteractive) {
                            onPointClick?.(point, s.name);
                          }
                        }}
                        onMouseEnter={() => {
                          if (finalShowValues) {
                            setHoveredPoint({
                              x: xScale(point.x),
                              y: yScale(point.y),
                              value: point,
                              series: s.name,
                            });
                          }
                        }}
                        onMouseLeave={() => setHoveredPoint(null)}
                        style={{
                          cursor: isInteractive ? 'pointer' : 'default',
                        }}
                      />
                    ))}
                  </g>
                );
              })}
            </g>

            {/* Hover tooltip */}
            {finalShowValues && hoveredPoint && (
              <g className="snake-line-graph__tooltip">
                <rect
                  x={hoveredPoint.x - 40}
                  y={hoveredPoint.y - 30}
                  width="80"
                  height="25"
                  fill="#101010"
                  stroke="#3a3a3a"
                  strokeWidth="1"
                />
                <text
                  x={hoveredPoint.x}
                  y={hoveredPoint.y - 15}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#bdbdbd"
                  fontSize="10"
                  fontFamily="var(--font-family-mono)"
                >
                  {`${formatX(hoveredPoint.value.x)}, ${formatY(hoveredPoint.value.y)}`}
                </text>
              </g>
            )}

            {/* Axes */}
            {finalShowAxes && (
              <g className="snake-line-graph__axes">
                {/* X-axis */}
                <line
                  x1={0}
                  y1={plotHeight}
                  x2={plotWidth}
                  y2={plotHeight}
                  stroke={axisColor}
                  strokeWidth="2"
                />
                {xTicks.map((tick, i) => (
                  <g key={`x-tick-${i}`}>
                    <line
                      x1={xScale(tick)}
                      y1={plotHeight}
                      x2={xScale(tick)}
                      y2={plotHeight + 5}
                      stroke={axisColor}
                      strokeWidth="1"
                    />
                    <text
                      x={xScale(tick)}
                      y={plotHeight + 20}
                      textAnchor="middle"
                      fill="#8a8a8a"
                      fontSize="10"
                      fontFamily="var(--font-family-mono)"
                    >
                      {formatX(tick)}
                    </text>
                  </g>
                ))}
                
                {/* Y-axis */}
                <line
                  x1={0}
                  y1={0}
                  x2={0}
                  y2={plotHeight}
                  stroke={axisColor}
                  strokeWidth="2"
                />
                {yTicks.map((tick, i) => (
                  <g key={`y-tick-${i}`}>
                    <line
                      x1={0}
                      y1={yScale(tick)}
                      x2={-5}
                      y2={yScale(tick)}
                      stroke={axisColor}
                      strokeWidth="1"
                    />
                    <text
                      x={-10}
                      y={yScale(tick)}
                      textAnchor="end"
                      dominantBaseline="middle"
                      fill="#8a8a8a"
                      fontSize="10"
                      fontFamily="var(--font-family-mono)"
                    >
                      {formatY(tick)}
                    </text>
                  </g>
                ))}
              </g>
            )}

            {/* Axis labels */}
            {finalShowAxes && (
              <>
                {xLabel && (
                  <text
                    x={plotWidth / 2}
                    y={plotHeight + 50}
                    textAnchor="middle"
                    fill="#bdbdbd"
                    fontSize="12"
                    fontFamily="var(--font-family)"
                    className="snake-line-graph__axis-label"
                  >
                    {xLabel}
                  </text>
                )}
                {yLabel && (
                  <text
                    x={-plotHeight / 2}
                    y={-50}
                    textAnchor="middle"
                    fill="#bdbdbd"
                    fontSize="12"
                    fontFamily="var(--font-family)"
                    transform="rotate(-90)"
                    className="snake-line-graph__axis-label"
                  >
                    {yLabel}
                  </text>
                )}
              </>
            )}
          </g>
        </svg>

        {/* Legend */}
        {finalShowLegend && series.length > 1 && (
          <div className={`snake-line-graph__legend ${animateLegend ? 'snake-line-graph__legend--animated' : ''}`}>
            {series.map((s, i) => {
              const color = s.color || defaultColors[i % defaultColors.length];
              const isActive = activeSeries === s.name;
              
              return (
                <div
                  key={`legend-${i}`}
                  className={`snake-line-graph__legend-item ${isActive ? 'snake-line-graph__legend-item--active' : ''}`}
                  onClick={() => {
                    if (isInteractive) {
                      setActiveSeries(isActive ? null : s.name);
                    }
                  }}
                  style={{
                    cursor: isInteractive ? 'pointer' : 'default',
                  }}
                >
                  <div
                    className="snake-line-graph__legend-color"
                    style={{ backgroundColor: color }}
                  />
                  <span className="snake-line-graph__legend-label">{s.name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="snake-line-graph__corner snake-line-graph__corner--bottom-left" />
      <div className="snake-line-graph__corner snake-line-graph__corner--bottom-right" />
    </div>
  );
};