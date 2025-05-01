const axios = require('axios');

module.exports.getcoordinates = async (location) => {
    if(!location){
        throw new Error('Location parameter is required');
    }   

    try{
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                address: location,
                key: process.env.GOOGLE_MAPS_API_KEY,
                region: 'in'
            },
        });

        if(response.data && response.data.status === 'OK' && response.data.results.length > 0){
            const vector = [];

            for(place of response.data.results){
                vector.push({
                    lat: place.geometry.location.lat,
                    lng: place.geometry.location.lng,
                    name: place.formatted_address,
                });
            }

            return vector;
        }
        else{
            throw new Error('Unable to get coordinates from the provided location');
        }
    }
    catch(error){
        throw new Error(`Error fetching coordinates: ${error.message}`);
    }
}


module.exports.getFare = async (startLocation, endLocation, vehicleType) => {
    const getDistanceinKm = (lat1, lon1, lat2, lon2) => {
        const R = 6371; 
        const dLat = (lat2 - lat1) * Math.PI/180;
        const dLon = (lon2 - lon1) * Math.PI/180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));  
        return R * c;
    }

    const baseFareBike = 15;
    const baseFareCar = 30;
    const baseFareAuto = 20;
    const peakRatePerKmBike = 18;
    const peakRatePerKmCar = 32;
    const peakRatePerKmAuto = 23;

    const peakHours = [
        { start: "8:00", end: "10:30" },
        { start: "18:00", end: "19:45" },
    ];

    const isPeakHour = (now) => {
        const [hour, minute] = [now.getHours(), now.getMinutes()];
        const currentMinutes = hour * 60 + minute;

        return peakHours.some(({start, end}) => {
            const [startH, startM] = start.split(":").map(Number);
            const [endH, endM] = end.split(":").map(Number);
            const startMinutes = startH * 60 + startM;
            const endMinutes = endH * 60 + endM;

            return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
        });
    }
    if(startLocation != null && endLocation != null && vehicleType != null){
        const distance = getDistanceinKm(startLocation.lat, startLocation.lng, endLocation.lat, endLocation.lng);
        if(vehicleType === "moto") {
            const ratePerKm = isPeakHour(new Date()) ? peakRatePerKmBike : baseFareBike;
            return parseFloat(distance * ratePerKm).toFixed(2);
        }
        else if(vehicleType === "car") {
            const ratePerKm = isPeakHour(new Date())? peakRatePerKmCar : baseFareCar;
            return parseFloat(distance * ratePerKm).toFixed(2);
        }
        else if(vehicleType === "auto") {
            const ratePerKm = isPeakHour(new Date())? peakRatePerKmAuto : baseFareAuto;
            return parseFloat(distance * ratePerKm).toFixed(2);
        }
        else {
            throw new Error("Invalid vehicle type");
        }
    }
}

module.exports.getNearbyPlaces = async ({lat, lng}) => {
    if(!lat || !lng){
        throw new Error('Location parameters are required');
    }

    try{
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
            params: {
                location: `${lat},${lng}`,
                key: process.env.GOOGLE_MAPS_API_KEY,
                radius: 100
            },
        });

        const results = response.data.results || [];

        if(results.length === 0){
            throw new Error('No nearby places found');
        }

        const limitedResults = results.slice(0, 4);
        console.log('limitedResults ', limitedResults);

        const nearbyPlaces = limitedResults.map((result) => ({
            name: result.name,
            address: result.vicinity,
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng
        }));

        return nearbyPlaces;
    } catch(err){
        console.error("Error fetching nearby places",err);
        throw new Error('Error fetching nearby places');
    }
}