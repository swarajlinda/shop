import React from 'react'


const SalesCard = ({totalAmount, bgColor, titleColor, moneyColor, title, rupeesSymbol}) => {
  return (
    <div className={`m-2 ${bgColor}  w-80 mx-auto  justify-center items-center rounded-lg shadow-lg `}>
       <h4 className={`text-center ${titleColor}  font-bold text-xl px-4 pt-4`}>{title}</h4>
      <p className={`text-center ${moneyColor} font-bold text-5xl pb-4`}><span>{rupeesSymbol}</span>{totalAmount}</p>
    </div>
  )
}

export default SalesCard