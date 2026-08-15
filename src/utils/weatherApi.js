import { API_KEY, LATITUDE, LONGITUDE } from './constants.js';

const getWeatherData = async () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&units=imperial&appid=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  const data = await response.json();

  return {
    temperature: Math.round(data.main.temp),
    location: data.name,
  };
};

const getWeatherCondition = (temperature) => {
  if (temperature >= 86) {
    return 'hot';
  }
  if (temperature >= 66) {
    return 'warm';
  }
  return 'cold';
};

export { getWeatherData, getWeatherCondition };
