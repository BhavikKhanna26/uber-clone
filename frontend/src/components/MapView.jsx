import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer
} from '@react-google-maps/api';

const MapView = (props) => {
  const [currentCoor, setCurrentCoor] = useState(null);
  const [directions, setDirections] = useState(null);

  // Function to get the current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCurrentCoor({ lat, lng });
        },
        function (error) {
          console.error('Error retrieving location: ', error);
        }
      );
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);


  const pickupCoords =
    props.PickupData?.lat && props.PickupData?.lng
      ? {
          lat: parseFloat(props.PickupData.lat),
          lng: parseFloat(props.PickupData.lng)
        }
      : null;

  const destCoords =
    props.DestinationData?.lat && props.DestinationData?.lng
      ? {
          lat: parseFloat(props.DestinationData.lat),
          lng: parseFloat(props.DestinationData.lng)
        }
      : null;

  const center = pickupCoords || currentCoor;

  useEffect(() => {
    if (pickupCoords && destCoords) {
      setDirections(null); 
    }
  }, [pickupCoords, destCoords]);

  const handleDirectionsCallback = (response) => {
    if (response.status === 'OK') {
      setDirections(response);  
    }
  };

  if (!center) return <div>Loading...</div>;  

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}  
        zoom={13}  
        options={{
          fullscreenControl: false,
          zoomControl: true, 
          streetViewControl: false,
          mapTypeControl: false
        }}
      >

        {center && <Marker position={center} />}

        {destCoords && <Marker position={destCoords} />}

        {pickupCoords && destCoords && (
          <DirectionsService
            options={{
              origin: pickupCoords,
              destination: destCoords,
              travelMode: 'DRIVING'
            }}
            callback={handleDirectionsCallback}
          />
        )}

        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true 
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;
