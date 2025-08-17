import React, { useRef, useState, useEffect } from 'react';
import './stepper.css';

interface StepperStep {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  error?: boolean;
}

interface StepperProps {
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
export const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  orientation = 'horizontal',
  size = 'medium',
  showNumbers = true,
  clickable = false,
  onStepClick,
  className = '',
  showConnectors = true,
  variant = 'default',
}) => {
  const stepperRef = React.useRef<HTMLDivElement>(null);
  const [connectorWidth, setConnectorWidth] = React.useState<number>(0);
  const [connectorHeight, setConnectorHeight] = React.useState<number>(0);

  React.useEffect(() => {
    if (showConnectors && stepperRef.current) {
      const calculateConnectorDimensions = () => {
        const stepElements = stepperRef.current?.querySelectorAll('.snake-stepper__step-indicator');
        if (stepElements && stepElements.length >= 2) {
          const first = stepElements[0] as HTMLElement;
          const second = stepElements[1] as HTMLElement;
          const firstRect = first.getBoundingClientRect();
          const secondRect = second.getBoundingClientRect();
          
          if (orientation === 'horizontal') {
            const gap = secondRect.left - firstRect.right;
            setConnectorWidth(gap);
          } else {
            const gap = secondRect.top - firstRect.bottom;
            setConnectorHeight(gap);
          }
        }
      };

      calculateConnectorDimensions();
      window.addEventListener('resize', calculateConnectorDimensions);
      return () => window.removeEventListener('resize', calculateConnectorDimensions);
    }
  }, [orientation, showConnectors, steps.length]);

  const handleStepClick = (index: number) => {
    if (clickable && onStepClick) {
      onStepClick(index);
    }
  };

  const getStepState = (index: number) => {
    if (steps[index].error) return 'error';
    if (index < activeStep) return 'completed';
    if (index === activeStep) return 'active';
    return 'pending';
  };

  const classes = [
    'snake-stepper',
    `snake-stepper--${orientation}`,
    `snake-stepper--${size}`,
    `snake-stepper--${variant}`,
    showConnectors && 'snake-stepper--with-connectors',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} ref={stepperRef}>
      {steps.map((step, index) => {
        const state = getStepState(index);
        const isClickable = clickable && onStepClick;

        return (
          <div
            key={index}
            className={[
              'snake-stepper__step',
              `snake-stepper__step--${state}`,
              isClickable && 'snake-stepper__step--clickable',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => handleStepClick(index)}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            onKeyDown={
              isClickable
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleStepClick(index);
                    }
                  }
                : undefined
            }
          >
            <div className="snake-stepper__indicator-wrapper">
              <div className="snake-stepper__step-indicator">
                {step.icon ? (
                  <span className="snake-stepper__step-icon">{step.icon}</span>
                ) : showNumbers ? (
                  <span className="snake-stepper__step-number">
                    {state === 'completed' ? '✓' : index + 1}
                  </span>
                ) : (
                  <span className="snake-stepper__step-dot" />
                )}
              </div>
              
              {showConnectors && index < steps.length - 1 && (
                <div
                  className={[
                    'snake-stepper__connector',
                    index < activeStep && 'snake-stepper__connector--completed',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={
                    orientation === 'horizontal' 
                      ? { width: `${connectorWidth}px` } 
                      : { height: `${connectorHeight}px` }
                  }
                />
              )}
            </div>

            {variant !== 'compact' && (
              <div className="snake-stepper__step-content">
                <div className="snake-stepper__step-label">{step.label}</div>
                {step.description && variant === 'default' && (
                  <div className="snake-stepper__step-description">{step.description}</div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};