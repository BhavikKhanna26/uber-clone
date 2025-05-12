import React from 'react';

const RidePopUp = (props) => {
    console.log(props.ride);
  return (
    <div>
      <h5 className="p-1 text-center absolute w-[94%] top-0" onClick={ () => {
            props.setridePopupPanel(false);
        }} ><i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i></h5>

        <h2 className="font-semibold text-center flex justify-between text-2xl mb-8">New Ride Available!</h2>

        <div className='flex items-center justify-between p-3 rounded-lg bg-yellow-100'>
            <div className='flex items-center gap-3'>
                <img className='h-12 w-12 rounded-full object-cover' src="https://people.com/thmb/CmROfB5Fw4H3oJmGwr7qJTGDCGg=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(509x0:511x2)/people-headshot-lindsay-kimble-9855440283c440159d1684a4befaa97d.jpg" alt="" />
                <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname + ' ' + props.ride?.user.fullname.lastname}</h2>
            </div>
            <h5 className='text-lg font-semibold'>2.2 KM</h5>
        </div>

        <div className='flex gap-2 justify-between flex-col items-center'>
          <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-3 border-b-2'>
                <i className="text-lg ri-map-pin-2-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>{props.ride?.pickup}</h3>
                </div> 
            </div>
            <div className='flex items-center gap-5 p-3 border-b-2'>
                <i className="text-lg ri-square-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>{props.ride?.destination}</h3>
                </div>
            </div>
            <div className='flex items-center gap-5 p-3'>
                <i className="text-lg ri-bank-card-2-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                    <p className='text-gray-600 text-sm'>Cash</p>    
                </div>
            </div>
        </div>
            <button onClick={ () => {
                props.setConfirmridePopupPanel(true);
            } } className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'> Confirm </button>    
            <button onClick={ () => {
                props.setridePopupPanel(false);
            } } className='w-full mt-1 bg-gray-400 text-gray-700 font-semibold p-2 rounded-lg'> Ignore </button>    
        </div> 
    </div>
  )
}

export default RidePopUp
