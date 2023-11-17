import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../..";

const OutOfStockProductList = () => {
  const [stockList, setStockList] = useState([]);

  const outOfStockItems = [];

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
        // isAuthenticate === false && (navigation('/login'))
        console.log(e);
      });
  }, []);

  console.log("stock updates", stockList);

  for (let i = 0; i < stockList.length; i++) {
    console.log(stockList[i].productQnty);
    if (stockList[i].productQnty === 0) {
      outOfStockItems.push({
        itemName: stockList[i].productName,
        itemQnty: stockList[i].productQnty,
        purchasedDate: stockList[i].createdAt
      });
    }
  }

  console.log(outOfStockItems);

  return (
    <div>
      {
        outOfStockItems.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-slate-200">
            <th className="py-2 px-4 border-b uppercase">Item Name</th>
            <th className="py-2 px-4 border-b uppercase">Purchased Date</th>
            <th className="py-2 px-4 border-b uppercase">Status</th>
          </tr>
        </thead>
        <tbody>
          {outOfStockItems.map((item, index) => (
            <tr key={index} >
              <td className="py-2 px-4 border-b text-center">{item.itemName}</td>
              <td className="py-2 px-4 border-b text-center">{new Date(item.purchasedDate ).toLocaleString()}</td>
              <td className="py-2 px-4 border-b text-center text-red-700 uppercase font-bold">Out of Stock</td>
            </tr>
          ))}
        </tbody>
      </table>
        ) :( <h3 className="text-center text-2xl uppercase">Products Not Available</h3>)
      }
     
    </div>
  );
};

export default OutOfStockProductList;
