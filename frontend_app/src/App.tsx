import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import Heading from "./components/Heading";
import MoreLocationDropdown from "./components/MoreLocationDropdown";
import LocationComponent from "./components/LocationComponent";
import WeatherForecast from "./components/WeatherForecast";

function App() {
  axios.defaults.baseURL = "http://localhost:8800/api";

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

  const _locationsListKey = "locations_list";
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [locationsList, setLocationsList] = useState<Location[]>([]);
  const [weatherDataList, setWeatherData] = useState<WeatherData[] | null>([]);

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    setWeatherData(null);

    // Fetch weather data for the selected location
    axios.get(`/locations/${location._id}/weather`)
      .then(response => setWeatherData(response.data["data"]))
      .catch(error => console.error('Error fetching weather data:', error));
  };

  useEffect(() => {
    // Fetch all locations from local storage
    const storedLocations = localStorage.getItem(_locationsListKey);
    if (storedLocations) {
      setLocationsList(JSON.parse(storedLocations));
    }
  }, []);

  function handleAddLocation(location: Location) {
    const locationALreadyExist = locationsList.some((loc) => loc._id == location._id);

    if (locationALreadyExist) return;

    setLocationsList([...locationsList, location]);

    // Explicitly adding new location to the list here as the state takes time to update the actual value
    locationsList.push(location);

    // Saving the location in local storage here
    localStorage.setItem(_locationsListKey, JSON.stringify(locationsList));
  }

  return (
    <div className="container mt-4">

      <Heading />

      {/* Locations list here */}
      {
        locationsList.map((location) =>
          <LocationComponent location={location}
            isSelectedLocation={selectedLocation?._id === location._id}
            onLocationSelect={handleLocationClick}
          />)
      }

      {/* Add more dropdown here */}
      <MoreLocationDropdown onLocationAdd={(addedLocation) => {
        if (addedLocation != null) {
          console.log(addedLocation?.name);
          handleAddLocation(addedLocation);
        }
      }} />

      {
        selectedLocation && <WeatherForecast weatherDataList={weatherDataList} />
      }

    </div>
  );
}

export default App;
