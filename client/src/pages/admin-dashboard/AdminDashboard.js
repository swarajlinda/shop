import React, { useEffect, useState } from "react";
import Navbar from "../../component/admin-navbar/Navbar";
import { Link, Outlet, useNavigate, useNavigation } from "react-router-dom";
import Sidebar from "../../component/admin-sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../actions/LoadUserAction";

const AdminDashboard = () => {
 
  const navigate = useNavigate();
  const {isAuthenticate} = useSelector((state)=>state.loadUser)
  console.log("this",isAuthenticate)



 
  
  !isAuthenticate && navigate('../login')


  return (
    <div className="flex flex-col">
      {/* header  */}
      <section className=" top-0 w-full">
        <Navbar />
      </section>
      {/* header end */}

      {/* content section     */}
      <section className="h-screen flex bg-gray-300 ">
        {/* side bar  */}
        <div className="w-64 h-screen bg-emerald-800">
            <Sidebar/>
        </div>
        {/* end sidebar  */}

        {/* outlet  */}
        <div className=" w-full h-screen">
          <Outlet />
        </div>
      </section>
      {/* content section  end   */}
    </div>
  );
};

export default AdminDashboard;
