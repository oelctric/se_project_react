import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx';
import useForm from '../../hooks/useForm.js';

const initialValues = {
  name: '',
  imageUrl: '',
  weather: '',
};

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const { values, handleChange, handleReset } = useForm(initialValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddItem(values, handleReset);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="New garment"
      name="new-garment"
      buttonText="Add garment"
      onClose={onCloseModal}
      onSubmit={handleSubmit}
    >
      <div className="form__field">
        <label className="form__label" htmlFor="garment-name">
          Name
        </label>
        <input
          className="form__input"
          id="garment-name"
          type="text"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </div>
      <div className="form__field">
        <label className="form__label" htmlFor="garment-image">
          Image URL
        </label>
        <div className="form__image-row">
          <input
            className="form__input"
            id="garment-image"
            type="url"
            name="imageUrl"
            placeholder="Image URL"
            value={values.imageUrl}
            onChange={handleChange}
          />
          <img className="form__link-icon" src="/images/link.svg" alt="Link" />
        </div>
      </div>
      <div className="form__field">
        <p className="form__label form__label--standalone">
          Select the weather type:
        </p>
        <div className="form__radios">
          <label
            className={`form__radio ${
              values.weather === 'hot' ? 'form__radio_is-on' : ''
            }`}
          >
            <input
              className="form__radio-input"
              type="radio"
              name="weather"
              value="hot"
              checked={values.weather === 'hot'}
              onChange={handleChange}
            />
            <span>Hot</span>
          </label>
          <label
            className={`form__radio ${
              values.weather === 'warm' ? 'form__radio_is-on' : ''
            }`}
          >
            <input
              className="form__radio-input"
              type="radio"
              name="weather"
              value="warm"
              checked={values.weather === 'warm'}
              onChange={handleChange}
            />
            <span>Warm</span>
          </label>
          <label
            className={`form__radio ${
              values.weather === 'cold' ? 'form__radio_is-on' : ''
            }`}
          >
            <input
              className="form__radio-input"
              type="radio"
              name="weather"
              value="cold"
              checked={values.weather === 'cold'}
              onChange={handleChange}
            />
            <span>Cold</span>
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
}

export default AddItemModal;
