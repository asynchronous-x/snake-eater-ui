import React, { useMemo } from 'react';
import { ErrorBoundary } from '../utils/ErrorBoundary';
import './spidergraph.css';

interface DataPoint {
  label: string;
  value: number; // 0-100 percentage
  color?: string;
}

export interface SpiderGraphProps {
  /** Array of data points */
  data: DataPoint[];
  /** Width of the graph (defaults to 100% to fill parent) */
  width?: number | string;
  /** Height of the graph (defaults to 100% to fill parent) */
  height?: number | string;
  /** Number of grid levels */
  levels?: number;
  /** Whether to show values on points */
  showValues?: boolean;
  /** Whether to show labels */
  showLabels?: boolean;
  /** Whether to show grid lines */
  showGrid?: boolean;
  /** Whether to show axes lines */
  showAxes?: boolean;
  /** Whether to animate on mount */
  animate?: boolean;
  /** Fill opacity for the shape */
  fillOpacity?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Grid color */
  gridColor?: string;
  /** Fill color */
  fillColor?: string;
  /** Stroke color */
  strokeColor?: string;
  /** Whether to show dots on points */
  showDots?: boolean;
  /** Size variant */
  variant?: 'default' | 'minimal' | 'detailed' | 'cyber';
  /** Additional CSS classes */
  className?: string;
}

