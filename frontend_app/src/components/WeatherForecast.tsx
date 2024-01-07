import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Location {
    _id: string;
    name: string;
    latitude: number;
    longitude: number;
}

interface WeatherData {
    dayOfWeek: string;
    todayMarker: boolean;
    date: string;
    temperature: number;
    description: string;
}

const WeatherApp: React.FC = () => {
    const [apiLocations, setApiLocations] = useState<Location[]>([]);
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

    useEffect(() => {
        // Fetch locations from the API
        axios.get('/locations')
            .then(response => setApiLocations(response.data))
            .catch(error => console.error('Error fetching locations:', error));
    }, []);

    const handleLocationClick = (locationId: string) => {
        setSelectedLocation(locationId);

        // Fetch weather data for the selected location
        axios.get(`/locations/${locationId}/weather`)
            .then(response => setWeatherData(response.data))
            .catch(error => console.error('Error fetching weather data:', error));
    };

    const handleAddLocation = (location: Location) => {
        // Add the selected location to the local list
        setSelectedLocations([...selectedLocations, location.name]);
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Weather Forecast</h1>

            <div className="d-flex flex-wrap justify-content-center mb-4">
                {apiLocations.map((location) => (
                    <button
                        key={location._id}
                        className={`btn btn-outline-primary me-2 mb-2 ${selectedLocation === location.name ? 'btn-primary' : ''}`}
                        onClick={() => handleLocationClick(location._id)}
                    >
                        {location.name}
                    </button>
                ))}
            </div>

            <div className="d-flex flex-wrap justify-content-start mb-4">
                {selectedLocations.map((locationId) => (
                    <span key={locationId} className="badge bg-light me-2">
                        {locationId}
                    </span>
                ))}
                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Add Filter
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {apiLocations.map((location) => (
                            <button
                                key={location._id}
                                className="dropdown-item"
                                onClick={() => handleAddLocation(location)}
                            >
                                {location.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="d-flex flex-wrap justify-content-center">
                {weatherData.map((data) => (
                    <div key={data.date} className="card m-2" style={{ width: '150px' }}>
                        <div className={`card-body ${data.todayMarker ? 'bg-primary text-white' : ''}`}>
                            <h5 className="card-title">{data.dayOfWeek}</h5>
                            {data.todayMarker && <p>Today</p>}
                            <p className="card-text">Temperature: {data.temperature}°C</p>
                            <p className="card-text">Description: {data.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherApp;
