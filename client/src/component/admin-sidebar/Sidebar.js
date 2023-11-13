import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>
       <div className="flex h-full w-64">
            <ul className="flex-row justify-center w-full p-2">
              <li className="text-center text-black p-4 mb-2 bg-slate-300 rounded-lg cursor-pointer  hover:bg-white hover:text-[#03D069]">
                <Link to={"./home"} className='py-4 uppercase  font-bold'>Dashboard</Link>
              </li>
              <li className="text-center text-black p-4 mb-2 bg-slate-300 rounded-lg cursor-pointer  hover:bg-white hover:text-[#03D069]">
                <Link to={"./newStock"} className='py-4 uppercase  font-bold'>New Stock</Link>
              </li>
              <li className="text-center text-black p-4 mb-2 bg-slate-300 rounded-lg cursor-pointer  hover:bg-white hover:text-[#03D069]">
                <Link to={"./manageStock"} className='py-4 uppercase  font-bold'>Manage Stock </Link>
              </li>
              <li className="text-center text-black p-4 mb-2 bg-slate-300 rounded-lg cursor-pointer  hover:bg-white hover:text-[#03D069]">
                <Link to={"./generateInvoice"} className='py-4 uppercase  font-bold'>Generate Invoice</Link>
              </li>
              <li className="text-center text-black p-4 mb-2 bg-slate-300 rounded-lg cursor-pointer  hover:bg-white hover:text-[#03D069]">
                <Link to={"./manageInvoice"} className='py-4 uppercase  font-bold'>Manage Invoice</Link>
              </li>
              <li className="text-center text-black p-4 mb-2 bg-slate-300 rounded-lg cursor-pointer  hover:bg-white hover:text-[#03D069]">
                <Link to={"./createKhata"} className='py-4 uppercase  font-bold'>new Khata</Link>
              </li>
              <li className="text-center text-black p-4 mb-2 bg-slate-300 rounded-lg cursor-pointer  hover:bg-white hover:text-[#03D069]">
                <Link to={"./manageKhata"} className='py-4 uppercase  font-bold'>Manage Khata</Link>
              </li>
              <li className="text-center text-black p-4 mb-2 bg-slate-300 rounded-lg cursor-pointer  hover:bg-white hover:text-[#03D069]">
                <Link to={"./staff"} className='py-4 uppercase  font-bold'>Staff</Link>
              </li>
              <li className="text-center text-black p-4 mb-2 bg-slate-300 rounded-lg cursor-pointer  hover:bg-white hover:text-[#03D069]">
                <Link to={"./salesReports"} className='py-4 uppercase  font-bold'>Sale Reports</Link>
              </li>
            </ul>
          </div>
    </div>
  )
}

export default Sidebar