import React, {useContext} from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/uber_driver_logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { captainDataContext } from "../context/captainContext";

const CaptainLogin = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {captain, setCaptain} = useContext(captainDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const captain = {
            email: email,
            password: password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);

        if(response.status === 200) {
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem('token', data.token);
            navigate('/captain-home');
        }
        
        setEmail('');
        setPassword('');
    }

    return ( 
    <div className="p-7 flex justify-between flex-col h-screen">
        <div>
            <img className="w-16 mb-10" src={Logo} alt="" />
            <form onSubmit={(e) => {submitHandler(e)}}>
                <h3 className="text-lg font-medium mb-2">What's your email?</h3>
                <input 
                value={email} onChange={(e) => setEmail(e.target.value)} 
                required 
                className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" 
                type="email" placeholder="youremail@example.com"/>

                <h3 className="text-lg font-medium mb-2">Enter Password</h3>
                <input 
                value={password} onChange={(p) => setPassword(p.target.value)}
                required 
                className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" 
                type="password" placeholder="password"/>

                <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">Login</button>  

            </form>
                <p className="text-center font-semibold text-sm font">Join the fleet?  <Link to='/captain-signup' className="text-blue-600">Register as a Captain</Link></p>
        </div>
        <div>
            <Link to='/login' 
            className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">Sign in as User</Link>
        </div>
    </div>
  );
};

export default CaptainLogin; 