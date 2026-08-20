import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Profile from '../Profile/Profile.jsx';
import Footer from '../Footer/Footer.jsx';
import AddItemModal from '../AddItemModal/AddItemModal.jsx';
import ItemModal from '../ItemModal/ItemModal.jsx';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal.jsx';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext.js';
import { getItemList, addItem, deleteItem } from '../../utils/api.js';
import { getWeatherData } from '../../utils/weatherApi.js';
import { COORDINATES } from '../../utils/constants.js';
import './App.css';

const GEOLOCATION_TIMEOUT_MS = 10000;

const FALLBACK_WEATHER = {
  temperature: { F: 75, C: 24 },
  location: 'New York',
  icon: '01d',
};

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [weather, setWeather] = useState(FALLBACK_WEATHER);
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToBeDeleted, setCardToBeDeleted] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === 'F') {
      setCurrentTemperatureUnit('C');
    } else {
      setCurrentTemperatureUnit('F');
    }
  };

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
        { timeout: GEOLOCATION_TIMEOUT_MS }
      );
    } else {
      loadDefaultLocation();
    }
  }, []);

  const closeActiveModal = useCallback(() => setActiveModal(''), []);

  const handleOpenNewGarmentModal = () => setActiveModal('new-garment');

  const handleOpenItemModal = (item) => {
    setSelectedCard(item);
    setActiveModal('selected-item');
  };

  const handleAddItem = async (values, handleReset) => {
    try {
      const newItem = await addItem(values);
      setClothingItems([newItem, ...clothingItems]);
      handleReset();
      setActiveModal('');
    } catch {
      /* Request failed: keep the modal open, leave state unchanged */
    }
  };

  const cancelConfirmation = () => {
    setCardToBeDeleted(null);
    setActiveModal(selectedCard ? 'selected-item' : '');
  };

  const handleOpenConfirmationModal = (item) => {
    setCardToBeDeleted(item);
    setActiveModal('delete-confirmation');
  };

  const handleCardDelete = async () => {
    if (!cardToBeDeleted) {
      return;
    }
    try {
      await deleteItem(cardToBeDeleted._id);
      setClothingItems(
        clothingItems.filter((item) => item._id !== cardToBeDeleted._id)
      );
      setCardToBeDeleted(null);
      setSelectedCard(null);
      setActiveModal('');
    } catch {
      /* Request failed: keep the confirmation modal open */
    }
  };

  useEffect(() => {
    getItemList()
      .then(setClothingItems)
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const handleEscClose = (event) => {
      if (event.key === 'Escape') {
        closeActiveModal();
      }
    };
    document.addEventListener('keydown', handleEscClose);
    return () => document.removeEventListener('keydown', handleEscClose);
  }, [activeModal, closeActiveModal]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
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
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <Header
                    weather={weather}
                    onOpenNewGarmentModal={handleOpenNewGarmentModal}
                  />
                  <Profile
                    clothingItems={clothingItems}
                    onAddNewGarment={handleOpenNewGarmentModal}
                    onCardClick={handleOpenItemModal}
                  />
                  <Footer />
                </>
              }
            />
          </Routes>
          <AddItemModal
            isOpen={activeModal === 'new-garment'}
            onAddItem={handleAddItem}
            onCloseModal={closeActiveModal}
          />
          <ItemModal
            isOpen={activeModal === 'selected-item'}
            item={selectedCard}
            onClose={closeActiveModal}
            openConfirmationModal={handleOpenConfirmationModal}
          />
          <DeleteConfirmationModal
            isOpen={activeModal === 'delete-confirmation'}
            handleCardDelete={handleCardDelete}
            onCloseModal={cancelConfirmation}
          />
        </BrowserRouter>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
