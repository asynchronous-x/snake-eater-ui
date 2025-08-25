import React from 'react';
import './spidergraph.css';
interface DataPoint {
    label: string;
    value: number;
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
export declare const SpiderGraph: React.FC<SpiderGraphProps>;
export {};
//# sourceMappingURL=SpiderGraph.d.ts.map