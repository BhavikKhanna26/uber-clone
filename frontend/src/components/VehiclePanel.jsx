import React, { useEffect, useState } from 'react';
import CarLogo from "../assets/uber_car.png";
import MotoIcon from "../assets/uber_moto.png";
import AutoIcon from "../assets/uber_auto.png";

const VehiclePanel = (props) => {

    return (
    <div>
      <h5 className="p-1 text-center absolute w-[94%] top-0" onClick={ () => {
                props.setVehiclePanelOpen(false);
            }} ><i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i></h5>
                <h2 className="font-semibold text-xl mb-5">Choose your ride</h2>
                <div onClick={ () => {
                    if(props.Fares.car === null) return;
                    props.setConfirmRidePanel(true);
                    props.setVehiclePanelOpen(false);
                    props.setMyFare(props.Fares.car);
                    props.setVehicleMode('car');
                }} className={`flex border-2 mb-2 active:border-black rounded-xl w-full p-3 items-center justify-between ${props.Fares.car === null ? 'pointer-events-none opacity-50' : 'active:border-black'}`}> 
                    <img className="h-12 pr-3" src={CarLogo} />
                    <div className="w-1/2">
                        <h4 className="font-semibold text-lg pl-[0.1%] mb-[0.1%]">UberGo <span><i className="ri-user-3-fill pl-[0.1%]"></i>4</span></h4>
                        <h5 className="font-medium text-sm">5 mins away</h5>
                        <p className="font-normal text-xs text-gray-700">Affordable, compact rides</p>
                    </div>
                    <h2 className="text-lg font-semibold pl-2">{props.Fares.car ? `₹${props.Fares.car}` : "Not Available"}</h2>
                </div>
                <div onClick={ () => {
                    if(props.Fares.moto === null) return;
                    props.setConfirmRidePanel(true);
                    props.setVehiclePanelOpen(false);
                    props.setMyFare(props.Fares.moto);
                    props.setVehicleMode('moto');
                }} className={`flex border-2 mb-2 active:border-black rounded-xl w-full p-3 items-center justify-between ${props.Fares.moto === null ? 'pointer-events-none opacity-50' : 'active:border-black'}`}> 
                    <img className="h-12 pr-2" src={MotoIcon} />
                    <div className="w-1/2">
                        <h4 className="font-semibold text-lg pl-[0.1%] mb-[0.1%]">Moto <span><i className="ri-user-3-fill pl-[0.1%]"></i>1</span></h4>
                        <h5 className="font-medium text-sm">4 mins away</h5>
                        <p className="font-normal text-xs text-gray-700">Affordable motocycle rides</p>
                    </div>
                    <h2 className="text-lg font-semibold pl-2">{props.Fares.moto ? `₹${props.Fares.moto}` : "Not Available"}</h2>
                </div>
                <div onClick={ () => {
                    if(props.Fares.auto === null) return;
                    props.setConfirmRidePanel(true);
                    props.setVehiclePanelOpen(false);
                    props.setMyFare(props.Fares.auto);
                    props.setVehicleMode('auto');
                }} className={`flex border-2 mb-2 active:border-black rounded-xl w-full p-3 items-center justify-between ${props.Fares.auto === null ? 'pointer-events-none opacity-50' : 'active:border-black'}`}> 
                    <img className="h-12 pr-2" src={AutoIcon} />
                    <div className="w-1/2">
                        <h4 className="font-semibold text-lg pl-[0.1%] mb-[0.1%]">Uber Auto <span><i className="ri-user-3-fill pl-[0.1%]"></i>1</span></h4>
                        <h5 className="font-medium text-sm">3 mins away</h5>
                        <p className="font-normal text-xs text-gray-700">No bargaining, <br /> doorstep pick-up</p>
                    </div>
                    <h2 className="text-lg font-semibold pl-2">{props.Fares.auto ? `₹${props.Fares.auto}` : "Not Available"}</h2>
                </div>
    </div>
  )
}

export default VehiclePanel
