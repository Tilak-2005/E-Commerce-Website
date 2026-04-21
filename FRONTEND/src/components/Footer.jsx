import React from 'react'
import {assets} from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-column sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-40 my-10 text-sm'>
        <div >
            <img src={assets.logo} className = 'mb-5 w-32' alt="" srcset="" />
            <p className='text-gray-600 w-full md:w-2/3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, molestias, dignissimos officia ducimus necessitatibus architecto voluptatibus cupiditate repellendus vitae quis quisquam aliquam nobis suscipit. Dolorem dolore nostrum, deleniti pariatur ipsa officiis dolor quis voluptate provident vero aspernatur aliquam animi minus reiciendis necessitatibus facilis maxime cumque culpa, eos fugit voluptatibus aperiam?</p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>HOME</li>
                <li>ABOUT US</li>
                <li>DELIVERY</li>
                <li>PRIVACY POLICY</li>
            </ul>
        </div>

<div>
    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
      <ul className='flex flex-col gap-1 text-gray-600'>
        <li>+91-1234567890</li>
        <li>EXAMPLE123@GMAIL.COM</li>
      </ul>
</div>

      </div>

    <div>
        <hr />
        <p className='py-5 text-sm text-center '>COPYRIGHT 2026 @ABHAVA.COM-ALL RIGHTS RESERVED</p>
    </div>

    </div>
  )
}

export default Footer
