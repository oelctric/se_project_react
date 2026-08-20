import './DeleteConfirmationModal.css';

function DeleteConfirmationModal({ isOpen, handleCardDelete, onCloseModal }) {
  return (
    <div
      className={`modal modal_type_delete-confirmation ${
        isOpen ? 'modal_is-opened' : ''
      }`}
      onClick={onCloseModal}
    >
      <div
        className="modal__content"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal__close"
          onClick={onCloseModal}
          aria-label="Close"
        >
          <img src="/images/close.svg" alt="Close" />
        </button>
        <h2 className="confirmation__title">
          Are you sure you want to delete this item?
        </h2>
        <p className="confirmation__description">
          This action is irreversible.
        </p>
        <div className="confirmation__buttons">
          <button
            type="button"
            className="confirmation__confirm"
            onClick={handleCardDelete}
          >
            Yes, delete item
          </button>
          <button
            type="button"
            className="confirmation__cancel"
            onClick={onCloseModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
