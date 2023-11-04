import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../..";

function StockInventary() {
  const [stockList, setStockList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [productName, setProductName] = useState("");
  const [productUnit, setProductUnit] = useState(0);
  const [wholesaleAmount, setWholesaleAmount] = useState(0);
  const [productUnitType, setProductUnitType] = useState("");
  const [productQnty, setProductQnty] = useState(0);
  const [kharidAmount, setKharidAmount] = useState(0);
  const [retailAmount, setRetailAmount] = useState(0);
  const [distributerName, setDistributorName] = useState("");
  const [productCategory, setProductCategory] = useState("");

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

  console.log(stockList);

  //load data
  useEffect(() => {
    axios
      .get(`${server}/stock/mystock`, {
        withCredentials: true,
      })
      .then((res) => {
        setStockList(res.data.stocks);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [refresh]);

  //console.log("this",stockList)

  // handle for create new stock
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.post(
        `${server}/stock/newstock`,
        {
          productName,
          productUnit,
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

      setRefresh((prev) => !prev);
     
      // Reset the form after handling the data
      setProductName("");
      setProductUnit(0);
      setWholesaleAmount(0);
      setProductUnitType("");
      setProductQnty(0);
      setKharidAmount(0);
      setRetailAmount(0);
      setProductCategory("");
      setDistributorName("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id) => {
    // Update logic here
    alert(`Update item with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Delete logic here
    alert(`Delete item with ID: ${id}`);
  };

  return (
    <div className="grid grid-cols-12">
      <div className="w-full mx-auto col-span-3 p-4 bg-white shadow-md rounded-md">
        <h2 className="text-lg font-semibold mb-4 text-center ">
          Stock Inventory Management
        </h2>
        <form onSubmit={handleSubmit}>
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
              Product Unit (in Number)
            </label>
            <input
              type="number"
              id="productUnit"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={productUnit}
              onChange={(e) => setProductUnit(e.target.value)}
            />
          </div>

          {/* product unit type  */}

          <div className="mb-4">
            <label
              htmlFor="productUnitType"
              className="block text-sm font-medium text-gray-700"
            >
              Product Unit Type (kg/prices/pouch/packet/weight/liter)
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
            <label htmlFor="paymentMode">Select Product Category:</label>
            <select
              id="paymentMode"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            >
              <option value="">----Select Category----</option>
              {groceryCategories.map((mode, index) => (
                <option key={index} value={mode}>
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

          <button
            type="submit"
            className="bg-blue-500 w-full text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>

      {/* table of stock  */}

      <div className="col-span-9">
        <table className="w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-bold text-gray-600 uppercase">
                Stock ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-bold text-gray-600 uppercase">
                Product Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-bold text-gray-600 uppercase">
                Product Unit
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
            {stockList?.sort((a,b)=>{
              const dateObjectA = new Date(a.createdAt);
              const dateObjectB = new Date(b.createdAt);

              const timeAInSeconds = dateObjectA.getHours() * 3600 + dateObjectA.getMinutes() * 60 + dateObjectA.getSeconds();
              const timeBInSeconds = dateObjectB.getHours() * 3600 + dateObjectB.getMinutes() * 60 + dateObjectB.getSeconds();

              return timeAInSeconds - timeBInSeconds;
            }).map((item, index) => (
              
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{item.stockId}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.productUnit}
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
                  {(new Date(item.createdAt)).toLocaleString()}
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
}

export default StockInventary;
