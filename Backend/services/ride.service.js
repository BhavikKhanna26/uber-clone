const rideModel = require('../models/ride.model');
const mapService = require('../services/map.service');
const crypto = require('crypto');

async function getFare(pickup, destination, vehicleType){
    if(!pickup || !destination) throw new Error('Pickup and destination are required');

    const { distance, duration } = await mapService.getDistanceTime(pickup, destination);

    const rates = {
        moto : { baseFare: 15, perKm: 12, perMin: 1 },
        auto : { baseFare: 23, perKm: 19, perMin: 1.5 },
        car : { baseFare: 28, perKm: 24, perMin: 2 }
    };

    const rate = rates[vehicleType];

    if(!rate) throw new Error('Invalid vehicle type');

    const distanceInKm = distance.value / 1000;
    const durationInMin = duration.value / 60;

    const fare = {};

    Object.entries(rates).forEach(([vehicleType, rate]) => {
        const fareAmount = rate.baseFare + (distanceInKm * rate.perKm) + (durationInMin * rate.perMin);
        fare[vehicleType] = parseFloat(fareAmount.toFixed(2));
    });

    return fare;
}

function getOtp(num){
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

module.exports.createRide = async ({ 
    user, pickup, destination, vehicleType 
}) => { 
    if(!user ||!pickup ||!destination ||!vehicleType) throw new Error('All fields are required');

    const fare = await getFare(pickup, destination, vehicleType);

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(4),
        fare: fare[vehicleType]
    });

    return ride;
}

module.exports.getRideFare = async ({
    pickup, destination, vehicleType
}) => {
    if(!pickup ||!destination ||!vehicleType) throw new Error('All fields are required');

    const fare = await getFare(pickup, destination, vehicleType);

    return fare[vehicleType];
}

module.exports.confirmRide = async ({
    rideId
}) => {
    if(!rideId) throw new Error('All fields are required');

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'confirmed',
        captain: captain._id
    })

    const ride = await rideModel.findOne({ 
        _id: rideId 
    }).populate('user');

    if(!ride) throw new Error('Ride not found');

    return ride;
}