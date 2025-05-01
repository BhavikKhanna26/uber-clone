import React, { useEffect, useRef, useState } from 'react';

const LocationSearchPanel = (props) => {
    const [query, setquery] = useState('');
    const [location, setlocation] = useState([]);
    const [nearbyLocations, setNearbyLocations] = useState([]); // ✅
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null);
    const [currentCoords, setCurrentCoords] = useState({});
    const hasFetchedNearby = useRef(false);

    useEffect(() => {
        const fetchNearbyLocations = async () => {
            if (hasFetchedNearby.current) return;
    
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        setCurrentCoords({ lat, lng });
    
                        try {
                            const response = await fetch(
                                `${import.meta.env.VITE_BASE_URL}/map/getNearbyPlaces?lat=${lat}&lng=${lng}`
                            );
                            const data = await response.json();
                            const nearbyNames = [];
    
                            if (Array.isArray(data.places)) {
                                nearbyNames.push(...data.places.map(place => place.address));
                            }
    
                            setNearbyLocations(nearbyNames); 
                            setlocation(nearbyNames);       
                            console.log('Nearby locations fetched:', nearbyNames); // ✅ log nearby locations
                            hasFetchedNearby.current = true;
                        } catch (err) {
                            setError(err);
                            console.error('Error fetching nearby locations:', err);
                        }
                    },
                    (error) => {
                        console.error('Error retrieving location:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };
    
        fetchNearbyLocations();
    }, []);


    useEffect(() => {
        if (props.locationMode === 'pickup') {
            setquery(props.pickup || '');
        } else if (props.locationMode === 'destination') {
            setquery(props.destination);
        } else {
            setquery('');
        }
    }, [props.pickup, props.destination, props.locationMode]);


    useEffect(() => {
        const fetchlocations = async () => {
            setloading(true);
            setError(null);

            if (!query) {
                setlocation(nearbyLocations); 
                console.log('Location mode is not seter', nearbyLocations);// ✅ fallback to nearby
                setloading(false);
                return;
            }

            try {

                const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/map/getLocationData?location=${query}`
                );

                if(!response.ok){
                    setlocation(nearbyLocations);
                }
                const data = await response.json();

                if(data.coordinates){
                    const names = data.coordinates || [];
                    setlocation(names);
                }
                else{
                    console.warn('No coordinates found, falling back to nearby locations.');
                    console.log('Nearby locations:', nearbyLocations);
                    setlocation(nearbyLocations);
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
                setlocation(nearbyLocations);
                setError(error.message);
            } finally {
                setloading(false);
            }
        };

        fetchlocations();
    }, [query]);

    const renderLocationList = () => {
        return location.map((elem, index) => {
            const isDefault = props.locationMode === null;
            const iconClass = props.locationMode === 'destination' ? 'ri-square-fill' : 'ri-map-pin-2-fill';
            const title = isDefault ? elem : elem.name;
    
            const handleClick = () => {
                props.onLocationSelect(elem);
                if (props.locationMode === 'destination') {
                    props.setVehiclePanelOpen(true);
                    props.setPanelOpen(false);
                }
            };
    
            return (
                <div
                    onClick={handleClick}
                    key={index}
                    className='flex gap-4 border-2 p-1.5 rounded-xl border-gray-50 active:border-black items-center my-2 justify-start'
                >
                    <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center p-3 rounded-full'>
                        <i className={`${iconClass} text-xl`}></i>
                    </h2>
                    <h4 className='font-medium'>{title}</h4>
                </div>
            );
        });
    };

    return <div>{renderLocationList()}</div>;
};

export default LocationSearchPanel;
