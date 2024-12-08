import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/uber_logo.png";
import axios from "axios";
import { userDataContext } from "../context/userContext";

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});

    const naviagte = useNavigate();

    const {user, setUser} = useContext(userDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        
        const userData = {
            email: email,
            password: password
        }

        const response = await  axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
        if(response.status === 200) {
            const data = response.data;
            setUser(data.user);
            localStorage.setItem('token', data.token);
            naviagte('/home');
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
                <p className="text-center font-semibold text-sm font">Don't have an account?  <Link to='/signup' className="text-blue-600">Create New Account</Link></p>
        </div>
        <div>
            <Link to='/captain-login' 
            className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">Sign in as Captain</Link>
        </div>
    </div>
  );
};

export default UserLogin; 