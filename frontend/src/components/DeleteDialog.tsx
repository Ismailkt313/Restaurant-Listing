import React, { useEffect } from 'react';
import type { Restaurant } from '../types';
import './DeleteDialog.css';

interface DeleteDialogProps {
  restaurant: Restaurant | null;
  isOpen: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  restaurant,
  isOpen,
  isLoading,
  onConfirm,
  onCancel,
}) => {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) onCancel();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen || !restaurant) return null;

  return (
    <div
      className="dialog-overlay"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) onCancel();
      }}
      aria-hidden={!isOpen}
    >
      <div
        className="dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-desc"
      >
        {/* Warning Icon */}
        <div className="dialog__icon-wrap">
          <div className="dialog__icon-ring">
            <div className="dialog__icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="currentColor" opacity="0.15"/>
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="dialog__content">
          <h3 id="dialog-title" className="dialog__title">
            Delete Restaurant
          </h3>
          <p id="dialog-desc" className="dialog__desc">
            Are you sure you want to permanently delete{' '}
            <strong className="dialog__restaurant-name">"{restaurant.name}"</strong>?
          </p>
          <div className="dialog__warning">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            This action cannot be undone. All data associated with this restaurant will be permanently removed.
          </div>
        </div>

        {/* Divider */}
        <div className="dialog__divider" aria-hidden="true"></div>

        {/* Actions */}
        <div className="dialog__actions">
          <button
            id="dialog-cancel-btn"
            type="button"
            className="dialog__btn dialog__btn--cancel"
            onClick={onCancel}
            disabled={isLoading}
            autoFocus
          >
            Cancel
          </button>
          <button
            id="dialog-confirm-btn"
            type="button"
            className={`dialog__btn dialog__btn--danger ${isLoading ? 'dialog__btn--loading' : ''}`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="dialog__spinner" aria-hidden="true"></span>
                Deleting...
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Delete Restaurant
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
