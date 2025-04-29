import { Marker, Popup, TileLayer, MapContainer, ZoomControl, useMap } from 'react-leaflet'
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

  const pickupCoords =
    props.PickupData?.lat && props.PickupData?.lng
      ? {
          lat: parseFloat(props.PickupData.lat),
          lng: parseFloat(props.PickupData.lng),
        }
      : null;

  const mapCenter = pickupCoords || currentCoor;

  const zoomLevel = mapCenter.lat && mapCenter.lng ? 13 : 5;

  const mapZIndex = props.panelOpen ? 0 : 0;

  if(mapCenter.lat != null && mapCenter.lng!= null){
    return (
      <MapContainer center={[mapCenter.lat, mapCenter.lng]} zoom={zoomLevel} scrollWheelZoom={true} className={`h-full w-full z-${mapZIndex}`} zoomControl={false}>
          <ZoomControl position="bottomright"/>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
              url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[mapCenter.lat, mapCenter.lng]} />
      </MapContainer>
    );
  }
  else{
    return (
      <div className='h-screen flex items-center justify-center'>
        < p className='text-3xl font-semibold'>Loading...</p>
      </div>
    )
  }
};

export default MapView;
