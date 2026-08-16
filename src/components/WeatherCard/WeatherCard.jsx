import { getWeatherVariant } from '../../utils/weatherApi.js';
import './WeatherCard.css';

function WeatherCard({ weather }) {
  const variant = getWeatherVariant(weather);

  return (
    <div className={`weather-card weather-card--${variant}`}>
      <span className="weather-card__temp">{weather.temperature}°F</span>
    </div>
  );
}

export default WeatherCard;
