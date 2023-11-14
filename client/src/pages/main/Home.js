import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../..";
import HeadingTitle from "../../component/heading/HeadingTitle";
import SalesCard from "../../component/admin-sales-card/SalesCard";
import SaleBarGraph from "../../component/graph/bar/SaleBarGraph";
import SalePieGraph from "../../component/graph/pie/SalePieGraph";
import SaleMonthlyLineGraph from "../../component/graph/line/SaleMonthlyLineGraph";
import SaleMonthlyKhataLine from "../../component/graph/line/SaleMonthlyKhataLine";

const Home = () => {
  const [stockList, setStockList] = useState([]);
  const [invoiceList, setIvoiceList] = useState([]);
  const [allIKhataInvoice, setAllKhataInvoice] = useState([]);

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
  let totalKharidAmount = 0;
  let totalSaleProduct = 0;

  for (let i = 0; i < invoiceList.length; i++) {
    totalSaleFromInvoiceOnly =
      totalSaleFromInvoiceOnly + invoiceList[i].totalAmount;
    totalDueAmountFromInvoiceOnly =
      totalDueAmountFromInvoiceOnly + invoiceList[i].dueAmount;

    //for calculate revenue
    for (let item = 0; item < invoiceList[i].itemList.length; item++) {
      totalKharidAmount =
        totalKharidAmount + invoiceList[i].itemList[item].itemPurchasedRate;
      totalSaleProduct = totalSaleProduct + item + 1;
    }
  }

  //load all khata invoices
  //load all the incoice
  useEffect(() => {
    try {
      axios
        .get(`${server}/khata/all`, {
          withCredentials: true,
        })
        .then((res) => {
          setAllKhataInvoice(res.data.khataInvoices);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(allIKhataInvoice);

  let totalAmountFromKhata = 0;
  let totalPurchasedAmtFromKhata = 0;
  let totaldueAmtFromKhata = 0;
  let totalSaleProductFromKhata = 0;

  for (let i = 0; i < allIKhataInvoice.length; i++) {
    // total amount
    totalAmountFromKhata =
      totalAmountFromKhata + allIKhataInvoice[i].totalAmount;
    //due amount
    totaldueAmtFromKhata = totaldueAmtFromKhata + allIKhataInvoice[i].dueAmount;

    //for calculate revenue
    for (let item = 0; item < allIKhataInvoice[i].itemList.length; item++) {
      totalPurchasedAmtFromKhata =
        totalPurchasedAmtFromKhata +
        allIKhataInvoice[i].itemList[item].itemPurchasedRate;
      totalSaleProductFromKhata = totalSaleProductFromKhata + item + 1;
    }
  }

  return (
    <div>
      {/* sale report  */}
      <HeadingTitle title={"Todays Sales"} />
      <section className="grid grid-cols-12">
        <div className="col-span-3">
          <SalesCard
            totalAmount={totalSaleProduct + totalSaleProductFromKhata}
            moneyColor={`text-slate-100`}
            bgColor={`bg-blue-600`}
            titleColor={`text-white`}
            title={"Number of Item Sales"}
          />
        </div>
        <div className="col-span-3 ">
          <SalesCard
            totalAmount={
              totalSaleFromInvoiceOnly -
              totalKharidAmount +
              (totalAmountFromKhata - totalPurchasedAmtFromKhata)
            }
            moneyColor={`text-gray-200`}
            bgColor={`bg-green-700`}
            titleColor={`text-white`}
            title={"Total Revenue"}
            rupeesSymbol={"₹"}
          />
        </div>
        <div className="col-span-3 ">
          <SalesCard
            totalAmount={totalDueAmountFromInvoiceOnly + totaldueAmtFromKhata}
            moneyColor={`text-slate-800`}
            bgColor={`bg-red-500`}
            titleColor={`text-slate-800`}
            title={"Total Due Amount"}
            rupeesSymbol={"₹"}
          />
        </div>
        <div className="col-span-3 ">
          <SalesCard
            totalAmount={totalSaleFromInvoiceOnly + totalAmountFromKhata}
            moneyColor={`text-yellow-500`}
            bgColor={`bg-green-900`}
            titleColor={`text-white`}
            title={"Total Sales Amount"}
            rupeesSymbol={"₹"}
          />
        </div>
      </section>
      {/* todays sale report end  */}

      {/* sale report on graph */}
      <section className="p-4 bg-white">
        <div className="grid grid-cols-2">
          {/* invoice list sale history of this month  */}
          <div className="col-span-1">
            <div className="flex justify-start ">
              <span className="p-4 text-lg font-bold text-green-600 uppercase">
                This Month sale (Invoice)
              </span>
            </div>
            <SaleMonthlyLineGraph />
          </div>

          {/* khata invoice sale history */}
          <div className="col-span-1">
            <div className="flex justify-start ">
              <span className="p-4 text-lg font-bold text-green-600 uppercase">
                This Month sale (khata)
              </span>
            </div>
            <SaleMonthlyKhataLine />
          </div>
        </div>
      </section>
      


    </div>
  );
};

export default Home;
