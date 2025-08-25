import React from 'react';
import './stepper.css';
interface StepperStep {
    label: string;
    description?: string;
    icon?: React.ReactNode;
    error?: boolean;
}
export interface StepperProps {
    /** Array of steps */
    steps: StepperStep[];
    /** Current active step index */
    activeStep: number;
    /** Orientation of the stepper */
    orientation?: 'horizontal' | 'vertical';
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Whether to show step numbers */
    showNumbers?: boolean;
    /** Whether steps are clickable */
    clickable?: boolean;
    /** Callback when a step is clicked */
    onStepClick?: (index: number) => void;
    /** Additional CSS classes */
    className?: string;
    /** Whether to show connector lines */
    showConnectors?: boolean;
    /** Variant style */
    variant?: 'default' | 'compact' | 'pills';
}
/** Stepper component for multi-step processes */
export declare const Stepper: React.FC<StepperProps>;
export {};
//# sourceMappingURL=Stepper.d.ts.map