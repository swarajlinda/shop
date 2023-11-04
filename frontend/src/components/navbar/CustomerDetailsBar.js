import React from "react";

function CustomerDetailsBar({name, address, phoneNumber, totalDueAmount}) {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">{name}</div>
          <ul className="flex space-x-4">
            <li className="text-white">
              
                {address}
              
            </li>
            <li className="text-white">
                {phoneNumber}
            </li>
           
            <li className="text-white">
              
               {totalDueAmount}
              
            </li>
           
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default CustomerDetailsBar;
