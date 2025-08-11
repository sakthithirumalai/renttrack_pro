import React, { useEffect, useRef } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Modal = ({ 
  isOpen = false, 
  onClose, 
  title, 
  children, 
  size = 'default',
  showCloseButton = true,
  closeOnOverlayClick = true,
  footer
}) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  const sizeClasses = {
    sm: 'max-w-md',
    default: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      
      // Focus the modal
      setTimeout(() => {
        if (modalRef?.current) {
          modalRef?.current?.focus();
        }
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
      
      // Return focus to previous element
      if (previousFocusRef?.current) {
        previousFocusRef?.current?.focus();
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e?.key === 'Escape' && onClose) {
      onClose();
    }

    // Trap focus within modal
    if (e?.key === 'Tab') {
      const focusableElements = modalRef?.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabIndex="-1"])'
      );
      
      if (focusableElements && focusableElements?.length > 0) {
        const firstElement = focusableElements?.[0];
        const lastElement = focusableElements?.[focusableElements?.length - 1];

        if (e?.shiftKey && document.activeElement === firstElement) {
          e?.preventDefault();
          lastElement?.focus();
        } else if (!e?.shiftKey && document.activeElement === lastElement) {
          e?.preventDefault();
          firstElement?.focus();
        }
      }
    }
  };

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e?.target === e?.currentTarget && onClose) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-1100 animate-fade-in"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div 
        ref={modalRef}
        className={`
          bg-popover rounded-lg shadow-modal w-full ${sizeClasses?.[size]}
          max-h-[90vh] flex flex-col animate-scale-in
        `}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-border">
            {title && (
              <h2 id="modal-title" className="text-lg font-semibold text-popover-foreground">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="ml-auto"
                aria-label="Close modal"
              >
                <Icon name="X" size={20} />
              </Button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;