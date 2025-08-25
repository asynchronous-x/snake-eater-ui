import React from 'react';
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
export declare const LineGraph: React.FC<LineGraphProps>;
export {};
//# sourceMappingURL=LineGraph.d.ts.map