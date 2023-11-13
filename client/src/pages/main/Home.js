import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../..";
import HeadingTitle from "../../component/heading/HeadingTitle";
import SalesCard from "../../component/admin-sales-card/SalesCard";
import SaleBarGraph from "../../component/graph/bar/SaleBarGraph";
import SalePieGraph from "../../component/graph/pie/SalePieGraph";

const Home = () => {
  const [stockList, setStockList] = useState([]);
  const [invoiceList, setIvoiceList] = useState([]);

  //load data
  useEffect(() => {
    axios
      .get(`${server}/stock/mystock`, {
        withCredentials: true,
      })
      .then((res) => {
        setStockList(res.data.stocks);

        //remove the id stored id from local storage
        localStorage.removeItem("id")
      })
      .catch((e) => {
        // isAuthenticate === false && (navigation('/login'))
        console.log(e);
      });
  }, []);

  // all invoice of no registered customer
  //load all the incoice
  useEffect(() => {
    try {
      axios
        .get(`${server}/invoice/all`, {
          withCredentials: true,
        })
        .then((res) => {
          setIvoiceList(res.data.invoices);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // calcualte total amount
  let totalSaleFromInvoiceOnly = 0;
  let totalDueAmountFromInvoiceOnly = 0;
  for (let i = 0; i < invoiceList.length; i++) {
    totalSaleFromInvoiceOnly =
      totalSaleFromInvoiceOnly + invoiceList[i].totalAmount;
    totalDueAmountFromInvoiceOnly =
      totalDueAmountFromInvoiceOnly + invoiceList[i].dueAmount;
  }
 

  return (
    <div>
      {/* sale report  */}
      <HeadingTitle title={"Todays Sales"} />
      <section className="grid grid-cols-12">
        <div className="col-span-3">
          <SalesCard
            totalAmount={"10000"}
            moneyColor={`text-slate-100`}
            bgColor={`bg-blue-600`}
            titleColor={`text-white`}
            title={"Todays Sales"}
          />
        </div>
        <div className="col-span-3 ">
          <SalesCard
            totalAmount={"10000"}
            moneyColor={`text-gray-200`}
            bgColor={`bg-green-700`}
            titleColor={`text-white`}
            title={"Total Revenue"}
          />
        </div>
        <div className="col-span-3 ">
          <SalesCard
            totalAmount={totalDueAmountFromInvoiceOnly}
            moneyColor={`text-slate-800`}
            bgColor={`bg-red-500`}
            titleColor={`text-slate-800`}
            title={"Total Due Amount"}
          />
        </div>  
        <div className="col-span-3 ">
          <SalesCard
            totalAmount={totalSaleFromInvoiceOnly}
            moneyColor={`text-yellow-500`}
            bgColor={`bg-green-900`}
            titleColor={`text-white`}
            title={"Total Invoice Sale"}
          />
        </div>
      </section>
      {/* sale report end  */}

      {/* sale report on graph */}
      <section className="grid grid-cols-12">
        <div className="col-span-6">
          <SaleBarGraph />
        </div>
        <div className="col-span-6">
          <SalePieGraph />
        </div>
      </section>
      {/* sale report on graph end */}
    </div>
  );
};

export default Home;
