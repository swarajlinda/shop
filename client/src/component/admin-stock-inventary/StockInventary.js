import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../..";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useLocation } from "react-router-dom";

const StockInventary = () => {
  const [productName, setProductName] = useState("");
  const [productExpireDate, setProductExpireDate] = useState("");
  const [wholesaleAmount, setWholesaleAmount] = useState(0);
  const [productUnitType, setProductUnitType] = useState("");
  const [productQnty, setProductQnty] = useState(0);
  const [kharidAmount, setKharidAmount] = useState(0);
  const [retailAmount, setRetailAmount] = useState(0);
  const [distributerName, setDistributorName] = useState("");
  const [productCategory, setProductCategory] = useState("");

  const [isIdAvailble, setIsIdAvailable] = useState(false);

  //paas document id from stock management protal
  // const { state } = useLocation();
  // console.log(state.documentId);
  // Retrieve variable from local storage
  const documentId = localStorage.getItem("documentId");

  // check documentid is null not

  const groceryCategories = [
    "Fruits and Vegetables",
    "Dairy and Eggs",
    "Bread and Bakery",
    "Masalas",
    "Snacks",
    "Frozen Foods",
    "Canned Goods",
    "Health and Beauty",
    "Household Supplies",
    "Baby Care",
    "Oils and Souces",
    "Tobacco",
    "Others",
  ];

  //find document by id for updation
  useEffect(() => {
    try {
      if(!documentId){
        return
      }
      axios
        .get(`${server}/stock/${documentId}`, {
          withCredentials: true,
        })
        .then((res) => {
          const { success, message } = res.data;
          if (success) {
            setProductName(res.data.specificStock.productName);
            setProductExpireDate(res.data.specificStock.productExpiryDate);
            setProductUnitType(res.data.specificStock.productUnitType);
            setKharidAmount(res.data.specificStock.kharidAmount);
            setProductQnty(res.data.specificStock.productQnty);
            setProductCategory(res.data.specificStock.productCategory);
            setRetailAmount(res.data.specificStock.retailAmount);
            setWholesaleAmount(res.data.specificStock.wholesaleAmount);
            setDistributorName(res.data.specificStock.distributerName);
            setIsIdAvailable(true);
            // setProductExpireDate(res.data.specificStock.productExpiryDate)
          }
          console.log(success);
          console.log(message);
        })
        .catch((e) => {
          console.log(e);
        });

      // console.log(data.data.specificStock)
    } catch (error) {}
  }, [documentId]);

  // handle for create new stock
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${server}/stock/newstock`,
        {
          productName,
          productExpireDate,
          wholesaleAmount,
          productUnitType,
          productQnty,
          productCategory,
          kharidAmount,
          retailAmount,
          distributerName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message } = data;
      if (success) {
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      // Reset the form after handling the data
      setProductName("");
      setProductExpireDate("");
      setWholesaleAmount(0);
      setProductUnitType("");
      setProductQnty(0);
      setKharidAmount(0);
      setRetailAmount(0);
      setProductCategory("");
      setDistributorName("");
    } catch (error) {
      toast.success(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //handle for update the document stock
  const handleOnUpdate = async () => {
    try {
      const { data } = await axios.put(
        `${server}/stock/${documentId}`,
        {
          productName,
          productExpireDate,
          wholesaleAmount,
          productUnitType,
          productQnty,
          productCategory,
          kharidAmount,
          retailAmount,
          distributerName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message } = data;
      if (success) {
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        // To remove the variable from localStorage
        localStorage.removeItem("documentId");
      }

      // Reset the form after handling the data
      setProductName("");
      setProductExpireDate("");
      setWholesaleAmount(0);
      setProductUnitType("");
      setProductQnty(0);
      setKharidAmount(0);
      setRetailAmount(0);
      setProductCategory("");
      setDistributorName("");
      setIsIdAvailable(false);
    } catch (error) {
      toast.success(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //

  return (
    <div className="">
      <ToastContainer />
      <h2 className=" w-full p-1 px-4 text-white text-lg font-semibold mb-4 text-left uppercase bg-gray-900 rounded">
        new Stock Inventory
      </h2>
      <div className=" flex justify-center items-center  mt-5 mx-auto  ">
        <div className="bg-white p-4 w-[600px] shadow-md rounded-md">
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              placeholder="Product Name"
              type="text"
              id="productName"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          {/* product unit in number   */}
          <div className="mb-4">
            <label
              htmlFor="productUnit"
              className="block text-sm font-medium text-gray-700"
            >
              Product Expiry Date
            </label>
            <input
              type="date"
              id="productUnit"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={productExpireDate}
              onChange={(e) => setProductExpireDate(e.target.value)}
            />
          </div>

          {/* product unit type  */}

          <div className="mb-4">
            <label
              htmlFor="productUnitType"
              className="block text-sm font-medium text-gray-700"
            >
              Product Unit Type with (kg/prices/pouch/packet/weight/liter)
            </label>
            <input
              placeholder="Produnct Unit type"
              type="text"
              id="productUnitType"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={productUnitType}
              onChange={(e) => setProductUnitType(e.target.value)}
            />
          </div>

          {/* kharid amount  */}

          <div className="mb-4">
            <label
              htmlFor="kharidAmount"
              className="block text-sm font-medium text-gray-700"
            >
              Kharid Amount
            </label>
            <input
              type="number"
              id="kharidAmount"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={kharidAmount}
              onChange={(e) => setKharidAmount(e.target.value)}
            />
          </div>

          {/* product qunty */}
          <div className="mb-4">
            <label
              htmlFor="productQnty"
              className="block text-sm font-medium text-gray-700"
            >
              Produnct Quntity
            </label>
            <input
              type="number"
              id="productQnty"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={productQnty}
              onChange={(e) => setProductQnty(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="paymentMode">Select Product Category</label>
            <br />
            <select
              id="paymentMode"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500 focus:bg-white"
            >
              <option value="">----Select Category----</option>
              {groceryCategories.map((mode, index) => (
                <option key={index} value={mode} className="py-2">
                  {mode}
                </option>
              ))}
            </select>

            {productCategory && <p>Selected Category: {productCategory}</p>}
          </div>

          {/* totalAmount  */}
          <div className="mb-4">
            <label
              htmlFor="wholesaleAmount"
              className="block text-sm font-medium text-gray-700"
            >
              Wholesale Amount
            </label>
            <input
              type="number"
              id="wholesaleAmount"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={wholesaleAmount}
              onChange={(e) => setWholesaleAmount(e.target.value)}
            />
          </div>

          {/* retailAmount */}
          <div className="mb-4">
            <label
              htmlFor="retailAmount"
              className="block text-sm font-medium text-gray-700"
            >
              Retail Amount
            </label>
            <input
              type="number"
              id="retailAmount"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={retailAmount}
              onChange={(e) => setRetailAmount(e.target.value)}
            />
          </div>

          {/* DISTRIBUTER NAME  */}

          <div className="mb-4">
            <label
              htmlFor="distributerName"
              className="block text-sm font-medium text-gray-700"
            >
              Distributer Name
            </label>
            <input
              placeholder="Distributer Name"
              type="text"
              id="distributerName"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={distributerName}
              onChange={(e) => setDistributorName(e.target.value)}
            />
          </div>

          {isIdAvailble ? (
            <button
              type="submit"
              onClick={handleOnUpdate}
              className="bg-green-500 w-full text-white py-2 px-4 rounded-md hover:bg-green-600 font-bold uppercase"
            >
              Update
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 w-full text-white py-2 px-4 rounded-md hover:bg-blue-600 font-bold uppercase"
            >
              Submit
            </button>
          )}

          {/* button for update the details  */}
        </div>
      </div>
    </div>
  );
};

export default StockInventary;
