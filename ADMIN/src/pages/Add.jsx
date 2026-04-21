import React, { useState } from 'react'
import axios from 'axios'
import { assets } from '../assets/assets'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {
  const [image1,setimage1] = useState(false)
  const [image2,setimage2] = useState(false)
  const [image3,setimage3] = useState(false)
  const [image4,setimage4] = useState(false)
  const [bestseller,setebestseller] = useState(false)
  const[name,setname] = useState("")
  const[descpription,setdescription] = useState("")
  const[price,setprice] = useState("")
  const[category,setcategory] = useState("Men")
  const[subcategory,setsubcategory] = useState("Topwear")
  const [sizes, setsizes] = useState([])
  const onsubmithandler = async(e) => {
      e.preventDefault();
      try {
        const formdata = new FormData()

        formdata.append("name",name);
        formdata.append("description",descpription);
        formdata.append("price",price);
        formdata.append("category",category)
        formdata.append("subCategory",subcategory)
        formdata.append("bestseller",bestseller)
        formdata.append("sizes",JSON.stringify(sizes))
        image1 && formdata.append("image1",image1);
        image2 && formdata.append("image2",image2);
        image3 && formdata.append("image3",image3);
        image4 && formdata.append("image4",image4);

        const response = await axios.post(backendUrl + "/api/product/add",formdata,{headers:{token}})

        if(response.data.success){
          toast.success(response.data.message)
          setname('')
          setdescription('')
          setimage1(false)
          setimage2(false)
          setimage3(false)
          setimage4(false)
          setprice('')
        }else{
          toast.error(response.data.message)
        }

      } catch (error) {
        toast.error(error.message)
      }
  }
  return (
    <form onSubmit={onsubmithandler} className='flex flex-col items-start w-full gap-3'>
      <div>
        <p className='mb-2'>UPLOAD IMAGE</p>

        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20'  src={!image1 ?  assets.upload_area : URL.createObjectURL(image1)} alt="" srcset="" />
            <input onChange={(e) => setimage1(e.target.files[0])} type="file" id='image1' hidden/>
          </label>
          <label htmlFor="image2">
            <img className='w-20'  src={!image2 ?  assets.upload_area : URL.createObjectURL(image2)} alt="" srcset="" />
            <input onChange={(e) => setimage2(e.target.files[0])} type="file" id='image2' hidden/>
          </label>
          <label htmlFor="image3">
            <img className='w-20'  src={!image3 ?  assets.upload_area : URL.createObjectURL(image3)} alt="" srcset="" />
            <input onChange={(e) => setimage3(e.target.files[0])} type="file" id='image3' hidden/>
          </label>
          <label htmlFor="image4">
            <img  className='w-20' src={!image4 ?  assets.upload_area : URL.createObjectURL(image4)} alt="" srcset="" />
            <input onChange={(e) => setimage4(e.target.files[0])} type="file" id='image4' hidden/>
          </label>
        </div>
      </div>

    <div className='w-full'>
      <p className='mb-2'>PRODUCT NAME</p>
      <input onChange={(e) => setname(e.target.value)} value={name} className='w-full max-w-125 px-3 py-2' type="text" name="" id="" placeholder='TYPE PRODUCT NAME HERE' required/>
    </div>

     <div className='w-full'>
      <p className='mb-2'>PRODUCT DESCRIPTION</p>
      <textarea onChange={(e) => setdescription(e.target.value)} value={descpription}  className='w-full max-w-125 px-3 py-2' type="text" name="" id="" placeholder='WRITE ABOUT THE PRODUCT' required/>
    </div>

    <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
      <div>
        <p className='mb-2'>PRODUCT CATEGORY</p>
        <select onChange={(e) => setcategory(e.target.value)} className='w-full px-3 py-2'>
          <option value="Men">MEN</option>
          <option value="Women">WOMEN</option>
          <option value="Kids">KIDS</option>
        </select>
      </div>

      <div>
        <p className='mb-2'>SUB CATEGORY</p>
        <select onChange={(e) => setsubcategory(e.target.value)} className='w-full px-3 py-2'>
          <option value="Topwear">TOPWEAR</option>
          <option value="Bottomwear">BOTTOMWEAR</option>
          <option value="Winterweat">WINTERWEAR</option>
        </select>
      </div>

      <div>
        <p className='mb-2'>PRODUCT PRICE</p>
        <input onChange={(e) => setprice(e.target.value)} className='w-full px-3 py-2 sm:w-30' type="number" placeholder='25' name="" id="" />
      </div>


    </div>


    <div>
      <p className='mb-2'>PRODUCT SIZES</p>
      <div className='gap-3 flex'>
        <div onClick={(e) => setsizes(prev => prev.includes("S") ? prev.filter(item => item != "S") : [...prev,"S"])}>
          <p className={`${sizes.includes("S") ? `bg-pink-100` : `bg-slate-200`} px-3 py-1 cursor-pointer`}>S</p>
        </div>
        <div onClick={(e) => setsizes(prev => prev.includes("M") ? prev.filter(item => item != "M") : [...prev,"M"])}>
          <p className={`${sizes.includes("M") ? `bg-pink-100` : `bg-slate-200`} px-3 py-1 cursor-pointer`}>M</p>
        </div>
        <div onClick={(e) => setsizes(prev => prev.includes("L") ? prev.filter(item => item != "L") : [...prev,"L"])}>
          <p className={`${sizes.includes("L") ? `bg-pink-100` : `bg-slate-200`} px-3 py-1 cursor-pointer`}>L</p>
        </div>
        <div onClick={(e) => setsizes(prev => prev.includes("XL") ? prev.filter(item => item != "XL") : [...prev,"XL"])}>
          <p className={`${sizes.includes("XL") ? `bg-pink-100` : `bg-slate-200`} px-3 py-1 cursor-pointer`}>XL</p>
        </div>
        <div onClick={(e) => setsizes(prev => prev.includes("XXL") ? prev.filter(item => item != "XXL") : [...prev,"XXL"])}>
          <p className={`${sizes.includes("XXL") ? `bg-pink-100` : `bg-slate-200`} px-3 py-1 cursor-pointer`}>XXL</p>
        </div>
      </div>
    </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={(e) => setebestseller(prev => !prev)} checked = {bestseller} type="checkbox" name="" id="bestseller" />
        <label htmlFor="bestseller" className='cursor-pointer'>ADD TO BESTSELLER</label>
      </div>

    <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>

    </form>
  )
}

export default Add
