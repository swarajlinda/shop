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
    <>
      {/* header  */}
      <section className=" top-0 w-full z-50">
        <Navbar />
      </section>
      {/* header end */}

      {/* side bar  */}
      <div className="w-64 h-screen bg-slate-50 fixed border top-16 z-40">
        <Sidebar />
      </div>
      {/* end sidebar  */}

      {/* outlet  */}
      <div className="ml-64 h-auto mt-16">
        <Outlet />
      </div>
    </>
  );
};

export default AdminDashboard;