/** SpiderGraph component for multi-dimensional data visualization */
const SpiderGraphComponent: React.FC<SpiderGraphProps> = ({
  data,
  width = '100%',
  height = '100%',
  levels = 5,
  showValues = false,
  showLabels = true,
  showGrid = true,
  showAxes = true,
  animate = true,
  fillOpacity = 0.1,
  strokeWidth = 2,
  gridColor = '#3a3a3a',
  fillColor = '#ffffff',
  strokeColor = '#ffffff',
  showDots = true,
  variant = 'default',
  className = '',
}) => {
  // Fixed SVG dimensions for consistent viewBox
  const svgWidth = 300;
  const svgHeight = 300;
  const center = svgWidth / 2;
  const radius = (svgWidth * 0.8) / 2; // 80% of size for padding

  // Calculate points for the polygon
  const points = useMemo(() => {
    return data.map((point, index) => {
      const angle = (Math.PI * 2 * index) / data.length - Math.PI / 2;
      const distance = (radius * point.value) / 100;
      return {
        x: center + Math.cos(angle) * distance,
        y: center + Math.sin(angle) * distance,
        labelX: center + Math.cos(angle) * (radius + 30),
        labelY: center + Math.sin(angle) * (radius + 30),
        endX: center + Math.cos(angle) * radius,
        endY: center + Math.sin(angle) * radius,
        ...point,
      };
    });
  }, [data, center, radius]);

  // Generate grid levels
  const gridLevels = useMemo(() => {
    return Array.from({ length: levels }, (_, i) => {
      const levelRadius = (radius * (i + 1)) / levels;
      return data.map((_, index) => {
        const angle = (Math.PI * 2 * index) / data.length - Math.PI / 2;
        return {
          x: center + Math.cos(angle) * levelRadius,
          y: center + Math.sin(angle) * levelRadius,
        };
      });
    });
  }, [data.length, levels, center, radius]);

  // Create polygon path
  const polygonPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  // Create grid path
  const gridPaths = gridLevels.map((level) => {
    return level.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  });

  const classes = [
    'snake-spider-graph',
    `snake-spider-graph--${variant}`,
    animate && 'snake-spider-graph--animated',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Variant-specific styles
  const variantStyles = {
    minimal: {
      showGrid: false,
      showAxes: false,
      showDots: false,
      strokeWidth: 1,
    },
    detailed: {
      showValues: true,
      showGrid: true,
      showAxes: true,
      showDots: true,
    },
    cyber: {
      gridColor: '#61dafb',
      strokeColor: '#61dafb',
      fillColor: '#61dafb',
      fillOpacity: 0.1,
      strokeWidth: 3,
    },
  };

  const variantProps = variant !== 'default' ? variantStyles[variant] || {} : {};
  const finalProps = { ...variantProps };

  return (
    <div className={classes}>
      <svg
        width={typeof width === 'number' ? width : width}
        height={typeof height === 'number' ? height : height}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="snake-spider-graph__svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid */}
        {(showGrid || finalProps.showGrid) && (
          <g className="snake-spider-graph__grid">
            {gridPaths.map((path, i) => (
              <path
                key={`grid-${i}`}
                d={path}
                fill="none"
                stroke={finalProps.gridColor || gridColor}
                strokeWidth="1"
                strokeOpacity={0.3 + (i / levels) * 0.3}
                className="snake-spider-graph__grid-level"
              />
            ))}
          </g>
        )}

        {/* Axes */}
        {(showAxes || finalProps.showAxes) && (
          <g className="snake-spider-graph__axes">
            {points.map((point, i) => (
              <line
                key={`axis-${i}`}
                x1={center}
                y1={center}
                x2={point.endX}
                y2={point.endY}
                stroke={finalProps.gridColor || gridColor}
                strokeWidth="1"
                strokeOpacity="0.5"
                className="snake-spider-graph__axis"
              />
            ))}
          </g>
        )}

        {/* Data polygon */}
        <g className="snake-spider-graph__data">
          <path
            d={polygonPath}
            fill={finalProps.fillColor || fillColor}
            fillOpacity={finalProps.fillOpacity ?? fillOpacity}
            stroke={finalProps.strokeColor || strokeColor}
            strokeWidth={finalProps.strokeWidth ?? strokeWidth}
            className="snake-spider-graph__polygon"
          />
        </g>

        {/* Data points */}
        {(showDots || finalProps.showDots) && (
          <g className="snake-spider-graph__dots">
            {points.map((point, i) => (
              <circle
                key={`dot-${i}`}
                cx={point.x}
                cy={point.y}
                r="4"
                fill={point.color || finalProps.strokeColor || strokeColor}
                stroke="#0b0b0d"
                strokeWidth="2"
                className="snake-spider-graph__dot"
              />
            ))}
          </g>
        )}

        {/* Values */}
        {(showValues || finalProps.showValues) && (
          <g className="snake-spider-graph__values">
            {points.map((point, i) => (
              <text
                key={`value-${i}`}
                x={point.x}
                y={point.y - 10}
                textAnchor="middle"
                fill="#bdbdbd"
                fontSize="12"
                fontFamily="var(--font-family-mono)"
                className="snake-spider-graph__value"
              >
                {point.value}%
              </text>
            ))}
          </g>
        )}

        {/* Labels */}
        {showLabels && (
          <g className="snake-spider-graph__labels">
            {points.map((point, i) => {
              // Determine text anchor based on position
              let textAnchor = 'middle';
              if (point.labelX < center - 10) textAnchor = 'end';
              else if (point.labelX > center + 10) textAnchor = 'start';

              return (
                <text
                  key={`label-${i}`}
                  x={point.labelX}
                  y={point.labelY}
                  textAnchor={textAnchor}
                  dominantBaseline="middle"
                  fill="#8a8a8a"
                  fontSize="12"
                  fontFamily="var(--font-family)"
                  className="snake-spider-graph__label"
                >
                  {point.label}
                </text>
              );
            })}
          </g>
        )}

        {/* Corner accents */}
        <g className="snake-spider-graph__corners">
          {/* Top left */}
          <path d="M 0 10 L 0 0 L 10 0" fill="none" stroke="#8e8e90" strokeWidth="2" />
          {/* Top right */}
          <path
            d={`M ${svgWidth - 10} 0 L ${svgWidth} 0 L ${svgWidth} 10`}
            fill="none"
            stroke="#8e8e90"
            strokeWidth="2"
          />
          {/* Bottom left */}
          <path
            d={`M 0 ${svgHeight - 10} L 0 ${svgHeight} L 10 ${svgHeight}`}
            fill="none"
            stroke="#8e8e90"
            strokeWidth="2"
          />
          {/* Bottom right */}
          <path
            d={`M ${svgWidth - 10} ${svgHeight} L ${svgWidth} ${svgHeight} L ${svgWidth} ${svgHeight - 10}`}
            fill="none"
            stroke="#8e8e90"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
};

/** SpiderGraph with error boundary */
export const SpiderGraph: React.FC<SpiderGraphProps> = (props) => {
  return (
    <ErrorBoundary componentName="SpiderGraph" resetOnPropsChange>
      <SpiderGraphComponent {...props} />
    </ErrorBoundary>
  );
};
