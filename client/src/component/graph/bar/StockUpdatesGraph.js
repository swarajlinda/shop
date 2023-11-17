import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../..";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StockUpdatesGraph = () => {
  const [stockList, setStockList] = useState([]);
  const [stockListHistory, setStockListHistory] = useState([]);

  let stockListUpdates = [];

  //load data
  useEffect(() => {
    axios
      .get(`${server}/stock/mystock`, {
        withCredentials: true,
      })
      .then((res) => {
        setStockList(res.data.stocks);
        //remove the id stored id from local storage
        localStorage.removeItem("id");
      })
      .catch((e) => {
        // isAuthenticate === false && (navigation('/login'))
        console.log(e);
      });
  }, []);

  //load data
  useEffect(() => {
    axios
      .get(`${server}/stock/history`, {
        withCredentials: true,
      })
      .then((res) => {
        setStockListHistory(res.data.stocks);
        //remove the id stored id from local storage
        localStorage.removeItem("id");
      })
      .catch((e) => {
        // isAuthenticate === false && (navigation('/login'))
        console.log(e);
      });
  }, []);

  // console.log(stockListHistory);

  //   filter there result
  for (let i = 0; i < stockList.length; i++) {
    //  console.log(stockList[i])
    for (let j = 0; j < stockListHistory.length; j++) {
      if (stockList[i].productName === stockListHistory[j].productName) {
        stockListUpdates.push({
          Name: stockList[i].productName,
          Stock: stockListHistory[j].productQnty - (stockListHistory[j].productQnty - stockList[i].productQnty),
          Sale: stockListHistory[j].productQnty - stockList[i].productQnty,
        });
      }
    }
  }

  // console.log(stockListUpdates);

  return (
    <div>
      {stockListUpdates.length > 0 && (
        <BarChart width={1540} height={700} data={stockListUpdates}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Stock" fill="#8884d8" />
          <Bar dataKey="Sale" fill="#82ca9d" />
        </BarChart>
      )}
    </div>
  );
};

export default StockUpdatesGraph;
