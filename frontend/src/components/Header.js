import React, { useContext } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { Context, server } from '../index'
import axios from 'axios';

function Header() {
  const navigation  = useNavigate(); // Initialize useHistory

  const submitHandler = async (e) => {
    e.preventDefault();
    // setLoading(true)
    try {
      const { data } = await axios.get(
        `${server}/users/logout `,
       
        {
          withCredentials: true,
        }
      );

      // Handle the response
      console.log("Request was successful:", data);
     
      
     

    } catch (error) {
      // setLoading(false)
      if (error.response && error.response.status === 409) {
        // Handle conflict-specific logic here
        console.error("Conflict detected. Please resolve the conflict.");
      } else {
        // Handle other errors
        console.error("An error occurred:", error.message);
      }
    }
  };
  
  return (
    <nav className="flex items-center justify-between w-full bg-blue-500 p-4">
  <div>
    <h2 className="text-2xl text-white font-semibold">Khata App</h2>
  </div>
  <article>
    {/* <Link to="/" className="text-white hover:underline mr-4">Dashboard</Link>
    <Link to="/stock" className="text-white hover:underline mr-4">Stock</Link>
    <Link to="/home" className="text-white hover:underline mr-4">Notes</Link>
    <Link to="/khata" className="text-white hover:underline mr-4">Khata</Link>
    <Link to="/invoice" className="text-white hover:underline mr-4">Generate Invoice</Link>*/}
    {/* <Link to="/profile" className="text-white hover:underline mr-4">Profile</Link>  */}
    
   
  </article>
</nav>

  )
}

export default Header