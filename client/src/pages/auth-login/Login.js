import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/LoginAction";
import { loadUser } from "../../actions/LoadUserAction";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
 const dispatch = useDispatch()
 const navigate = useNavigate()

 const {isAuthenticate, user} = useSelector((state)=>state.loadUser)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin =  (e) => {
    e.preventDefault();
     
    if(!email){
      toast.error("Please Enter Email", {
        position: toast.POSITION.TOP_RIGHT
    });
    }
    if(!password){
      toast.error("Please Enter Password", {
        position: toast.POSITION.TOP_RIGHT
    });
    }

    try {
      // You can add your login logic here
      console.log('Email:', email);
      console.log('Password:', password);
  
      dispatch(login(email, password)).then(()=> dispatch(loadUser()))
      
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
    });
    }
    
  };

//  if user is exist then 
 if(isAuthenticate) {
  toast.success(`Welcome back ${user.name}`, {
    position: toast.POSITION.TOP_RIGHT
});
  navigate("../dashboard")
 }

  return <>
        <div className="min-h-screen min-w-fit flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-64">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
      <ToastContainer/>
    </div>
  </>;
};

export default Login;
