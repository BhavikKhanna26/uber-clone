const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { query } = require('express-validator');

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({min: 3}).withMessage('Enter valid Pickup Location'),
    body('destination').isString().isLength({min: 3}).withMessage('Enter valid Destination'),
    body('vehicleType').isString().isIn(['auto', 'moto', 'car']).withMessage('Invalid Vehicle Type'),
    rideController.createRide
)

router.get('/getRideFare',
    authMiddleware.authUser,
    query('pickup').isLength({ min: 1 }).withMessage('Enter valid Pickup Location'),
    query('destination').isLength({ min: 1 }).withMessage('Enter valid Destination'),
    query('vehicleType').isIn(['auto','moto','car']).withMessage('Invalid Vehicle Type'),
    rideController.getRideFare
)

module.exports = router;