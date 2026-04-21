import axios from "axios";
import React, { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";


const Login = ({settoken}) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const onsubmithandler = async (e) => {
      try {
        e.preventDefault();
        const response = await axios.post(backendUrl + '/api/user/admin',{email,password});
        if(response.data.success){
            settoken(response.data.token);
        } 
        else{
          toast.error(response.data.message);
        }
        

      
    } catch (error) {
      console.log(error);
      toast.error(error.message); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">ADMIN PANEL</h1>

        <form onSubmit={onsubmithandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium mb-2 text-gray-700">
              EMAIL ADDRESS
            </p>
            <input
              onChange={(e) => setemail(e.target.value)}
              value={email}
              className="w-full rounded-md px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium mb-2 text-gray-700">PASSWORD</p>
            <input
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              className="w-full rounded-md px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="ENTER YOUR PASSWORD"
              required
            />
          </div>

          <button
            className="mt-2 w-full px-4 py-2 rounded-md text-white bg-black"
            type="submit"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
