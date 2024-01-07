import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import Heading from "./components/Heading";
import MoreLocationDropdown from "./components/MoreLocationDropdown";
import LocationComponent from "./components/LocationComponent";
import WeatherApp from "./components/WeatherForecast";

function App() {
  axios.defaults.baseURL = "http://localhost:8800/api";

  interface Location {
    _id: string;
    name: string;
    latitude: number;
    longitude: number;
  }

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [locationsList, setLocationsList] = useState<Location[]>([]);

  function handleAddLocation(location: Location) {
    setLocationsList([...locationsList, location]);
  }

  return (
    <div className="container mt-4">

      <Heading />
      {
        locationsList.map((location) =>
          <LocationComponent location={location}
            isSelectedLocation={selectedLocation?._id === location._id}
            onLocationSelect={setSelectedLocation}
          />)
      }
      {/* <WeatherApp /> */}
      <MoreLocationDropdown onLocationAdd={(addedLocation) => {
        if (addedLocation != null) {
          console.log(addedLocation?.name);
          handleAddLocation(addedLocation);
        }
      }} />
    </div>
  );
}

export default App;
