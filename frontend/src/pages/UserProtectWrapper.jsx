import React, { useContext, useEffect, useState } from 'react'
import { userDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const UserProtectWrapper = ({
    children
}) => {
    
    const token = localStorage.getItem('token');
    const { user, setUser } = useContext(userDataContext);
    const [ isLoading, setIsLoading ] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if(!token) {
            navigate('/login');
        }
    }, [ token ]);
  
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200) {
            setUser(response.data.user);
            setIsLoading(false);
        }
    })
        .catch(error => {
            console.log(error);
            localStorage.removeItem('token');
            navigate('/login');
        })

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
