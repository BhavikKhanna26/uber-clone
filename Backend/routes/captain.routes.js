const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const captainController = require('../controllers/captain.controller');


router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min : 3}).withMessage('First name be at least 3 chars long'),
    body('password').isLength({min : 6}).withMessage('Password must be atleast 6 chars long'),
    body('vehicle.color').isLength({min : 3}).withMessage('Vehicle color be at least 3 chars long'),  
    body('vehicle.plate').isLength({min : 3}).withMessage('Plate be at least 3 chars long'),
    body('vehicle.capacity').isLength({min : 1}).withMessage('Capacity be at least 1'),
    body('vehicle.vehicleType').isLength({min : 3}).withMessage('Vehicle type be at least 3 chars long')
],
    captainController.registerCaptain
);


module.exports = router;