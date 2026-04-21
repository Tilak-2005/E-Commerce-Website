import React from 'react'
import Title from '../components/Title'
import NewsLetterBox from '../components/NewsLetterBox'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1 = {'ABOUT'} text2 = {'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full md:max-w-112.5' alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi asperiores corporis obcaecati nulla, labore id minima, accusantium assumenda tempore deserunt repudiandae ad esse saepe eligendi.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem laborum quisquam, blanditiis error fugiat quod nobis repellendus aut modi, illum aliquam consequuntur atque quae nihil?</p>
        <b className='text-gray-800'>OUR MISSION</b>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non dignissimos consectetur ipsa minus, nihil consequatur autem assumenda porro dolorum at repellat enim dicta veniam officiis? Quia sunt quo expedita suscipit?</p>
        </div>
      </div>

      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>QUALITY ASSURANCE:</b>
              <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ullam quos repellendus tempore aspernatur? Quisquam assumenda ratione molestiae ut exercitationem nesciunt modi quaerat architecto dolorem?</p>
            </div>
             <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>CONVINIENC:</b>
              <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ullam quos repellendus tempore aspernatur? Quisquam assumenda ratione molestiae ut exercitationem nesciunt modi quaerat architecto dolorem?</p>
            </div>
             <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>EXCEPTIONAL CUSTOMER SERVICE:</b>
              <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ullam quos repellendus tempore aspernatur? Quisquam assumenda ratione molestiae ut exercitationem nesciunt modi quaerat architecto dolorem?</p>
            </div>
      </div>


      <NewsLetterBox />

    </div>
  )
}

export default About
