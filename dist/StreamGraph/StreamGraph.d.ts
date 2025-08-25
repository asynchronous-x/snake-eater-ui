import React from 'react';
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
export declare const StreamGraph: React.FC<StreamGraphProps>;
export {};
//# sourceMappingURL=StreamGraph.d.ts.map