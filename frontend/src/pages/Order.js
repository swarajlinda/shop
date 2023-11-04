import React, { useEffect, useState } from "react";
import CustomerDetailsBar from "../components/navbar/CustomerDetailsBar.js";
import KhataCutomers from "../components/invoice/KhataCutomers.js";
import axios from "axios";
import { server } from "../index.js";

function Order() {
  // Later, to retrieve the 'id' value from localStorage
  let id = localStorage.getItem("id");

  const [user, setUser] = useState([])

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
  }, []);

  return (
    <div>
      <div>
        <CustomerDetailsBar 
          name={user.name}
          address={user.address}
          phoneNumber={user.phoneNumber}
        />
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-12">
          <KhataCutomers userId={id} />
        </div>
      </div>
    </div>
  );
}

export default Order;
