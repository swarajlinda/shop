import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {token} = useSelector((state)=>state.auth)

  console.log(token)


  useEffect(()=>{
    !token && navigate('/')
    const localToken = localStorage.getItem("token")

    if(localToken){
      dispatch({
        type:"login",
        payload: localToken
      })
    }
    
  },[])


  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      handleError("Please enter both Email and Password!");
      return;
    }

    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message, user, token } = data;
      if (success) {
        // settoken in local storage 
        localStorage.setItem("token", JSON.stringify(token))

        //DISPATCH TO THE REDUCER
        dispatch({
          type:"login",
          payload: token
        })

        handleSuccess(message);
        navigate('/dashboard');
      } else {
        handleError(message);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error("Conflict detected. Please resolve the conflict.");
        handleError(error.message);
      } else {
        console.error("An error occurred:", error.message);
        handleError(error.message);
      }
    }
  };

  //error handle
  const handleError = (err) =>
    toast.error(err, {
      position: "top-center",
    });

  // handle for success
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-center",
    });


   

  return (
    <div className="">
      <div className="text-center">
        <ToastContainer />
      </div>

      <div className=" flex items-center justify-center h-screen bg-red-400 w-full">
        <section className="bg-white max-w-6xl p-6 rounded-lg shadow-md">
          <form onSubmit={submitHandler} className="text-center">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded-md mb-3"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full border p-2 rounded-md mb-3"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none mb-3"
            >
              Login
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Signin;
