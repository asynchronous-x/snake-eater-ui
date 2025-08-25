import React from 'react';
import './ridgelinegraph.css';
interface DataSeries {
    label: string;
    values: number[];
    color?: string;
}
export interface RidgelineGraphProps {
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
export declare const RidgelineGraph: React.FC<RidgelineGraphProps>;
export {};
//# sourceMappingURL=RidgelineGraph.d.ts.map