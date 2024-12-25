import React from 'react'

const LocationSearchPanel = (props) => {

    // sample array of locations
    const locations = [
        "My office, Cyber Hub, Gurgaon, Haryana, India",
        "Your House, Phase 4, Gurgaon, Haryana, India",
        "His Park, Sector 56, Gurgaon, Haryana, India",
        "Her Shop, Cyber Hub, Sector 23, Gurgaon, Haryana, India"
    ];

    return (
        <div>
            {/* this is just a sample data */}

            {
                locations.map(function(elem, index){
                    return <div onClick={ () => {
                        props.setVehiclePanelOpen(true);
                        props.setPanelOpen(false);
                    }} key = {index} className='flex gap-4 border-2 p-1.5 rounded-xl border-gray-50 active:border-black items-center my-2 justify-start'>
                    <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center p-3 rounded-full'><i className="ri-map-pin-2-fill text-xl"></i></h2>
                    <h4 className='font-medium'>{elem}</h4>
                    </div>
                })
            }

        </div>
  )
}

export default LocationSearchPanel
