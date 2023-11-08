import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-gray-800  p-4 border-b-2 border-gray-400">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg">Your Logo</div>
        <div>
          <ul className="flex space-x-4">
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar