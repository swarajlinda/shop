import React from 'react'
import StockInventary from '../components/stock/StockInventary'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Stock() {
  const navigate = useNavigate(); // Using useHistory hook for navigation
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  !isAuthenticated && navigate('/')
 
  return (
    <div>
        <StockInventary/>
    </div>
  )
}

export default Stock