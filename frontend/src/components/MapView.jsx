import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { Polyline } from 'leaflet';

const MapView = (props) => {
  const [currentCoor, setCurrentCoor] = useState({});
  const [directions, setDirections] = useState(null);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCurrentCoor({ lat, lng });
      }, function(error) {
        console.error('Error retrieving location: ', error);
      });
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const pickupCoords = props.PickupData?.lat && props.PickupData?.lng ? { lat: parseFloat(props.PickupData.lat), lng: parseFloat(props.PickupData.lng) } : null;
  const destCoords = props.DestinationData?.lat && props.DestinationData?.lng ? { lat: parseFloat(props.DestinationData.lat), lng: parseFloat(props.DestinationData.lng) } : null;

  const center = pickupCoords || currentCoor;

  const handleDirectionsCallback = (response) => {
    if (response.status === 'OK') {
      setDirections(response);
    }
  };

  useEffect(() => {
    if (pickupCoords && destCoords) {
      setDirections(null); 
    }
  }, [pickupCoords, destCoords]);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={13}
        options={{
          fullscreenControl: false,
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false
        }}
      >
        <Marker position={center} />
        {center && <Marker position={center} />}
        {destCoords && <Marker position={destCoords} />}

        {center && destCoords && (
          <DirectionsService
            options={{
              origin: center,
              destination: destCoords,
              travelMode: 'DRIVING',
            }}
            callback={handleDirectionsCallback}
          />
        )}

        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true,
            }}
          />
        )}

        {center && destCoords && (
          <Polyline
            path={[center, destCoords]}
            options={{
              strokeColor: '#FF0000',
              strokeWeight: 3,
              strokeOpacity: 2,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;
