const axios = require('axios');

module.exports.getcoordinates = async (location) => {
    if (!location) {
        throw new Error('Location parameter is required');
    }

    try {
        const isPlaceId = /^ChI[^\s]{10,}$/.test(location); // basic Place ID check

        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                ...(isPlaceId ? { place_id: location } : { address: location }),
                key: process.env.GOOGLE_MAPS_API_KEY,
                region: 'in'
            },
        });

        if (response.data && response.data.status === 'OK' && response.data.results.length > 0) {
            const vector = response.data.results.map(place => ({
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
                name: place.formatted_address,
            }));

            return vector;
        } else {
            throw new Error('Unable to get coordinates from the provided location');
        }
    } catch (error) {
        throw new Error(`Error fetching coordinates: ${error.message}`);
    }
}


module.exports.getDistanceTime = async (startLocation, endLocation) => {
    if(!startLocation ||!endLocation){
        throw new Error('Start and end locations are required');
    }

    try{
        const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json`, {
            params: {
                origins: startLocation,
                destinations: endLocation,
                key: process.env.GOOGLE_MAPS_API_KEY,
                mode: 'driving',
            },
        });

        if(response.data.status === 'OK'){
            if(response.data.rows[0].elements[0].status === 'ZERO_RESULTS'){
                throw new Error('No route found between the provided locations');
            }

            return response.data.rows[0].elements[0];
        }
        else{
            throw new Error('Unable to get distance and time from the provided locations');
        }
    } catch(error){
        throw new Error(`Error getting distance and time: ${error.message}`);
    }
}   



module.exports.getNearbyPlaces = async ({lat, lng}) => {
    if(!lat || !lng){
        throw new Error('Location parameters are required');
    }

    try{
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
            params: {
                location: `${lat},${lng}`,
                key: process.env.GOOGLE_MAPS_API_KEY,
                radius: 100
            },
        });

        const results = response.data.results || [];

        if(results.length === 0){
            throw new Error('No nearby places found');
        }

        const limitedResults = results.slice(0, 4);

        const nearbyPlaces = limitedResults.map((result) => ({
            name: result.name,
            address: result.vicinity,
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng
        }));

        return nearbyPlaces;
    } catch(err){
        console.error("Error fetching nearby places",err);
        throw new Error('Error fetching nearby places');
    }
}

module.exports.getSuggestions = async (query) => {
    if(!query){
        throw new Error('Query parameter is required');
    }

    try{
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json`, {
            params: {
                input: query,
                key: process.env.GOOGLE_MAPS_API_KEY,
            },
        });

        const predictions = response.data.predictions || [];
        if(predictions.length === 0){
            throw new Error('No suggestions found');
        }
        return predictions.map((prediction) => ({
            value: prediction.description,
            placeId: prediction.place_id,
        }));
    }
    catch(err){
        console.error("Error fetching suggestions",err);
        throw new Error('Error fetching suggestions');
    }
}