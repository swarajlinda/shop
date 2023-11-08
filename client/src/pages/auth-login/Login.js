import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/LoginAction";
import { loadUser } from "../../actions/LoadUserAction";


const Login = () => {
 const dispatch = useDispatch()
 const navigate = useNavigate()

 const {isAuthenticate} = useSelector((state)=>state.loadUser)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin =  (e) => {
    e.preventDefault();
    
    // You can add your login logic here
    console.log('Email:', email);
    console.log('Password:', password);

    dispatch(login(email, password)).then(()=> dispatch(loadUser()))
  };

 
 if(isAuthenticate) {
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
    </div>
  </>;
};

export default Login;
