import React, { useEffect, useState } from 'react'
import KhataHolderCutomer from '../../component/admin-khata-holder/KhataHolderCutomer'
import axios from 'axios';
import { server } from '../..';
import { useNavigate } from 'react-router-dom';
import HeadingTitle from '../../component/heading/HeadingTitle';

const ManageKhata = () => {

  const navigate = useNavigate()
  const [customerList, setCustomerList] = useState([]);
  const [customerListForSearch, setCustomerListForSearch] = useState([]);
 

  const [refresh, setRefresh] = useState(false);




   //show all the customer
   useEffect(() => {
    axios
      .get(`${server}/sell/allbuyer`, {
        withCredentials: true,
      })
      .then((res) => {
        setCustomerList(res.data.data);
        setCustomerListForSearch(res.data.data)
      })
      .catch((e) => {
        console.log(e);
      });
  }, [refresh]);

 
  //delete customer
  const deleteCustomer = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/sell/${id}`, {
        withCredentials: true,
      });

      alert(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  //add customer item
  const addOrderHandle = (id) => {
    
    //transport the id
    localStorage.setItem("id", id);
    
    //navigation to add item page
    navigate("../individualKhata");
  };
  
  
  const updateCustomer= (id)=>{
    alert(id);
    //transport the id
     localStorage.setItem("id", id);

     //navigation to add item page
     navigate("../createKhata");
  }


   // handle search
   const handleSearch = (e) => {
    const searchTerm = e.target.value.trim().toLowerCase(); // Get the trimmed lowercase search term

    if (searchTerm === " ") {
      setCustomerList(customerList); // If the search term is empty, show the entire original array
    } else {
      // Filter the array based on the search term
      const tempVar = customerListForSearch?.filter((item) =>
        item.name?.trim().toLowerCase().includes(searchTerm)
      );
      setCustomerList(tempVar); // Update the array state with the filtered results
    }
  };

  
  return (
    <div>
      <div className="w-full">
        <HeadingTitle title={" Manage Customer Khata "}/>
       
      </div>
      {/* handle search  */}
      <div className="flex w-96 items-center border border-green-300 rounded-md p-1 mx-3">
        <span className='text-xl'>&#128269;</span>
        <input
          type="text"
          onChange={(e) => handleSearch(e)}
          placeholder="Search Name..."
          className="w-full p-3 rounded-lg outline-none"
        />
      </div>
      {/* end handle search  */}
      {/* //customer list */}
      <div className="mt-10 flex justify-center items-center">
          <div className="w-2/3">
            {customerList.map((i, index) => (
              <div key={index}>
                <KhataHolderCutomer
                  name={i.name}
                  address={i.address}
                  phoneNumber={i.phoneNumber}
                  totalAmount={i.totalAmount}
                  dueAmount={i.totalDueAmount}
                  isPaymentDone={i.isPaymentDone}
                  updateCustomer={updateCustomer}
                  // deleteCustomer={deleteCustomer}
                  addOrderHandle={addOrderHandle}
                  id={i._id}
                  key={i._id}
                />
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default ManageKhata