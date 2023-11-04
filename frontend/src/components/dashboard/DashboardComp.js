import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Context, server } from "../..";
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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { useNavigation } from "react-router-dom";

function DashboardComp() {
  // const {isAuthenticate} = useContext(Context())

  // const navigation = useNavigation()

  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  const [stockList, setStockList] = useState([]);
  const [refresh, setRefresh] = useState(false);

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

  console.log(stockList);

  //stock list gragh

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

    console.log(healthAndCareStockList);
  }

  return (
    <div>
      <h1 className="text-left  p-3 bg-slate-300 text-lg font-bold mt-4 max-w-lg rounded">
        Inventary Stock
      </h1>
      <div className="grid grid-cols-12">
        <div className="col-span-4">
          <h2 className="bg-green-500 p-2 font-bold">Health and Care</h2>
          <div>
            {healthAndCareStockList.length > 0 && (
              <BarChart
                width={500}
                height={300}
                data={healthAndCareStockList}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="name" fill="#8884d8" />
                <Bar dataKey="qty" fill="#82ca9d" />
              </BarChart>
            )}
          </div>
        </div>
        <div className="col-span-4">
          {/* dairy and eggs  */}
          <h2 className="bg-green-500 p-2 font-bold">Dairy and Eggs</h2>
          <div>
            {dairyandEggsStockList.length > 0 && (
              <BarChart
                width={500}
                height={300}
                data={dairyandEggsStockList}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="name" fill="#8884d8" />
                <Bar dataKey="qty" fill="#82ca9d" />
              </BarChart>
            )}
          </div>
        </div>
        <div className="col-span-4">
          {/* bread and bakery  */}
          <h2 className="bg-green-500 p-2 font-bold">Bread and Bakery</h2>
          <div>
            {breadandBakeryStockList.length > 0 && (
              <BarChart
                width={500}
                height={300}
                data={breadandBakeryStockList}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="name" fill="#8884d8" />
                <Bar dataKey="qty" fill="#82ca9d" />
              </BarChart>
            )}
          </div>
        </div>
      </div>

      {/* line 1 */}
      <div className="grid grid-cols-12">
        <div className="col-span-4">
          <h2 className="bg-green-500 p-2 font-bold">Masalas</h2>
          <div>
            {masalasStockList.length > 0 && (
              <BarChart
                width={500}
                height={300}
                data={masalasStockList}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="name" fill="#8884d8" />
                <Bar dataKey="qty" fill="#82ca9d" />
              </BarChart>
            )}
          </div>
        </div>
        <div className="col-span-4">
          {/* snacks  */}
          <h2 className="bg-green-500 p-2 font-bold">Snacks</h2>
          <div>
            {snacksStockList.length > 0 && (
              <BarChart
                width={500}
                height={300}
                data={snacksStockList}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="name" fill="#8884d8" />
                <Bar dataKey="qty" fill="#82ca9d" />
              </BarChart>
            )}
          </div>
        </div>
        <div className="col-span-4">
          {/* Frozen foods  */}
          <h2 className="bg-green-500 p-2 font-bold">Frozen Foods</h2>
          <div>
            {frozenFoodsStockList.length > 0 && (
              <BarChart
                width={500}
                height={300}
                data={frozenFoodsStockList}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="name" fill="#8884d8" />
                <Bar dataKey="qty" fill="#82ca9d" />
              </BarChart>
            )}
          </div>
        </div>
      </div>

      {/* line 2 */}
      {/* "Canned Goods */}
      <div className="grid grid-cols-12">
        <div className="col-span-4">
          <h2 className="bg-green-500 p-2 font-bold">Canned Goods</h2>
          <div>
            {cannedGoodsStockList.length > 0 && (
              <BarChart
                width={500}
                height={300}
                data={cannedGoodsStockList}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="name" fill="#8884d8" />
                <Bar dataKey="qty" fill="#82ca9d" />
              </BarChart>
            )}
          </div>
        </div>
        <div className="col-span-4">
          {/* Household Supplies  */}
          <h2 className="bg-green-500 p-2 font-bold">Household Supplies</h2>
          <div>
            {householdSuppliesStockList.length > 0 && (
              <BarChart
                width={500}
                height={300}
                data={householdSuppliesStockList}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="name" fill="#8884d8" />
                <Bar dataKey="qty" fill="#82ca9d" />
              </BarChart>
            )}
          </div>
        </div>
        <div className="col-span-4">
          {/* Baby Care  */}
          <h2 className="bg-green-500 p-2 font-bold">Baby Care</h2>
          <div>
            {babyCareStockList.length > 0 && (
              <BarChart
                width={500}
                height={300}
                data={babyCareStockList}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="name" fill="#8884d8" />
                <Bar dataKey="qty" fill="#82ca9d" />
              </BarChart>
            )}
          </div>
        </div>
      </div>

      {/* line 3 */}

      {/* "Oils and Souces */}
      <div className="grid grid-cols-12">
        <div className="col-span-4">
          <h2 className="bg-green-500 p-2 font-bold">Oils and Souces</h2>
          <div>
            {oilsandSoucesStockList.length > 0 && (
              <BarChart
                width={500}
                height={300}
                data={oilsandSoucesStockList}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="name" fill="#8884d8" />
                <Bar dataKey="qty" fill="#82ca9d" />
              </BarChart>
            )}
          </div>
        </div>
        <div className="col-span-4">
          {/* Tobacco  */}
          <h2 className="bg-green-500 p-2 font-bold">Tobacco</h2>
          <div>
            {tobaccoStockList.length > 0 && (
              <BarChart
                width={500}
                height={300}
                data={tobaccoStockList}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="name" fill="#8884d8" />
                <Bar dataKey="qty" fill="#82ca9d" />
              </BarChart>
            )}
          </div>
        </div>
        <div className="col-span-4">
          {/* Other  */}
          <h2 className="bg-green-500 p-2 font-bold">Other</h2>
          <div>
            {othersStockList.length > 0 && (
              <BarChart
                width={500}
                height={300}
                data={othersStockList}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="name" fill="#8884d8" />
                <Bar dataKey="qty" fill="#82ca9d" />
              </BarChart>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardComp;
