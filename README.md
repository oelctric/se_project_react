# WTWR (What to Wear?)

## About the project

The idea of the application is pretty simple - we make a call to an API, which then responds with the daily weather forecast. We collect the weather data, process it, and then based on the forecast, we recommend suitable clothing to the user.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create an environment file from the example and add your OpenWeather API key:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and set `VITE_OPENWEATHER_API_KEY` to your key from [openweathermap.org](https://openweathermap.org/).

3. Start the dev server (runs on port 3000):

   ```bash
   npm run dev
   ```

## Links

- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)
