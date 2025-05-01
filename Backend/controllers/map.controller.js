const { getcoordinates, getFare, getNearbyPlaces } = require("../services/map.service");

module.exports.getCoordinates = async (req, res) => {
    try{
        const location = req.query.location;

        if(!location){
            return res.status(400).json({ error: 'Location parameter is not provided' });
        }

        const coordinates = await getcoordinates(location);
        if(!coordinates || coordinates.length === 0){
            return res.status(404).json({ error: 'Coordinates not found' });
        }
        
        return res.json({ coordinates });
    }
    catch(error){
        console.error(`Error while fetching coordinates: ${error.message}`);
        return res.status(500).json({
            message: 'Error fetching coordinates',
            error: error.message || 'An error occurred while fetching coordinates'
        });
    }
}

module.exports.getFare = async (req, res) => {
    try{
        const startLocation = JSON.parse(req.query.startLocation);
        const endLocation = JSON.parse(req.query.endLocation);
        const vehicleType = req.query.vehicleType;

        if(!startLocation || !endLocation || !vehicleType){
            return res.status(400).json({ error: 'All parameters are required: startLocation, endLocation, vehicleType' });
        }

        const fare = await getFare(startLocation, endLocation, vehicleType);

        if(!fare){
            return res.status(404).json({ error: 'Fare not found' });
        }

        return res.json({ fare });
    }
    catch(error){
        console.error(`Error while fetching fare: ${error}`);
        return res.status(500).json({ message: 'Error fetching fare', error: 'An error occurred while fetching fare' });
    }
}

module.exports.getNearbyPlaces = async (req, res) => {
    try{
        const {lat, lng} = req.query;

        if(!lat || !lng){
            return res.status(400).json({ error: 'Latitude & Longitude parameters is not provided' });
        }

        const nearbyPlaces = await getNearbyPlaces({lat, lng});
        console.log('Fetched nearby places successfully: ', nearbyPlaces);
        if(!nearbyPlaces || nearbyPlaces.length === 0){
            return res.status(404).json({ error: 'Nearby places not found' });
        }

        return res.json({places : nearbyPlaces});
    }
    catch(error){
        console.error(`Error while fetching nearby places: ${error}`);
        return res.status(500).json({ message: 'Error fetching nearby places', error: 'An error occurred while fetching nearby places' });
    }
}