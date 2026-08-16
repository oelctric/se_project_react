import WeatherCard from '../WeatherCard/WeatherCard.jsx';
import ItemCard from '../ItemCard/ItemCard.jsx';
import { getWeatherCondition } from '../../utils/weatherApi.js';
import './Main.css';

function Main({ weather, clothingItems, onCardClick }) {
  const condition = getWeatherCondition(weather.temperature);
  const filteredItems = clothingItems.filter(
    (item) => item.weather.toLowerCase() === condition
  );

  return (
    <main className="main">
      <WeatherCard weather={weather} />
      <h2 className="main__subtitle">
        Today is {weather.temperature}° F / You may want to wear:
      </h2>
      <ul className="main__cards">
        {filteredItems.map((item) => (
          <li className="main__card" key={item._id}>
            <ItemCard item={item} onClick={() => onCardClick(item)} />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Main;
