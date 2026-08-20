import './ItemModal.css';

function ItemModal({ isOpen, item, onClose, openConfirmationModal }) {
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
            className="modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            <img
              className="modal__close-icon"
              src="/images/close.svg"
              alt="Close"
            />
          </button>
          <div className="item-modal__image">
            <img
              className="item-modal__photo"
              src={item.imageUrl}
              alt={item.name}
            />
            <span className="item-pill">{item.name}</span>
          </div>
          <div className="item-modal__actions">
            <span className="item-modal__name">{item.name}</span>
            <span className="item-modal__weather">
              Weather: {item.weather.toLowerCase()}
            </span>
            <button
              type="button"
              className="item-modal__delete"
              onClick={() => openConfirmationModal(item)}
            >
              Delete item
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemModal;
