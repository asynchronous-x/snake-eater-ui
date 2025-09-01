import React, { useMemo, useState } from 'react';
import { ErrorBoundary } from '../utils/ErrorBoundary';
import './streamgraph.css';

interface DataPoint {
  x: number | string;
  [key: string]: number | string;
}

export interface StreamGraphProps {
  /** Array of data points */
  data: DataPoint[];
  /** Keys for the data series to display */
  keys: string[];
  /** Colors for each series */
  colors?: string[];
  /** Width of the graph (defaults to 100% to fill parent) */
  width?: number | string;
  /** Height of the graph (defaults to 100% to fill parent) */
  height?: number | string;
  /** Show grid lines */
  showGrid?: boolean;
  /** Number of grid lines */
  gridLines?: number;
  /** Show x-axis labels */
  showLabels?: boolean;
  /** Show legend */
  showLegend?: boolean;
  /** Animation on mount */
  animate?: boolean;
  /** Animate legend expand on mount */
  animateLegend?: boolean;
  /** Grid color */
  gridColor?: string;
  /** Curve type */
  curve?: 'linear' | 'smooth' | 'step';
  /** Offset type */
  offset?: 'silhouette' | 'wiggle' | 'expand' | 'zero';
  /** Size variant */
  variant?: 'default' | 'minimal' | 'detailed' | 'interactive';
  /** Format label function */
  formatLabel?: (value: number | string) => string;
  /** Callback when a layer is clicked (for interactive variant) */
  onLayerClick?: (key: string, index: number) => void;
  /** Additional CSS classes */
  className?: string;
}

