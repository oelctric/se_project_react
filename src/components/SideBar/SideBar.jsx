import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import './SideBar.css';

function SideBar({ onEditProfile, onLogOut }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="side-bar">
      <div className="side-bar__row">
        {currentUser.avatar ? (
          <img
            className="side-bar__avatar"
            src={currentUser.avatar}
            alt={currentUser.name}
          />
        ) : (
          <span className="side-bar__avatar side-bar__avatar_placeholder">
            {currentUser.name.charAt(0).toUpperCase()}
          </span>
        )}
        <h2 className="side-bar__name">{currentUser.name}</h2>
      </div>
      <div className="side-bar__data">
        <button
          type="button"
          className="side-bar__action"
          onClick={onEditProfile}
        >
          Change profile data
        </button>
        <button type="button" className="side-bar__action" onClick={onLogOut}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
