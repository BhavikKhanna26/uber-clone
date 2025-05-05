import React from 'react';
import CarLogo from "../assets/uber_car.png";

const LookingForDriver = (props) => {
  return (
    <div>
          <h5 className="p-1 text-center absolute w-[94%] top-0" onClick={ () => {
                    props.setVehicleFound(false);
            }} ><i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i></h5>
    
            <h2 className="font-semibold text-center text-2xl mb-5">Looking for nearby drivers</h2>
    
            <div className='flex gap-2 justify-between flex-col items-center'>
                <img src={CarLogo} className='h-20' />
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-lg ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>{props.pickup}</h3>  
                    </div> 
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-lg ri-square-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>A 9/11 Gate 3</h3>
                        <p className='text-gray-600 text-sm'>{props.destination}</p>    
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                    <i className="text-lg ri-bank-card-2-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>{`₹${props.myFare}`}</h3>
                        <p className='text-gray-600 text-sm'>Cash</p>    
                    </div>
                </div>
            </div>    
        </div> 
    </div>
  )
}

export default LookingForDriver
