import React, { useEffect, useRef } from 'react';
import { Button } from './Button';
import './modal.css';

interface ModalProps {
  /** Modal visibility */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal content */
  children: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Size variant */
  size?: 'small' | 'medium' | 'large' | 'full';
  /** Close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Show close button */
  showCloseButton?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/** Modal/Dialog component with dark theme styling */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
  closeOnOverlayClick = true,
  showCloseButton = true,
  className = '',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalClasses = ['snake-modal', `snake-modal--${size}`, className].filter(Boolean).join(' ');

  return (
    <div className="snake-modal-overlay" onClick={handleOverlayClick}>
      <div className={modalClasses} ref={modalRef}>
        {(title || showCloseButton) && (
          <div className="snake-modal__header">
            {title && <h2 className="snake-modal__title">{title}</h2>}
            {showCloseButton && (
              <button
                type="button"
                className="snake-modal__close"
                onClick={onClose}
                aria-label="Close modal"
              >
                ✕
              </button>
            )}
          </div>
        )}

        <div className="snake-modal__content">{children}</div>

        {footer && <div className="snake-modal__footer">{footer}</div>}

        <div className="snake-modal__corner snake-modal__corner--top-left" />
        <div className="snake-modal__corner snake-modal__corner--top-right" />
        <div className="snake-modal__corner snake-modal__corner--bottom-left" />
        <div className="snake-modal__corner snake-modal__corner--bottom-right" />
      </div>
    </div>
  );
};
