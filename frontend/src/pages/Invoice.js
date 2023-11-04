import React, { useContext } from 'react'
import GenerateInvoice from '../components/invoice/GenerateInvoice'
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Invoice() {
  const navigate = useNavigate(); // Using useHistory hook for navigation

  // const { token } = useSelector((state) => state.auth);
  // // You may want to check the user state to handle additional profile information
  // // const { user } = useSelector((state) => state.profile);
  // console.log("token", token)
  // // Redirect to login if token is null
  // if (token === null) {
  //  navigate("/login");
  //   return null; // Returning null as we're redirecting, not rendering Dashboard
  // }

   
  return (
    <div>
       
    <GenerateInvoice/>
    </div>
  )
}

export default Invoice