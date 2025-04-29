const { getcoordinates } = require("../services/map.service");

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
        console.error(`Error while fetching coordinates: ${error}`);
        return res.status(500).json({ message: 'Error fetching coordinates', error: 'An error occurred while fetching coordinates' });
    }
}