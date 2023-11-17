import React from 'react'

function KhataHolderCutomer({
    name,
    address,
    phoneNumber,
    totalAmount,
    dueAmount,
    isPaymentDone,
    updateCustomer,
    // deleteCustomer,
    id,
    addOrderHandle
  }) {
  return (
    <div>
        {/* <div onClick={() =>addOrderHandle(id)}> */}
      <div className="bg-slate-50 p-4 mb-4 rounded-md shadow-lg flex items-center justify-between">
        <div>
          <h3 className="text-xl uppercase text-green-700 font-extrabold">{name}</h3>
          <p className="text-sm text-gray-600">{address}</p>
          <p className="text-sm text-gray-600">Phone Number:- {phoneNumber}</p>
          {/* <p className="text-sm text-gray-600">Total {totalAmount}</p> */}
          <p className="text-sm text-gray-600">Total Due Amount:- <span className='text-yellow-700 texl-md font-extrabold'>&#8377;{dueAmount}</span></p>
          {dueAmount===0 ? <p className='uppercase text-green-600 font-bold'>Payement Done</p> : <p className='uppercase text-red-600 font-bold'>payment pending</p>}
        </div>
        <div>
          <button
            onClick={() => updateCustomer(id)}
            className="bg-blue-500 text-white font-semibold py-1 px-3 mr-2 rounded-md focus:outline-none uppercase"
          >
            update
          </button>
          {/* onClick={() => deleteTask(index)} */}
          <button
            onClick={() => addOrderHandle(id)}
            className="bg-green-500 text-white font-semibold py-1 px-3 rounded-md focus:outline-none uppercase"
          >
            Add Order
          </button>
        </div>
      </div>
    </div>
    // </div>
  )
}

export default KhataHolderCutomer