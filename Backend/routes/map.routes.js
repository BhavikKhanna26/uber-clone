const express = require('express');
const router = express.Router();
const mapController = require('../controllers/map.controller');
const { query } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/getLocationData', 
    query('location').isString().isLength({min : 1}),
    mapController.getCoordinates
);

module.exports = router; 
