import { useContext } from 'react';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext.js';
import { getWeatherVariant } from '../../utils/weatherApi.js';
import './WeatherCard.css';

function WeatherCard({ weather }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const unit = currentTemperatureUnit;
  const variant = getWeatherVariant(weather);

  return (
    <div className={`weather-card weather-card--${variant}`}>
      <h1 className="weather-card__temp">
        {weather.temperature[unit]}°{unit}
      </h1>
    </div>
  );
}

export default WeatherCard;
