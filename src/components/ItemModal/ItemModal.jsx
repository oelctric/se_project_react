import './ItemModal.css';

function ItemModal({ isOpen, item, onClose }) {
  return (
    <div
      className={`modal modal_type_selected-item ${isOpen ? 'modal_is-opened' : ''}`}
      onClick={onClose}
    >
      {item && (
        <div
          className="item-modal"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            className="item-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            <img src="/images/close.svg" alt="Close" />
          </button>
          <div className="item-modal__image">
            <img src={item.link} alt={item.name} />
            <span className="item-modal__pill">{item.name}</span>
          </div>
          <p className="item-modal__weather">Weather: {item.weather}</p>
        </div>
      )}
    </div>
  );
}

export default ItemModal;
