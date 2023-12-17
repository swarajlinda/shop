import React from 'react'
import loading from "../../assets/truck.gif"

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-screen bg-white'>
        <img src={loading} alt="loaging"/>
    </div>
  )
}

export default Loading