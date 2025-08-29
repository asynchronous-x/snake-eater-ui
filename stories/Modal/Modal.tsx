import React, { useEffect, useRef } from 'react';
import './modal.css';

// Icon component for Times from pixel-icon-library
const TimesIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <polygon points="15 13 16 13 16 14 17 14 17 15 18 15 18 16 19 16 19 17 20 17 20 18 21 18 21 19 22 19 22 20 21 20 21 21 20 21 20 22 19 22 19 21 18 21 18 20 17 20 17 19 16 19 16 18 15 18 15 17 14 17 14 16 13 16 13 15 11 15 11 16 10 16 10 17 9 17 9 18 8 18 8 19 7 19 7 20 6 20 6 21 5 21 5 22 4 22 4 21 3 21 3 20 2 20 2 19 3 19 3 18 4 18 4 17 5 17 5 16 6 16 6 15 7 15 7 14 8 14 8 13 9 13 9 11 8 11 8 10 7 10 7 9 6 9 6 8 5 8 5 7 4 7 4 6 3 6 3 5 2 5 2 4 3 4 3 3 4 3 4 2 5 2 5 3 6 3 6 4 7 4 7 5 8 5 8 6 9 6 9 7 10 7 10 8 11 8 11 9 13 9 13 8 14 8 14 7 15 7 15 6 16 6 16 5 17 5 17 4 18 4 18 3 19 3 19 2 20 2 20 3 21 3 21 4 22 4 22 5 21 5 21 6 20 6 20 7 19 7 19 8 18 8 18 9 17 9 17 10 16 10 16 11 15 11 15 13" />
  </svg>
);

export interface ModalProps {
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
                <TimesIcon />
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
