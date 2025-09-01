import React, { useMemo, useState } from 'react';
import { ErrorBoundary } from '../utils/ErrorBoundary';
import './donutgraph.css';

interface DataSegment {
  label: string;
  value: number;
  color?: string;
}

export interface DonutGraphProps {
  /** Array of data segments */
  data: DataSegment[];
  /** Size of the graph (defaults to 100% to fill parent, maintains aspect ratio) */
  size?: number | string;
  /** Thickness of the donut ring */
  thickness?: number;
  /** Inner radius percentage (0-80) */
  innerRadius?: number;
  /** Colors for segments */
  colors?: string[];
  /** Show center value */
  showCenterValue?: boolean;
  /** Center value text */
  centerValue?: string;
  /** Center label text */
  centerLabel?: string;
  /** Show legend */
  showLegend?: boolean;
  /** Show values on segments */
  showValues?: boolean;
  /** Show labels on segments */
  showLabels?: boolean;
  /** Animation on mount */
  animate?: boolean;
  /** Animate legend */
  animateLegend?: boolean;
  /** Gap between segments in pixels (at middle radius) */
  segmentGap?: number;
  /** Size variant */
  variant?: 'default' | 'minimal' | 'detailed' | 'interactive';
  /** Format value function */
  formatValue?: (value: number, total: number) => string;
  /** Callback when a segment is clicked (for interactive variant) */
  onSegmentClick?: (segment: DataSegment, index: number) => void;
  /** Additional CSS classes */
  className?: string;
}

