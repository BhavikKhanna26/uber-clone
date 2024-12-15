import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { captainDataContext } from "../context/captainContext";
import Logo from "../assets/uber_driver_logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainSignup = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [captainData, setCaptainData] = useState({});
    const [capcaity, setCapacity] = useState('');
    const [VehicleColor, setVehicleColor] = useState('');
    const [VehicleType, setVehicleType] = useState('');
    const [PlateNumber, setPlateNumber] = useState('');
    const [VehicleCapacity, setVehicleCapacity] = useState('');


    const {captain, setCaptain} = useContext(captainDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const captainData = {
            fullname:{
                firstname:firstname,
                lastname:lastname
            },
            email:email,
            password:password,
            vehicle : {
                color : VehicleColor,
                plate : PlateNumber,
                capacity : VehicleCapacity,
                vehicleType : VehicleType
            }
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);

        if(response.status === 201) {
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem('token', data.token);
            navigate('/captain-home');
        }

        setEmail('');
        setfirstname('');
        setlastname('');
        setPassword('');
        setVehicleColor('');
        setVehicleCapacity('');
        setVehicleType('');
        setPlateNumber('');
    }

  return ( 
    <div className="p-7 flex justify-between flex-col h-screen">
        <div>
            <img className="w-16 mb-2" src={Logo} alt="" />
            <form onSubmit={(e) => {submitHandler(e)}}>
                <h3 className="text-base font-medium mb-2">Enter your name</h3>
                <div className = "flex gap-3 mb-5">
                    <input 
                    required 
                    className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm" 
                    type="text" 
                    placeholder="First Name"
                    value = {firstname}
                    onChange={(e) => setfirstname(e.target.value)}
                    />

                    <input 
                    required 
                    className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm" 
                    type="text" placeholder="Last Name"
                    value = {lastname}
                    onChange={(e) => setlastname(e.target.value)}
                    />
                </div>

                <h3 className="text-base font-medium mb-2">Enter your email</h3>
                <input 
                required 
                className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm" 
                type="email" placeholder="youremail@example.com"
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <h3 className="text-base font-medium mb-2">Enter Password</h3>
                <input 
                required 
                className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm" 
                type="password" placeholder="password"
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <h3 className="text-base font-medium mb-2">Enter Vehicle Information</h3>
                <div className = "flex flex-wrap gap-3 mb-3">
                    <input 
                    required 
                    className="bg-[#eeeeee] w-[calc(51.5%-0.75rem)] rounded px-4 py-2 border text-base placeholder:text-sm" 
                    type="text" 
                    placeholder="Vehicle Color"
                    value = {VehicleColor}
                    onChange={(e) => setVehicleColor(e.target.value)}
                    />

                    <input 
                    required 
                    className="bg-[#eeeeee] w-[calc(51.5%-0.75rem)] rounded px-4 py-2 border text-base placeholder:text-sm" 
                    type="text" placeholder="Plate Number"
                    value = {PlateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                    />

                    <div className = "flex gap-3 mb-5">
                    

                    <input 
                    required 
                    className="bg-[#eeeeee] w-[calc(51.5%-0.75rem)] rounded px-4 py-2 border text-base placeholder:text-sm" 
                    type="number" placeholder="Vehicle Capacity"
                    value = {VehicleCapacity}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^[1-9]$/.test(value) || value === '') {
                            setVehicleCapacity(value);
                          }
                    }}
                    />

                    <select
                    required 
                    className="bg-[#eeeeee] w-[calc(51.5%-0.75rem)] rounded px-4 py-2 border text-sm truncate"
                    value = {VehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    >
                        <option value = "" disabled className="text-xs">Select Vehicle Type</option>
                        <option value="car" className="text-xs">Car</option>
                        <option value="auto" className="text-xs">Auto</option>
                        <option value="moto" className="text-xs">Motocycle</option>
                    </select>
                </div>
                </div>

                <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">Create Account</button>  

            </form>
                <p className="text-center font-semibold text-sm font">Already have an account?  <Link to='/captain-login' className="text-blue-600">Login</Link></p>
        </div>
        <div>
            <p className="text-[10px] leading-tight">the site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and <span className="underline">Terms of Service</span> apply</p>
        </div>
    </div>
  );
};

export default CaptainSignup; 