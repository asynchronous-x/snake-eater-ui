import React, { useState } from 'react';
import { ErrorBoundary } from '../utils/ErrorBoundary';
import './accordion.css';

// Icon component for ChevronDown from pixel-icon-library
const ChevronDownIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <polygon points="23 8 23 9 22 9 22 10 21 10 21 11 20 11 20 12 19 12 19 13 18 13 18 14 17 14 17 15 16 15 16 16 15 16 15 17 14 17 14 18 13 18 13 19 11 19 11 18 10 18 10 17 9 17 9 16 8 16 8 15 7 15 7 14 6 14 6 13 5 13 5 12 4 12 4 11 3 11 3 10 2 10 2 9 1 9 1 8 2 8 2 7 3 7 3 6 4 6 4 7 5 7 5 8 6 8 6 9 7 9 7 10 8 10 8 11 9 11 9 12 10 12 10 13 11 13 11 14 13 14 13 13 14 13 14 12 15 12 15 11 16 11 16 10 17 10 17 9 18 9 18 8 19 8 19 7 20 7 20 6 21 6 21 7 22 7 22 8 23 8" />
  </svg>
);

interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface AccordionProps {
  /** Accordion items */
  items: AccordionItem[];
  /** Allow multiple items open */
  multiple?: boolean;
  /** Initially open items */
  defaultOpen?: string[];
  /** Controlled open items */
  openItems?: string[];
  /** Change handler */
  onChange?: (openItems: string[]) => void;
  /** Visual variant */
  variant?: 'default' | 'boxed' | 'minimal';
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Use header style with lighter background */
  header?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/** Accordion component for collapsible content */
const AccordionComponent: React.FC<AccordionProps> = ({
  items,
  multiple = false,
  defaultOpen = [],
  openItems: controlledOpenItems,
  onChange,
  variant = 'default',
  size = 'medium',
  header = false,
  className = '',
}) => {
  const [internalOpenItems, setInternalOpenItems] = useState<string[]>(defaultOpen);
  const openItems = controlledOpenItems !== undefined ? controlledOpenItems : internalOpenItems;

  const handleToggle = (itemId: string) => {
    let newOpenItems: string[];

    if (multiple) {
      newOpenItems = openItems.includes(itemId)
        ? openItems.filter((id) => id !== itemId)
        : [...openItems, itemId];
    } else {
      newOpenItems = openItems.includes(itemId) ? [] : [itemId];
    }

    if (onChange) {
      onChange(newOpenItems);
    } else {
      setInternalOpenItems(newOpenItems);
    }
  };

  const accordionClasses = [
    'snake-accordion',
    `snake-accordion--${variant}`,
    `snake-accordion--${size}`,
    header && 'snake-accordion--header',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={accordionClasses}>
      {items.map((item, index) => {
        const isOpen = openItems.includes(item.id);
        const itemClasses = [
          'snake-accordion__item',
          isOpen && 'snake-accordion__item--open',
          item.disabled && 'snake-accordion__item--disabled',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <div key={item.id} className={itemClasses}>
            <button
              type="button"
              className="snake-accordion__header"
              onClick={() => !item.disabled && handleToggle(item.id)}
              disabled={item.disabled}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
            >
              <div className="snake-accordion__header-content">
                {item.icon && <span className="snake-accordion__icon">{item.icon}</span>}
                <span className="snake-accordion__title">{item.title}</span>
              </div>
              <ChevronDownIcon className="snake-accordion__chevron" />
            </button>

            <div
              id={`accordion-panel-${item.id}`}
              className="snake-accordion__panel"
              aria-hidden={!isOpen}
            >
              <div className="snake-accordion__content">{item.content}</div>
            </div>

            {variant === 'default' && index < items.length - 1 && (
              <div className="snake-accordion__divider" />
            )}
          </div>
        );
      })}
    </div>
  );
};

/** Accordion with error boundary */
export const Accordion: React.FC<AccordionProps> = (props) => {
  return (
    <ErrorBoundary componentName="Accordion" resetOnPropsChange>
      <AccordionComponent {...props} />
    </ErrorBoundary>
  );
};
