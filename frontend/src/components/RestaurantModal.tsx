import React, { useEffect, useRef } from 'react';
import type { Restaurant, RestaurantFormData, FormMode } from '../types';
import RestaurantForm from './RestaurantForm';
import './RestaurantModal.css';

interface RestaurantModalProps {
  isOpen: boolean;
  mode: FormMode;
  editingRestaurant: Restaurant | null;
  onSubmit: (data: RestaurantFormData) => Promise<void>;
  onClose: () => void;
  isLoading: boolean;
}

const RestaurantModal: React.FC<RestaurantModalProps> = ({
  isOpen,
  mode,
  editingRestaurant,
  onSubmit,
  onClose,
  isLoading,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Trap focus and handle Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    // Auto-focus first input inside modal
    const firstInput = dialogRef.current?.querySelector<HTMLElement>('input');
    setTimeout(() => firstInput?.focus(), 80);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="rmodal-overlay"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="rmodal"
        role="dialog"
        aria-modal="true"
        aria-label={mode === 'edit' ? `Edit ${editingRestaurant?.name ?? 'Restaurant'}` : 'Add New Restaurant'}
      >
        {/* Modal Header */}
        <div className="rmodal__header">
          <div className="rmodal__header-left">
            <div className={`rmodal__icon ${mode === 'edit' ? 'rmodal__icon--edit' : 'rmodal__icon--add'}`}>
              {mode === 'edit' ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <div>
              <h2 className="rmodal__title">
                {mode === 'edit' ? 'Edit Restaurant' : 'Add Restaurant'}
              </h2>
              <p className="rmodal__subtitle">
                {mode === 'edit'
                  ? `Updating details for ${editingRestaurant?.name}`
                  : 'Fill in the details to add a new listing'}
              </p>
            </div>
          </div>
          <button
            className="rmodal__close"
            onClick={onClose}
            disabled={isLoading}
            aria-label="Close modal"
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m18 6-12 12M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Modal Body — Form */}
        <div className="rmodal__body">
          <RestaurantForm
            mode={mode}
            editingRestaurant={editingRestaurant}
            onSubmit={onSubmit}
            onCancel={onClose}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantModal;
