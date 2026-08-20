import { useState } from 'react';
import { Link } from 'react-router-dom';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch.jsx';
import './Header.css';

function Header({ weather, onOpenNewGarmentModal }) {
  const [isMobileMenuOpened, setIsMobileMenuOpen] = useState(false);

  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleAddClothes = () => {
    setIsMobileMenuOpen(false);
    onOpenNewGarmentModal();
  };

  return (
    <header
      className={`header ${isMobileMenuOpened ? 'header_is-menu-opened' : ''}`}
    >
      <div className="header__row">
        <Link className="header__logo" to="/">
          wtwr°
        </Link>
        <button
          type="button"
          className="header__menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpened}
        >
          <img
            className="header__icon"
            src={
              isMobileMenuOpened
                ? '/images/menu-close.svg'
                : '/images/burger.svg'
            }
            alt="Menu"
          />
        </button>
        <span className="header__date">
          {currentDate}, {weather.location}
        </span>
        <div
          className={`header__nav ${
            isMobileMenuOpened ? 'header__nav_is-opened' : ''
          }`}
        >
          <ToggleSwitch />
          <button
            type="button"
            className="header__add"
            onClick={handleAddClothes}
          >
            + Add clothes
          </button>
          <Link className="header__profile" to="/profile">
            <span className="header__name">omar</span>
            <img
              className="header__avatar"
              src="/images/avatar.png"
              alt="User avatar"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
