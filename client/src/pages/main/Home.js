import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../..";
import HeadingTitle from "../../component/heading/HeadingTitle";
import SalesCard from "../../component/admin-sales-card/SalesCard";
import SaleMonthlyLineGraph from "../../component/graph/line/SaleMonthlyLineGraph";
import SaleMonthlyKhataLine from "../../component/graph/line/SaleMonthlyKhataLine";
import StockUpdatesGraph from "../../component/graph/bar/StockUpdatesGraph";
import OutOfStockProductList from "../../component/admin-stock-inventary/OutOfStockProductList";
import { toast } from "react-toastify";

const Home = () => {
  const [invoiceList, setIvoiceList] = useState([]);
  const [allIKhataInvoice, setAllKhataInvoice] = useState([]);

 

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
  let totalWholeSaleProfit = 0;

  if(invoiceList.length > 0){
    
      for (let i = 0; i < invoiceList.length; i++) {
        totalSaleFromInvoiceOnly =
          totalSaleFromInvoiceOnly + invoiceList[i].totalAmount;
        totalDueAmountFromInvoiceOnly =
          totalDueAmountFromInvoiceOnly + invoiceList[i].dueAmount;
    
        //for calculate revenue
        for (let item = 0; item < invoiceList[i].itemList.length; item++) {
          totalKharidAmount =
            totalKharidAmount + invoiceList[i].itemList[item].itemPurchasedRate;
            totalWholeSaleProfit = totalWholeSaleProfit + invoiceList[i].itemList[item].itemWholeSaleRate;
        }
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
  // console.log(allIKhataInvoice);

  let totalAmountFromKhata = 0;
  let totalPurchasedAmtFromKhata = 0;
  let totaldueAmtFromKhata = 0;
  let totalSaleProductFromKhata = 0;

  if(allIKhataInvoice.length > 0 ){
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
        totalSaleProductFromKhata = totalSaleProductFromKhata + allIKhataInvoice[i].itemList[item].itemWholeSaleRate;
      }
    }
  }
  

  return (
    <>
      {/* sale report  */}
      <HeadingTitle title={"Todays Sales"} />
      <section className="grid grid-cols-12">
        <div className="col-span-3">
          <SalesCard
            totalAmount={(totalWholeSaleProfit - totalKharidAmount) + (totalSaleProductFromKhata -totalPurchasedAmtFromKhata)}
            moneyColor={`text-slate-100`}
            bgColor={`bg-blue-600`}
            titleColor={`text-white`}
            rupeesSymbol={"₹"}
            title={"Total Revenue (WholeSale)"}
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
            title={"Total Revenue (Retail)"}
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

      {/* stock updates  */}
      <section>
        <div className="bg-white">
            {/* title  */}
            <div className="flex justify-start">
                <span className="mx-8 text-lg text-green-700 font-bold uppercase">Stock Updates</span>
            </div>

            <div className="p-10">
              <StockUpdatesGraph/>
            </div>
        </div>
      </section>


      {/* out of stock panel  */}
      <section>
        <div className="bg-white">
            {/* title  */}
            <div className="flex justify-start">
                <span className="mx-8 text-lg text-green-700 font-bold uppercase">Out of Stock Products</span>
            </div>

            <div className="p-10">
              <OutOfStockProductList/>
            </div>
        </div>
      </section>
      

    </>
  );
};

export default Home;
