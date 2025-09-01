import React, { useState, useRef, useEffect } from 'react';
import { ErrorBoundary } from '../utils/ErrorBoundary';
import './menu.css';

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
  submenu?: MenuItem[];
}

export interface MenuProps {
  /** Menu items */
  items: MenuItem[];
  /** Trigger element */
  trigger?: React.ReactNode;
  /** Open state (controlled mode) */
  isOpen?: boolean;
  /** Open state change handler */
  onOpenChange?: (open: boolean) => void;
  /** Menu placement */
  placement?:
    | 'bottom-start'
    | 'bottom-end'
    | 'top-start'
    | 'top-end'
    | 'right-start'
    | 'left-start';
  /** Menu size */
  size?: 'small' | 'medium' | 'large';
  /** Click handler */
  onItemClick?: (itemId: string) => void;
  /** Show arrow */
  showArrow?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/** Menu component for dropdown navigation */
const MenuComponent: React.FC<MenuProps> = ({
  items,
  trigger,
  isOpen: controlledIsOpen,
  onOpenChange,
  placement = 'bottom-start',
  size = 'medium',
  onItemClick,
  showArrow = false,
  className = '',
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (open: boolean) => {
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(open);
    }
    onOpenChange?.(open);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setActiveSubmenu(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setActiveSubmenu(null);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen]);

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setActiveSubmenu(null);
    }
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.disabled || item.divider) return;

    if (item.submenu) {
      setActiveSubmenu(activeSubmenu === item.id ? null : item.id);
    } else {
      onItemClick?.(item.id);
      setIsOpen(false);
      setActiveSubmenu(null);
    }
  };

  const renderMenuItem = (item: MenuItem, isSubmenuItem = false) => {
    if (item.divider) {
      return <div key={item.id} className="snake-menu__divider" />;
    }

    const itemClasses = [
      'snake-menu__item',
      item.disabled && 'snake-menu__item--disabled',
      item.danger && 'snake-menu__item--danger',
      item.submenu && 'snake-menu__item--has-submenu',
      activeSubmenu === item.id && 'snake-menu__item--submenu-open',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div key={item.id} className="snake-menu__item-wrapper">
        <button
          className={itemClasses}
          onClick={() => handleItemClick(item)}
          disabled={item.disabled}
        >
          {item.icon && <span className="snake-menu__item-icon">{item.icon}</span>}
          <span className="snake-menu__item-label">{item.label}</span>
          {item.shortcut && <span className="snake-menu__item-shortcut">{item.shortcut}</span>}
          {item.submenu && <span className="snake-menu__item-arrow">▶</span>}
        </button>

        {item.submenu && activeSubmenu === item.id && (
          <div
            className={`snake-menu__submenu snake-menu__submenu--${isSubmenuItem ? 'nested' : 'root'}`}
          >
            {item.submenu.map((subItem) => renderMenuItem(subItem, true))}
          </div>
        )}
      </div>
    );
  };

  const menuClasses = [
    'snake-menu',
    `snake-menu--${size}`,
    `snake-menu--${placement}`,
    isOpen && 'snake-menu--open',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="snake-menu__container">
      {trigger && (
        <div ref={triggerRef} className="snake-menu__trigger" onClick={handleTriggerClick}>
          {trigger}
        </div>
      )}

      {isOpen && (
        <div ref={menuRef} className={menuClasses} role="menu">
          {showArrow && <div className="snake-menu__arrow" />}
          <div className="snake-menu__content">{items.map((item) => renderMenuItem(item))}</div>
          <div className="snake-menu__corner snake-menu__corner--top-left" />
          <div className="snake-menu__corner snake-menu__corner--top-right" />
          <div className="snake-menu__corner snake-menu__corner--bottom-left" />
          <div className="snake-menu__corner snake-menu__corner--bottom-right" />
        </div>
      )}
    </div>
  );
};

/** Menu with error boundary */
export const Menu: React.FC<MenuProps> = (props) => {
  return (
    <ErrorBoundary componentName="Menu" resetOnPropsChange>
      <MenuComponent {...props} />
    </ErrorBoundary>
  );
};
