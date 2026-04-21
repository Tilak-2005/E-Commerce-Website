import React, { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import Title from './Title.jsx'
import ProductItem from './ProductItem.jsx'
import {Link} from 'react-router-dom'

const LatestCollection = () => {

  const { products } = useContext(ShopContext)
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 10))
    }
  }, [products])

  return (
    <div className='my-10 px-5 md:px-10 lg:px-20'>
      
      <div className='text-center py-8 text-3xl'>
        <Title text1="LATEST" text2="COLLECTION" />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          PLACE WHERE YOU MEET THE FASHION AND FASHION MEETS YOU
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestProducts.map((item,index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        }
      </div>

    </div>
  )
}

export default LatestCollection
