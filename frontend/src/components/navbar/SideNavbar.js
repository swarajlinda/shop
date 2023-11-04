import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SideNavbar() {



  return (
    <div>
      <div className="bg-gray-800 text-white h-screen w-56 flex flex-col">
        <div className="text-2xl font-bold p-4"></div>
        <ul className="flex-1">
          <li className="p-4 hover:bg-gray-700 cursor-pointer">
            <Link to="/" className="text-white hover:underline mr-4">
              Dashboard
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">
            <Link to="/invoice" className="text-white hover:underline mr-4">
              Generate Invoice
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">
            <Link to="/stock" className="text-white hover:underline mr-4">
              Stock
            </Link>
          </li>
         
          <li className="p-4 hover:bg-gray-700 cursor-pointer">
            <Link to="/khata" className="text-white hover:underline mr-4">
              Khata
            </Link>
          </li>
         
          <li className="p-4 hover:bg-gray-700 cursor-pointer">
            <Link to="/home" className="text-white hover:underline mr-4">
              Notes
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">
            <Link to="/profile" className="text-white hover:underline mr-4">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideNavbar;
