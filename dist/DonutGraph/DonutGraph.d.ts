import React from 'react';
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
export declare const DonutGraph: React.FC<DonutGraphProps>;
export {};
//# sourceMappingURL=DonutGraph.d.ts.map