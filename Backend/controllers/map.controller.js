const { getcoordinates, getFare, getNearbyPlaces, getDistanceTime, getSuggestions } = require("../services/map.service");
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res) => {
    try {
        const { location } = req.query;

        if (!location) {
            return res.status(400).json({ error: 'Location parameter is not provided' });
        }

        const coordinates = await getcoordinates(location);

        if (!coordinates || coordinates.length === 0) {
            return res.status(404).json({ error: 'Coordinates not found for the provided location or place_id' });
        }

        return res.status(200).json({ coordinates });
    } catch (error) {
        console.error(`Error while fetching coordinates: ${error.message}`);
        return res.status(500).json({
            message: 'Error fetching coordinates',
            error: error.message || 'An unknown error occurred while fetching coordinates',
        });
    }
};

module.exports.getDistanceTime = async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const {startLocation, endLocation } = req.query;

        const distanceTime = await getDistanceTime(startLocation, endLocation);

        res.status(200).json(distanceTime);
    }
    catch(error){
        console.error(`Error while fetching distance and time: ${error}`);
        return res.status(500).json({ message: 'Error fetching distance and time', error: 'An error occurred while fetching distance and time' });
    }
}

module.exports.getNearbyPlaces = async (req, res) => {
    try{
        const {lat, lng} = req.query;

        if(!lat || !lng){
            return res.status(400).json({ error: 'Latitude & Longitude parameters is not provided' });
        }

        const nearbyPlaces = await getNearbyPlaces({lat, lng});
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

module.exports.getSuggestions = async(req, res) => {
    try{
        const { location } = req.query;
        if(!location){
            return res.status(400).json({ error: 'Search query parameter is not provided' });
        }
        const suggestions = await getSuggestions(location);
        if(!suggestions || suggestions.length === 0){
            return res.status(404).json({ error: 'Suggestions not found' });
        }
        return res.json({ suggestions });
    }
    catch(error){
        console.error(`Error while fetching suggestions: ${error}`);
        return res.status(500).json({ message: 'Error fetching suggestions', error: 'An error occurred while fetching suggestions' });
    }
}