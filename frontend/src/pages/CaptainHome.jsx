import React, { useRef, useState, useEffect, useContext } from 'react';
import CarLogo from "../assets/uber_car.png";
import { Link, useHref, useLocation } from 'react-router-dom';
import UberLogo from "../assets/uber_driver_logo.png";
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import MapView from "../components/MapView";
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/captainContext';

const CaptainHome = () => {

  const [ridePopupPanel, setridePopupPanel] = useState(false)
  const [ConfirmridePopupPanel, setConfirmridePopupPanel] = useState(false)
  const [ride, setride] = useState(null)

  const ridePopupPanelRef = useRef(null)
  const ConfirmridePopupPanelRef = useRef(null)

  const { socket } = useContext(SocketContext);
  const location = useLocation();
  const { captain } = location.state || {};
   
  useEffect(() => {
    if (captain && captain._id) {
      socket.emit('join', {
        userId: captain._id,
        userType: 'captain',
      });
    } else {
      console.error('Captain data is not available');
      return;
    }

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: latitude,
              lng: longitude,
            },
          });
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    const locationInterval = setInterval(updateLocation, 90000000);
    updateLocation();

    return () => clearInterval(locationInterval);
  }, [socket, captain]);

  socket.on('new-ride', (data) => {
    console.log('New ride data received:', data);
  })
 
  useGSAP(function(){
    if(ridePopupPanel){
        gsap.to(ridePopupPanelRef.current, {
            transform : 'translateY(0)'
        })
    }
    else{
        gsap.to(ridePopupPanelRef.current, {
            transform : 'translateY(100%)'
        })
    }
  }, [ridePopupPanel])

  useGSAP(function(){
    if(ConfirmridePopupPanel){
        gsap.to(ConfirmridePopupPanelRef.current, {
            transform : 'translateY(0)'
        })
    }
    else{
        gsap.to(ConfirmridePopupPanelRef.current, {
            transform : 'translateY(100%)'
        })
    }
  }, [ConfirmridePopupPanel])

  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src={UberLogo} />
        <Link to={'/captain/logout'} className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-3/5'>
          <MapView /> 
      </div>    
      <div className='h-2/5 p-6'>
        <CaptainDetails />
      </div>              

      <div ref={ridePopupPanelRef} className="fixed w-full z-10 bottom-0 transalate-y-full bg-white p-3 py-10 pt-12">
        <RidePopUp ride={ride} setridePopupPanel = {setridePopupPanel} setConfirmridePopupPanel = {setConfirmridePopupPanel}/>
      </div>                    
      <div ref={ConfirmridePopupPanelRef} className="fixed w-full z-10 bottom-0 transalate-y-full bg-white p-3 py-10 pt-12">
        <ConfirmRidePopUp setConfirmridePopupPanel = {setConfirmridePopupPanel} setridePopupPanel = {setridePopupPanel} />
      </div>                    
    </div>
  )
}

export default CaptainHome
