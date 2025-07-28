import React from 'react';
import './breadcrumb.css';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  /** Breadcrumb items */
  items: BreadcrumbItem[];
  /** Separator character */
  separator?: React.ReactNode;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Maximum items to display (0 = no limit) */
  maxItems?: number;
  /** Custom item renderer */
  renderItem?: (item: BreadcrumbItem, index: number, isLast: boolean) => React.ReactNode;
  /** Click handler for items */
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
  /** Additional CSS classes */
  className?: string;
}

/** Breadcrumb component for navigation hierarchy */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  size = 'medium',
  maxItems = 0,
  renderItem,
  onItemClick,
  className = '',
}) => {
  const breadcrumbClasses = [
    'snake-breadcrumb',
    `snake-breadcrumb--${size}`,
    className
  ].filter(Boolean).join(' ');

  const displayItems = React.useMemo(() => {
    if (maxItems === 0 || items.length <= maxItems) {
      return items;
    }

    const firstItem = items[0];
    const lastItems = items.slice(-(maxItems - 2));
    
    return [
      firstItem,
      { label: '...', href: undefined },
      ...lastItems
    ];
  }, [items, maxItems]);

  const handleClick = (item: BreadcrumbItem, index: number, e: React.MouseEvent) => {
    if (!item.href) {
      e.preventDefault();
    }
    onItemClick?.(item, index);
  };

  const defaultRenderItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
    const itemClasses = [
      'snake-breadcrumb__item',
      isLast && 'snake-breadcrumb__item--current',
      !item.href && 'snake-breadcrumb__item--disabled'
    ].filter(Boolean).join(' ');

    const content = (
      <>
        {item.icon && <span className="snake-breadcrumb__icon">{item.icon}</span>}
        <span className="snake-breadcrumb__text">{item.label}</span>
      </>
    );

    if (!isLast && item.href) {
      return (
        <a
          href={item.href}
          className={itemClasses}
          onClick={(e) => handleClick(item, index, e)}
        >
          {content}
        </a>
      );
    }

    return (
      <span className={itemClasses} aria-current={isLast ? 'page' : undefined}>
        {content}
      </span>
    );
  };

  return (
    <nav className={breadcrumbClasses} aria-label="Breadcrumb">
      <ol className="snake-breadcrumb__list">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          
          return (
            <li key={index} className="snake-breadcrumb__list-item">
              {renderItem ? renderItem(item, index, isLast) : defaultRenderItem(item, index, isLast)}
              {!isLast && (
                <span className="snake-breadcrumb__separator" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};