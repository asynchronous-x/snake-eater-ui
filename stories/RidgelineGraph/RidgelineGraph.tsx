import React, { useMemo, useState, useEffect, useRef } from 'react';
import './ridgelinegraph.css';

interface DataSeries {
  label: string;
  values: number[];
  color?: string;
}

interface RidgelineGraphProps {
  /** Array of data series */
  data: DataSeries[];
  /** Width of the graph (defaults to 100% to fill parent) */
  width?: number | string;
  /** Height of the graph (defaults to 100% to fill parent) */
  height?: number | string;
  /** Height of each ridge */
  ridgeHeight?: number;
  /** Overlap between ridges (0-1) */
  overlap?: number;
  /** Curve type */
  curve?: 'linear' | 'smooth' | 'step';
  /** Colors for ridges */
  colors?: string[];
  /** Show axes */
  showAxes?: boolean;
  /** Show grid */
  showGrid?: boolean;
  /** Show labels */
  showLabels?: boolean;
  /** Show values on hover */
  showValues?: boolean;
  /** Animation on mount */
  animate?: boolean;
  /** Fill ridges */
  fill?: boolean;
  /** Fill opacity */
  fillOpacity?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Grid color */
  gridColor?: string;
  /** Size variant */
  variant?: 'default' | 'minimal' | 'detailed' | 'interactive' | 'scrolling';
  /** X-axis labels */
  xLabels?: string[];
  /** X-axis label */
  xLabel?: string;
  /** Y-axis label */
  yLabel?: string;
  /** Title */
  title?: string;
  /** Maximum number of ridges for scrolling variant */
  maxRidges?: number;
  /** Update interval for scrolling variant (ms) */
  scrollInterval?: number;
  /** Generate new data function for scrolling variant */
  generateNewData?: () => DataSeries;
  /** Callback when a ridge is clicked (for interactive variant) */
  onRidgeClick?: (series: DataSeries, index: number) => void;
  /** Additional CSS classes */
  className?: string;
}

