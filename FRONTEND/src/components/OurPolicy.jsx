import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center text-xs sm:text-sm md:text-base py-20 text-gray-700'>
      

        <div>
            <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>EASY EXCHANGE POLICY</p>
            <p text-gray-400>WE OFFER HASSLE FREE EXCHANGE POLICY</p>
        </div>

         <div>
            <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>7-DAYS RETURN POLICY</p>
            <p text-gray-400>WE PROVIDE 7 DAYS FREE-RETURN POLICY</p>
        </div>

         <div>
            <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>BEST CUSTOMER SUPPORT</p>
            <p text-gray-400>WE PROVIDE 24X7 CUSTOMER SUPPORT</p>
        </div>

    </div>
  )
}

export default OurPolicy
