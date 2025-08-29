import React, { useMemo, useState } from 'react';
import './hexagonalbinninggraph.css';

interface DataPoint {
  x: number;
  y: number;
  value?: number;
}

interface HexBin {
  x: number;
  y: number;
  count: number;
  points: DataPoint[];
}

export interface HexagonalBinningGraphProps {
  /** Array of data points */
  data: DataPoint[];
  /** Width of the graph (defaults to 100% to fill parent) */
  width?: number | string;
  /** Height of the graph (defaults to 100% to fill parent) */
  height?: number | string;
  /** Hexagon radius in pixels */
  hexRadius?: number;
  /** X-axis range [min, max] */
  xDomain?: [number, number];
  /** Y-axis range [min, max] */
  yDomain?: [number, number];
  /** Color scale function or array of colors */
  colors?: string[];
  /** Show axes */
  showAxes?: boolean;
  /** Show grid */
  showGrid?: boolean;
  /** Show values in hexagons */
  showValues?: boolean;
  /** Show legend */
  showLegend?: boolean;
  /** Animation on mount */
  animate?: boolean;
  /** Animate legend */
  animateLegend?: boolean;
  /** Grid color */
  gridColor?: string;
  /** Axis color */
  axisColor?: string;
  /** Size variant */
  variant?: 'default' | 'minimal' | 'detailed' | 'interactive';
  /** Format value function */
  formatValue?: (count: number) => string;
  /** X-axis label */
  xLabel?: string;
  /** Y-axis label */
  yLabel?: string;
  /** Title */
  title?: string;
  /** Callback when a hexagon is clicked (for interactive variant) */
  onHexClick?: (bin: HexBin, index: number) => void;
  /** Additional CSS classes */
  className?: string;
}

