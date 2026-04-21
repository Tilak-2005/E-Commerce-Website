import React, { useContext , useEffect, useState} from 'react'
import {ShopContext} from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {

  const [filterproducts, setfilterproducts] = useState([])
  const [showfilter, setshowfilter] = useState(false)
  const {products , search , showsearch} = useContext(ShopContext)
  const [category, setcategory] = useState([])
  const [subcategory, setsubcategory] = useState([])
  const [sortType, setsortType] = useState('relevant')
  const togglecategory = (e) => {
    if(category.includes(e.target.value)) setcategory(prev => prev.filter(item => item != e.target.value))
      else setcategory(prev => [...prev,e.target.value])
  }

  const togglesubcategory = (e) => {
    if(subcategory.includes(e.target.value)) setsubcategory(prev => prev.filter(item => item != e.target.value))
      else setsubcategory(prev => [...prev,e.target.value])
  }

const applyfilter = () => {
  let productsCopy = [...products]

  if(showsearch && search){
    productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
  }

  if (category.length > 0) {
    productsCopy = productsCopy.filter(item =>
      category.includes(item.category)
    )
  }

  if (subcategory.length > 0) {
    productsCopy = productsCopy.filter(item =>
      subcategory.includes(item.subCategory)
    )
  }

  setfilterproducts(productsCopy)
}

const sortproduct = () => {
  let copyfilterproducts = filterproducts.slice();
  switch (sortType) {
    case 'low-high':
      setfilterproducts(copyfilterproducts.sort((a,b) => a.price - b.price));
      break
    
    case 'high-low':
      setfilterproducts(copyfilterproducts.sort((a,b) => b.price - a.price));
      break
      
  
    default:
      applyfilter();
      break;
  }
}

useEffect(() => {
  applyfilter()
}, [category, subcategory,search,showsearch,products])

useEffect(() => {
  sortproduct();
}, [sortType])

  

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10  pt-10 border-t'>
        <div className='min-w-60'>
          <p onClick = {() => setshowfilter(!showfilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
            <img className={`h-3 sm:hidden ${showfilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
          </p>
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium '>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input type="checkbox" className = 'w-3' value={'Men'} onChange={togglecategory} name="" id="" />MEN
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" className = 'w-3' value={'Women'} onChange={togglecategory}  name="" id="" />WOMEN
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" className = 'w-3' value={'Kids'} onChange={togglecategory} name="" id="" />KIDS
              </p>
            </div>
          </div>


           <div className={`border border-gray-300 pl-5 py-3 my-6 ${showfilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium '>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input type="checkbox" className = 'w-3' value={'Topwear'} name="" id="" onChange={togglesubcategory}/>TOPWEAR
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" className = 'w-3' value={'Bottomwear'} name="" id="" onChange={togglesubcategory}/>BOTTOMWEAR
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" className = 'w-3' value={'Winterwear'} name="" id="" onChange={togglesubcategory}/>WINTERWEAR
              </p>
            </div>
          </div>
        </div>

      <div className='flex-1'>

        <div className='flex justify-between mb-4 text-base sm:text-2xl '>
            <Title text1 = {"ALL"} text2={"COLLECTIONS"}/>
            <select onChange={(e) => setsortType(e.target.value)} className='border-gray-300 text-sm px-2'>
              <option value="relevant">SORT BY : RELEVANT</option>
              <option value="low-high">SORT BY : LOW-HIGH</option>
              <option value="high-low">SORT BY : HIGH-LOW</option>
            </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>

          {
            filterproducts.map((items,index) => (
                <ProductItem key={index} id={items._id} name={items.name} price={items.price} image={items.image}/>
            ))
          }

        </div>

      </div>


    </div>
  )
}

export default Collection
