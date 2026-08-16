import { useState, useEffect } from 'react';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx';
import ItemModal from '../ItemModal/ItemModal.jsx';
import { defaultClothingItems } from '../../utils/clothingItems.js';
import { getWeatherData } from '../../utils/weatherApi.js';
import { COORDINATES } from '../../utils/constants.js';
import './App.css';

const FALLBACK_WEATHER = {
  temperature: 75,
  location: 'New York',
  icon: '01d',
};

function App() {
  const [clothingItems] = useState(defaultClothingItems);
  const [weather, setWeather] = useState(FALLBACK_WEATHER);
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const loadWeather = (latitude, longitude) => {
      getWeatherData(latitude, longitude)
        .then(setWeather)
        .catch(() => setWeather(FALLBACK_WEATHER));
    };

    const loadDefaultLocation = () =>
      loadWeather(COORDINATES.latitude, COORDINATES.longitude);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          loadWeather(position.coords.latitude, position.coords.longitude),
        loadDefaultLocation,
        { timeout: 10000 }
      );
    } else {
      loadDefaultLocation();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveModal('');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenNewGarmentModal = () => setActiveModal('new-garment');

  const handleOpenItemModal = (item) => {
    setSelectedCard(item);
    setActiveModal('selected-item');
  };

  const handleCloseModal = () => setActiveModal('');

  return (
    <div className="app">
      <Header
        weather={weather}
        onOpenNewGarmentModal={handleOpenNewGarmentModal}
      />
      <Main
        weather={weather}
        clothingItems={clothingItems}
        onCardClick={handleOpenItemModal}
      />
      <Footer />
      <ModalWithForm
        isOpen={activeModal === 'new-garment'}
        title="New garment"
        name="new-garment"
        buttonText="Add garment"
        onClose={handleCloseModal}
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
              name="image"
              placeholder="Image URL"
            />
            <img className="form__link-icon" src="/images/link.svg" alt="" />
          </div>
        </div>
        <div className="form__field">
          <p className="form__label form__label--standalone">
            Select the weather type:
          </p>
          <div className="form__radios">
            <label className="form__radio">
              <input
                type="radio"
                name="weather-type"
                value="hot"
                defaultChecked
              />
              <span>Hot</span>
            </label>
            <label className="form__radio">
              <input type="radio" name="weather-type" value="warm" />
              <span>Warm</span>
            </label>
            <label className="form__radio">
              <input type="radio" name="weather-type" value="cold" />
              <span>Cold</span>
            </label>
          </div>
        </div>
      </ModalWithForm>
      <ItemModal
        isOpen={activeModal === 'selected-item'}
        item={selectedCard}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
