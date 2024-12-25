import React from 'react';
import CarLogo from "../assets/uber_car.png";
import { Link } from 'react-router-dom';

const Riding = () => {
  return (
    <div className='h-screen'>
        <Link to={'/home'} className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="text-lg font-medium ri-home-9-fill"></i>
        </Link>
        <div className='h-1/2'>
            <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" />    
        </div>    
        <div className='h-1/2 p-4'>
            <div className='flex items-center justify-between'>
                <img src={CarLogo} className='h-12' />
                <div className='text-right'>
                    <h2 className='text-lg font-medium'>Bhavik</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>HR 26 AB 1234</h4>
                    <p className='text-sm font-medium text-gray-600'>Maruti Suzuki Alto</p>
                </div>
            </div>
    
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-lg ri-square-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>A 9/11 Gate 3</h3>
                        <p className='text-gray-600 text-sm'>New Gupta Colony, New Delhi</p>    
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                    <i className="text-lg ri-bank-card-2-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>₹193.20</h3>
                        <p className='text-gray-600 text-sm'>Cash</p>    
                    </div>
                </div>
            </div>    
            </div> 
            <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Pay for Ride</button>
        </div>
    </div>
  )
}

export default Riding
