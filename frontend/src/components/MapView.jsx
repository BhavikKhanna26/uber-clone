import { Marker, Popup, TileLayer, MapContainer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react'

const MapView = (props) => {

  const [currentCoor, setcurrentCoor] = useState({});

  const getCurrentLocation = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setcurrentCoor({ lat: lat, lng: lng });
        return { lat, lng };
      }, function(error) {
        console.error('Error retrieving location: ', error);
      });
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  if(currentCoor.lat != null && currentCoor.lng!= null){
    return (
      <MapContainer center={[currentCoor.lat, currentCoor.lng]} zoom={13} scrollWheelZoom={true} className="h-full w-full z-0">
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
              url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[currentCoor.lat, currentCoor.lng]} />
      </MapContainer>
    );
  }
  else{
    return <div>Loading...</div>
  }
};

export default MapView;
