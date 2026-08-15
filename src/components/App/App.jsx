import { useState, useEffect } from 'react';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx';
import ItemModal from '../ItemModal/ItemModal.jsx';
import { defaultClothingItems } from '../../utils/clothingItems.js';
import { getWeatherData } from '../../utils/weatherApi.js';
import './App.css';

function App() {
  const [clothingItems] = useState(defaultClothingItems);
  const [weather, setWeather] = useState({ temperature: 75, location: 'New York' });
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    getWeatherData()
      .then((data) => setWeather(data))
      .catch(() => setWeather({ temperature: 75, location: 'New York' }));
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
      <Header weather={weather} onOpenNewGarmentModal={handleOpenNewGarmentModal} />
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
            Image
          </label>
          <div className="form__image-row">
            <input
              className="form__input"
              id="garment-image"
              type="text"
              name="image"
              placeholder="Image URL"
            />
            <img className="form__link-icon" src="/images/link.svg" alt="" />
          </div>
        </div>
        <div className="form__field">
          <p className="form__label form__label--standalone">Select the weather type:</p>
          <div className="form__radios">
            <label className="form__radio">
              <input type="radio" name="weather-type" value="hot" defaultChecked />
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
