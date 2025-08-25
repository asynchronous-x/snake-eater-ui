import React from 'react';
import './bargraph.css';
interface DataPoint {
    label: string;
    value: number;
    color?: string;
    subLabel?: string;
}
export interface BarGraphProps {
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
    variant?: 'default' | 'minimal' | 'detailed' | 'interactive';
    /** Value formatter function */
    formatValue?: (value: number) => string;
    /** Bar click handler for interactive variant */
    onBarClick?: (dataPoint: DataPoint | null, index: number | null) => void;
    /** Bar hover handler for interactive variant */
    onBarHover?: (dataPoint: DataPoint | null, index: number | null) => void;
    /** Additional CSS classes */
    className?: string;
}
/** BarGraph component for data visualization */
export declare const BarGraph: React.FC<BarGraphProps>;
export {};
//# sourceMappingURL=BarGraph.d.ts.map