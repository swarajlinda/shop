import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server } from "../..";
import HeadingTitle from "../heading/HeadingTitle";

const InvoiceManagement = () => {
  const [invoiceList, setInvoiceList] = useState([]);
  const [invoiceListForSearch, setInvoiceListForSearch] = useState([]);

  //load all the incoice
  useEffect(() => {
    try {
      axios
        .get(`${server}/invoice/all`, {
          withCredentials: true,
        })
        .then((res) => {
          setInvoiceList(res.data.invoices);
          setInvoiceListForSearch(res.data.invoices);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

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

  console.log(invoiceList);

  return (
    <div className="w-full">
      <ToastContainer />
      <HeadingTitle title={" Manage Invoices"} />

      {/* handle search  */}
      <div className="w-96 flex items-center border border-green-300 rounded-md p-1 mx-1">
        <span className="text-xl mx-1">&#128269;</span>
        <input
          type="text"
          onChange={(e) => handleSearch(e)}
          placeholder="Search Invoice Id..."
          className="w-96 p-2 rounded-lg outline-none"
        />
      </div>
      {/* end handle search  */}

      <div className="w-full mx-auto mt-5">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-slate-100 p-4">
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
                <td className="py-2 px-4 border-b">
                  {invoice.isPaymentDone ? "Paid" : "Unpaid"}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(invoice.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceManagement;
