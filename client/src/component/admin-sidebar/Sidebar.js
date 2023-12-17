import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";


import { FcSalesPerformance } from "react-icons/fc";
import { FcBusinessContact } from "react-icons/fc";
import { FcTodoList } from "react-icons/fc";
import { FcInspection } from "react-icons/fc";
import { MdSell } from "react-icons/md";
import { BsCartCheckFill } from "react-icons/bs";
import { IoIosCreate } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";

const Sidebar = () => {
  // const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const [path, setPath] = useState(location?.pathname);

  console.log(path);

  useEffect(() => {
    setPath(location?.pathname?.split("/")[2]);
  }, [location.pathname]);

  return (
    <div>
      <div className="flex h-full w-64">
        <ul className="flex-row justify-center w-full p-2">
          <li
            className={`flex items-center text-start text-black mb-2  rounded-lg cursor-pointer hover:bg-white hover:text-green-800
          
            `}
          >
            <FcSalesPerformance
              className="mx-3 w-10 h-10 my-2"
            />
            <Link to={"./home"} className="uppercase  font-bold">
              <button
                className={`w-40 hover:shadow-md hover:bg-orange-600 hover:text-white px-2 pl-5 border-b z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                  path === "home"
                    ? "text-orange-600 border-r-4 border-r-orange-600 bg-orange-50 "
                    : "bg-white"
                }`}
              >
                Dashboard
              </button>
            </Link>
          </li>
          <li
            className={`flex items-center text-start text-black mb-2  rounded-lg cursor-pointer hover:bg-white hover:text-green-800 `}
          >
            <FcInspection className="mx-3 w-10 h-10 my-2" />
            <Link to={"./newStock"} className="uppercase  font-bold">
              <button
                className={`w-40 hover:shadow-md hover:bg-orange-600 hover:text-white px-2 pl-5 border-b z-20 py-2 my-1  flex text-left text-lg font-semibold text-black duration-300 ${
                  path === "newStock"
                    ? "text-orange-600 border-r-4 border-r-orange-600 bg-orange-50 "
                    : "bg-white"
                }`}
              >
                New Stock
              </button>
            </Link>
          </li>
          <li
            className={`flex items-center text-start text-black mb-2  rounded-lg cursor-pointer hover:bg-white hover:text-green-800
            `}
          >
            <FcTodoList
              className="mx-3 w-10 h-10 my-2"
            />
            <Link to={"./manageStock"} className=" uppercase  font-bold">
              <button
                className={`w-40 hover:shadow-md hover:bg-orange-600 hover:text-white px-2 pl-5 border-b z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                  path === "manageStock"
                    ? "text-orange-600 border-r-4 border-r-orange-600 bg-orange-50 "
                    : "bg-white"
                }`}
              >
                Manage Stock
              </button>
            </Link>
          </li>
          <li
            className={`flex items-center text-start text-black mb-2  rounded-lg cursor-pointer hover:bg-white hover:text-green-800 
             `}
          >
            <MdSell
              className="mx-3 w-10 h-10 my-2 text-green-500"
            />
            <Link
              to={"./generateInvoice"}
              className="uppercase  font-bold"
            >
              <button
                className={`w-40 hover:shadow-md hover:bg-orange-600 hover:text-white px-2 pl-5 border-b z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                  path === "generateInvoice"
                    ? "text-orange-600 border-r-4 border-r-orange-600 bg-orange-50 "
                    : "bg-white"
                }`}
              >
                Invoice
              </button>
            </Link>
          </li>
          <li
            className={`flex items-center text-start text-black mb-2  rounded-lg cursor-pointer hover:bg-white hover:text-green-800
              `}
          >
            <BsCartCheckFill
              className="mx-3 w-10 h-10 my-2 text-green-600"
            />
            <Link to={"./manageInvoice"} className="uppercase  font-bold">
              <button
                className={`w-40 hover:shadow-md hover:bg-orange-600 hover:text-white px-2 pl-5 border-b z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                  path === "manageInvoice"
                    ? "text-orange-600 border-r-4 border-r-orange-600 bg-orange-50 "
                    : "bg-white"
                }`}
              >
                Manage Invoice
              </button>
            </Link>
          </li>
          <li
            className={` flex items-center text-start text-black mb-2  rounded-lg cursor-pointer hover:bg-white hover:text-green-800 
              `}
          >
            <IoIosCreate
              className="mx-3 w-10 h-10 my-2 text-violet-700"
            />
            <Link to={"./createKhata"} className=" uppercase  font-bold">
              <button
                className={`w-40 hover:shadow-md hover:bg-orange-600 hover:text-white px-2 pl-5 border-b z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                  path === "createKhata"
                    ? "text-orange-600 border-r-4 border-r-orange-600 bg-orange-50 "
                    : "bg-white"
                }`}
              >
                New Khata
              </button>
            </Link>
          </li>
          <li
            className={`flex items-center text-start text-black mb-2  rounded-lg cursor-pointer hover:bg-white hover:text-green-800 `}
          >
            <FcBusinessContact
              className="mx-3 w-10 h-10 my-2"
            />
            <Link to={"./manageKhata"} className="uppercase font-bold">
              <button
                className={`w-40 hover:shadow-md hover:bg-orange-600 hover:text-white px-2 pl-5 border-b z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                  path === "manageKhata"
                    ? "text-orange-600 border-r-4 border-r-orange-600 bg-orange-50 "
                    : "bg-white"
                }`}
              >
                Manage Khata
              </button>
            </Link>
          </li>
          <li
            className={`flex items-center text-start text-black mb-2  rounded-lg cursor-pointer hover:bg-white hover:text-green-800 `}
          >
            <FaUsers className="mx-3 w-10 h-10 my-2 text-yellow-500" />
            <Link to={"./staff"} className=" uppercase  font-bold">
            <button
                className={`w-40 hover:shadow-md hover:bg-orange-600 hover:text-white px-2 pl-5 border-b z-20 py-2 my-1  flex text-left text-lg font-semibold text-black duration-300 ${
                  path === "staff"
                    ? "text-orange-600 border-r-4 border-r-orange-600 bg-orange-50 "
                    : "bg-white"
                }`}
              >
              Staff
              </button>
            </Link>
          </li>
          <li
            className={`flex items-center text-start text-black mb-2  rounded-lg cursor-pointer hover:bg-white hover:text-green-800               `}
          >
            <TbReportAnalytics
              className="w-10 h-10 mx-3 my-2 text-red-600"
            />
            <Link to="./salesReports" className=" uppercase font-bold">
            <button
                className={`w-40 hover:shadow-md hover:bg-orange-600 hover:text-white px-2 pl-5 border-b z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                  path === "salesReports"
                    ? "text-orange-600 border-r-4 border-r-orange-600 bg-orange-50 "
                    : "bg-white"
                }`}
              >
              
              Sale Reports
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
