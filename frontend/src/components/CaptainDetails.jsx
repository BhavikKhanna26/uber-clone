import React from 'react'

const CaptainDetails = () => {
  return (
    <div>
      <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start gap-3'>
            <img className='h-10 w-10 rounded-full object-cover' src="https://static.boredpanda.com/blog/wp-content/uploads/2017/04/Virrappan2-58f79980ae6fb__880.jpg" alt="" />
            <h4 className='text-lg font-medium'>Bhavik Khanna</h4>
          </div>
          <div>
            <h4 className='text-xl font-semibold'>₹295.20</h4>
            <p className='text-sm text-gray-600'>Earned</p>
          </div>
        </div>
        <div className='flex p-3 mt-6 bg-gray-200 rounded-xl justify-center gap-5 items-start'>
          <div className='text-center'>
            <i className="text-3xl mb-2 font-extralight ri-time-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
            <i className="text-3xl mb-2 font-extralight ri-speed-up-fill"></i>
            <h5 className='text-lg font-medium'>30 km</h5>
            <p className='text-sm text-gray-600'>Total Distance</p>
          </div>
          <div className='text-center'>
            <i className="text-3xl mb-2 font-extralight ri-booklet-fill"></i>
            <h5 className='text-lg font-medium'>20</h5>
            <p className='text-sm text-gray-600'>Total Jobs</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails
