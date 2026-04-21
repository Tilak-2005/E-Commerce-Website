import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-10 border-t'>
        <Title text1 = {'COTACT'} text2 = {'US'}/>
      </div>

    <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
      <img src={assets.contact_img} className='w-full md:max-w-120' alt="" />
      <div className='flex flex-col justify-center item-start gap-6'>
        <p className='font-semibold text-xl text-gray-600'>OUR STORE</p>
        <p className='text-gray-500'>54709 <br /> Kammanhalli, Bengaluru, India
        </p>
        <p className='text-gray-500'>PHONE : 123456789 <br /> EMAIL : ahte12345@gmail.com</p>
        <p className='text-gray-600 font-semibold text-xl'>CAREERS AT ABHAVA</p>
        <p className='text-gray-500'>LEARN MORE ABOUT OUR TEAM AND JOP-OPENINGS</p>
        <button className=' w-30 h-20 border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>EXPLORE JOBS</button>
      </div>
    </div>
    <NewsLetterBox />
    </div>
  )
}

export default Contact
