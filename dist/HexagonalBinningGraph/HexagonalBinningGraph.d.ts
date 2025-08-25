import React from 'react';
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
export declare const HexagonalBinningGraph: React.FC<HexagonalBinningGraphProps>;
export {};
//# sourceMappingURL=HexagonalBinningGraph.d.ts.map