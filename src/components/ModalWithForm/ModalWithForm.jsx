import './ModalWithForm.css';

function ModalWithForm({ isOpen, title, name, buttonText, onClose, children }) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? 'modal_is-opened' : ''}`}
      onClick={onClose}
    >
      <div
        className="modal__content"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <img src="/images/close.svg" alt="Close" />
        </button>
        <h2 className="modal__title">{title}</h2>
        <form name={name} onSubmit={handleSubmit}>
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
