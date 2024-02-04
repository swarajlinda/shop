import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { server } from "../..";
import Select from "react-select";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Invoice = () => {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState("");
  const [itemQnty, setItemQnty] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemWholeSaleRate, setItemWholeSaleRate] = useState("");
  const [itemRetailRate, setItemRetailRate] = useState("");
  const [itemPurchasedRate, setItemPurchasedRate] = useState("");

  const [stockList, setStockList] = useState([]);

  const [stockId, setStockId] = useState("");

  const [invoiceId, setInvoiceId] = useState("");
  const [customerName, setCustomerName] = useState("Walking Customer");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [paymentMode, setPaymentMode] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);
  const [dueAmount, setDueAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  // const [isPaymentDone, setIsPaymentDone] = useState(false);/
  const [paymentMode, setPaymentMode] = useState(false);

  const [formData, setFormData] = useState({
    // items: [],
    // quantities: [],
    // prices: [],
    itemList: [],
  });
  const paymentModes = ["Cash", "Online", "Card"];
  const options = [];


  //load data
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`${server}/stock/mystock`, {
          withCredentials: true,
        });
  
        setStockList(response.data.stocks);
      } catch (error) {
        console.error(error);
      }
    };
  
    // Invoke the function to fetch stock data
    fetchStockData();
  
  }, []); 
  

  //generate custom invoice id
  useEffect(() => {
    const min = 10000000; // Minimum 7-digit number
    const max = 99999999; // Maximum 7-digit number
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const nextInvoiceId = `INVDSTNR${randomNumber}`;
    //set invoice id
    setInvoiceId(nextInvoiceId);
  }, []);

  //load
  for (let i = 0; i < stockList.length; i++) {
    const value = stockList[i].productName;
    const label = stockList[i].productName;
    options.push({ value, label });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    
    // Prepare the data to send to the backend
    const data = {
      invoiceId,
      customerName,
      address,
      phoneNumber,
      paidAmount,
      paymentMode,
      itemList: formData.itemList,
      totalAmount,
    };

    //validation 
    if(formData.itemList.length > 0){
      try {
        const response = await axios.post(`${server}/invoice/new`, data, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
  
        if (response.status === 200) {
          // reset to initial
          setFormData((prevFormData) => ({
            ...prevFormData,
            itemList: [],
          }));
          // Handle success, maybe reset the form or show a success message
          toast.success("Invoice submitted successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
  
          //navigate to invoice management
          setCustomerName("Walking Customer")
          setPaidAmount(0)
          setAddress("")
          setPhoneNumber("")      
          handleOnPrint();
        } else {
          // Handle error, display an error message or perform an action
          toast.error("Failed to submit the invoice.", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error(`Error: ${error}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }else{
      alert("Please add Products")
    }



    // hit the api of mongo db backend
   
  };

  //add item
  const handleAddItem = () => {
    const data = {
      itemName,
      itemQnty,
      itemPrice,
      itemTotalAmt: itemQnty * itemPrice,
      itemWholeSaleRate: itemQnty * itemWholeSaleRate,
      itemRetailRate: itemQnty * itemRetailRate,
      itemPurchasedRate: itemQnty * itemPurchasedRate,
      stockId,
    };
    // console.log(data)
    addMultipleItems(data);
  };

  const addMultipleItems = (data) => {
    calculateTotalAmount(formData.itemList);
    setFormData((prevFormData) => ({
      itemList: [...prevFormData.itemList, data],
    }));
  };


  const removeItem = (index) => {
    const updatedItemList = [...formData.itemList];
    updatedItemList.splice(index, 1);
    setFormData({ ...formData, itemList: updatedItemList });
  };

  //set item name handle
  const handleSelectChange = (selectedOption) => {
    setItemName(selectedOption.value);

    for (let i = 0; i < stockList.length; i++) {
      if (selectedOption.value === stockList[i].productName) {
        setStockId(stockList[i].stockId);
        setItemRetailRate(stockList[i].retailAmount)
        setItemWholeSaleRate(stockList[i].wholesaleAmount)
        setItemPurchasedRate(stockList[i].kharidAmount)
        if (stockList[i].productQnty === 0) {
          alert("Stock Not Available!");
        }
        setItemQnty(stockList[i].productQnty);
      }
    }
  };

  
  // console.log(itemRetailRate, itemWholeSaleRate, itemPurchasedRate)

  // calculate total amount
  const calculateTotalAmount = useCallback(() => {
    let total = 0;

    if (formData && formData.itemList && formData.itemList.length > 0) {
      formData.itemList.forEach((item) => {
        if (item.itemPrice && item.itemQnty) {
          total += item.itemPrice * item.itemQnty;
        }
      });
    }

    setTotalAmount(total);
    setItemName();
    setItemPrice(0);
    setItemQnty(0);
  }, [formData]);

  useEffect(() => {
    calculateTotalAmount();

    // Calculate due amount if paidAmount is available
    if (paidAmount) {
      if (paidAmount <= totalAmount) {
        const dueAmt = totalAmount - paidAmount;
        setDueAmount(dueAmt);
      } else {
        alert("Please Enter Correct Amount");
        setDueAmount(0);
        setPaidAmount(0);
      }
    }
  }, [calculateTotalAmount, totalAmount, paidAmount]);

  //GET TODAYS DATE
  // Create a new Date object
  const today = new Date();

  // Get individual components of the date
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = today.getDate();

  // Format the date as a string (YYYY-MM-DD)
  const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;

  // console.log(formattedDate); // Output: YYYY-MM-DD 

  //  handle for print
  const handleOnPrint = () => {
    const printWindow = window.open("", "", "width=1000, height=900");
    printWindow.document.write(getPrintableInvoice());
    printWindow.document.close();
    printWindow.print();
    navigate("../manageInvoice");
  };

  const getPrintableInvoice = () => {
    let printableContent = `
    <style>
      body {
        font-family: 'Arial', sans-serif;
      }
      .invoice-print {
        width: 300px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        text-align: center;
        color: #333;
      }
      .address{
        text-align: center;
        color: #555;
      }
      h2 {
        text-align: center;
        color: #555;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
      }
      th, td {
        border: 1px dashed #ddd;
        padding: 8px;
        text-align: left;
      }
      .total {
        margin-top: 10px;
        text-align: right;
        font-weight: bold;
        font-size: 18px;
      }
      .line-container {
        display: flex;
        justify-content: space-between;
      }
    
      span {
        font-size:14px;
        margin: 0; 
      }
      .dueAmt{
        margin-top: 20px;
        text-align: right;
        font-weight: bold;
        font-size: 14px;
      }

      .greet {
        text-align: center;
        margin: 5px 0;
      }
      .greetOther {
        text-align: center;
        margin: 2px 0;
      }
    
      .greeting {
        font-size: 14px;
        font-weight: bold;
        color: #333;
      }
      .other {
        font-size: 10px;
        color: #333;
      }
    </style>
    <div class="invoice-print">
      <h2>DGS Invoice</h2>
      <p class="address">Tantnagar, W.Singbhum, Jharkhand</p>
      <div class="line-container">
  <span>Date: ${formattedDate}</span>
  <span>Inv.ID: ${invoiceId}</span>
</div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
  `;

    formData.itemList.forEach((item, index) => {
      printableContent += `
      <tr>
        <td>${item.itemName}</td>
        <td>${item.itemQnty}</td> 
        <td>${item.itemTotalAmt}</td>
      </tr>
    `;
    });

    printableContent += `
    </tbody>
      </table>
      <div class="dueAmt">Total Due Amount: ${dueAmount}</div>
      <div class="total">Total Amount: ${totalAmount}</div>

      <hr/>
      <div class="greet"><p class="greeting">Thank You!</p></div>
      <div class="greetOther"><p class="other">Visit Again</p></div>
     <div class="greetOther"><p class="other">Have a nice day!</p></div>
    </div>
  `;

    return printableContent;
  };

  return (
    <div>
      <ToastContainer />
      <div className="w-full">
        <h2 className=" w-full p-1 px-4 text-white text-lg font-bold mb-4 text-left uppercase bg-green-500 ">
           Generate Invoice
        </h2>

        {/* GENERATE INVOICE  */}
        <div className="invoice-form col-span-6 max-w-4xl mx-auto  p-4 bg-slate-100 rounded-lg shadow-lg">
          {/* <h1 className="text-2xl font-bold mb-4">Create Invoice</h1> */}
          <p className="text-center text-green-500 font-bold text-3xl p-2">New Invoice</p> <hr />
          <div className="space-y-4 mt-3">
            <div className="flex flex-col">
              <label className="text-md text-gray-600">Invoice ID:</label>
              <input
                type="text"
                readOnly
                value={invoiceId}
                onChange={(e) => setInvoiceId(e.target)}
                className="border rounded-md py-2 px-2  focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-md text-gray-600">Customer Name:</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="border rounded-md py-2 px-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-md text-gray-600">Address:</label>
              <input
                type="text"
                placeholder="Address(Optional)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border rounded-md py-2 px-2  focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-md text-gray-600">Phone Number</label>
              <input
                type="text"
                placeholder="Phone Number(Optional)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border rounded-md py-2 px-2  focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            {/* add item  */}
            <div className="flex items-center space-x-4">
              <div className="flex flex-col">
                <label className="text-md text-gray-600">Item Name:</label>
                <Select
                  defaultValue={itemName}
                  onChange={handleSelectChange}
                  options={options}
                  className="w-64 py-1 px-2"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-md text-gray-600">Quantity:</label>
                <input
                  type="number"
                  value={itemQnty}
                  max={itemQnty}
                  onWheel={(e) => e.preventDefault()}
                  onChange={(e) => setItemQnty(e.target.value)}
                  className="border rounded-md py-2 px-2 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-md text-gray-600">Price:</label>
                <input
                  type="number"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                  className="border rounded-md py-2 px-2 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  handleAddItem();
                  calculateTotalAmount();
                }}
                className="bg-green-900 text-white font-bold px-4 py-2 mt-5 rounded uppercase"
              >
                Add Item
              </button>
            </div>

            {/* list of item  */}
            <div className="w-full mx-auto p-4">
              <h2 className="text-xl font-bold mb-4">List of Items</h2>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 ">S.no</th>
                    <th className="p-2 ">Item Name</th>
                    <th className="p-2">Quantity</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Total Amount</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.itemList.map((item, index) => (
                    <tr key={index} className="bg-gray-100">
                      <td className="p-2 text-center">{index + 1}</td>
                      <td className="p-2 text-center">{item.itemName}</td>
                      <td className="p-2 text-center">{item.itemQnty}</td>
                      <td className="p-2 text-center">{item.itemPrice}</td>
                      <td className="p-2 text-center">{item.itemTotalAmt}</td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => removeItem(index)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* payment mode  */}
            <div className="flex flex-col ">
              <label htmlFor="paymentMode">Select Payment Mode:</label>
              <select
                id="paymentMode"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="p-2"
              >
                {/* <option value="" className="p-2">
                  Select a payment mode
                </option> */}
                {paymentModes.map((mode, index) => (
                  <option key={index} value={mode} className="p-4">
                    {mode}
                  </option>
                ))}
              </select>
            </div>

            {/* paid amount  */}
            <div className="flex flex-col">
              <label className="text-md text-gray-600">Paid Amount</label>
              <input
                type="number"
                placeholder="Paid Amount"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
                className="border rounded-md py-2 px-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <p className="text-lg">Total Amount: {totalAmount}</p>
            <p className="text-lg">Due Amount: {dueAmount}</p>
          </div>

          <div className="flex justify-center">
            <button
              className="bg-green-500 text-white font-bold py-2 px-11 rounded"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Generate Bill
            </button>
          </div>

          {/* //print  */}
          {/* <button
          type="button"
          onClick={handlePrint}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          Print Invoice
        </button> */}
        </div>

        {/* END GENERATE INVOICE  */}
      </div>
    </div>
  );
};

export default Invoice;
