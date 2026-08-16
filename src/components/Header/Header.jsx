import { useState } from 'react';
import './Header.css';

function Header({ weather, onOpenNewGarmentModal }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened((prev) => !prev);
  };

  const handleAddClothes = () => {
    setIsMobileMenuOpened(false);
    onOpenNewGarmentModal();
  };

  return (
    <header className="header">
      <div className="header__row">
        <span className="header__logo">wtwr°</span>
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
            alt=""
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
          <button
            type="button"
            className="header__add"
            onClick={handleAddClothes}
          >
            + Add clothes
          </button>
          <span className="header__name">omar</span>
          <img
            className="header__avatar"
            src="/images/avatar.png"
            alt="User avatar"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
