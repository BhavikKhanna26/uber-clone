const express = require('express');
const router = express.Router();
const mapController = require('../controllers/map.controller');
const { query } = require('express-validator');

router.get('/getLocationData', 
    query('location').isString().isLength({min : 1}),
    mapController.getCoordinates
);

router.get('/getFare',
    query('startLocation').notEmpty().withMessage('Start location is required'),
    query('endLocation').notEmpty().withMessage('End location is required'),
    query('vehicleType').isString(),
    mapController.getFare
)

router.get('/getNearbyPlaces',
    query('lat').notEmpty().withMessage('Latitude is required'),
    query('lng').notEmpty().withMessage('Longitude is required'),
    mapController.getNearbyPlaces
)

module.exports = router;        
