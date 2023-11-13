import React from "react";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-white  p-4 fixed w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg flex items-center h-[80px]">
          <img src={logo} alt="logo" className="w-[230px] h-[70px]" />
        </div>
        <div>
          <ul className="flex  justify-between w-full">
            <li className="px-4 py-2 rounded-sm font-bold text-lg cursor-pointer uppercase text-[#03D069]">Profile</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
