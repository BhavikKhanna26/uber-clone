import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/uber_logo.png";

const Home = () => {
  return ( 
    <div>
        <div className="bg-cover bg-center bg-[url(https://images.pexels.com/photos/889830/pexels-photo-889830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] h-screen pt-5 flex justify-between flex-col w-full bg-red-700">
            <img className="w-14 ml-7" src={Logo} alt="" />
            <div className="bg-white pb-7 py-4 px-4">
                <h2 className="text-3xl font-bold">Get Started with Uber</h2>
                <Link to='/login' className="flex items-center justify-center text-2xl w-full bg-black text-white py-3 rounded mt-5 font-sans">Continue</Link>
            </div>
        </div>
    </div>
  );
};

export default Home; 