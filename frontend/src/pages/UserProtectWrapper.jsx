import React, { useContext, useEffect, useState } from 'react'
import { userDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useRef } from 'react';

const UserProtectWrapper = ({
    children
}) => {
    
    const token = localStorage.getItem('token');
    const { user, setUser } = useContext(userDataContext);
    const [ isLoading, setIsLoading ] = useState(true);
    const hasFetched = useRef(false);

    const navigate = useNavigate();

    useEffect( () => {
        const fetchUser = async () => {
            if(!token) {
                navigate('/login');
                return;
            }

            if(hasFetched.current) return;
            hasFetched.current = true;

            try{
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if(response.status === 200) {
                    setUser(response.data.user);
                    setIsLoading(false);
                }
            } 
            catch(error) {
                console.log(error);
                localStorage.removeItem('token');
                navigate('/login');
            }
        };
        fetchUser();
    }, [ token, navigate, setUser]);


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

export default UserProtectWrapper
