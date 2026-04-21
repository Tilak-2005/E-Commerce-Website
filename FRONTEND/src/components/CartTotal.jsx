import React, { useContext} from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const {currency,delivery_fee,getcartamount} = useContext(ShopContext);


  return (  
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'CART'} text2={'TOTALS'}/>
        </div>

        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between '>
                    <p>SUBTOTAL</p>
                    <p>{currency} {getcartamount()}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>SHIPPING FEE</p>
                <p>{currency}{delivery_fee}.00</p>
            </div>
            <hr />

            <div className='flex justify-between'>
                <b>TOTAL</b>
                <b>{currency} {getcartamount() === 0 ? 0 : getcartamount() + delivery_fee}.00</b>
            </div>

        </div>

    </div>
  )
}

export default CartTotal
