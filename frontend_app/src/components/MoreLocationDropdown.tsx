import { useState, useEffect } from 'react'
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';

interface Location {
    _id: string;
    name: string;
    latitude: number;
    longitude: number;
}

interface MoreLocationDropdownProps {
    onLocationAdd: (selectedLocation: Location | null) => void;
}

const MoreLocationDropdown = ({
    onLocationAdd: onLocationSelect
}: MoreLocationDropdownProps) => {
    const [locationsList, setLocations] = useState<Location[]>([]);

    useEffect(() => {
        // Fetch all locations
        axios.get('/locations')
            .then(response => {
                console.log(response.data);
                setLocations(response.data);
            })
            .catch(error => console.error('Error fetching locations:', error));
    }, []);

    return (
        <Dropdown>
            <Dropdown.Toggle variant="danger">
                Add More
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {
                    locationsList.map((location) => (<Dropdown.Item href="#"
                        onClick={() => onLocationSelect((location))}>
                        {location.name}
                    </Dropdown.Item>))
                }
            </Dropdown.Menu>
        </Dropdown>
    );

};

export default MoreLocationDropdown;