/** HexagonalBinningGraph component for 2D density visualization */
export const HexagonalBinningGraph: React.FC<HexagonalBinningGraphProps> = ({
  data,
  width = '100%',
  height = '100%',
  hexRadius = 12,
  xDomain,
  yDomain,
  colors = ['#1a1a1a', '#2a2a2a', '#3a2828', '#4a2525', '#6b3030', '#8b2c2c'],
  showAxes = true,
  showGrid = false,
  showValues = false,
  showLegend = true,
  animate = true,
  animateLegend = true,
  gridColor = '#3a3a3a',
  axisColor = '#5a5a5a',
  variant = 'default',
  formatValue = (count) => count.toString(),
  xLabel,
  yLabel,
  title,
  onHexClick,
  className = '',
}) => {
  // State for interactive variant
  const [activeHex, setActiveHex] = useState<string | null>(null);
  const [hoveredHex, setHoveredHex] = useState<string | null>(null);

  // Calculate domains
  const { xMin, xMax, yMin, yMax } = useMemo(() => {
    const xValues = data.map((d) => d.x);
    const yValues = data.map((d) => d.y);
    return {
      xMin: xDomain ? xDomain[0] : Math.min(...xValues),
      xMax: xDomain ? xDomain[1] : Math.max(...xValues),
      yMin: yDomain ? yDomain[0] : Math.min(...yValues),
      yMax: yDomain ? yDomain[1] : Math.max(...yValues),
    };
  }, [data, xDomain, yDomain]);

  // Calculate hexagon dimensions
  const hexHeight = Math.sqrt(3) * hexRadius;
  const hexWidth = 2 * hexRadius;
  const vertDist = hexHeight;
  const horizDist = hexWidth * 0.75;

  // SVG dimensions - use a default viewBox size
  const svgWidth = 600;
  const svgHeight = 400;

  // Margins for axes and labels
  const margin = { top: 40, right: 40, bottom: 60, left: 60 };
  const plotWidth = svgWidth - margin.left - margin.right;
  const plotHeight = svgHeight - margin.top - margin.bottom;

  // Create hexagonal bins
  const hexBins = useMemo(() => {
    const bins: Map<string, HexBin> = new Map();

    // Add padding equal to hexagon radius to keep hexagons within bounds
    const padding = hexRadius;
    const effectiveWidth = plotWidth - 2 * padding;
    const effectiveHeight = plotHeight - 2 * padding;

    // Scale functions with padding offset
    const xScale = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * effectiveWidth;
    const yScale = (y: number) =>
      padding + (effectiveHeight - ((y - yMin) / (yMax - yMin)) * effectiveHeight);

    // Bin the data points
    data.forEach((point) => {
      const scaledX = xScale(point.x);
      const scaledY = yScale(point.y);

      // Find nearest hexagon center within padded area
      const col = Math.round((scaledX - padding) / horizDist);
      const row = Math.round((scaledY - padding) / vertDist);

      // Calculate hexagon center position with padding
      const hexX = padding + col * horizDist;
      const hexY = padding + row * vertDist + (col % 2) * (vertDist / 2);

      // Only create bins that are fully within the plot area
      if (
        hexX >= padding &&
        hexX <= plotWidth - padding &&
        hexY >= padding &&
        hexY <= plotHeight - padding
      ) {
        const key = `${col},${row}`;

        if (!bins.has(key)) {
          bins.set(key, {
            x: hexX,
            y: hexY,
            count: 0,
            points: [],
          });
        }

        const bin = bins.get(key)!;
        bin.count++;
        bin.points.push(point);
      }
    });

    return Array.from(bins.values());
  }, [data, xMin, xMax, yMin, yMax, plotWidth, plotHeight, horizDist, vertDist, hexRadius]);

  // Calculate max count for color scaling
  const maxCount = useMemo(() => {
    return Math.max(...hexBins.map((bin) => bin.count));
  }, [hexBins]);

  // Generate hexagon path
  const generateHexPath = (centerX: number, centerY: number, radius: number) => {
    const angles = [0, 60, 120, 180, 240, 300];
    const points = angles.map((angle) => {
      const radian = (angle * Math.PI) / 180;
      return {
        x: centerX + radius * Math.cos(radian),
        y: centerY + radius * Math.sin(radian),
      };
    });

    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  };

  // Get color for bin based on count
  const getColor = (count: number) => {
    const index = Math.floor((count / maxCount) * (colors.length - 1));
    return colors[Math.min(index, colors.length - 1)];
  };

  const classes = [
    'snake-hexagonal-binning-graph',
    `snake-hexagonal-binning-graph--${variant}`,
    animate && 'snake-hexagonal-binning-graph--animated',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const variantStyles = {
    minimal: {
      showAxes: false,
      showGrid: false,
      showLegend: false,
    },
    detailed: {
      showAxes: true,
      showGrid: true,
      showLegend: true,
      showValues: true,
    },
    interactive: {
      showAxes: true,
      showLegend: true,
    },
  };

  const variantProps = variant !== 'default' ? variantStyles[variant] || {} : {};
  const finalShowAxes = variantProps.showAxes ?? showAxes;
  const finalShowGrid = variantProps.showGrid ?? showGrid;
  const finalShowLegend = variantProps.showLegend ?? showLegend;
  const finalShowValues = variantProps.showValues ?? showValues;

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
      <div className="snake-hexagonal-binning-graph__corner snake-hexagonal-binning-graph__corner--top-left" />
      <div className="snake-hexagonal-binning-graph__corner snake-hexagonal-binning-graph__corner--top-right" />

      <div className="snake-hexagonal-binning-graph__container">
        {title && <div className="snake-hexagonal-binning-graph__title">{title}</div>}

        <svg
          width={typeof width === 'number' ? width : '100%'}
          height={typeof height === 'number' ? height : '100%'}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="snake-hexagonal-binning-graph__svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {/* Grid */}
            {finalShowGrid && (
              <g className="snake-hexagonal-binning-graph__grid">
                {xTicks.map((tick, i) => {
                  const x = ((tick - xMin) / (xMax - xMin)) * plotWidth;
                  return (
                    <line
                      key={`grid-x-${i}`}
                      x1={x}
                      y1={0}
                      x2={x}
                      y2={plotHeight}
                      stroke={gridColor}
                      strokeWidth="1"
                      strokeOpacity="0.3"
                      strokeDasharray="2 4"
                    />
                  );
                })}
                {yTicks.map((tick, i) => {
                  const y = plotHeight - ((tick - yMin) / (yMax - yMin)) * plotHeight;
                  return (
                    <line
                      key={`grid-y-${i}`}
                      x1={0}
                      y1={y}
                      x2={plotWidth}
                      y2={y}
                      stroke={gridColor}
                      strokeWidth="1"
                      strokeOpacity="0.3"
                      strokeDasharray="2 4"
                    />
                  );
                })}
              </g>
            )}

            {/* Hexagonal bins */}
            <g className="snake-hexagonal-binning-graph__hexagons">
              {hexBins.map((bin, i) => {
                const hexKey = `${bin.x},${bin.y}`;
                const isActive = activeHex === hexKey;
                const isHovered = hoveredHex === hexKey;
                const isDimmed = isInteractive && activeHex && !isActive;
                const color = getColor(bin.count);

                return (
                  <g key={`hex-${i}`}>
                    <path
                      d={generateHexPath(bin.x, bin.y, hexRadius - 1)}
                      fill={color}
                      fillOpacity={isDimmed ? 0.2 : isActive ? 1 : isHovered ? 0.9 : 0.8}
                      stroke={color}
                      strokeWidth={isActive || isHovered ? 2 : 1}
                      strokeOpacity={isDimmed ? 0.3 : isActive ? 1 : isHovered ? 1 : 0.9}
                      className={`snake-hexagonal-binning-graph__hexagon ${isActive ? 'snake-hexagonal-binning-graph__hexagon--active' : ''}`}
                      style={{
                        cursor: isInteractive ? 'pointer' : 'default',
                        transition: 'all 0.3s ease',
                        transform: isActive ? 'scale(1.1)' : 'scale(1)',
                        transformOrigin: `${bin.x}px ${bin.y}px`,
                      }}
                      onClick={() => {
                        if (isInteractive) {
                          const newActive = isActive ? null : hexKey;
                          setActiveHex(newActive);
                          onHexClick?.(bin, i);
                        }
                      }}
                      onMouseEnter={() => isInteractive && setHoveredHex(hexKey)}
                      onMouseLeave={() => isInteractive && setHoveredHex(null)}
                    />
                    {finalShowValues && bin.count > 0 && (
                      <text
                        x={bin.x}
                        y={bin.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#ffffff"
                        fontSize="10"
                        fontFamily="var(--font-family-mono)"
                        className="snake-hexagonal-binning-graph__value"
                        pointerEvents="none"
                      >
                        {formatValue(bin.count)}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>

            {/* Axes */}
            {finalShowAxes && (
              <g className="snake-hexagonal-binning-graph__axes">
                {/* X-axis */}
                <line
                  x1={0}
                  y1={plotHeight}
                  x2={plotWidth}
                  y2={plotHeight}
                  stroke={axisColor}
                  strokeWidth="2"
                />
                {xTicks.map((tick, i) => {
                  const x = ((tick - xMin) / (xMax - xMin)) * plotWidth;
                  return (
                    <g key={`x-tick-${i}`}>
                      <line
                        x1={x}
                        y1={plotHeight}
                        x2={x}
                        y2={plotHeight + 5}
                        stroke={axisColor}
                        strokeWidth="1"
                      />
                      <text
                        x={x}
                        y={plotHeight + 20}
                        textAnchor="middle"
                        fill="#8a8a8a"
                        fontSize="10"
                        fontFamily="var(--font-family-mono)"
                      >
                        {tick.toFixed(1)}
                      </text>
                    </g>
                  );
                })}

                {/* Y-axis */}
                <line x1={0} y1={0} x2={0} y2={plotHeight} stroke={axisColor} strokeWidth="2" />
                {yTicks.map((tick, i) => {
                  const y = plotHeight - ((tick - yMin) / (yMax - yMin)) * plotHeight;
                  return (
                    <g key={`y-tick-${i}`}>
                      <line x1={0} y1={y} x2={-5} y2={y} stroke={axisColor} strokeWidth="1" />
                      <text
                        x={-10}
                        y={y}
                        textAnchor="end"
                        dominantBaseline="middle"
                        fill="#8a8a8a"
                        fontSize="10"
                        fontFamily="var(--font-family-mono)"
                      >
                        {tick.toFixed(1)}
                      </text>
                    </g>
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
                    y={plotHeight + 45}
                    textAnchor="middle"
                    fill="#bdbdbd"
                    fontSize="12"
                    fontFamily="var(--font-family)"
                    className="snake-hexagonal-binning-graph__axis-label"
                  >
                    {xLabel}
                  </text>
                )}
                {yLabel && (
                  <text
                    x={-plotHeight / 2}
                    y={-40}
                    textAnchor="middle"
                    fill="#bdbdbd"
                    fontSize="12"
                    fontFamily="var(--font-family)"
                    transform="rotate(-90)"
                    className="snake-hexagonal-binning-graph__axis-label"
                  >
                    {yLabel}
                  </text>
                )}
              </>
            )}
          </g>
        </svg>

        {/* Legend */}
        {finalShowLegend && (
          <div
            className={`snake-hexagonal-binning-graph__legend ${animateLegend ? 'snake-hexagonal-binning-graph__legend--animated' : ''}`}
          >
            <div className="snake-hexagonal-binning-graph__legend-title">Density</div>
            <div className="snake-hexagonal-binning-graph__legend-scale">
              <div className="snake-hexagonal-binning-graph__legend-gradient">
                {colors.map((color, i) => (
                  <div
                    key={`legend-color-${i}`}
                    className="snake-hexagonal-binning-graph__legend-color"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="snake-hexagonal-binning-graph__legend-labels">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="snake-hexagonal-binning-graph__corner snake-hexagonal-binning-graph__corner--bottom-left" />
      <div className="snake-hexagonal-binning-graph__corner snake-hexagonal-binning-graph__corner--bottom-right" />
    </div>
  );
};
