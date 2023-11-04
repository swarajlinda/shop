import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { server } from "../..";

function GenerateInvoice() {
  const [stockList, setStockList] = useState([]);
  const [stockListItems, setStockListItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [itemslist, setItemsList] = useState([]);
  const [itemsSearchList, setItemsSearchList] = useState([]);
  const paymentModes = ["Cash", "Online", "Card"];
  const [formData, setFormData] = useState({
    invoiceId: "",
    customerName: "Walkin Customer",
    address: "",
    phoneNumber: "",
    paymentMode: "",
    paidAmount: 0,
    dueAmount: 0,
    isPaymentDone: false,
    items: [],
    quantities: [],
    prices: [],
    totalAmount: 0,
  });

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

  let healthAndCareStockList = [];
  let fruitsandVegetablesStockList = [];
  let dairyandEggsStockList = [];
  let breadandBakeryStockList = [];
  let masalasStockList = [];
  let snacksStockList = [];
  let frozenFoodsStockList = [];
  let cannedGoodsStockList = [];
  let householdSuppliesStockList = [];
  let babyCareStockList = [];
  let oilsandSoucesStockList = [];
  let tobaccoStockList = [];
  let othersStockList = [];
  let productList = [];
  let categoryWiseStock = [];

  // load stock
  useEffect(() => {
    axios
      .get(`${server}/stock/mystock`, {
        withCredentials: true,
      })
      .then((res) => {
        setStockList(res.data.stocks);
        setStockListItems(res.data.stocks);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //generate custom invoice id
  useEffect(() => {
    // setInvoiceId(uuidv4())
    const uuid = uuidv4();
    const min = 100000000; // Minimum 7-digit number
    const max = 999999999; // Maximum 7-digit number
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const nextInvoiceId = `INVDSTNR${randomNumber}`;
    //set invoice id
    setFormData({ ...formData, invoiceId: nextInvoiceId });
  }, []);

  for (let i = 0; i < stockList.length; i++) {
    //health and care category
    if (stockList[i].productCategory === "Health and Beauty") {
      healthAndCareStockList.push({
        name: stockList[i]?.productName,
        qty: stockList[i]?.productQnty,
      });
    }

    //Fruits and Vegetables
    if (stockList[i].productCategory === "Fruits and Vegetables") {
      fruitsandVegetablesStockList.push({
        name: stockList[i]?.productName,
        qty: stockList[i]?.productQnty,
      });
    }

    //Dairy and Eggs
    if (stockList[i].productCategory === "Dairy and Eggs") {
      dairyandEggsStockList.push({
        name: stockList[i]?.productName,
        qty: stockList[i]?.productQnty,
      });
    }

    //Bread and Bakery
    if (stockList[i].productCategory === "Bread and Bakery") {
      breadandBakeryStockList.push({
        name: stockList[i]?.productName,
        qty: stockList[i]?.productQnty,
      });
    }

    //Masalas
    if (stockList[i].productCategory === "Masalas") {
      masalasStockList.push({
        name: stockList[i]?.productName,
        qty: stockList[i]?.productQnty,
      });
    }

    //Snacks
    if (stockList[i].productCategory === "Snacks") {
      snacksStockList.push({
        name: stockList[i]?.productName,
        qty: stockList[i]?.productQnty,
      });
    }

    //Frozen Food
    if (stockList[i].productCategory === "Frozen Food") {
      frozenFoodsStockList.push({
        name: stockList[i]?.productName,
        qty: stockList[i]?.productQnty,
      });
    }

    //Canned Goods
    if (stockList[i].productCategory === "Canned Goods") {
      cannedGoodsStockList.push({
        name: stockList[i]?.productName,
        qty: stockList[i]?.productQnty,
      });
    }

    //Household Supplies
    if (stockList[i].productCategory === "Household Supplies") {
      householdSuppliesStockList.push({
        name: stockList[i]?.productName,
        qty: stockList[i]?.productQnty,
      });
    }

    //Baby Care
    if (stockList[i].productCategory === "Baby Care") {
      babyCareStockList.push({
        name: stockList[i]?.productName,
        qty: stockList[i]?.productQnty,
      });
    }

    //Oils and Souces
    if (stockList[i].productCategory === "Oils and Souces") {
      oilsandSoucesStockList.push({
        name: stockList[i]?.productName,
        qty: stockList[i]?.productQnty,
      });
    }

    //tobacco
    if (stockList[i].productCategory === "Tobacco") {
      tobaccoStockList.push({
        name: stockList[i]?.productName,
        qty: stockList[i]?.productQnty,
      });
    }

    //other
    if (stockList[i].productCategory === "Others") {
      othersStockList.push({
        name: stockList[i]?.productName,
        qty: stockList[i]?.productQnty,
      });
    }

    //productList

    if (stockList[i]?.productName && stockList[i]?.productQnty) {
      productList.push({
        productName: stockList[i].productName,
        productQnty: stockList[i].productQnty,
      });
    }
  }



  //show stock with categoty

  const categoryWiseStockHandle = (category) => {
    // Clear the itemslist by setting its length to 0
    setItemsList([]);
    categoryWiseStock.length = 0;
    // console.log(`this ${category}`);
    setIsOpen(true);

    for (let i = 0; i < stockList.length; i++) {
      if (category === stockList[i].productCategory) {
        categoryWiseStock.push({
          name: stockList[i]?.productName,
          qty: stockList[i]?.productQnty,
        });
      }
    }
    setItemsSearchList(categoryWiseStock);
    setItemsList(categoryWiseStock);
  };

  //handle for input change
  const handleInputChange = (e, index, field) => {
    const value = e.target.value;

    if (field === "items") {
      const updatedItems = [...formData.items];
      updatedItems[index] = value;
      setFormData({ ...formData, items: updatedItems });
    } else if (field === "quantities") {
      const updatedQuantities = [...formData.quantities];
      updatedQuantities[index] = value;
      setFormData({ ...formData, quantities: updatedQuantities });
    } else if (field === "prices") {
      const updatedPrices = [...formData.prices];
      updatedPrices[index] = value;
      setFormData({ ...formData, prices: updatedPrices });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  // const handleSetItemAndqty = (item, index) => {
  //   const updatedItems = [...formData.items];
  //   updatedItems[index] = item;
  //   setFormData({ ...formData, items: updatedItems });
  // };



  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, ""],
      quantities: [...formData.quantities, ""],
      prices: [...formData.prices, ""],
    });
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...formData.items];
    const updatedQuantities = [...formData.quantities];
    const updatedPrices = [...formData.prices];

    updatedItems.splice(index, 1);
    updatedQuantities.splice(index, 1);
    updatedPrices.splice(index, 1);

    setFormData({
      ...formData,
      items: updatedItems,
      quantities: updatedQuantities,
      prices: updatedPrices,
    });
  };

  const calculateTotalAmount = () => {
    let total = 0;
    // Calculate the total amount if prices and quantities are valid numbers
    formData.prices.forEach((price, index) => {
      total += parseFloat(price) * parseInt(formData.quantities[index]);
    });
    setFormData({ ...formData, totalAmount: total });

    //calculate due amount
    if (!formData.paidAmount) return;
    const dueAmt = formData.totalAmount - formData.paidAmount;
    setFormData({ ...formData, dueAmount: dueAmt });
  };

  const calculateTlAmt = () => {
    calculateTotalAmount();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    calculateTotalAmount();
    // Perform further actions, such as submitting the invoice data
    // console.log(formData);

    // Prepare the data to send to the backend
    const data = {
      invoiceId: formData.invoiceId,
      customerName: formData.customerName,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
      paidAmount: formData.paidAmount,
      paymentMode: formData.paymentMode,
      items: formData.items,
      quantities: formData.quantities,
      prices: formData.prices,
      totalAmount: formData.totalAmount,
    };

    // console.log(data);

    //hit the api of mongo db backend
    try {
      const response = await axios.post(`${server}/invoice/new`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        // Handle success, maybe reset the form or show a success message
        console.log("Invoice submitted successfully!");
      } else {
        // Handle error, display an error message or perform an action
        console.error("Failed to submit the invoice.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //pament mode
  const handlePaymentModeChange = (event) => {
    setFormData({ ...formData, paymentMode: event.target.value });
  };

  // search from local
  const handleSearch = (e) => {
    const searchTerm = e.target.value.trim().toLowerCase(); // Get the trimmed lowercase search term

    if (searchTerm === " ") {
      setItemsList(itemslist); // If the search term is empty, show the entire original array
    } else {
      // Filter the array based on the search term
      const tempVar = itemsSearchList?.filter((item) =>
        item.name?.trim().toLowerCase().includes(searchTerm)
      );
      setItemsList(tempVar); // Update the array state with the filtered results
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(getPrintableInvoice());
    printWindow.document.close();
    printWindow.print();
  };

  const getPrintableInvoice = () => {
    let printableContent = `
      <style>
        /* Add styles for printable content */
        /* Example: */
        body { font-family: Arial, sans-serif; }
        /* Add more styles here */
      </style>
      <div class="invoice-print">
        <h1>Create Invoice</h1>
        <p>Invoice ID: ${formData.invoiceId}</p>
        <p>Customer Name: ${formData.customerName}</p>
        <h2>Items:</h2>
        <ul>
    `;

    formData.items.forEach((item, index) => {
      printableContent += `
        <li>
          Item: ${formData.items[index]}, 
          Quantity: ${formData.quantities[index]}, 
          Price: ${formData.prices[index]}
        </li>
      `;
    });

    printableContent += `
        </ul>
        <p>Total Amount: ${formData.totalAmount}</p>
      </div>
    `;

    return printableContent;
  };

  return (
    <div className="grid grid-cols-12">
      {/* // stock list  */}
      <div className="col-span-3 w-full mx-auto bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Product list</h2>
        <div className="flex items-center border border-gray-300 rounded-md p-2">
          <input
            type="text"
            onChange={(e) => handleSearch(e)}
            placeholder="Search Product..."
            className="w-full outline-none"
          />
        </div>
        {isOpen &&
          (itemslist.length > 0 ? (
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Product</th>
                  <th className="px-4 py-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {itemslist?.map((categoryItem) => (
                  <tr key={categoryItem.id}>
                    <td className="border px-4 py-2">
                      <p className="font-semibold">{categoryItem.name}</p>
                    </td>
                    <td className="border px-4 py-2">
                      <p className="text-gray-600">{categoryItem.qty}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-3xl p-2">Stock not available</p>
          ))}
      </div>

      <div className="invoice-form col-span-6 w-full mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Create Invoice</h1>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Invoice ID:</label>
            <input
              type="text"
              readOnly
              value={formData.invoiceId}
              onChange={(e) => handleInputChange(e, null, "invoiceId")}
              className="border rounded-md py-1 px-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Customer Name:</label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => handleInputChange(e, null, "customerName")}
              className="border rounded-md py-1 px-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Address:</label>
            <input
              type="text"
              placeholder="Address(Optional)"
              value={formData.address}
              onChange={(e) => handleInputChange(e, null, "address")}
              className="border rounded-md py-1 px-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Phone Number</label>
            <input
              type="text"
              placeholder="Phone Number(Optional)"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange(e, null, "phoneNumber")}
              className="border rounded-md py-1 px-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <button
            type="button"
            onClick={handleAddItem}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Add Item
          </button>

          {formData.items.map((item, index) => (
            <div key={index} className="flex space-x-4">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600">Item:</label>
                <input
                  placeholder="Select Items"
                  type="text"
                  value={formData.items[index]}
                  onChange={(e) => handleInputChange(e, index, "items")}
                  className="border rounded-md py-1 px-2 focus:outline-none focus:ring focus:border-blue-300"
                />

                {/* {isOpenItems &&
                  (stockListItems.length > 0 ? (
                    <table className="table-auto">
                      <tbody>
                        {stockListItems?.map((item) => (
                          <tr key={item.id}>
                            <td className="border px-4 py-2 cursor-pointer" >
                              <p className="font-semibold">
                                {item.productName}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-center text-3xl p-2">
                      Stock not available
                    </p>
                  ))} */}
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600">Quantity:</label>
                <input
                  type="number"
                  value={formData.quantities[index]}
                  onChange={(e) => handleInputChange(e, index, "quantities")}
                  className="border rounded-md py-1 px-2 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600">Price:</label>
                <input
                  type="number"
                  value={formData.prices[index]}
                  onChange={(e) => handleInputChange(e, index, "prices")}
                  className="border rounded-md py-1 px-2 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          {/* payment mode  */}
          <div>
            <label htmlFor="paymentMode">Select Payment Mode:</label>
            <select
              id="paymentMode"
              value={formData.paymentMode}
              onChange={handlePaymentModeChange}
            >
              <option value="">Select a payment mode</option>
              {paymentModes.map((mode, index) => (
                <option key={index} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
            {formData.paymentMode && (
              <p>Selected Payment Mode: {formData.paymentMode}</p>
            )}
          </div>

          {/* paid amount  */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Paid Amount</label>
            <input
              type="number"
              placeholder="Paid Amount"
              value={formData.paidAmount}
              onChange={(e) => handleInputChange(e, null, "paidAmount")}
              className="border rounded-md py-1 px-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>

          <p className="text-lg">Total Amount: {formData.totalAmount}</p>
          <p className="text-lg">Due Amount: {formData.dueAmount}</p>
        </div>

        <button
          onClick={calculateTlAmt}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Culculate Amount
        </button>

        {/* //print  */}
        <button
          type="button"
          onClick={handlePrint}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          Print Invoice
        </button>
      </div>

      {/* //stock available */}
      <div className="col-span-3 w-full mx-auto bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          Product Categories
        </h2>
        <ul>
          {groceryCategories.map((stockItem) => (
            <li
              key={stockItem.id}
              className="border-b py-2 cursor-pointer"
              onClick={() => categoryWiseStockHandle(stockItem)}
            >
              <p className="text-lg font-semibold">{stockItem}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GenerateInvoice;
