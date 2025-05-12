import React, { useContext, useEffect, useRef, useState } from "react";
import Logo from "../assets/uber_logo.png";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import 'leaflet/dist/leaflet.css';
import MapView from "../components/MapView";
import axios from 'axios';
import { SocketContext } from "../context/SocketContext";
import { userDataContext } from "../context/userContext";

const Home = () => {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);
    const vehiclePanelRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const vehcileFoundRef = useRef(null);
    const waitingForDriverRef = useRef(null);
    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);
    const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const [vehicleFound, setVehicleFound] = useState(false);
    const [waitingForDriver, setWaitingForDriver] = useState(false);
    const [locationMode, setlocationMode] = useState(null);
    const [PickupData, setPickupData] = useState({});
    const [DestinationData, setDestinationData] = useState({});
    const [vehicleType, setVehicleMode] = useState(null);
    const [myFare, setMyFare ] = useState(null);
    const [Fares, setFares] = useState({
        car: null,
        moto: null,
        auto: null
    });

    const { sendMessage, recieveMessage } = useContext(SocketContext);
    const { socket } = useContext(SocketContext);
    const { user } = useContext(userDataContext);

    useEffect(() => {
        if(!user) return;
        
        sendMessage("join", { userType: "user", userId : user._id})
    }, [user]);

    socket.on('ride-confirmed', (data) => {
        setWaitingForDriver(true);
    })

    const submitHandler = (e) => {
        e.preventDefault();

    }

    useGSAP(function(){
        if(panelOpen){
            gsap.to(panelRef.current, {
                height : '80%',
                padding : 24
            })
            gsap.to(panelCloseRef.current, {
                opacity : 1
            })
        }
        else{
            gsap.to(panelRef.current, {
                height : '4%',
                padding : 5
            })
            gsap.to(panelCloseRef.current, {
                opacity : 0
            })
        }
    }, [panelOpen])


    useGSAP(function(){
        if(vehiclePanelOpen){
            gsap.to(vehiclePanelRef.current, {
                transform : 'translateY(0)'
            })
        }
        else{
            gsap.to(vehiclePanelRef.current, {
                transform : 'translateY(100%)'
            })
        }
    }, [vehiclePanelOpen])

    useGSAP(function(){
        if(vehicleFound){
            gsap.to(vehcileFoundRef.current, {
                transform : 'translateY(0)'
            })
        }
        else{
            gsap.to(vehcileFoundRef.current, {
                transform : 'translateY(100%)'
            })
        }
    }, [vehicleFound])    

    useGSAP(function(){
        if(confirmRidePanel){
            gsap.to(confirmRidePanelRef.current, {
                transform : 'translateY(0)'
            })
        }
        else{
            gsap.to(confirmRidePanelRef.current, {
                transform : 'translateY(100%)'
            })
        }
    }, [confirmRidePanel])

    useGSAP(function(){
        if(waitingForDriver){
            gsap.to(waitingForDriverRef.current, {
                transform : 'translateY(0)'
            })
        }
        else{
            gsap.to(waitingForDriverRef.current, {
                transform : 'translateY(100%)'
            })
        }
    }, [waitingForDriver])
    
    const fetchFare = async (pickup, destination) => {
        if (!pickup || !destination) return;
    
        const vehicleTypes = ['car', 'moto', 'auto'];
        const fareData = {};

        for (const type of vehicleTypes) {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/ride/getRideFare?pickup=${pickup}&destination=${destination}&vehicleType=${type}`,
                    {
                      method: 'GET',
                      headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                      },
                    }
                  );                  
                const data = await response.json();
                fareData[type] = data.fare || null;
            } catch (err) {
                console.error(err);
                fareData[type] = null;
            }
        }
    
        setFares(fareData);
    };

    async function createRide() {
        console.log("Creating ride with fare: ", myFare);
        const response = await axios.post('http://localhost:3000/ride/create', {
            pickup,
            destination,
            vehicleType
        }, {
            headers: {
                'Authorization': 'bearer '+ localStorage.getItem('token')
            }
        })
    }

    return (
        <div className="h-screen relative overflow-hidden">
            <img className="w-16 absolute left-5 top-3" src={Logo}/>
            <div className="relative h-screen w-screen">
                <MapView  
                    PickupData={PickupData} 
                    DestinationData={DestinationData}
                    panelOpen={panelOpen}
                />    
            </div>

            <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
                <div className="h-[23.5%] p-5 bg-white relative">
                    <h5 ref={panelCloseRef} onClick={() => {
                        setPanelOpen(false);
                    }} className="absolute top-6 right-6 text-2xl">
                        <i className="ri-arrow-down-wide-fill"></i>
                    </h5>
                    <h4 className="text-2xl font-semibold">Find a trip</h4>
                    <form onSubmit={(e) => {
                        submitHandler(e);
                    }}>
                        <div className="line absolute h-[29%] w-1 top-[63%] bg-gray-900 left-10 rounded-full"></div>
                        <i className="ri-circle-line absolute left-[8.89%] top-[50.9%]"></i>
                        <input 
                        onClick={() => {
                            setPanelOpen(true);
                        }}
                        className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5" 
                        value={pickup}
                        onChange={(e) => {
                            setPickup(e.target.value);
                            setlocationMode("pickup");
                        }}
                        type="text" 
                        placeholder="Add a pick-up location" />

                        <i className="ri-square-line absolute left-[8.89%] top-[87.9%]"></i>
                        <input 
                        className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3" 
                        onClick={() => {
                            setPanelOpen(true);
                        }}
                        type="text"
                        value={destination}
                        onChange={(e) => {
                            setDestination(e.target.value);
                            setlocationMode("destination");
                        }} 
                        placeholder="Enter your destination" 
                        />
                    </form>
                </div>
                <div ref={panelRef} className="bg-white h-0 top-0">
                    <LocationSearchPanel
                        pickup={pickup} 
                        destination={destination} 
                        setPanelOpen = {setPanelOpen} 
                        setVehiclePanelOpen = {setVehiclePanelOpen} 
                        locationMode = {locationMode}   
                        setPickupData = {setPickupData}
                        setDestinationData = {setDestinationData}
                        fetchFare = {fetchFare}
                        onLocationSelect = {(locationData) => {
                            const name = locationData?.value || locationData || ""; 
                            if(locationMode === "pickup") {
                                setPickup(name);
                            } else {
                                setDestination(name);
                            }
                        }}                        
                    />
                </div>
            </div>
        
            <div ref = {vehiclePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white p-3 py-10 pt-12">
                <VehiclePanel 
                    setConfirmRidePanel = {setConfirmRidePanel} 
                    setVehiclePanelOpen = {setVehiclePanelOpen}
                    setVehicleMode = {setVehicleMode} 
                    pickup = {pickup} 
                    destination = {destination} 
                    setMyFare = {setMyFare}
                    createRide = {createRide}
                    Fares = {Fares}
                />
            </div>

            <div ref = {confirmRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white p-3 py-6 pt-12">
                <ConfirmedRide 
                    setConfirmRidePanel = {setConfirmRidePanel}  
                    setVehicleFound = {setVehicleFound} 
                    setVehiclePanelOpen = {setVehiclePanelOpen} 
                    pickup = {pickup}
                    destination = {destination}
                    myFare = {myFare}
                    createRide = {createRide}
                />
            </div>

            <div ref={vehcileFoundRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white p-3 py-6 pt-12">
                <LookingForDriver 
                    pickup = {pickup}
                    destination = {destination}
                    myFare = {myFare}
                    setVehicleFound = {setVehicleFound} 
                />
            </div>

            <div ref={waitingForDriverRef} className="fixed w-full z-10 bottom-0 bg-white p-3 py-6 pt-12">
                <WaitingForDriver waitingForDriver = {waitingForDriver}/>
            </div>
        </div>
    );
};

export default Home;