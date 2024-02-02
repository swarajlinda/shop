import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { server } from '../../..';
import {
    XAxis,
    YAxis,
    LineChart,
    CartesianGrid,
    Tooltip,
    Legend,
    Line,
  } from "recharts";

const SaleMonthlyKhataLine = () => {
    const [khataIvoiceListHistory, setKhataIvoiceListHistory] = useState([]);

    //load all the incoice
  useEffect(() => {
    try {
      axios
        .get(`${server}/khata/history`, {
          withCredentials: true,
        })
        .then((res) => {
          setKhataIvoiceListHistory(res.data.khataInvoices);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(khataIvoiceListHistory)

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
  const currentYear = currentDate.getFullYear();

  // Initialize an object to store day-wise total amounts
  let dayWiseThisMonthSale = {};

 
    for (let i = 0; i < khataIvoiceListHistory.length; i++) {
      const invoice = khataIvoiceListHistory[i];
  
      const invoiceDate = new Date(invoice.createdAt);
  
      const invoiceMonth = invoiceDate.getMonth() + 1;
      const invoiceYear = invoiceDate.getFullYear();
  
      // Check if the invoice is for the current month
      if (invoiceMonth === currentMonth && invoiceYear === currentYear) {
        let totalPurchasedAmount = 0;
       
  
        for (let item = 0; item < invoice.itemList.length; item++) {
          // Accumulate the total purchased amount for each item
          totalPurchasedAmount += invoice.itemList[item].itemPurchasedRate;
        }
  
        // Get the day of the month
        const day = invoiceDate.getDate();
  
        // If the day already exists in the object, accumulate the total amount
        if (dayWiseThisMonthSale[day]) {
          dayWiseThisMonthSale[day].totalAmount += invoice.totalAmount;
          dayWiseThisMonthSale[day].totalProfit +=
            invoice.totalAmount - totalPurchasedAmount;
            dayWiseThisMonthSale[day].totalDueAmount  += invoice.dueAmount
        } else {
          // If the day doesn't exist, create a new entry
          dayWiseThisMonthSale[day] = {
            day: `Date ${day}`,
            totalAmount: invoice.totalAmount,
            totalProfit: invoice.totalAmount - totalPurchasedAmount,
            totalDueAmount: invoice.dueAmount
          };
        }
      }
    
  
  }

  
//   console.log(khataIvoiceListHistory);
  console.log(dayWiseThisMonthSale)





  return (
    <div>
  {Object.keys(dayWiseThisMonthSale).length > 0 &&(
    <LineChart
      width={590}
      height={450}
      data={Object.values(dayWiseThisMonthSale)}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" />
      <Line type="monotone" dataKey="totalProfit" stroke="#82ca9d" />
      <Line type="monotone" dataKey="totalDueAmount" stroke="#dc2626" />
    </LineChart>
  )}
</div>

  )
}

export default SaleMonthlyKhataLine