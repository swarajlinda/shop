import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>
       <div className="flex h-full bg-gray-200 ">
            <ul className="flex-row justify-center w-full p-2">
              <li className="text-center text-white p-4 mb-2 bg-gray-800 rounded-lg cursor-pointer">
                <Link to={"./generateInvoice"}>Generate Invoice</Link>
              </li>
            </ul>
          </div>
    </div>
  )
}

export default Sidebar