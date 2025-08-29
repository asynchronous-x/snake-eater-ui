import React, { useEffect, useRef } from 'react';
import './drawer.css';

export interface DrawerProps {
  /** Whether the drawer is open */
  open: boolean;
  /** Callback when the drawer should close */
  onClose: () => void;
  /** Position of the drawer */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /** Size of the drawer */
  size?: 'small' | 'medium' | 'large' | 'full';
  /** Content of the drawer */
  children: React.ReactNode;
  /** Whether to show overlay */
  overlay?: boolean;
  /** Whether clicking overlay closes drawer */
  closeOnOverlayClick?: boolean;
  /** Header content */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether to lock body scroll when open */
  lockScroll?: boolean;
}

/** Drawer component for slide-in panels */
export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  position = 'right',
  size = 'medium',
  children,
  overlay = true,
  closeOnOverlayClick = true,
  header,
  footer,
  className = '',
  lockScroll = true,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (lockScroll && open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [lockScroll, open]);

  // Focus trap
  useEffect(() => {
    if (open && drawerRef.current) {
      const focusableElements = drawerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleTab);
      firstElement?.focus();

      return () => {
        document.removeEventListener('keydown', handleTab);
      };
    }
  }, [open]);

  const drawerClasses = [
    'snake-drawer',
    `snake-drawer--${position}`,
    `snake-drawer--${size}`,
    open && 'snake-drawer--open',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      {overlay && (
        <div
          className={`snake-drawer__overlay ${open ? 'snake-drawer__overlay--visible' : ''}`}
          onClick={closeOnOverlayClick ? onClose : undefined}
          aria-hidden="true"
        />
      )}
      <div
        ref={drawerRef}
        className={drawerClasses}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <button className="snake-drawer__close" onClick={onClose} aria-label="Close drawer">
          ×
        </button>

        {header && <div className="snake-drawer__header">{header}</div>}

        <div className="snake-drawer__content">{children}</div>

        {footer && <div className="snake-drawer__footer">{footer}</div>}
      </div>
    </>
  );
};
