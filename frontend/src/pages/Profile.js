import React, { useContext, useEffect } from "react";
import { Context, server } from "..";
import { Link, useNavigate,  } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";







function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const {token} = useSelector((state)=>state.auth)

  console.log(token)

  //use effect for check the user 
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






  const handleLogout = async (e) => {
    e.preventDefault();
    // setLoading(true)
    try {
      const { data } = await axios.get(
        `${server}/users/logout `,

        {
          withCredentials: true,
        }
      );

      console.log("Request was successful:", data);

      const {success, message} = data

      if(success){
        localStorage.removeItem('token')
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }else{
        handleError(message);
      }

    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Handle conflict-specific logic here
        handleError(error.response);
        console.error("Conflict detected. Please resolve the conflict.");
      } else {
        // Handle other errors
        handleError(error.message);
        console.error("An error occurred:", error.message);
      }
    }
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  return (
    <div>
      <ToastContainer/>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img
          className="w-full"
          src="https://via.placeholder.com/300"
          alt="Profile"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">biruly</div>
          <p className="text-gray-700 text-sm">Biurly</p>
        </div>
        <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            #HTML
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            #React
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            #TailwindCSS
          </span>
        </div>
        <div className="px-6 py-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
        >
          Logout
        </button>
      </div>
      </div>
    </div>
  );
}

export default Profile;
