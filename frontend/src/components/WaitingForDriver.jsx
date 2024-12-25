import React from 'react';
import CarLogo from "../assets/uber_car.png";

const WaitingForDriver = (props) => {
  return (
    <div>
            <h5 className="p-1 text-center absolute w-[94%] top-0" onClick={ () => {
                    props.setWaitingForDriver(false);
            }} ><i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i></h5>

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
                        <i className="text-lg ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-gray-600 text-sm'>India Gate, Delhi</p>    
                    </div> 
                </div>
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
    </div>
  )
}

export default WaitingForDriver
