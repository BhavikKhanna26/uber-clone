import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { captainDataContext } from "../context/captainContext";
import Logo from "../assets/uber_driver_logo.png";

const CaptainSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [captainData, setCaptainData] = useState({});

    const {captain, setCaptain} = useContext(captainDataContext);

    const submitHandler = (e) => {
        e.preventDefault();
        setCaptainData({
            fullname:{
                firstname:firstname,
                lastname:lastname
            },
            email:email,
            password:password
        });

        setEmail('');
        setfirstname('');
        setlastname('');
        setPassword('');
    }

  return ( 
    <div className="p-7 flex justify-between flex-col h-screen">
        <div>
            <img className="w-16 mb-10" src={Logo} alt="" />
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