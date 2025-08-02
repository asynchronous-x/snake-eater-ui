import React, { useState } from 'react';
import './accordion.css';

interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface AccordionProps {
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
export const Accordion: React.FC<AccordionProps> = ({
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
              <span className="snake-accordion__chevron">▼</span>
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
