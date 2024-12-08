import React, {useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/uber_logo.png";
import axios from "axios";
import { userDataContext } from "../context/userContext";

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [userData, setUserData] = useState({});

    const navigate = useNavigate();

    const {user, setUser} = useContext(userDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newUser = {
            fullname:{
                firstname:firstname,
                lastname:lastname
            },
            email:email,
            password:password
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

        if(response.status === 201) {
            const data = response.data;
            setUser(data.user);
            localStorage.setItem('token', data.token);
            navigate('/home');
        }

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

                <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">Create Account</button>  

            </form>
                <p className="text-center font-semibold text-sm font">Already have an account?  <Link to='/login' className="text-blue-600">Login</Link></p>
        </div>
        <div>
            <p className="text-[10px] leading-tight">the site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and <span className="underline">Terms of Service</span> apply</p>
        </div>
    </div>
  );
};

export default UserSignup; 