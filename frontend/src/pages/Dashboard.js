import React from "react";
import DashboardComp from "../components/dashboard/DashboardComp";
import SideNavbar from "../components/navbar/SideNavbar";

// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { Link, useNavigate,  } from "react-router-dom";
import Header from "../components/Header";

function Dashboard() {
  const navigate = useNavigate(); // Using useHistory hook for navigation
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  !isAuthenticated && navigate('/')
  console.log("this",isAuthenticated)
 
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
      <SideNavbar />
      </div>
      <div className="col-span-10">
        <DashboardComp />
      </div>
    </div>
  );
}

export default Dashboard;
