import { useContext } from 'react';
import ItemCard from '../ItemCard/ItemCard.jsx';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import './ClothesSection.css';

function ClothesSection({
  clothingItems,
  onAddNewGarment,
  onCardClick,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const ownItems = clothingItems.filter(
    (item) => currentUser && item.owner === currentUser._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__heading">
        <h2 className="clothes-section__title">Your items</h2>
        <button
          type="button"
          className="clothes-section__add"
          onClick={onAddNewGarment}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__cards">
        {ownItems.map((item) => (
          <li className="clothes-section__card" key={item._id}>
            <ItemCard
              item={item}
              onClick={() => onCardClick(item)}
              onLike={onCardLike}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
