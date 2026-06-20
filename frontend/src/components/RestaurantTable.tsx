import React from 'react';
import type { Restaurant } from '../types';
import './RestaurantTable.css';

interface RestaurantTableProps {
  restaurants: Restaurant[];
  isLoading: boolean;
  onAdd: () => void;
  onEdit: (restaurant: Restaurant) => void;
  onDelete: (restaurant: Restaurant) => void;
  searchQuery: string;
}

/* Deterministic avatar color from name */
const COLORS = ['#1565c0','#6a1b9a','#00695c','#e65100','#b71c1c','#37474f','#558b2f','#4527a0'];
const avatarColor = (name: string) => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return COLORS[Math.abs(h) % COLORS.length];
};
const initials = (name: string) =>
  name.split(' ').slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('');

const fmtDate = (d?: string) =>
  d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';

/* Skeleton row */
const SkeletonRow = () => (
  <tr className="rt__row">
    {[200, 220, 130, 160, 90, 100].map((w, i) => (
      <td key={i} className="rt__td">
        <span className="rt__skeleton" style={{ width: w }} />
      </td>
    ))}
  </tr>
);

const RestaurantTable: React.FC<RestaurantTableProps> = ({
  restaurants, isLoading, onAdd, onEdit, onDelete, searchQuery,
}) => {
  const empty = !isLoading && restaurants.length === 0;

  return (
    <div className="rt">

      {/* Toolbar */}
      <div className="rt__toolbar">
        <div className="rt__toolbar-left">
          <h2 className="rt__toolbar-title">Restaurants</h2>
          {!isLoading && (
            <span className="rt__count">{restaurants.length}</span>
          )}
        </div>
        <button
          id="add-restaurant-btn"
          className="rt__add-btn"
          onClick={onAdd}
          type="button"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          Add Restaurant
        </button>
      </div>

      {/* Table */}
      <div className="rt__scroll">
        <table className="rt__table" aria-label="Restaurant listings">
          <thead>
            <tr className="rt__head-row">
              <th className="rt__th" style={{ width: 240 }}>Restaurant</th>
              <th className="rt__th">Address</th>
              <th className="rt__th" style={{ width: 150 }}>Phone</th>
              <th className="rt__th" style={{ width: 190 }}>Email</th>
              <th className="rt__th" style={{ width: 110 }}>Added</th>
              <th className="rt__th rt__th--right" style={{ width: 120 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            ) : empty ? (
              <tr>
                <td colSpan={6} className="rt__empty-td">
                  <div className="rt__empty">
                    <div className="rt__empty-icon" aria-hidden="true">
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="rt__empty-title">
                      {searchQuery ? `No results for "${searchQuery}"` : 'No restaurants yet'}
                    </p>
                    <p className="rt__empty-desc">
                      {searchQuery
                        ? 'Try a different search term.'
                        : 'Click "Add Restaurant" to create your first listing.'}
                    </p>
                    {!searchQuery && (
                      <button className="rt__empty-btn" onClick={onAdd} type="button">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                        Add Restaurant
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              restaurants.map((r) => (
                <tr key={r.id} className="rt__row">
                  {/* Name */}
                  <td className="rt__td">
                    <div className="rt__restaurant">
                      <div className="rt__avatar" style={{ background: avatarColor(r.name) }} aria-hidden="true">
                        {initials(r.name)}
                      </div>
                      <div className="rt__restaurant-text">
                        <span className="rt__name">{r.name}</span>
                        <span className="rt__id">#{r.id.slice(0, 8).toUpperCase()}</span>
                      </div>
                    </div>
                  </td>

                  {/* Address */}
                  <td className="rt__td">
                    <span className="rt__cell-text">{r.address}</span>
                  </td>

                  {/* Phone */}
                  <td className="rt__td">
                    <span className="rt__badge">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 2.92 4.72L6 2.01a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7 9.91" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      {r.contact_number}
                    </span>
                  </td>

                  {/* Email */}
                  <td className="rt__td">
                    {r.email
                      ? <a href={`mailto:${r.email}`} className="rt__email">{r.email}</a>
                      : <span className="rt__muted">—</span>}
                  </td>

                  {/* Date */}
                  <td className="rt__td">
                    <span className="rt__muted">{fmtDate(r.createdAt)}</span>
                  </td>

                  {/* Actions */}
                  <td className="rt__td rt__td--right">
                    <div className="rt__actions">
                      <button
                        className="rt__action rt__action--edit"
                        onClick={() => onEdit(r)}
                        aria-label={`Edit ${r.name}`}
                        title="Edit"
                        type="button"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Edit
                      </button>
                      <button
                        className="rt__action rt__action--delete"
                        onClick={() => onDelete(r)}
                        aria-label={`Delete ${r.name}`}
                        title="Delete"
                        type="button"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {!empty && !isLoading && (
        <div className="rt__footer">
          <span className="rt__footer-text">
            {restaurants.length} {restaurants.length === 1 ? 'restaurant' : 'restaurants'}
            {searchQuery && ' found'}
          </span>
        </div>
      )}
    </div>
  );
};

export default RestaurantTable;
