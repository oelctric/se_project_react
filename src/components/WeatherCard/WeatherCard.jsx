import './WeatherCard.css';

function WeatherCard({ temperature }) {
  return (
    <div className="weather-card">
      <span className="weather-card__temp">{temperature}°F</span>
      <img
        className="weather-card__icon"
        src="/images/weather-card.svg"
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}

export default WeatherCard;
