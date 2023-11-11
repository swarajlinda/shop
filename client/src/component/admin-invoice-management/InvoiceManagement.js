import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server } from '../..';


const InvoiceManagement = () => {
  const [invoiceList, setInvoiceList] = useState([])
  const [invoiceListForSearch, setInvoiceListForSearch] = useState([])


  //load all the incoice
  useEffect(()=>{
    try {
      axios.get(`${server}/invoice/all`,{
        withCredentials:true 
      }).then((res)=>{
        setInvoiceList(res.data.invoices)
        setInvoiceListForSearch(res.data.invoices)
      }).catch((error)=>{
          console.log(error)
      })
    } catch (error) {
      console.log(error)
    } 
  },[])


  // handle search
  const handleSearch = (e) => {
    const searchTerm = e.target.value.trim().toLowerCase(); // Get the trimmed lowercase search term

    if (searchTerm === " ") {
      setInvoiceList(invoiceList); // If the search term is empty, show the entire original array
    } else {
      // Filter the array based on the search term
      const tempVar = invoiceListForSearch?.filter((item) =>
        item.invoiceId?.trim().toLowerCase().includes(searchTerm)
      );
      setInvoiceList(tempVar); // Update the array state with the filtered results
    }
  };

console.log(invoiceList)

  return (
    <div className='w-full'>
      <ToastContainer/>
      <h2 className=" w-full p-1 px-4 text-white text-lg font-semibold mb-4 text-left uppercase bg-gray-900 rounded">
          Manage Invoices
        </h2>

         {/* handle search  */}
      <div className="flex items-center border border-gray-300 rounded-md p-2">
        <input
          type="text"
          onChange={(e) => handleSearch(e)}
          placeholder="Search Invoice Id..."
          className="w-96 p-3 rounded-lg outline-none"
        />
      </div>
      {/* end handle search  */}

        <div className="w-full mx-auto mt-5">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className='bg-slate-100 p-4'>
          <tr>
            <th className="py-2 px-4 border-b">Invoice ID</th>
            <th className="py-2 px-4 border-b">Customer Name</th>
            <th className="py-2 px-4 border-b">Total Amount</th>
            <th className="py-2 px-4 border-b">Paid Amount</th>
            <th className="py-2 px-4 border-b">Due Amount</th>
            <th className="py-2 px-4 border-b">Payment Status</th>
            <th className="py-2 px-4 border-b">Created At</th>
          </tr>
        </thead>
        <tbody>
          {invoiceList.map((invoice, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{invoice.invoiceId}</td>
              <td className="py-2 px-4 border-b">{invoice.customerName}</td>
              <td className="py-2 px-4 border-b">{invoice.totalAmount}</td>
              <td className="py-2 px-4 border-b">{invoice.paidAmount}</td>
              <td className="py-2 px-4 border-b">{invoice.dueAmount}</td>
              <td className="py-2 px-4 border-b">{invoice.isPaymentDone ? 'Paid' : 'Unpaid'}</td>
              <td className="py-2 px-4 border-b">{new Date(invoice.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default InvoiceManagement