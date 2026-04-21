import React, { useContext, useEffect , useState} from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const {productId} = useParams();
  const {products , currency , addtocart} = useContext(ShopContext)
  const [productdata, setproductdata] = useState(false)
  const [image, setimage] = useState('')
  const [size, setsize] = useState('')


  const fetchproductdata = async () => {
      products.map((item) => {
        if(item._id == productId) {setproductdata(item);
          setimage(item.image[0])
          return null;
        }
      })
  }

  useEffect(() => {
fetchproductdata()
  },[productId,products])

  return productdata ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 backdrop-opacity-100'>

      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex felx-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between  sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productdata.image.map((item,index) => (
                <img onClick={() => setimage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
              <img src={image} className='w-full h-auto ' alt="" />
          </div>
        </div>

            {/* product info */}

        <div className='flex-1 '>
            <h1 className='font-medium text-2xl mt-2'>{productdata.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />
              <p className='pl-2'>(122)</p>
            </div>

            <p className='mt-5 text-3xl font-medium'>
              {currency}{productdata.price}
            </p>

            <p className='mt-5 text-gray-500 md:w-4/5'>
              {productdata.description}
            </p>

            <div className='flex flex-col gap-4 my-8'>
              <p>SELECT SIZE</p>
              <div className='flex gap-2'>
                {productdata.sizes.map((item,index) => (
                  <button onClick={() => setsize(item)} className={`border py-2 px-4 bg-gray-100 ${item == size ? 'bg-yellow-300 opacity-90' : ''}`} key={index}>{item}</button>
                ))}
              </div>
            </div>
          <button onClick={() => addtocart(productdata._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                <p>100% ORIGINAL PRODUCT</p>
                <p>CASH ON DELIVERY IS AVAILABLE ON THIS PRODUCT</p>
                <p>EASY RETURN AND EXCHANGE POLICY WITHIN 7 DAYS</p>
          </div>
        </div>

      </div>
      
                {/* REVIEW SECTION  */}

      <div className='mt-20'>
                <div className='flex'>
                    <b className='border px-5 py-3 text-sm'>DESCRIPTION</b>
                    <p className='border px-5 py-3 text-sm'>REVIEWS (122)</p>
                </div>

                <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                  <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
                  <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
                </div>

      </div>

              {/* displat related   */}
                <RelatedProducts category = {productdata.category} subcategory = {productdata.subCategory}/>
        

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
