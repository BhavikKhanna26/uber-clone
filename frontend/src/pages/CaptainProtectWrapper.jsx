import React, { useContext, useEffect, useRef, useState } from 'react'
import { captainDataContext } from "../context/captainContext";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const CaptainProtectWrapper = ({
    children
}) => {
    
    const token = localStorage.getItem('token');
    const { captain, setCaptain } = useContext(captainDataContext);
    const [ isLoading, setIsLoading ] = useState(true);
    const hasFetched = useRef(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            if(!token) {
                navigate('/captain-login');
            }

            if (hasFetched.current) return;
            hasFetched.current = true;

            try{
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                if(response.status === 200) {
                    setCaptain(response.data.captain);
                    setIsLoading(false);
                }
            }
            catch(error){
                localStorage.removeItem('token');
                navigate('/captain-login');
            }
        };
        fetchUser();
    }, [ token, navigate, setCaptain]);

    if (isLoading) {
        return (
            <div className='h-screen flex items-center justify-center'>
                <p className='text-3xl font-semibold'>Loading...</p>
            </div>
        )
    }
  
    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper
