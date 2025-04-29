const axios = require('axios');

module.exports.getcoordinates = async (location) => {
    if(!location){
        throw new Error('Location parameter is required');
    }

    try{
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
            params: {
                q: location,
                format: 'json',
                limit: 5,
                addressdetails: 1,
                countrycodes: 'IN'
            },
        });

        if(response.data && response.data.length > 0){
            const vector = [];

            for(place of response.data){
                vector.push({
                    lat: place.lat,
                    lng: place.lon,
                    name: place.display_name,
                });
            }

            return vector;
        }
        else{
            throw new Error('Unable to get coordinates from the provided location');
        }
    }
    catch(error){
        throw new Error(`Error fetching coordinates: ${error.message}`);
    }
}