/** StreamGraph component for visualizing time-series data */
const StreamGraphComponent: React.FC<StreamGraphProps> = ({
  data,
  keys,
  colors = ['#8b2c2c', '#4a4a4a', '#d4d4d4', '#6b3030', '#7a7a7a'],
  width = '100%',
  height = '100%',
  showGrid = true,
  gridLines = 5,
  showLabels = true,
  showLegend = true,
  animate = true,
  animateLegend = true,
  gridColor = '#3a3a3a',
  curve = 'smooth',
  offset = 'silhouette',
  variant = 'default',
  formatLabel = (value) => value.toString(),
  onLayerClick,
  className = '',
}) => {
  // Fixed SVG dimensions for consistent viewBox
  const svgWidth = 600;
  const svgHeight = 400;

  // State for interactive variant
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  // Calculate stacked data
  const stackedData = useMemo(() => {
    const layers: any[] = [];

    if (!keys || keys.length === 0 || !data || data.length === 0) {
      return layers;
    }

    keys.forEach((key, keyIndex) => {
      const layer = data.map((d, i) => {
        const value = typeof d[key] === 'number' ? d[key] : 0;
        const prevLayers = layers.slice(0, keyIndex);
        const y0 = prevLayers.reduce((sum, l) => sum + (l[i]?.value || 0), 0);

        return {
          x: i,
          y0,
          y1: y0 + value,
          value,
          key,
          originalX: d.x,
        };
      });
      layers.push(layer);
    });

    // Apply offset
    if (offset === 'silhouette') {
      // Center the stream
      const maxHeight = layers.reduce((max, layer) => {
        const layerMax = Math.max(...layer.map((d: any) => d.y1));
        return Math.max(max, layerMax);
      }, 0);

      layers.forEach((layer) => {
        layer.forEach((d: any) => {
          const shift = (maxHeight - d.y1) / 2;
          d.y0 += shift;
          d.y1 += shift;
        });
      });
    } else if (offset === 'wiggle') {
      // Minimize wiggle
      const totals = data.map((_, i) => layers.reduce((sum, layer) => sum + layer[i].value, 0));
      const maxTotal = Math.max(...totals);

      layers.forEach((layer) => {
        layer.forEach((d: any, i: number) => {
          const shift = (maxTotal - totals[i]) / 2;
          d.y0 += shift;
          d.y1 += shift;
        });
      });
    } else if (offset === 'expand') {
      // Normalize to 100%
      data.forEach((_, i) => {
        const total = layers.reduce((sum, layer) => sum + layer[i].value, 0);
        if (total > 0) {
          let cumulative = 0;
          layers.forEach((layer) => {
            const normalized = (layer[i].value / total) * 100;
            layer[i].y0 = cumulative;
            layer[i].y1 = cumulative + normalized;
            cumulative += normalized;
          });
        }
      });
    }

    return layers;
  }, [data, keys, offset]);

  // Calculate max value for scaling
  const maxValue = useMemo(() => {
    if (offset === 'expand') return 100;
    return Math.max(...stackedData.flat().map((d: any) => d.y1));
  }, [stackedData, offset]);

  // Generate path for each layer
  const generatePath = (layer: any[]) => {
    if (layer.length === 0) return '';

    const xScale = (i: number) => (i / (data.length - 1)) * svgWidth;
    const yScale = (v: number) => svgHeight - (v / maxValue) * svgHeight;

    let pathTop = '';
    let pathBottom = '';

    layer.forEach((point, i) => {
      const x = xScale(i);
      const y0 = yScale(point.y0);
      const y1 = yScale(point.y1);

      if (i === 0) {
        pathTop = `M ${x} ${y1}`;
        pathBottom = `L ${x} ${y0}`;
      } else {
        if (curve === 'smooth') {
          // Cubic bezier curve
          const prevX = xScale(i - 1);
          const midX = (prevX + x) / 2;
          const prevY1 = yScale(layer[i - 1].y1);
          pathTop += ` C ${midX} ${prevY1}, ${midX} ${y1}, ${x} ${y1}`;

          const prevY0 = yScale(layer[i - 1].y0);
          pathBottom = ` C ${midX} ${y0}, ${midX} ${prevY0}, ${prevX} ${prevY0}` + pathBottom;
        } else if (curve === 'step') {
          const prevX = xScale(i - 1);
          pathTop += ` L ${prevX} ${y1} L ${x} ${y1}`;
          pathBottom = ` L ${x} ${y0} L ${prevX} ${y0}` + pathBottom;
        } else {
          pathTop += ` L ${x} ${y1}`;
          pathBottom = ` L ${x} ${y0}` + pathBottom;
        }
      }
    });

    return pathTop + pathBottom + ' Z';
  };

  const classes = [
    'snake-stream-graph',
    `snake-stream-graph--${variant}`,
    animate && 'snake-stream-graph--animated',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const variantStyles = {
    minimal: {
      showGrid: false,
      showLegend: false,
    },
    detailed: {
      showGrid: true,
      showLegend: true,
      gridLines: 10,
    },
    interactive: {
      showGrid: true,
      showLegend: true,
    },
  };

  const variantProps = variant !== 'default' ? variantStyles[variant] || {} : {};
  const finalShowGrid = variantProps.showGrid ?? showGrid;
  const finalShowLegend = variantProps.showLegend ?? showLegend;
  const finalGridLines = variantProps.gridLines ?? gridLines;

  // Generate grid positions
  const gridPositions = useMemo(() => {
    return Array.from({ length: finalGridLines + 1 }, (_, i) => (i / finalGridLines) * svgHeight);
  }, [finalGridLines, svgHeight]);

  // Generate x-axis labels
  const xLabels = useMemo(() => {
    const step = Math.ceil(data.length / 8); // Show max 8 labels
    return data
      .filter((_, i) => i % step === 0)
      .map((d, i) => ({
        value: d.x,
        position: ((i * step) / (data.length - 1)) * svgWidth,
      }));
  }, [data, svgWidth]);

  return (
    <div className={classes}>
      <div className="snake-stream-graph__corner snake-stream-graph__corner--top-left" />
      <div className="snake-stream-graph__corner snake-stream-graph__corner--top-right" />

      <div className="snake-stream-graph__container">
        <svg
          width={typeof width === 'number' ? width : width}
          height={typeof height === 'number' ? height : height}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="snake-stream-graph__svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid */}
          {finalShowGrid && (
            <g className="snake-stream-graph__grid">
              {gridPositions.map((y, i) => (
                <line
                  key={`grid-${i}`}
                  x1={0}
                  y1={y}
                  x2={svgWidth}
                  y2={y}
                  stroke={gridColor}
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  className="snake-stream-graph__grid-line"
                />
              ))}
            </g>
          )}

          {/* Streams */}
          <g className="snake-stream-graph__streams">
            {stackedData.map((layer, i) => {
              const isActive = activeLayer === keys[i];
              const isHovered = hoveredLayer === keys[i];
              const isInteractive = variant === 'interactive';
              const isDimmed = isInteractive && activeLayer && !isActive;

              return (
                <path
                  key={`stream-${i}`}
                  d={generatePath(layer)}
                  fill={colors[i % colors.length]}
                  fillOpacity={isDimmed ? '0.1' : isActive ? '0.7' : isHovered ? '0.6' : '0.4'}
                  stroke={colors[i % colors.length]}
                  strokeWidth={isActive || isHovered ? '2' : '1'}
                  strokeOpacity={isDimmed ? '0.2' : isActive ? '1' : isHovered ? '0.8' : '0.6'}
                  className={`snake-stream-graph__stream ${isActive ? 'snake-stream-graph__stream--active' : ''}`}
                  style={{
                    animationDelay: animate ? `${i * 100}ms` : '0',
                    cursor: isInteractive ? 'pointer' : 'default',
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => {
                    if (isInteractive) {
                      const newActive = isActive ? null : keys[i];
                      setActiveLayer(newActive);
                      onLayerClick?.(keys[i], i);
                    }
                  }}
                  onMouseEnter={() => isInteractive && setHoveredLayer(keys[i])}
                  onMouseLeave={() => isInteractive && setHoveredLayer(null)}
                />
              );
            })}
          </g>
        </svg>

        {/* X-axis labels */}
        {showLabels && (
          <div className="snake-stream-graph__labels">
            {xLabels.map((label, i) => (
              <div
                key={`label-${i}`}
                className="snake-stream-graph__label"
                style={{ left: `${label.position}px` }}
              >
                {formatLabel(label.value)}
              </div>
            ))}
          </div>
        )}

        {/* Legend */}
        {finalShowLegend && (
          <div
            className={`snake-stream-graph__legend ${animateLegend ? 'snake-stream-graph__legend--animated' : ''}`}
          >
            {keys.map((key, i) => {
              const isActive = activeLayer === key;
              const isInteractive = variant === 'interactive';
              const isDimmed = isInteractive && activeLayer && !isActive;

              return (
                <div
                  key={`legend-${i}`}
                  className={`snake-stream-graph__legend-item ${isActive ? 'snake-stream-graph__legend-item--active' : ''}`}
                  style={{
                    opacity: isDimmed ? 0.3 : 1,
                    cursor: isInteractive ? 'pointer' : 'default',
                  }}
                  onClick={() => {
                    if (isInteractive) {
                      const newActive = isActive ? null : key;
                      setActiveLayer(newActive);
                      onLayerClick?.(key, i);
                    }
                  }}
                  onMouseEnter={() => isInteractive && setHoveredLayer(key)}
                  onMouseLeave={() => isInteractive && setHoveredLayer(null)}
                >
                  <span
                    className="snake-stream-graph__legend-color"
                    style={{
                      backgroundColor: colors[i % colors.length],
                      borderWidth: isActive ? '2px' : '1px',
                      borderColor: isActive ? '#bdbdbd' : '#3a3a3a',
                    }}
                  />
                  <span className="snake-stream-graph__legend-label">{key}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="snake-stream-graph__corner snake-stream-graph__corner--bottom-left" />
      <div className="snake-stream-graph__corner snake-stream-graph__corner--bottom-right" />
    </div>
  );
};

/** StreamGraph with error boundary */
export const StreamGraph: React.FC<StreamGraphProps> = (props) => {
  return (
    <ErrorBoundary componentName="StreamGraph" resetOnPropsChange>
      <StreamGraphComponent {...props} />
    </ErrorBoundary>
  );
};
