import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Profile from '../Profile/Profile.jsx';
import Footer from '../Footer/Footer.jsx';
import AddItemModal from '../AddItemModal/AddItemModal.jsx';
import ItemModal from '../ItemModal/ItemModal.jsx';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal.jsx';
import LoginModal from '../LoginModal/LoginModal.jsx';
import RegisterModal from '../RegisterModal/RegisterModal.jsx';
import EditProfileModal from '../EditProfileModal/EditProfileModal.jsx';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext.js';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import {
  getItemList,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  updateProfile,
} from '../../utils/api.js';
import { signup, signin, checkToken } from '../../utils/auth.js';
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
  const navigate = useNavigate();
  const [clothingItems, setClothingItems] = useState([]);
  const [weather, setWeather] = useState(FALLBACK_WEATHER);
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToBeDeleted, setCardToBeDeleted] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

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
        .catch((error) => {
          console.error('Failed to load weather data:', error);
          setWeather(FALLBACK_WEATHER);
        });
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

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      setIsCheckingAuth(false);
      return;
    }
    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error('Failed to validate stored token:', error);
        localStorage.removeItem('jwt');
      })
      .finally(() => setIsCheckingAuth(false));
  }, []);

  const closeActiveModal = useCallback(() => setActiveModal(''), []);

  const handleOpenNewGarmentModal = () => setActiveModal('new-garment');
  const handleOpenLoginModal = () => setActiveModal('login');
  const handleOpenRegisterModal = () => setActiveModal('register');
  const handleOpenEditProfileModal = () => setActiveModal('edit-profile');

  const handleOpenItemModal = (item) => {
    setSelectedCard(item);
    setActiveModal('selected-item');
  };

  const handleAddItem = (values, handleReset) => {
    const token = localStorage.getItem('jwt');
    addItem(values, token)
      .then((newItem) => {
        setClothingItems((items) => [newItem, ...items]);
        handleReset();
        closeActiveModal();
      })
      .catch((error) => {
        /* Request failed: keep the modal open, leave state unchanged */
        console.error('Failed to add a new garment item:', error);
      });
  };

  const cancelConfirmation = () => {
    setCardToBeDeleted(null);
    setActiveModal(selectedCard ? 'selected-item' : '');
  };

  const handleOpenConfirmationModal = (item) => {
    setCardToBeDeleted(item);
    setActiveModal('delete-confirmation');
  };

  const handleCardDelete = () => {
    if (!cardToBeDeleted) {
      return;
    }
    const token = localStorage.getItem('jwt');
    deleteItem(cardToBeDeleted._id, token)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== cardToBeDeleted._id)
        );
        setCardToBeDeleted(null);
        setSelectedCard(null);
        closeActiveModal();
      })
      .catch((error) => {
        /* Request failed: keep the confirmation modal open */
        console.error('Failed to delete the garment item:', error);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem('jwt');
    const request = isLiked
      ? removeCardLike(id, token)
      : addCardLike(id, token);

    request
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((error) => console.error('Failed to update the like:', error));
  };

  const handleRegister = (values) =>
    signup(values)
      .then(() =>
        handleLogin({ email: values.email, password: values.password })
      )
      .catch((error) => {
        console.error('Failed to register:', error);
        throw error;
      });

  const handleLogin = ({ email, password }) =>
    signin({ email, password })
      .then(({ token }) => {
        localStorage.setItem('jwt', token);
        return checkToken(token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
        navigate('/');
      })
      .catch((error) => {
        console.error('Failed to log in:', error);
        throw error;
      });

  const handleLogOut = () => {
    localStorage.removeItem('jwt');
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleUpdateProfile = (values) => {
    const token = localStorage.getItem('jwt');
    return updateProfile(values, token)
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch((error) => {
        console.error('Failed to update profile:', error);
        throw error;
      });
  };

  useEffect(() => {
    getItemList()
      .then(setClothingItems)
      .catch((error) =>
        console.error('Failed to load the garment list:', error)
      );
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
      <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
        <div className="app">
          <Header
            weather={weather}
            onOpenNewGarmentModal={handleOpenNewGarmentModal}
            onOpenLoginModal={handleOpenLoginModal}
            onOpenRegisterModal={handleOpenRegisterModal}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weather={weather}
                  clothingItems={clothingItems}
                  onCardClick={handleOpenItemModal}
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  isCheckingAuth={isCheckingAuth}
                >
                  <Profile
                    clothingItems={clothingItems}
                    onAddNewGarment={handleOpenNewGarmentModal}
                    onCardClick={handleOpenItemModal}
                    onCardLike={handleCardLike}
                    onEditProfile={handleOpenEditProfileModal}
                    onLogOut={handleLogOut}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
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
          <LoginModal
            isOpen={activeModal === 'login'}
            onLogin={handleLogin}
            onClose={closeActiveModal}
            onSwitchToRegister={handleOpenRegisterModal}
          />
          <RegisterModal
            isOpen={activeModal === 'register'}
            onRegister={handleRegister}
            onClose={closeActiveModal}
            onSwitchToLogin={handleOpenLoginModal}
          />
          <EditProfileModal
            isOpen={activeModal === 'edit-profile'}
            currentUser={currentUser}
            onUpdateProfile={handleUpdateProfile}
            onClose={closeActiveModal}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
