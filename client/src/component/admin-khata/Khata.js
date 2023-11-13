import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../..";
import { useNavigate } from "react-router-dom";
import KhataHolderCutomer from "../admin-khata-holder/KhataHolderCutomer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Khata = () => {
  const navigate = useNavigate();
  const [customerList, setCustomerList] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const [refresh, setRefresh] = useState(false);
  const [id, setId] = useState("");

  
  const uid = localStorage.getItem("id");
  useEffect(()=>{
    setId(uid)
  },[uid])
 

  //show all the customer
  useEffect(() => {
    axios
      .get(`${server}/sell/allbuyer`, {
        withCredentials: true,
      })
      .then((res) => {
        setCustomerList(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [refresh]);



  //update customer
useEffect(()=>{
   //find the customer id
   const foundCustomer = customerList.find((customer) => customer._id === id);

   if (foundCustomer) {
     console.log("Customer found:", foundCustomer);
     setName(foundCustomer.name);
     setAddress(foundCustomer.address);
     setPhoneNumber(foundCustomer.phoneNumber);
     setIsUpdate(true)
   } else {
     console.log("Customer not found");
   }
},[customerList,id])



 //handle for create entry on db
 const handleOnNewCustomer = async (e) => {
  e.preventDefault();

  console.log(name, address, phoneNumber);

  try {
    const data = await axios.post(
      `${server}/sell/newbuyer`,
      {
        name,
        address,
        phoneNumber,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    
    const {success, message} = data.data
    console.log(data.data)

    if(success){
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log("data added successfully!");
      setRefresh((prev) => !prev);
      localStorage.removeItem("id")
      navigate("../manageKhata")
    }

    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

   


  //final update customer details
  const handleOnUpdateCustomer = async () => {
    try {
     const {data} =  await axios.put(
        `${server}/sell/${id}`,
        {
          name,
          address,
          phoneNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const {success, message} = data

      if(success){
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("data added successfully!");
        setRefresh((prev) => !prev);
        localStorage.removeItem("id")
        navigate("../manageKhata")
      }

    } catch (error) {
      console.log(error);
    }
  };



 

  return (
    <div>
      <ToastContainer/>
      <h2 className=" w-full p-1 px-4 text-white text-lg font-semibold mb-4 text-left uppercase bg-gray-900 rounded">
        New Khata
      </h2>
      <div className="w-full">
        <div className="flex justify-center items-center mt-32">
          <form className="bg-white w-96 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <h1 className="text-center font-bold text-lg"> Create New Khata</h1>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phoneNumber"
                type="text"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              {!isUpdate ? (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleOnNewCustomer}
                >
                  Create
                </button>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleOnUpdateCustomer}
                >
                  Update
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Khata;
