import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const Login = () => {

  const [currentstate,setcurrentstate] = useState('LOGIN')
  const {token,settoken, navigate , backendUrl} = useContext(ShopContext)
  const [name,setname] = useState('')
  const [password,setpassword] = useState('')
  const [email,setemail] = useState('')

  const onsubmithandler = async (event) => {
        event.preventDefault();
        try {
          if(currentstate == 'SIGN UP'){
            const response = await axios.post(backendUrl + '/api/user/register', {name,email,password})
            if(response.data.success){
              settoken(response.data.token)
              localStorage.setItem('token',response.data.token)
            }
            else{
              toast.error(response.data.message)
            }
          }
          else{
            const response = await axios.post(backendUrl + '/api/user/login', {email,password})
            if(response.data.success){
              settoken(response.data.token)
              localStorage.setItem('token',response.data.token)
            }
            else{
              toast.error(response.data.message)
            }
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
  }

useEffect(() => {
  if(token){
    navigate('/')
  }
},[token])

  return (
   <form onSubmit={onsubmithandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
    <div className='inline-flex items-center gap-2 mb-2 mt-10'>
      <p className='prata-regular text-3xl'>{currentstate}</p>
      <hr className='border-none w-8 border-gray-800 h-[1.5px]'/>
    </div>
    {currentstate === 'LOGIN' ? '' : <input onChange={(e) => setname(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='NAME' required/>}
    <input onChange={(e) => setemail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='EMAIL' required/>
    <input onChange={(e) => setpassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='PASSWORD' required/>
    <div className='w-full flex justify-between text-sm mt--2'>
        <p className='cursor-pointer'>FORGOT PASSWORD?</p>
        {currentstate === 'LOGIN' ? <p onClick={() => setcurrentstate("SIGN UP")} className='cursor-pointer'>CREATE ACCOUNT</p> : <p onClick = {() => setcurrentstate("LOGIN")} className='cursor-pointer'>LOGIN HERE</p>}
    </div>
    <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentstate === "LOGIN" ? "SIGN IN" : "SIGN UP"}</button>
   </form>
  )
}

export default Login
