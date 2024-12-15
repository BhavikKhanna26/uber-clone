import React, { useRef, useState } from "react";
import Logo from "../assets/uber_logo.png";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'

const Home = () => {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);
    const submitHandler = (e) => {
        e.preventDefault();

    }

    useGSAP(function(){
        if(panelOpen){
            gsap.to(panelRef.current, {
                height : '70%'
            })
            gsap.to(panelCloseRef.current, {
                opacity : 1
            })
        }
        else{
            gsap.to(panelRef.current, {
                height : '0%'
            })
            gsap.to(panelCloseRef.current, {
                opacity : 0
            })
        }
    }, [panelOpen])


    return (
        <div className="h-screen relative">
            <img className="w-16 absolute left-5 top-3" src={Logo}/>
            <div className="h-screen w-screen">
                {/* Image for temporary use */}
                <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" />
            </div>
            <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
                <div className="h-[30%] p-5 bg-white relative">
                    <h5 ref={panelCloseRef} onClick={() => {
                        setPanelOpen(false);
                    }} className="absolute top-6 right-6 text-2xl">
                        <i class="ri-arrow-down-wide-fill"></i>
                    </h5>
                    <h4 className="text-2xl font-semibold">Find a trip</h4>
                    <form onSubmit={(e) => {
                        submitHandler(e);
                    }}>
                        <div className="line absolute h-[19%] w-1 top-[39%] bg-gray-900 left-10 rounded-full"></div>
                        <i className="ri-circle-line absolute left-[8.59%] top-[31%]"></i>
                        <input 
                        onClick={() => {
                            setPanelOpen(true);
                        }}
                        className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5" 
                        value={pickup}
                        onChange={(e) => {
                            setPickup(e.target.value)
                        }}
                        type="text" 
                        placeholder="Add a pick-up location" />

                        <i className="ri-square-line absolute left-[8.59%] top-[56%]"></i>
                        <input 
                        className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3" 
                        onClick={() => {
                            setPanelOpen(true);
                        }}
                        type="text"
                        value={destination}
                        onChange={(e) => {
                            setDestination(e.target.value)
                        }} 
                        placeholder="Enter your destination" />
                    </form>
                </div>
                <div ref={panelRef} className=" bg-red-500 h-0">

                </div>
            </div>
        </div>
    );
};

export default Home;