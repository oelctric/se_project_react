# WTWR (What to Wear?)

## Backend repository

This is the front end of the WTWR app. It talks to a companion Express/MongoDB API:
🔗 [se_project_express](https://github.com/oelctric/se_project_express)

## About the project

The idea of the application is pretty simple - we make a call to an API, which then responds with the daily weather forecast. We collect the weather data, process it, and then based on the forecast, we recommend suitable clothing to the user.

The weather card adapts to the live conditions: it switches between day and night backgrounds and between weather states (sunny, cloudy, rain, snow, storm, fog). The app resolves the visitor's location with the Geolocation API (falling back to New York) and shows the matching city name.

Users can register and log in, and once authenticated they can add clothing items, like/unlike items, and edit their profile (name and avatar). The profile page shows only the items the logged-in user has added, and only that user can delete their own items.

## Technologies

- **React 18** — functional components and hooks (`useState`, `useEffect`, `useContext`)
- **React Router** — client-side routing, including a protected `/profile` route
- **Vite** — build tooling and dev server
- **JWT authentication** — sign up, sign in, and persisted sessions via a token in local storage
- **OpenWeather API** — live weather data (temperature, condition, sunrise/sunset)
- **Geolocation API** — resolves the user's location with a fallback
- **ES Modules** — modern JavaScript module system
- **Prettier** — code formatting

## Screenshots

| Desktop | Tablet | Mobile |
| --- | --- | --- |
| ![Desktop](screenshots/wtwr-desktop.png) | ![Tablet](screenshots/wtwr-tablet.png) | ![Mobile](screenshots/wtwr-mobile.png) |

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

## Project structure

- `src/components/` — one folder per component, each with its `.jsx` and `.css`
- `src/utils/` — clothing items, coordinates, and the weather API helpers
- `src/vendor/` — `normalize.css`, fonts, and font styles
- `public/images/` — item and weather-card graphics
