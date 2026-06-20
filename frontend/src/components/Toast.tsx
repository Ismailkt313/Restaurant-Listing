import React, { useEffect, useState } from 'react';
import './Toast.css';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: number) => void;
}

const ICONS = {
  success: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15"/>
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15"/>
      <path d="m15 9-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15"/>
      <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: number) => void }> = ({
  toast,
  onDismiss,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(toast.id), 300);
    }, 3800);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div
      className={`toast toast--${toast.type} ${visible ? 'toast--visible' : ''}`}
      role="alert"
      aria-live="polite"
    >
      <span className="toast__icon">{ICONS[toast.type]}</span>
      <span className="toast__message">{toast.message}</span>
      <button
        className="toast__close"
        onClick={() => {
          setVisible(false);
          setTimeout(() => onDismiss(toast.id), 300);
        }}
        aria-label="Dismiss notification"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m18 6-12 12M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
};

const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-label="Notifications">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

export default Toast;
