import React from 'react';
import './list.css';

interface ListItem {
  /** The text content of the list item */
  content: React.ReactNode;
  /** Optional subitems */
  subitems?: ListItem[];
  /** Click handler for interactive items */
  onClick?: () => void;
}

export interface ListProps {
  /** Array of list items */
  items: ListItem[];
  /** Starting number for the list */
  startNumber?: number;
  /** Number of digits to pad numbers with zeros */
  numberPadding?: number;
  /** Custom number format function */
  formatNumber?: (num: number) => string;
  /** Color for subitem arrows */
  arrowColor?: string;
  /** Show numbers */
  showNumbers?: boolean;
  /** List type */
  type?: 'ordered' | 'unordered';
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Display text in uppercase */
  uppercase?: boolean;
  /** Make top-level items interactive */
  interactive?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/** List component with customizable numbering and styling */
export const List: React.FC<ListProps> = ({
  items,
  startNumber = 1,
  numberPadding = 3,
  formatNumber,
  arrowColor = 'var(--color-text-primary)',
  showNumbers = true,
  type = 'ordered',
  size = 'medium',
  uppercase = true,
  interactive = false,
  className = '',
}) => {
  const defaultFormatNumber = (num: number) => {
    return num.toString().padStart(numberPadding, '0');
  };

  const getFormattedNumber = formatNumber || defaultFormatNumber;

  const renderListItem = (item: ListItem, index: number, parentNumber?: string) => {
    const currentNumber = parentNumber
      ? `${parentNumber}.${getFormattedNumber(index + 1)}`
      : getFormattedNumber(startNumber + index);

    const isInteractive = interactive && !parentNumber && item.onClick;

    return (
      <li
        key={index}
        className={`snake-list__item ${isInteractive ? 'snake-list__item--interactive' : ''}`}
      >
        <div
          className="snake-list__content"
          onClick={isInteractive ? item.onClick : undefined}
          role={isInteractive ? 'button' : undefined}
          tabIndex={isInteractive ? 0 : undefined}
          onKeyDown={
            isInteractive
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.onClick?.();
                  }
                }
              : undefined
          }
        >
          <span className="snake-list__bullet">
            <span className="snake-list__square" />
          </span>
          {showNumbers && <span className="snake-list__number">{currentNumber}</span>}
          <span className="snake-list__text">{item.content}</span>
        </div>
        {item.subitems && item.subitems.length > 0 && (
          <ul className="snake-list__subitems">
            {item.subitems.map((subitem, subIndex) => (
              <li key={subIndex} className="snake-list__subitem">
                <div className="snake-list__content">
                  <span className="snake-list__arrow" style={{ color: arrowColor }}>
                    ▶
                  </span>
                  {showNumbers && (
                    <span className="snake-list__number">
                      {currentNumber}.{getFormattedNumber(subIndex + 1)}
                    </span>
                  )}
                  <span className="snake-list__text">{subitem.content}</span>
                </div>
                {subitem.subitems && subitem.subitems.length > 0 && (
                  <ul className="snake-list__subitems">
                    {subitem.subitems.map((subSubitem, subSubIndex) => (
                      <li
                        key={subSubIndex}
                        className="snake-list__subitem snake-list__subitem--nested"
                      >
                        <div className="snake-list__content">
                          <span
                            className="snake-list__arrow"
                            style={{ color: arrowColor, opacity: 0.7 }}
                          >
                            ▶
                          </span>
                          {showNumbers && (
                            <span className="snake-list__number">
                              {currentNumber}.{getFormattedNumber(subIndex + 1)}.
                              {getFormattedNumber(subSubIndex + 1)}
                            </span>
                          )}
                          <span className="snake-list__text">{subSubitem.content}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  const listClasses = [
    'snake-list',
    `snake-list--${type}`,
    `snake-list--${size}`,
    !showNumbers && 'snake-list--no-numbers',
    uppercase && 'snake-list--uppercase',
    interactive && 'snake-list--interactive',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <ul className={listClasses}>{items.map((item, index) => renderListItem(item, index))}</ul>;
};
