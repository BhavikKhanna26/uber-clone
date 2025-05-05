const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    try{
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup, 
            destination, 
            vehicleType
        });
        res.status(201).json(ride);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating ride', error: error.message });  
    }
}

module.exports.getRideFare = async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const {pickup, destination, vehicleType } = req.query;

        const fare = await rideService.getRideFare({pickup, destination, vehicleType});

        if(!fare){
            return res.status(404).json({ message: 'Fare not found' });
        }
        res.status(201).json({ fare });
    }
    catch (error){
        return res.status(500).json({ message: 'Error fetching fare', error: error.message });
    }
}