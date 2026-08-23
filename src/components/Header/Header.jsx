import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch.jsx';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import './Header.css';

function Header({
  weather,
  onOpenNewGarmentModal,
  onOpenLoginModal,
  onOpenRegisterModal,
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
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

  const handleOpenLogin = () => {
    setIsMobileMenuOpen(false);
    onOpenLoginModal();
  };

  const handleOpenRegister = () => {
    setIsMobileMenuOpen(false);
    onOpenRegisterModal();
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
          {isLoggedIn ? (
            <>
              <button
                type="button"
                className="header__add"
                onClick={handleAddClothes}
              >
                + Add clothes
              </button>
              <Link
                className="header__profile"
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="header__name">{currentUser.name}</span>
                {currentUser.avatar ? (
                  <img
                    className="header__avatar"
                    src={currentUser.avatar}
                    alt={currentUser.name}
                  />
                ) : (
                  <span className="header__avatar header__avatar_placeholder">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </Link>
            </>
          ) : (
            <>
              <button
                type="button"
                className="header__auth-link"
                onClick={handleOpenRegister}
              >
                Sign Up
              </button>
              <button
                type="button"
                className="header__auth-link"
                onClick={handleOpenLogin}
              >
                Log In
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
