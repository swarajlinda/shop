import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../..";

const KhataHolderPurchaseHistory = ({ userId, refresh }) => {
  const [purchasedList, setPurchasedList] = useState([]);
  const [history, setHistory] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value.trim().toLowerCase();

    console.log("hello");

    if (value === " ") {
      setPurchasedList(purchasedList); // If the search term is empty, show the entire original array
    } else {
      // Filter the array based on the search term
      const tempVar = history?.filter((item) =>
        item.invoiceId?.trim().toLowerCase().includes(value)
      );
      setPurchasedList(tempVar); // Update the array state with the filtered results
    }
  };
  console.log(userId);

  //for showing data
  useEffect(() => {
    axios
      .get(`${server}/khata/${userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setPurchasedList(res.data.khataInvoice);
        setHistory(res.data.khataInvoice);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [refresh, userId]);
  console.log(purchasedList);
  return (
    <div className="mx-10 mt-10">
      <div className="container mx-auto mt-5">
        <div>
          <div>
            <h1 className="text-2xl font-bold mb-4 text-green-600  uppercase">
              Purchased History
            </h1>
          </div>
          <div className="w-96 flex items-center border border-green-300 rounded-md p-1 mx-1">
            <span className="text-xl mx-1">&#128269;</span>
            <input
              type="text"
              onChange={(e) => handleSearch(e)}
              placeholder="Search Invoice Id..."
              className="w-96 p-2 rounded-lg outline-none"
            />
          </div>
        </div>
        <div className="mt-5">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">Invoice ID</th>
                <th className="py-2 px-4">Payment Mode</th>
                <th className="py-2 px-4">Total Amount</th>
                <th className="py-2 px-4">Paid Amount</th>
                <th className="py-2 px-4">Due Amount</th>
                <th className="py-2 px-4">Payment Due</th>
                <th className="py-2 px-4">Date / Time</th>
              </tr>
            </thead>
            <tbody>
              {purchasedList
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

                  return timeBInSeconds - timeAInSeconds;
                })
                .map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{item.invoiceId}</td>
                    <td className="py-2 px-4">{item.paymentMode}</td>
                    <td className="py-2 px-4">{item.totalAmount}</td>
                    <td className="py-2 px-4">{item.paidAmount}</td>
                    <td className="py-2 px-4">{item.dueAmount}</td>
                    <td className="py-2 px-4">
                      {item.isPaymentDone ? <span>No</span> : <span>Yes</span>}
                    </td>
                    <td className="py-2 px-4">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KhataHolderPurchaseHistory;
