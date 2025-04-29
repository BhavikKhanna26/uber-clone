import React, { useEffect, useState } from 'react'

const LocationSearchPanel = (props) => {
    const [query, setquery] = useState('');
    const [location, setlocation] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        if(props.locationMode === 'pickup') {
            setquery(props.pickup || '');
        }
        else if(props.locationMode === 'destination') {
            setquery(props.destination);
        }
        else {
            setquery('');
        }
    }, [props.pickup, props.destination, props.locationMode]);

    useEffect(() => {
        const fetchlocations = async () => {
            setloading(true);
            setError(null);

            if(!query) {
                setlocation([]);
                return;
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/map/getLocationData?location=${query}`);
                const data = await response.json();

                const names = (data.coordinates || []);
                setlocation(names);
            } catch (error) {
                console.error('Error fetching locations:', error);
                setError(error.message);
            } finally {
                setloading(false);
            }
        };
        fetchlocations();
    }, [query]);

    if(props.locationMode === 'pickup') { 
        return (
            <div>
                {
                    location.map(function(elem, index){
                        return <div onClick={ () => {
                            props.onLocationSelect(elem);
                        }} key = {index} className='flex gap-4 border-2 p-1.5 rounded-xl border-gray-50 active:border-black items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center p-3 rounded-full'><i className="ri-map-pin-2-fill text-xl"></i></h2>
                        <h4 className='font-medium'>{elem.name}</h4>
                        </div>
                    })
                }

            </div>
        )
    } 
    else if(props.locationMode === 'destination') { 
        return (
            <div>
                {
                    location.map(function(elem, index){
                        return <div onClick={ () => {
                            props.onLocationSelect(elem);
                            // props.setVehiclePanelOpen(true);
                            props.setPanelOpen(false);
                        }} key = {index} className='flex gap-4 border-2 p-1.5 rounded-xl border-gray-50 active:border-black items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center p-3 rounded-full'><i className="ri-square-fill text-xl"></i></h2>
                        <h4 className='font-medium'>{elem.name}</h4>
                        </div>
                    })
                }

            </div>
        )
    } 
}

export default LocationSearchPanel
