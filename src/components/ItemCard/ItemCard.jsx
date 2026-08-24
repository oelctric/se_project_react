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
            <img
              className="item-card__like-icon"
              src={
                isLiked
                  ? '/images/heart-filled.svg'
                  : '/images/heart-outline.svg'
              }
              alt={isLiked ? 'Liked' : 'Not liked'}
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemCard;
