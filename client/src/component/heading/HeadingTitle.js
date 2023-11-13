import React from 'react'

const HeadingTitle = ({title}) => {
  return (
    <div className="w-full">
    <h2 className=" w-full p-1 px-4 text-white text-lg font-bold mb-4 text-left uppercase bg-green-500 ">
      {title}
    </h2>
  </div>
  )
}

export default HeadingTitle