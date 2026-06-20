import React, { useState, useEffect } from 'react';
import type { Restaurant, RestaurantFormData, ValidationErrors, FormMode } from '../types';
import './RestaurantForm.css';

interface RestaurantFormProps {
  mode: FormMode;
  editingRestaurant: Restaurant | null;
  onSubmit: (data: RestaurantFormData) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

const EMPTY: RestaurantFormData = { name: '', address: '', contact_number: '', email: '' };

function validate(d: RestaurantFormData): ValidationErrors {
  const e: ValidationErrors = {};
  if (!d.name.trim()) e.name = 'Restaurant name is required.';
  else if (d.name.trim().length < 2) e.name = 'Name must be at least 2 characters.';
  if (!d.address.trim()) e.address = 'Address is required.';
  else if (d.address.trim().length < 5) e.address = 'Address must be at least 5 characters.';
  if (!d.contact_number.trim()) e.contact_number = 'Phone number is required.';
  else if (!/^[\d\s\-+().]{5,20}$/.test(d.contact_number.trim()))
    e.contact_number = 'Enter a valid phone number (5–20 characters).';
  if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email))
    e.email = 'Enter a valid email address.';
  return e;
}

const Field: React.FC<{
  id: string;
  label: string;
  required?: boolean;
  icon: React.ReactNode;
  error?: string;
  touched?: boolean;
  children: React.ReactNode;
}> = ({ id, label, required, icon, error, touched, children }) => (
  <div className={`rfield ${error && touched ? 'rfield--error' : ''}`}>
    <label htmlFor={id} className="rfield__label">
      {label}
      {required && <span className="rfield__req" aria-label="required">*</span>}
      {!required && <span className="rfield__opt">optional</span>}
    </label>
    <div className="rfield__wrap">
      <span className="rfield__icon" aria-hidden="true">{icon}</span>
      {children}
    </div>
    {error && touched && (
      <p className="rfield__error" role="alert">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <line x1="12" y1="8" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="17" r="1" fill="currentColor" />
        </svg>
        {error}
      </p>
    )}
  </div>
);

const RestaurantForm: React.FC<RestaurantFormProps> = ({
  mode, editingRestaurant, onSubmit, onCancel, isLoading,
}) => {
  const [form, setForm] = useState<RestaurantFormData>(EMPTY);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (mode === 'edit' && editingRestaurant) {
      setForm({
        name: editingRestaurant.name || '',
        address: editingRestaurant.address || '',
        contact_number: editingRestaurant.contact_number || '',
        email: editingRestaurant.email || '',
      });
    } else {
      setForm(EMPTY);
    }
    setErrors({});
    setTouched({});
  }, [mode, editingRestaurant]);

  const handleChange = (field: keyof RestaurantFormData, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field]) setErrors(validate(next));
  };

  const handleBlur = (field: keyof RestaurantFormData) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(EMPTY).map((k) => [k, true]));
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    await onSubmit(form);
    if (mode === 'create') { setForm(EMPTY); setTouched({}); }
  };

  const isEdit = mode === 'edit';

  return (
    <form className="rform" onSubmit={handleSubmit} noValidate>

      <div className="rform__grid">

        <Field
          id="rf-name" label="Restaurant Name" required
          icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          error={errors.name} touched={touched.name}
        >
          <input
            id="rf-name" type="text" className="rfield__input"
            placeholder="e.g. The Golden Fork"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            disabled={isLoading}
            autoComplete="off"
          />
        </Field>

        <Field
          id="rf-address" label="Address" required
          icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" /></svg>}
          error={errors.address} touched={touched.address}
        >
          <input
            id="rf-address" type="text" className="rfield__input"
            placeholder="e.g. 123 Main Street, New York"
            value={form.address}
            onChange={(e) => handleChange('address', e.target.value)}
            onBlur={() => handleBlur('address')}
            disabled={isLoading}
            autoComplete="off"
          />
        </Field>

        <Field
          id="rf-phone" label="Phone Number" required
          icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          error={errors.contact_number} touched={touched.contact_number}
        >
          <input
            id="rf-phone" type="tel" className="rfield__input"
            placeholder="e.g. +1 555-000-0000"
            value={form.contact_number}
            onChange={(e) => handleChange('contact_number', e.target.value)}
            onBlur={() => handleBlur('contact_number')}
            disabled={isLoading}
            autoComplete="off"
          />
        </Field>

        <Field
          id="rf-email" label="Email Address"
          icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          error={errors.email} touched={touched.email}
        >
          <input
            id="rf-email" type="email" className="rfield__input"
            placeholder="e.g. contact@restaurant.com"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            disabled={isLoading}
            autoComplete="off"
          />
        </Field>

      </div>

      {/* Footer actions */}
      <div className="rform__footer">
        <button type="button" className="rform__btn rform__btn--ghost" onClick={onCancel} disabled={isLoading}>
          Cancel
        </button>
        <button
          id="rform-submit"
          type="submit"
          className="rform__btn rform__btn--primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <><span className="rform__spinner" aria-hidden="true" />{isEdit ? 'Saving…' : 'Adding…'}</>
          ) : isEdit ? (
            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><polyline points="17,21 17,13 7,13 7,21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><polyline points="7,3 7,8 15,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>Save Changes</>
          ) : (
            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>Add Restaurant</>
          )}
        </button>
      </div>

    </form>
  );
};

export default RestaurantForm;
