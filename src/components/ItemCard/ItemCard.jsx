import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import './ItemCard.css';

function ItemCard({ item, onClick, onLike }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const isLiked = isLoggedIn && item.likes.some((id) => id === currentUser._id);

  const handleLike = (event) => {
    event.stopPropagation();
    onLike({ id: item._id, isLiked });
  };

  return (
    <div
      className="item-card"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          onClick();
        }
      }}
    >
      <img className="item-card__image" src={item.imageUrl} alt={item.name} />
      <div className="item-card__tag">
        <span className="item-pill">{item.name}</span>
        {isLoggedIn && (
          <button
            type="button"
            className="item-card__like"
            onClick={handleLike}
            aria-label={isLiked ? 'Unlike item' : 'Like item'}
          >
            <svg
              className="item-card__like-icon"
              width="18"
              height="15"
              viewBox="0 0 18 15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={`item-card__like-path ${
                  isLiked ? 'item-card__like-path_liked' : ''
                }`}
                d="M9 14.25L7.7325 13.098C3.1275 8.925 0.075 6.15 0.075 2.775C0.075 0.9975 1.5225 0 3 0C4.1025 0 5.175 0.6675 5.5875 1.6425H12.4125C12.825 0.6675 13.8975 0 15 0C16.4775 0 17.925 0.9975 17.925 2.775C17.925 6.15 14.8725 8.925 10.2675 13.098L9 14.25Z"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemCard;
