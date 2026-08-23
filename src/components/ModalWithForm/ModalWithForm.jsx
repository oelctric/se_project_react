import './ModalWithForm.css';

function ModalWithForm({
  isOpen,
  title,
  name,
  buttonText,
  onClose,
  onSubmit,
  children,
  afterSubmit,
  isSubmitDisabled,
}) {
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
          <img
            className="modal__close-icon"
            src="/images/close.svg"
            alt="Close"
          />
        </button>
        <h2 className="modal__title">{title}</h2>
        <form name={name} onSubmit={onSubmit}>
          {children}
          <div className="modal__submit-row">
            <button
              type="submit"
              className="modal__submit"
              disabled={isSubmitDisabled}
            >
              {buttonText}
            </button>
            {afterSubmit}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