/** RidgelineGraph component for overlapping distribution visualization */
export const RidgelineGraph: React.FC<RidgelineGraphProps> = ({
  data: initialData,
  width = '100%',
  height = '100%',
  ridgeHeight = 60,
  overlap = 0.6,
  curve = 'smooth',
  colors = ['#8b2c2c', '#6b3030', '#4a4a4a', '#7a7a7a', '#5a5a5a'],
  showAxes = true,
  showGrid = false,
  showLabels = true,
  showValues = false,
  animate = true,
  fill = true,
  fillOpacity = 0.7,
  strokeWidth = 2,
  gridColor = '#3a3a3a',
  variant = 'default',
  xLabels,
  xLabel,
  yLabel,
  title,
  maxRidges = 10,
  scrollInterval = 2000,
  generateNewData,
  onRidgeClick,
  className = '',
}) => {
  // State for interactive variant
  const [activeRidge, setActiveRidge] = useState<string | null>(null);
  const [hoveredRidge, setHoveredRidge] = useState<string | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; value: number } | null>(null);
  
  // State for scrolling variant
  // Initialize with placeholders if scrolling variant
  const initializeScrollingData = () => {
    if (variant === 'scrolling') {
      const placeholders: DataSeries[] = [];
      for (let i = 0; i < maxRidges; i++) {
        placeholders.push({
          label: `Placeholder ${i}`,
          values: new Array(20).fill(0),
        });
      }
      return placeholders;
    }
    return initialData;
  };
  
  const [scrollingData, setScrollingData] = useState<DataSeries[]>(initializeScrollingData());
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const dataCountRef = useRef(0);

  // Handle scrolling variant
  useEffect(() => {
    if (variant === 'scrolling' && generateNewData) {
      // Start adding real data immediately
      const addNewData = () => {
        setScrollingData(prevData => {
          const newData = [...prevData];
          const newItem = generateNewData();
          
          // Add real data at the top
          newData.unshift(newItem);
          
          // Always maintain exactly maxRidges items
          if (newData.length > maxRidges) {
            newData.pop();
          }
          
          dataCountRef.current++;
          return newData;
        });
      };
      
      // Add first real data item immediately
      if (dataCountRef.current === 0) {
        addNewData();
      }
      
      // Then continue adding at intervals
      scrollIntervalRef.current = setInterval(addNewData, scrollInterval);

      return () => {
        if (scrollIntervalRef.current) {
          clearInterval(scrollIntervalRef.current);
        }
      };
    }
  }, [variant, generateNewData, scrollInterval, maxRidges]);

  const data = variant === 'scrolling' ? scrollingData : initialData;

  // Fixed SVG dimensions for consistent viewBox
  const svgWidth = 600;
  const svgHeight = 400;
  
  // Margins for axes and labels
  const margin = { top: 40, right: 40, bottom: 80, left: 100 };
  const plotWidth = svgWidth - margin.left - margin.right;
  const plotHeight = svgHeight - margin.top - margin.bottom;

  // Calculate dimensions
  const effectiveRidgeHeight = ridgeHeight * (1 - overlap);
  const displayRidges = variant === 'scrolling' ? maxRidges : data.length;
  // For scrolling variant, use full plot height; otherwise calculate based on data
  const totalHeight = variant === 'scrolling' 
    ? plotHeight - 40 // Leave some space for axis
    : displayRidges * effectiveRidgeHeight + ridgeHeight;

  // Process data for rendering
  const processedData = useMemo(() => {
    // For scrolling variant, always process exactly maxRidges items
    const dataToProcess = variant === 'scrolling' ? data : data;
    
    // For scrolling, calculate ridge height based on available space
    const scrollingRidgeHeight = variant === 'scrolling' 
      ? totalHeight / maxRidges * (1 - overlap * 0.5)
      : ridgeHeight;
    const scrollingEffectiveHeight = variant === 'scrolling'
      ? totalHeight / maxRidges
      : effectiveRidgeHeight;
    
    return dataToProcess.map((series, seriesIndex) => {
      const maxValue = Math.max(...series.values);
      const minValue = Math.min(...series.values);
      const range = maxValue - minValue || 1;
      
      // Check if this is a placeholder (all zeros)
      const isPlaceholder = series.values.every(v => v === 0);
      
      // Normalize values to ridge height
      const normalizedValues = series.values.map(value => 
        isPlaceholder ? 0 : ((value - minValue) / range) * scrollingRidgeHeight
      );
      
      // Calculate y offset for this ridge
      const yOffset = seriesIndex * scrollingEffectiveHeight;
      
      // Generate path points
      const points = normalizedValues.map((value, i) => ({
        x: (i / (normalizedValues.length - 1)) * plotWidth,
        y: yOffset + scrollingRidgeHeight - value,
        originalValue: series.values[i],
      }));
      
      return {
        ...series,
        points,
        yOffset,
        color: series.color || colors[seriesIndex % colors.length],
        isPlaceholder,
      };
    });
  }, [data, ridgeHeight, effectiveRidgeHeight, plotWidth, colors, variant, maxRidges, totalHeight, overlap]);

  // Generate path for ridge
  const generatePath = (points: any[], yOffset: number, closed: boolean = false) => {
    if (points.length === 0) return '';
    
    let path = '';
    
    if (curve === 'smooth') {
      // Cubic bezier curve
      path = points.map((point, i) => {
        if (i === 0) return `M ${point.x} ${point.y}`;
        
        const prev = points[i - 1];
        const cpx1 = prev.x + (point.x - prev.x) / 3;
        const cpy1 = prev.y;
        const cpx2 = prev.x + 2 * (point.x - prev.x) / 3;
        const cpy2 = point.y;
        
        return `C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${point.x} ${point.y}`;
      }).join(' ');
    } else if (curve === 'step') {
      path = points.map((point, i) => {
        if (i === 0) return `M ${point.x} ${point.y}`;
        const prev = points[i - 1];
        return `L ${point.x} ${prev.y} L ${point.x} ${point.y}`;
      }).join(' ');
    } else {
      // Linear
      path = points.map((point, i) => 
        `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
      ).join(' ');
    }
    
    if (closed && fill) {
      const lastPoint = points[points.length - 1];
      const firstPoint = points[0];
      const baseY = yOffset + ridgeHeight;
      path += ` L ${lastPoint.x} ${baseY} L ${firstPoint.x} ${baseY} Z`;
    }
    
    return path;
  };

  const classes = [
    'snake-ridgeline-graph',
    `snake-ridgeline-graph--${variant}`,
    animate && 'snake-ridgeline-graph--animated',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const variantStyles = {
    minimal: {
      showAxes: false,
      showGrid: false,
      showLabels: false,
      strokeWidth: 1,
    },
    detailed: {
      showAxes: true,
      showGrid: true,
      showLabels: true,
      showValues: true,
      strokeWidth: 2,
    },
    interactive: {
      showAxes: true,
      showLabels: true,
      showValues: true,
    },
    scrolling: {
      showAxes: true,
      showLabels: true,
      animate: true,
    },
  };

  const variantProps = variant !== 'default' ? variantStyles[variant] || {} : {};
  const finalShowAxes = variantProps.showAxes ?? showAxes;
  const finalShowGrid = variantProps.showGrid ?? showGrid;
  const finalShowLabels = variantProps.showLabels ?? showLabels;
  const finalShowValues = variantProps.showValues ?? showValues;
  const finalStrokeWidth = variantProps.strokeWidth ?? strokeWidth;

  const isInteractive = variant === 'interactive';

  // Generate x-axis ticks
  const xTicks = useMemo(() => {
    if (!data[0]) return [];
    const tickCount = Math.min(10, data[0].values.length);
    const step = Math.floor(data[0].values.length / tickCount);
    return Array.from({ length: tickCount }, (_, i) => i * step);
  }, [data]);

  return (
    <div className={classes}>
      <div className="snake-ridgeline-graph__corner snake-ridgeline-graph__corner--top-left" />
      <div className="snake-ridgeline-graph__corner snake-ridgeline-graph__corner--top-right" />
      
      <div className="snake-ridgeline-graph__container">
        {title && (
          <div className="snake-ridgeline-graph__title">{title}</div>
        )}
        
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="snake-ridgeline-graph__svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Gradient definitions for fill */}
            {processedData.map((series, i) => (
              <linearGradient key={`gradient-${i}`} id={`ridge-gradient-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={series.color} stopOpacity={fillOpacity} />
                <stop offset="100%" stopColor={series.color} stopOpacity={fillOpacity * 0.3} />
              </linearGradient>
            ))}
          </defs>
          
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {/* Grid */}
            {finalShowGrid && (
              <g className="snake-ridgeline-graph__grid">
                {xTicks.map((tick, i) => {
                  const x = (tick / (data[0].values.length - 1)) * plotWidth;
                  return (
                    <line
                      key={`grid-${i}`}
                      x1={x}
                      y1={0}
                      x2={x}
                      y2={totalHeight}
                      stroke={gridColor}
                      strokeWidth="1"
                      strokeOpacity="0.3"
                      strokeDasharray="2 4"
                    />
                  );
                })}
              </g>
            )}

            {/* Ridges */}
            <g className="snake-ridgeline-graph__ridges">
              {processedData.map((series, i) => {
                const isActive = activeRidge === series.label;
                const isHovered = hoveredRidge === series.label;
                const isDimmed = isInteractive && activeRidge && !isActive;
                
                return (
                  <g 
                    key={`ridge-${i}`}
                    className={`snake-ridgeline-graph__ridge ${isActive ? 'snake-ridgeline-graph__ridge--active' : ''} ${series.isPlaceholder ? 'snake-ridgeline-graph__ridge--placeholder' : ''}`}
                    style={{
                      opacity: isDimmed ? 0.3 : 1,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {/* Fill area - only show if not placeholder */}
                    {fill && !series.isPlaceholder && (
                      <path
                        d={generatePath(series.points, series.yOffset, true)}
                        fill={`url(#ridge-gradient-${i})`}
                        stroke="none"
                        className="snake-ridgeline-graph__ridge-fill"
                        style={{
                          cursor: isInteractive ? 'pointer' : 'default',
                        }}
                        onClick={() => {
                          if (isInteractive) {
                            const newActive = isActive ? null : series.label;
                            setActiveRidge(newActive);
                            onRidgeClick?.(series, i);
                          }
                        }}
                        onMouseEnter={() => isInteractive && setHoveredRidge(series.label)}
                        onMouseLeave={() => isInteractive && setHoveredRidge(null)}
                      />
                    )}
                    
                    {/* Stroke line or placeholder line */}
                    <path
                      d={series.isPlaceholder 
                        ? `M 0 ${series.yOffset + (variant === 'scrolling' ? totalHeight / maxRidges / 2 : ridgeHeight / 2)} L ${plotWidth} ${series.yOffset + (variant === 'scrolling' ? totalHeight / maxRidges / 2 : ridgeHeight / 2)}`
                        : generatePath(series.points, series.yOffset, false)}
                      fill="none"
                      stroke={series.isPlaceholder ? '#2a2a2a' : series.color}
                      strokeWidth={series.isPlaceholder ? 1 : (isActive || isHovered ? finalStrokeWidth + 1 : finalStrokeWidth)}
                      strokeOpacity={series.isPlaceholder ? 0.5 : (isDimmed ? 0.5 : 1)}
                      strokeDasharray={series.isPlaceholder ? '4 4' : undefined}
                      className="snake-ridgeline-graph__ridge-line"
                      style={{
                        cursor: isInteractive ? 'pointer' : 'default',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                      }}
                      onClick={() => {
                        if (isInteractive) {
                          const newActive = isActive ? null : series.label;
                          setActiveRidge(newActive);
                          onRidgeClick?.(series, i);
                        }
                      }}
                      onMouseEnter={() => isInteractive && setHoveredRidge(series.label)}
                      onMouseLeave={() => isInteractive && setHoveredRidge(null)}
                      onMouseMove={(e) => {
                        if (finalShowValues && isInteractive) {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const index = Math.round((x / plotWidth) * (series.values.length - 1));
                          if (index >= 0 && index < series.values.length) {
                            setHoveredPoint({
                              x: series.points[index].x,
                              y: series.points[index].y,
                              value: series.values[index],
                            });
                          }
                        }
                      }}
                    />
                    
                    {/* Labels - don't show for placeholders */}
                    {finalShowLabels && !series.isPlaceholder && (
                      <text
                        x={-15}
                        y={series.yOffset + (variant === 'scrolling' ? totalHeight / maxRidges / 2 : ridgeHeight / 2)}
                        textAnchor="end"
                        dominantBaseline="middle"
                        fill="#bdbdbd"
                        fontSize="12"
                        fontFamily="var(--font-family)"
                        className="snake-ridgeline-graph__label"
                      >
                        {series.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>

            {/* Hover value tooltip */}
            {finalShowValues && hoveredPoint && (
              <g className="snake-ridgeline-graph__tooltip">
                <rect
                  x={hoveredPoint.x - 30}
                  y={hoveredPoint.y - 20}
                  width="60"
                  height="20"
                  fill="#101010"
                  stroke="#3a3a3a"
                  strokeWidth="1"
                />
                <text
                  x={hoveredPoint.x}
                  y={hoveredPoint.y - 10}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#bdbdbd"
                  fontSize="10"
                  fontFamily="var(--font-family-mono)"
                >
                  {hoveredPoint.value.toFixed(2)}
                </text>
              </g>
            )}

            {/* X-axis */}
            {finalShowAxes && (
              <g className="snake-ridgeline-graph__x-axis">
                <line
                  x1={0}
                  y1={totalHeight}
                  x2={plotWidth}
                  y2={totalHeight}
                  stroke="#5a5a5a"
                  strokeWidth="2"
                />
                {xLabels ? xLabels.map((label, i) => {
                  const x = (i / (xLabels.length - 1)) * plotWidth;
                  return (
                    <text
                      key={`xlabel-${i}`}
                      x={x}
                      y={totalHeight + 25}
                      textAnchor="middle"
                      fill="#8a8a8a"
                      fontSize="10"
                      fontFamily="var(--font-family-mono)"
                    >
                      {label}
                    </text>
                  );
                }) : xTicks.map((tick, i) => {
                  const x = (tick / (data[0].values.length - 1)) * plotWidth;
                  return (
                    <text
                      key={`xtick-${i}`}
                      x={x}
                      y={totalHeight + 25}
                      textAnchor="middle"
                      fill="#8a8a8a"
                      fontSize="10"
                      fontFamily="var(--font-family-mono)"
                    >
                      {tick}
                    </text>
                  );
                })}
              </g>
            )}

            {/* Axis labels */}
            {finalShowAxes && (
              <>
                {xLabel && (
                  <text
                    x={plotWidth / 2}
                    y={totalHeight + 50}
                    textAnchor="middle"
                    fill="#bdbdbd"
                    fontSize="12"
                    fontFamily="var(--font-family)"
                    className="snake-ridgeline-graph__axis-label"
                  >
                    {xLabel}
                  </text>
                )}
                {yLabel && (
                  <text
                    x={-totalHeight / 2}
                    y={-60}
                    textAnchor="middle"
                    fill="#bdbdbd"
                    fontSize="12"
                    fontFamily="var(--font-family)"
                    transform="rotate(-90)"
                    className="snake-ridgeline-graph__y-label"
                  >
                    {yLabel}
                  </text>
                )}
              </>
            )}
          </g>
        </svg>

        {/* Scrolling indicator */}
        {variant === 'scrolling' && (
          <div className="snake-ridgeline-graph__scroll-indicator">
            <span className="snake-ridgeline-graph__scroll-dot" />
            <span>Live Data</span>
          </div>
        )}
      </div>

      <div className="snake-ridgeline-graph__corner snake-ridgeline-graph__corner--bottom-left" />
      <div className="snake-ridgeline-graph__corner snake-ridgeline-graph__corner--bottom-right" />
    </div>
  );
};