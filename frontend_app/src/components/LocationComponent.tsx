interface Location {
    _id: string;
    name: string;
    latitude: number;
    longitude: number;
}

interface LocationsProps {
    location: Location
    isSelectedLocation: boolean,
    onLocationSelect: (selectedLocation: Location) => void;
}

const LocationComponent = ({ location, isSelectedLocation, onLocationSelect }: LocationsProps) => {
    return (
        <button key={location._id}
            className={`btn btn-outline-success ${isSelectedLocation ? 'active' : ''}  me-2 mb-2`}
            onClick={() => onLocationSelect(location)}>
            {location.name}
        </button>
    )
}

export default LocationComponent;