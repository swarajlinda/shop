import React from 'react'
import { Route } from 'react-router-dom'
import AdminDashboard from '../pages/admin-dashboard/AdminDashboard'
import GenerateInvoice from '../pages/invoice/GenerateInvoice'
import CreateKhata from '../pages/khata/CreateKhata'
import ManageKhata from '../pages/manage-khata/ManageKhata'
import AddNewStock from '../pages/stock/AddNewStock'
import StockManagement from '../pages/stock-management/StockManagement'
import StaffPage from '../pages/staff/StaffPage'
import Reports from '../pages/reports-sales/Reports'
import ManageInvoice from '../pages/manage-invoice/ManageInvoice'

const ProtectedRoutes = () => {
  return (
    <>
       <Route path="/dashboard"  element={<AdminDashboard/>}/>
       
       <Route path="/generateInvoice"  element={<GenerateInvoice/>} />
       <Route path="/manageInvoice"  element={<ManageInvoice/>} />
 
       <Route path="/createKhata"  element={<CreateKhata/>} />
       <Route path="/manageKhata"  element={<ManageKhata/>} />
 
       <Route path="/newStock" element={<AddNewStock/>} />
       <Route path="/manageStock"  element={<StockManagement/>}/>
 
       <Route path="/staff"  element={<StaffPage/>} />
 
       <Route path="/salesReports"  element={<Reports/>} />
    </>
  )
}

export default ProtectedRoutes