import React, { useContext, useEffect, useState } from 'react'
import { captainDataContext } from "../context/captainContext";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const CaptainProtectWrapper = ({
    children
}) => {
    
    const token = localStorage.getItem('token');
    const { captain, setCaptain } = useContext(captainDataContext);
    const [ isLoading, setIsLoading ] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if(!token) {
            navigate('/captain-login');
        }
    }, [ token ]);

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200) {
            setCaptain(response.data.captain);
            setIsLoading(false);
        }
    })
        .catch(error => {
            console.log(error);
            localStorage.removeItem('token');
            navigate('/captain-login');
        })

    if (isLoading) {
        return (
            <div>
                Loading...
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
