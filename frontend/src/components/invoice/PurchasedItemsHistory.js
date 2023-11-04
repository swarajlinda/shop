import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../..";

function PurchasedItemsHistory({ userId, refresh }) {
  const [purchasedList, setPurchasedList] = useState([]);
  const [history, setHistory] = useState([]);
  const purchasedHistory = [];

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
  }, [refresh]);

  // console.log(purchasedList);

  // for(let i=0; i< purchasedList.length; i++){
  //    purchasedHistory.push({
  //     invoiceId: purchasedList[i].invoiceId,
  //     paidAmount: purchasedList[i].paidAmount,
  //     paymentMode: purchasedList[i].paymentMode,
  //     items: purchasedList[i].items.join(", "),
  //     quantities: purchasedList[i].quantities.join(", "),
  //     prices: purchasedList[i].prices.join(", "),
  //     totalAmount: purchasedList[i].totalAmount,
  //     createdAt: purchasedList[i].createdAt,
  //    })
  // }

  const handleOnSearchInput = (e) => {
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

  return (
    <div>
      <div className="container mx-auto">
        <div>
          <div>
            <h1 className="text-2xl font-bold mb-4">Purchased History</h1>
          </div>
          <div className="flex items-center  border-2 border-blue-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Search Details"
              onChange={(e) => handleOnSearchInput(e)}
            />
            {/* <button
              className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 text-sm text-white py-1 px-2 rounded"
              type="button"
            >
              Search
            </button> */}
          </div>
        </div>
        <div>
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">Invoice ID</th>
                <th className="py-2 px-4">Payment Mode</th>
                <th className="py-2 px-4">Items</th>
                <th className="py-2 px-4">Quantities</th>
                <th className="py-2 px-4">Prices</th>
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

                  return timeAInSeconds - timeBInSeconds;
                })
                .map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{item.invoiceId}</td>
                    <td className="py-2 px-4">{item.paymentMode}</td>
                    <td className="py-2 px-4">{item.items.join(", ")}</td>
                    <td className="py-2 px-4">{item.quantities.join(", ")}</td>
                    <td className="py-2 px-4">{item.prices.join(", ")}</td>
                    <td className="py-2 px-4">{item.totalAmount}</td>
                    <td className="py-2 px-4">{item.paidAmount}</td>
                    <td className="py-2 px-4">{item.dueAmount}</td>
                    <td className="py-2 px-4">{item.isPaymentDone? (<span>No</span>): (<span>Yes</span>)}</td>
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
}

export default PurchasedItemsHistory;
