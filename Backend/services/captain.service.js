const captainModel = require('../models/captain.model');


module.exports.createCaptain = async ({
    firstname, lastname, email, password,
    color, plate, capacity, vehicleType, lat, lng
}) => {
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required'); 
    }
    
    const captain = captainModel.create({
        fullname : {
            firstname,
            lastname
        },
        email,
        password,
        vehicle : {
            color,
            plate,
            capacity,
            vehicleType
        },
        location : {
            lat,
            lng
        }
    })

    return captain;
}

module.exports.updateCaptainLocation = async(email, lat, lng) => {
    try{
        const captain = await captain.findOne({email, status: 'active'});
        if(!captain){
            throw new Error('No active captain not found for given email');
        }

        captain.location.lat = lat;
        captain.location.lng = lng;

        await captain.save();
        return captain;
    }
    catch(error){
        throw new Error(`Error updating captain location: ${error.message}`);
    }
}