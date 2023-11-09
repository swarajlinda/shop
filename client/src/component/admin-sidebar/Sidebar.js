import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>
       <div className="flex h-full bg-gray-200 w-64">
            <ul className="flex-row justify-center w-full p-2">
              <li className="text-center text-white p-4 mb-2 bg-gray-800 rounded-lg cursor-pointer">
                <Link to={"./home"}>Dashboard</Link>
              </li>
              <li className="text-center text-white p-4 mb-2 bg-gray-800 rounded-lg cursor-pointer">
                <Link to={"./newStock"}>New Stock</Link>
              </li>
              <li className="text-center text-white p-4 mb-2 bg-gray-800 rounded-lg cursor-pointer">
                <Link to={"./manageStock"}>Manage Stock </Link>
              </li>
              <li className="text-center text-white p-4 mb-2 bg-gray-800 rounded-lg cursor-pointer">
                <Link to={"./generateInvoice"}>Generate Invoice</Link>
              </li>
              <li className="text-center text-white p-4 mb-2 bg-gray-800 rounded-lg cursor-pointer">
                <Link to={"./manageInvoice"}>Manage Invoice</Link>
              </li>
              <li className="text-center text-white p-4 mb-2 bg-gray-800 rounded-lg cursor-pointer">
                <Link to={"./createKhata"}>new Khata</Link>
              </li>
              <li className="text-center text-white p-4 mb-2 bg-gray-800 rounded-lg cursor-pointer">
                <Link to={"./manageKhata"}>Manage Khata</Link>
              </li>
              <li className="text-center text-white p-4 mb-2 bg-gray-800 rounded-lg cursor-pointer">
                <Link to={"./staff"}>Staff</Link>
              </li>
              <li className="text-center text-white p-4 mb-2 bg-gray-800 rounded-lg cursor-pointer">
                <Link to={"./salesReports"}>Sale Reports</Link>
              </li>
            </ul>
          </div>
    </div>
  )
}

export default Sidebar