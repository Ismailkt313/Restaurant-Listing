import React from 'react';
import './Navbar.css';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, onSearchChange, totalCount }) => {
  return (
    <header className="navbar" role="banner">
      <div className="navbar__inner">

        {/* Brand */}
        <div className="navbar__brand">
          <div className="navbar__logo" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 11l19-9-9 19-2-8-8-2z" fill="white" />
            </svg>
          </div>
          <div className="navbar__brand-text">
            <span className="navbar__brand-name">RestaurantHub</span>
            <span className="navbar__brand-sep" aria-hidden="true">/</span>
            <span className="navbar__brand-section">Management</span>
          </div>
        </div>

        {/* Search */}
        <div className="navbar__search">
          <svg className="navbar__search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            id="restaurant-search"
            type="search"
            className="navbar__search-input"
            placeholder={`Search ${totalCount} restaurants…`}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search restaurants"
          />
          {searchQuery && (
            <button
              className="navbar__search-clear"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              type="button"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m18 6-12 12M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Right */}
        <div className="navbar__right">
          <div className="navbar__divider" aria-hidden="true" />
          <div className="navbar__avatar" aria-label="Signed in as Admin" title="Admin">
            <span aria-hidden="true">A</span>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
