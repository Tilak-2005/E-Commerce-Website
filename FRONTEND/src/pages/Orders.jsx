import React, { useCallback, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Orders = () => {

  const {backendUrl,token , currency} = useContext(ShopContext)
  const [orderdata,setorderdata] = useState([])
  const loadorderdata = async () => {
    try {
        if (!token) return null

        const response = await axios.post(
            backendUrl + '/api/order/userorders', {}, { headers: { token } }
        )

        if (response.data.success) {
            let allorderitems = []
            response.data.orders.map((order) => {
                order.items.map((item) => {
                    item['status'] = order.status
                    item['payment'] = order.payment
                    item['paymentMethod'] = order.paymentMethod
                    item['date'] = order.date
                    allorderitems.push(item)
                })
            })
            setorderdata(allorderitems.reverse())
        }
    } catch (error) {
        console.log(error)
    }
}

  useEffect(() => {
    loadorderdata()
  },[token])
  return (
    <div className='border-t pt-16'>
        <div className='text-2xl'>
            <Title text1= {'MY'} text2 = {'Orders'}/>
        </div>

        <div>
          {
            orderdata.map((item,index) => (
                  <div key={index} className='border-t border-b py-4 text-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4'>
                      <div className='flex items-start text-sm gap-6'>
                        <img src={item.image[0]}  className = 'w-16 sm:w-20' alt="" />
                        <div>
                          <p className='text-base font-medium'>{item.name}</p>
                          <div className='flex items-center gap-3 text-base text-gray-700'>
                              <p className='text-lg'>{currency} {item.price}</p>
                              <p>QUANTITY : {item.quantity}</p>
                              <p>SIZE : {item.size}</p>
                          </div>
                          <p className='mt-2'>
                            DATE: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span>
                          </p>
                        </div>
                      </div>
                      <div className='md:w-1/2 flex justify-between'>
                          <div className='flex item-center gap-2'>
                              <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                              <p className='text-sm md:text-base'>{item.status}</p>
                          </div>
                          <button className='border px-2 py-4 text-sm font-medium rounded-sm'>TRACK ORDER</button>
                      </div>
                  </div>
            ))
          }
        </div>
    </div>
  )
}

export default Orders
