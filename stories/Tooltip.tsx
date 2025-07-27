import React, { useState, useRef, useEffect } from 'react';
import './tooltip.css';

interface TooltipProps {
  /** Tooltip content */
  content: React.ReactNode;
  /** Target element */
  children: React.ReactNode;
  /** Placement position */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Trigger type */
  trigger?: 'hover' | 'click';
  /** Visual variant */
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  /** Delay before showing (ms) */
  delay?: number;
  /** Additional CSS classes */
  className?: string;
}

/** Tooltip component for contextual information */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  trigger = 'hover',
  variant = 'default',
  delay = 200,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const targetRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const calculatePosition = () => {
    if (!targetRef.current || !tooltipRef.current) return;

    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const spacing = 8;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = targetRect.top - tooltipRect.height - spacing;
        left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = targetRect.bottom + spacing;
        left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
        left = targetRect.left - tooltipRect.width - spacing;
        break;
      case 'right':
        top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
        left = targetRect.right + spacing;
        break;
    }

    // Keep tooltip within viewport
    const margin = 8;
    top = Math.max(margin, Math.min(top, window.innerHeight - tooltipRect.height - margin));
    left = Math.max(margin, Math.min(left, window.innerWidth - tooltipRect.width - margin));

    setCoords({ top, left });
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      window.addEventListener('scroll', calculatePosition);
      window.addEventListener('resize', calculatePosition);
    }

    return () => {
      window.removeEventListener('scroll', calculatePosition);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [isVisible]);

  const showTooltip = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const toggleTooltip = () => {
    if (isVisible) {
      hideTooltip();
    } else {
      showTooltip();
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      showTooltip();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      hideTooltip();
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      toggleTooltip();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (trigger === 'click' && isVisible) {
        if (targetRef.current && !targetRef.current.contains(e.target as Node) &&
            tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
          hideTooltip();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [trigger, isVisible]);

  const tooltipClasses = [
    'snake-tooltip',
    `snake-tooltip--${position}`,
    `snake-tooltip--${variant}`,
    isVisible && 'snake-tooltip--visible',
    className
  ].filter(Boolean).join(' ');

  return (
    <>
      <div
        ref={targetRef}
        className="snake-tooltip__target"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className={tooltipClasses}
          style={{ top: coords.top, left: coords.left }}
        >
          <div className="snake-tooltip__content">
            {content}
          </div>
          <div className="snake-tooltip__arrow" />
        </div>
      )}
    </>
  );
};