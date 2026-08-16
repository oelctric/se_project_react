import { API_KEY } from './constants.js';

const getWeatherData = async (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  const data = await response.json();

  return {
    temperature: Math.round(data.main.temp),
    location: data.name,
    icon: data.weather[0].icon,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
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

const isDaytime = (sunrise, sunset) => {
  if (typeof sunrise !== 'number' || typeof sunset !== 'number') {
    return true;
  }
  const now = Date.now() / 1000;
  return now >= sunrise && now <= sunset;
};

const getConditionCategory = (icon) => {
  if (!icon) {
    return 'sunny';
  }
  switch (icon.slice(0, 2)) {
    case '01':
      return 'sunny';
    case '02':
    case '03':
    case '04':
      return 'cloudy';
    case '09':
    case '10':
      return 'rain';
    case '11':
      return 'storm';
    case '13':
      return 'snow';
    case '50':
      return 'fog';
    default:
      return 'sunny';
  }
};

const getWeatherVariant = (weather) => {
  const timeOfDay = isDaytime(weather.sunrise, weather.sunset) ? 'day' : 'night';
  const category = getConditionCategory(weather.icon);
  return `${timeOfDay}-${category}`;
};

export { getWeatherData, getWeatherCondition, getWeatherVariant };
