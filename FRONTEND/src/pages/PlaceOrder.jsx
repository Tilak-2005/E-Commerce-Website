import React, { useContext, useState } from 'react'
import axios from 'axios'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method,setmethod] = useState('cod')
  const {products , currency , delivery_fee , search , setsearch , showsearch ,setshowsearch,cartitems,setcartitems,addtocart,getcartcount,updatequantity, getcartamount, navigate, backendUrl, token, settoken} = useContext(ShopContext)
  const [formdata,setformdata] = useState({
    firstName : '',
    lastName : '',
    email : '',
    street : '',
    city : '',
    state : '',
    zipcode : '',
    country : '',
    phone : '',
  })

  const onchangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setformdata(data => ({...data,[name]:value}))
  }


  const formsubmithandler = async (event) => {
    event.preventDefault()
    try {
      let orderitems = []
      for(const items in cartitems){
        for(const item in cartitems[items]){
          if(cartitems[items][item] > 0){
              const iteminfo = structuredClone(products.find(product => product._id === items))
              if(iteminfo){
                iteminfo.size = item;
                iteminfo.quantity = cartitems[items][item]
                orderitems.push(iteminfo)
              }
          }
        }
      }
      let orderdata = {
        address : formdata,
        items : orderitems,
        amount : getcartamount() + delivery_fee
      }
      switch(method){
        case 'cod':
            const response = await axios.post(backendUrl + '/api/order/place',orderdata,{headers : {token}})
            if(response.data.success) {
              setcartitems({})
              navigate('/orders')
            }
            else{
              toast.error(response.data.message)
            }
            break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
  toast.error(error.message)
    }
  }

   return (
    <form onSubmit={formsubmithandler} className='flex flex-col sm:flex-row gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      {/* LEFT SIDE — DELIVERY INFO */}
      <div className='flex flex-col w-full sm:max-w-120 gap-4'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className='flex gap-3'>
          <input required onChange={onchangehandler} value={formdata.firstName} name = 'firstName' type="text" placeholder="FIRST NAME" className='border rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onchangehandler} value={formdata.lastName} name = 'lastName'  type="text" placeholder="LAST NAME" className='border rounded py-1.5 px-3.5 w-full' />
        </div>

        <input required onChange={onchangehandler} value={formdata.email} name = 'email' type="email" placeholder="EMAIL" className='border rounded py-1.5 px-3.5 w-full' />
        <input required onChange={onchangehandler} value={formdata.street} name = 'street'  type="text" placeholder="STREET" className='border rounded py-1.5 px-3.5 w-full' />

        <div className='flex gap-3'>
          <input required onChange={onchangehandler} value={formdata.city} name = 'city'  type="text" placeholder="CITY" className='border rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onchangehandler} value={formdata.state} name = 'state'  type="text" placeholder="STATE" className='border rounded py-1.5 px-3.5 w-full' />
        </div>

        <div className='flex gap-3'>
          <input required onChange={onchangehandler} value={formdata.zipcode} name = 'zipcode'  type="number" placeholder="ZIPCODE" className='border rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onchangehandler} value={formdata.country} name = 'country'  type="text" placeholder="COUNTRY" className='border rounded py-1.5 px-3.5 w-full' />
        </div>  

        <input required onChange={onchangehandler} value={formdata.phone} name = 'phone'  type="number" placeholder="PHONE" className='border rounded py-1.5 px-3.5 w-full' />
      </div>

      {/* RIGHT SIDE — CART TOTAL */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
        <CartTotal />
          </div>


        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          <div className='flex flex-col lg:flex-row gap-3'>
              <div onClick={() => setmethod('stripe')} className='flex item-center gap-3 border p-2 px-3 cursor-pointer'>
                  <p className={`min-w-3.5 h-3.5 rounded-full border ${method == 'stripe' ? 'bg-green-400' : ''}`}></p>
                  <img src={assets.stripe_logo} className='h-5 mx-4' alt="" srcSet="" />
              </div>
              <div  onClick={() => setmethod('razorpay')}  className='flex item-center gap-3 border p-2 px-3 cursor-pointer'>
                  <p className={`min-w-3.5 h-3.5 rounded-full border  ${method == 'razorpay' ? 'bg-green-400' : ''}`}></p>
                  <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" srcSet="" />
              </div>
              <div  onClick={() => setmethod('cod')}  className='flex item-center gap-3 border p-2 px-3 cursor-pointer '>
                  <p className={`min-w-3.5 h-3.5 rounded-full border  ${method == 'cod' ? 'bg-green-400' : ''}`}></p>
                  <p className='text-gray-500 mx-4 text-sm font-medium'>CASH ON DELIVERY</p>
              </div>
          </div>

        <div className='w-full text-end mt-8'>
          <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
        </div>

        </div>

      </div>

    </form>
  )
}

export default PlaceOrder
