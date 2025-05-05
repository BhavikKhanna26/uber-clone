import React, { useEffect, useRef, useState } from 'react';

const LocationSearchPanel = (props) => {
    const [query, setquery] = useState('');
    const [location, setlocation] = useState([]);
    const [nearbyLocations, setNearbyLocations] = useState([]); 
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null);
    const [PickupId, setPickupId] = useState(null);
    const [DestinationId, setDestinationId] = useState(null);
    const hasFetchedNearby = useRef(false);

    useEffect(() => {
        const fetchCoordinates = async () => {
            try{
                if(!PickupId || !DestinationId) return;

                if(props.locationMode === 'pickup') {
                    const response = await fetch(
                        `${import.meta.env.VITE_BASE_URL}/map/getLocationData?location=${PickupId}`
                    );
                    const data = await response.json();
                    const coordinates = {lat: data.coordinates[0].lat, lng: data.coordinates[0].lng};
                    props.setPickupData(coordinates);
                } 
                else if(props.locationMode === 'destination') {
                    const response = await fetch(
                        `${import.meta.env.VITE_BASE_URL}/map/getLocationData?location=${DestinationId}`
                    );
                    const data = await response.json();
                    const coordinates = {lat: data.coordinates[0].lat, lng: data.coordinates[0].lng};
                    props.setDestinationData(coordinates);
                }
            }
            catch(error) {
                setError(error);
                console.error('Error fetching coordinates: ', error.message);
            }
        }
        fetchCoordinates();
    }, [props.locationMode, PickupId, DestinationId]);

    useEffect(() => {
        const fetchNearbyLocations = async () => {
            if (hasFetchedNearby.current) return;
    
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
    
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
                setloading(false);
                return;
            }

            try {

                const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/map/getSuggestions?location=${query}`
                );

                if(!response.ok){
                    console.warn('Enter valid location data !!');
                }
                const data = await response.json();
                const locationSuggest = [];

                if (Array.isArray(data.suggestions)) {
                    locationSuggest.push(
                        ...data.suggestions.map(place => ({
                            value: place.value,
                            placeId: place.placeId  // Store placeId along with the value
                        }))
                    );
                }
                setlocation(locationSuggest);
            } catch (error) {
                console.error('Error fetching locations:', error);
                setError(error.message);
            } finally {
                setloading(false);
            }
        };

        fetchlocations();
    }, [query]);


    if (props.locationMode === null) {
        return (
            <div>
                {location.map((elem, index) => (
                    <div
                        onClick={() => props.onLocationSelect(elem)}
                        key={index}
                        className='flex gap-4 border-2 p-1.5 rounded-xl border-gray-50 active:border-black items-center my-2 justify-start'
                    >
                        <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center p-3 rounded-full'>
                            <i className="ri-map-pin-2-fill text-xl"></i>
                        </h2>
                        <h4 className='font-medium'>{elem}</h4>
                    </div>
                ))}
            </div>
        );
    } else if (props.locationMode === 'pickup') {
        return (
            <div>
                {location.map((elem, index) => (
                    <div
                        onClick={() => {
                            props.onLocationSelect(elem)
                            setPickupId(elem.placeId);

                            if (props.destination && elem.value) {
                                props.fetchFare(elem.value, props.destination);
                            }
                        }}
                        key={index}
                        className='flex gap-4 border-2 p-1.5 rounded-xl border-gray-50 active:border-black items-center my-2 justify-start'
                    >
                        <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center p-3 rounded-full'>
                            <i className="ri-map-pin-2-fill text-xl"></i>
                        </h2>
                        <h4 className='font-medium'>{elem.value}</h4>
                    </div>
                ))}
            </div>
        );
    } else if (props.locationMode === 'destination') {
        return (
            <div>
                {location.map((elem, index) => (
                    <div
                        onClick={() => {
                            props.onLocationSelect(elem)
                            props.setVehiclePanelOpen(true)
                            props.setPanelOpen(false)
                            setDestinationId(elem.placeId);

                            if(props.pickup && elem.value){
                                props.fetchFare(props.pickup, elem.value);
                            }
                        }}
                        key={index}
                        className='flex gap-4 border-2 p-1.5 rounded-xl border-gray-50 active:border-black items-center my-2 justify-start'
                    >
                        <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center p-3 rounded-full'>
                            <i className="ri-square-fill text-xl"></i>
                        </h2>
                        <h4 className='font-medium'>{elem.value}</h4>
                    </div>
                ))}
            </div>
        );
    }
};

export default LocationSearchPanel;
