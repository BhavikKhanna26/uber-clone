import React, { useRef, useState } from 'react';
import CarLogo from "../assets/uber_car.png";
import { Link, useHref } from 'react-router-dom';
import UberLogo from "../assets/uber_driver_logo.png";
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import MapView from "../components/MapView";

const CaptainHome = () => {

  const [ridePopupPanel, setridePopupPanel] = useState(true)
  const [ConfirmridePopupPanel, setConfirmridePopupPanel] = useState(false)

  const ridePopupPanelRef = useRef(null)
  const ConfirmridePopupPanelRef = useRef(null)

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
        <RidePopUp setridePopupPanel = {setridePopupPanel} setConfirmridePopupPanel = {setConfirmridePopupPanel}/>
      </div>                    
      <div ref={ConfirmridePopupPanelRef} className="fixed w-full z-10 bottom-0 transalate-y-full bg-white p-3 py-10 pt-12">
        <ConfirmRidePopUp setConfirmridePopupPanel = {setConfirmridePopupPanel} setridePopupPanel = {setridePopupPanel} />
      </div>                    
    </div>
  )
}

export default CaptainHome
