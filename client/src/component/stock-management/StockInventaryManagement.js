import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../..";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const StockInventaryManagement = () => {
  const navigate = useNavigate();
  const [stockList, setStockList] = useState([]);
  const [stockListForSearch, setStockListOnSearch] = useState([]);

  const [refresh, setRefresh] = useState(false);

  //load data
  useEffect(() => {
    axios
      .get(`${server}/stock/mystock`, {
        withCredentials: true,
      })
      .then((res) => {
        setStockList(res.data.stocks);
        setStockListOnSearch(res.data.stocks);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [refresh]);

  const handleUpdate = (id) => {
    // Update logic here
    alert(`Update item with ID: ${id}`);
    
    // Store variable in local storage
    localStorage.setItem("documentId", id);
    navigate("../newStock")
  };

  const handleDelete = (id) => {
    // Delete logic here
    alert(`Delete item with ID: ${id}`);
    try {
     const {data} = axios
      .delete(`${server}/stock/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
       setRefresh(true)
      })
      .catch((e) => {
        console.log(e);
      });

      const {success, message} = data
      if(success){
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.success(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // handle search
  const handleSearch = (e) => {
    const searchTerm = e.target.value.trim().toLowerCase(); // Get the trimmed lowercase search term

    if (searchTerm === " ") {
      setStockList(stockList); // If the search term is empty, show the entire original array
    } else {
      // Filter the array based on the search term
      const tempVar = stockListForSearch?.filter((item) =>
        item.productName?.trim().toLowerCase().includes(searchTerm)
      );
      setStockList(tempVar); // Update the array state with the filtered results
    }
  };

  return (
    <div>
      <ToastContainer/>
      <div>
        <h2 className=" w-full p-1 px-4 text-white text-lg font-semibold mb-4 text-left uppercase bg-gray-900 rounded">
          All Stock Available
        </h2>
      </div>
      {/* handle search  */}
      <div className="flex items-center border border-gray-300 rounded-md p-2">
        <input
          type="text"
          onChange={(e) => handleSearch(e)}
          placeholder="Search Product..."
          className="w-full outline-none"
        />
      </div>
      {/* end handle search  */}
      <div>
        <table className="w-fit bg-white">
          <thead>
            <tr>
              <th className="p-3 border-b-2 border-gray-300 text-left text-sm font-bold text-gray-600 uppercase">
                Stock ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-bold text-gray-600 uppercase">
                Product Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-bold text-gray-600 uppercase">
                Expiry Date
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-bold text-gray-600 uppercase">
                Poduct Unit Type
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-bold text-gray-600 uppercase">
                Kharid Amount
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-bold text-gray-600 uppercase">
                Total Amount
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-bold text-gray-600 uppercase">
                Wholesale Rate
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-bold text-gray-600 uppercase">
                Retail Rate
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-bold text-gray-600 uppercase">
                Product Category
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-bold text-gray-600 uppercase">
                Distributer Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-bold text-gray-600 uppercase">
                Date
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-bold text-gray-600 uppercase">
                Submitted By
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-bold text-gray-600 uppercase">
                Actions
              </th>
              {/* Add other table headers similarly */}
              <th className="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {stockList
              ?.sort((a, b) => {
                const dateObjectA = new Date(a.createdAt);
                const dateObjectB = new Date(b.createdAt);

                const timeAInSeconds =
                  dateObjectA.getHours() * 3600 +
                  dateObjectA.getMinutes() * 60 +
                  dateObjectA.getSeconds();
                const timeBInSeconds =
                  dateObjectB.getHours() * 3600 +
                  dateObjectB.getMinutes() * 60 +
                  dateObjectB.getSeconds();

                return timeAInSeconds - timeBInSeconds;
              })
              .map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.stockId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.productName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.productExpiryDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.productUnitType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.kharidAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.totalAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.wholesaleAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.retailAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.productCategory}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.distributerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.submittedBy.name}
                  </td>
                  {/* Add other table data cells similarly */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleUpdate(item._id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockInventaryManagement;
