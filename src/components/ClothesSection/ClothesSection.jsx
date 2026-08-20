import ItemCard from '../ItemCard/ItemCard.jsx';
import './ClothesSection.css';

function ClothesSection({ clothingItems, onAddNewGarment, onCardClick }) {
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
        {clothingItems.map((item) => (
          <li className="clothes-section__card" key={item._id}>
            <ItemCard item={item} onClick={() => onCardClick(item)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
