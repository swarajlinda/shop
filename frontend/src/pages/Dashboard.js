import React, { useEffect, useState } from "react";
import DashboardComp from "../components/dashboard/DashboardComp";
import SideNavbar from "../components/navbar/SideNavbar";

// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate,  } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import { server } from "..";

function Dashboard() {
  const [user, setUser] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate(); // Using useHistory hook for navigation
  const {isAuthenticated, token, loading} = useSelector((state) => state.auth);

  // useEffect(()=>{
  //    axios
  //   .get(`${server}/users/me`, {
  //     withCredentials: true,
  //   })
  //   .then((res) => {
  //     setUser(res);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
  // },[])

  
  useEffect(()=>{
    const localToken = localStorage.getItem("token")
    if(token){
      dispatch({
        type:"login",
        payload: localToken
      })
    }
    !token && navigate('/')
  },[])

  return (
    <div className="">
      
      
        <DashboardComp />
      
    </div>
  );
}

export default Dashboard;
