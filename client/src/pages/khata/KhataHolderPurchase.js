import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../..";
import KhataInvoice from "../../component/admin-invoice-khata/KhataInvoice";

const KhataHolderPurchase = () => {
  // Later, to retrieve the 'id' value from localStorage
  let id = localStorage.getItem("id");

  const [user, setUser] = useState([]);

  //for showing data
  useEffect(() => {
    axios
      .get(`${server}/sell/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.customer);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  return (
    <div>
      {/* user details bar  */}
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">{user.name}</div>
          <ul className="flex space-x-4">
            <li className="text-white">{user.address}</li>
            <li className="text-white">{user.phoneNumber}</li>
          </ul>
        </div>
      </nav>
      {/* enduser details bar  */}

      {/* hare is the bill system  */}
      <div>
        <KhataInvoice id={id}/>
      </div>

    </div>
  );
};

export default KhataHolderPurchase;
