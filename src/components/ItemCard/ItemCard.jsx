import './ItemCard.css';

function ItemCard({ item, onClick }) {
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
      <span className="item-pill">{item.name}</span>
    </div>
  );
}

export default ItemCard;
