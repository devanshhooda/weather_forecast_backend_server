# Weather App

Welcome to the Weather App, a simple web application for checking the weather forecast of different locations.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Backend](#running-the-backend)
- [Running the Frontend](#running-the-frontend)
- [API Key Setup](#api-key-setup)
- [Adding Locations](#adding-locations)

## Prerequisites

Make sure you have the following installed before setting up the project:

- Node.js
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app

2. Navigate to the backend and frontend directories separately:

   ```bash
   cd backend_server/

   cd frontend_app/

3. Install the required npm packages:

   ```bash
   npm install

## Running the Backend

1. Generate your Weather API key from WeatherAPI.

2. Create a `.env` file in the root of the backend folder with the following content:

    ```bash
    WEATHER_API_KEY=your-weather-api-key
    MONGODB_URI=your-mongodb-uri
    PORT=your-port

3. Start the backend server:

    ```bash
    nodemon

## Running the Frontend

1. Ensure that the backend server is up and running.

2. Navigate to the frontend folder:

    ```bash
    cd frontend

3. Start the frontend application:

    ```bash
    npm run dev

4. Open your browser and go to the URL provided in the terminal.

## API Key Setup

To obtain a Weather API key, visit WeatherAPI and follow the instructions to create an account.