/** DonutGraph component for circular data visualization */
const DonutGraphComponent: React.FC<DonutGraphProps> = ({
  data,
  size = '100%',
  innerRadius = 40,
  colors = ['#8b2c2c', '#4a4a4a', '#d4d4d4', '#6b3030', '#7a7a7a'],
  showCenterValue = true,
  centerValue,
  centerLabel,
  showLegend = true,
  showValues = false,
  showLabels = false,
  animate = true,
  animateLegend = true,
  segmentGap = 6,
  variant = 'default',
  formatValue = (value, total) => `${Math.round((value / total) * 100)}%`,
  onSegmentClick,
  className = '',
}) => {
  // State for interactive variant
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  // Calculate total and angles
  const { segments, total } = useMemo(() => {
    const sum = data.reduce((acc, d) => acc + d.value, 0);
    const angleMultiplier = 360;

    let currentAngle = 0;

    const segs = data.map((segment, i) => {
      const percentage = segment.value / sum;
      const angle = percentage * angleMultiplier;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;

      return {
        ...segment,
        percentage,
        startAngle,
        endAngle,
        angle,
        color: segment.color || colors[i % colors.length],
      };
    });

    return { segments: segs, total: sum };
  }, [data, colors]);

  // SVG dimensions - use a default viewBox size
  const svgSize = 300; // Base size for calculations
  const viewBox = `0 0 ${svgSize} ${svgSize}`;

  const center = { x: svgSize / 2, y: svgSize / 2 };
  const outerR = svgSize / 2 - 10;
  const innerR = (outerR * innerRadius) / 100;

  // Generate path for each segment with uniform gaps
  const generateSegmentPath = (segment: any) => {
    if (segmentGap === 0 || finalSegmentGap === 0) {
      // No gaps - use simple arc paths
      const startAngleRad = (segment.startAngle * Math.PI) / 180;
      const endAngleRad = (segment.endAngle * Math.PI) / 180;

      const x1 = center.x + outerR * Math.cos(startAngleRad);
      const y1 = center.y + outerR * Math.sin(startAngleRad);
      const x2 = center.x + outerR * Math.cos(endAngleRad);
      const y2 = center.y + outerR * Math.sin(endAngleRad);

      const x3 = center.x + innerR * Math.cos(endAngleRad);
      const y3 = center.y + innerR * Math.sin(endAngleRad);
      const x4 = center.x + innerR * Math.cos(startAngleRad);
      const y4 = center.y + innerR * Math.sin(startAngleRad);

      const largeArc = segment.angle > 180 ? 1 : 0;

      return `
        M ${x1} ${y1}
        A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2}
        L ${x3} ${y3}
        A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4}
        Z
      `;
    }

    // With gaps - offset the endpoints perpendicular to create uniform gaps
    const halfGap = (finalSegmentGap || segmentGap) / 2;

    // Calculate the angle offset needed for uniform gap at both radii
    const outerGapAngle = (halfGap / outerR) * (180 / Math.PI);
    const innerGapAngle = (halfGap / innerR) * (180 / Math.PI);

    // Adjust angles for uniform gaps
    const startAngleOuterRad = ((segment.startAngle + outerGapAngle) * Math.PI) / 180;
    const endAngleOuterRad = ((segment.endAngle - outerGapAngle) * Math.PI) / 180;
    const startAngleInnerRad = ((segment.startAngle + innerGapAngle) * Math.PI) / 180;
    const endAngleInnerRad = ((segment.endAngle - innerGapAngle) * Math.PI) / 180;

    // Outer arc points
    const x1 = center.x + outerR * Math.cos(startAngleOuterRad);
    const y1 = center.y + outerR * Math.sin(startAngleOuterRad);
    const x2 = center.x + outerR * Math.cos(endAngleOuterRad);
    const y2 = center.y + outerR * Math.sin(endAngleOuterRad);

    // Inner arc points
    const x3 = center.x + innerR * Math.cos(endAngleInnerRad);
    const y3 = center.y + innerR * Math.sin(endAngleInnerRad);
    const x4 = center.x + innerR * Math.cos(startAngleInnerRad);
    const y4 = center.y + innerR * Math.sin(startAngleInnerRad);

    const largeArc = segment.angle - outerGapAngle * 2 > 180 ? 1 : 0;

    return `
      M ${x1} ${y1}
      A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4}
      Z
    `;
  };

  // Calculate label position
  const getLabelPosition = (segment: any) => {
    const midAngle = (segment.startAngle + segment.endAngle) / 2;
    const midAngleRad = (midAngle * Math.PI) / 180;
    const labelR = (outerR + innerR) / 2;

    return {
      x: center.x + labelR * Math.cos(midAngleRad),
      y: center.y + labelR * Math.sin(midAngleRad),
    };
  };

  const classes = [
    'snake-donut-graph',
    `snake-donut-graph--${variant}`,
    animate && 'snake-donut-graph--animated',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const variantStyles = {
    minimal: {
      showLegend: false,
      showCenterValue: false,
      segmentGap: 0,
    },
    detailed: {
      showLegend: true,
      showCenterValue: true,
      showValues: true,
      segmentGap: 8,
    },
    interactive: {
      showLegend: true,
      showCenterValue: true,
    },
  };

  const variantProps = variant !== 'default' ? variantStyles[variant] || {} : {};
  const finalShowLegend = variantProps.showLegend ?? showLegend;
  const finalShowCenterValue = variantProps.showCenterValue ?? showCenterValue;
  const finalShowValues = variantProps.showValues ?? showValues;
  const finalSegmentGap = variantProps.segmentGap ?? segmentGap;

  const isInteractive = variant === 'interactive';

  // Calculate center value
  const centerText = centerValue || `${Math.round(total)}`;

  return (
    <div className={classes}>
      <div className="snake-donut-graph__corner snake-donut-graph__corner--top-left" />
      <div className="snake-donut-graph__corner snake-donut-graph__corner--top-right" />

      <div className="snake-donut-graph__container">
        <svg
          width={typeof size === 'number' ? size : '100%'}
          height={typeof size === 'number' ? size : '100%'}
          viewBox={viewBox}
          className="snake-donut-graph__svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Segments */}
          <g className="snake-donut-graph__segments">
            {segments.map((segment, i) => {
              const isActive = activeSegment === segment.label;
              const isHovered = hoveredSegment === segment.label;
              const isDimmed = isInteractive && activeSegment && !isActive;

              return (
                <path
                  key={`segment-${i}`}
                  d={generateSegmentPath(segment)}
                  fill={segment.color}
                  fillOpacity={isDimmed ? 0.2 : isActive ? 1 : isHovered ? 0.9 : 0.8}
                  stroke={segment.color}
                  strokeWidth={isActive || isHovered ? 2 : 1}
                  strokeOpacity={isDimmed ? 0.3 : isActive ? 1 : isHovered ? 1 : 0.9}
                  className={`snake-donut-graph__segment ${isActive ? 'snake-donut-graph__segment--active' : ''}`}
                  style={{
                    cursor: isInteractive ? 'pointer' : 'default',
                    transition: 'all 0.3s ease',
                    transformOrigin: `${center.x}px ${center.y}px`,
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  }}
                  onClick={() => {
                    if (isInteractive) {
                      const newActive = isActive ? null : segment.label;
                      setActiveSegment(newActive);
                      onSegmentClick?.(segment, i);
                    }
                  }}
                  onMouseEnter={() => isInteractive && setHoveredSegment(segment.label)}
                  onMouseLeave={() => isInteractive && setHoveredSegment(null)}
                >
                  {animate && (
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from={`0 ${center.x} ${center.y}`}
                      to={`360 ${center.x} ${center.y}`}
                      dur="1s"
                      repeatCount="1"
                    />
                  )}
                </path>
              );
            })}
          </g>

          {/* Labels on segments */}
          {(showLabels || finalShowValues) && (
            <g className="snake-donut-graph__labels">
              {segments.map((segment, i) => {
                const pos = getLabelPosition(segment);
                return (
                  <text
                    key={`label-${i}`}
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#bdbdbd"
                    fontSize="11"
                    fontFamily="var(--font-family-mono)"
                    className="snake-donut-graph__label"
                    style={{
                      pointerEvents: 'none',
                    }}
                  >
                    {showLabels && !finalShowValues && segment.label}
                    {finalShowValues && !showLabels && formatValue(segment.value, total)}
                    {showLabels && finalShowValues && (
                      <>
                        <tspan x={pos.x} dy="-0.3em">
                          {segment.label}
                        </tspan>
                        <tspan x={pos.x} dy="1em">
                          {formatValue(segment.value, total)}
                        </tspan>
                      </>
                    )}
                  </text>
                );
              })}
            </g>
          )}

          {/* Center value */}
          {finalShowCenterValue && (
            <g className="snake-donut-graph__center">
              <text
                x={center.x}
                y={center.y - (centerLabel ? 8 : 0)}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#bdbdbd"
                fontSize="24"
                fontWeight="bold"
                fontFamily="var(--font-family-mono)"
                className="snake-donut-graph__center-value"
              >
                {centerText}
              </text>
              {centerLabel && (
                <text
                  x={center.x}
                  y={center.y + 12}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#8a8a8a"
                  fontSize="12"
                  fontFamily="var(--font-family)"
                  className="snake-donut-graph__center-label"
                >
                  {centerLabel}
                </text>
              )}
            </g>
          )}

          {/* Border rings */}
          <g className="snake-donut-graph__borders">
            <circle
              cx={center.x}
              cy={center.y}
              r={outerR}
              fill="none"
              stroke="#3a3a3a"
              strokeWidth="1"
              opacity="0.5"
            />
            <circle
              cx={center.x}
              cy={center.y}
              r={innerR}
              fill="none"
              stroke="#3a3a3a"
              strokeWidth="1"
              opacity="0.5"
            />
          </g>
        </svg>

        {/* Legend */}
        {finalShowLegend && (
          <div
            className={`snake-donut-graph__legend ${animateLegend ? 'snake-donut-graph__legend--animated' : ''}`}
          >
            {segments.map((segment, i) => {
              const isActive = activeSegment === segment.label;
              const isDimmed = isInteractive && activeSegment && !isActive;

              return (
                <div
                  key={`legend-${i}`}
                  className={`snake-donut-graph__legend-item ${isActive ? 'snake-donut-graph__legend-item--active' : ''}`}
                  style={{
                    opacity: isDimmed ? 0.3 : 1,
                    cursor: isInteractive ? 'pointer' : 'default',
                  }}
                  onClick={() => {
                    if (isInteractive) {
                      const newActive = isActive ? null : segment.label;
                      setActiveSegment(newActive);
                      onSegmentClick?.(segment, i);
                    }
                  }}
                  onMouseEnter={() => isInteractive && setHoveredSegment(segment.label)}
                  onMouseLeave={() => isInteractive && setHoveredSegment(null)}
                >
                  <span
                    className="snake-donut-graph__legend-color"
                    style={{
                      backgroundColor: segment.color,
                      borderWidth: isActive ? '2px' : '1px',
                      borderColor: isActive ? '#bdbdbd' : '#3a3a3a',
                    }}
                  />
                  <span className="snake-donut-graph__legend-label">{segment.label}</span>
                  <span className="snake-donut-graph__legend-value">
                    {formatValue(segment.value, total)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="snake-donut-graph__corner snake-donut-graph__corner--bottom-left" />
      <div className="snake-donut-graph__corner snake-donut-graph__corner--bottom-right" />
    </div>
  );
};

/** DonutGraph with error boundary */
export const DonutGraph: React.FC<DonutGraphProps> = (props) => {
  return (
    <ErrorBoundary componentName="DonutGraph" resetOnPropsChange>
      <DonutGraphComponent {...props} />
    </ErrorBoundary>
  );
};
