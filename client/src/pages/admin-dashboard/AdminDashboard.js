import React, { useEffect, useState } from "react";
import Navbar from "../../component/admin-navbar/Navbar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../component/admin-sidebar/Sidebar";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticate } = useSelector((state) => state.loadUser);
  console.log("this", isAuthenticate);

  // if user is not exist
  useEffect(() => {
    !isAuthenticate && navigate("../login");
  }, [isAuthenticate, navigate]);

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
          <Sidebar />
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
