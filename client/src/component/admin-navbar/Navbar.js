import React, { useState } from "react";
import logo from "../../assets/logo.png";
import Logout from "../logout/Logout";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setIsOpen((prev)=> !prev);
  };

  return (
    <nav className="bg-white p-2 fixed w-full top-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg flex items-center h-[50px]">
          <img src={logo} alt="logo" className="w-[150px] h-[50px] mx-8" />
        </div>
        <div>
          <ul className="flex  justify-between w-full">
            <li
              className="px-4 py-2 rounded-sm font-bold text-lg cursor-pointer uppercase text-[#03D069]"
              onClick={handleLogout}
            >
              Profile
            </li>
          </ul>
        </div>
          <div className=" absolute left-[1350px] top-16">
        {isOpen && (
            <Logout />
            )}
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
