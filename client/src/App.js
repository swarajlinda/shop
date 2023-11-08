// import { Router } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./actions/LoadUserAction";
import ProtectedRoutes from "./HOC/ProtectedRoutes";
import Login from "./pages/auth-login/Login";
import AdminDashboard from "./pages/admin-dashboard/AdminDashboard";
import GenerateInvoice from "./pages/invoice/GenerateInvoice";
import ManageInvoice from "./pages/manage-invoice/ManageInvoice";
import CreateKhata from "./pages/khata/CreateKhata";
import ManageKhata from "./pages/manage-khata/ManageKhata";
import AddNewStock from "./pages/stock/AddNewStock";
import StockManagement from "./pages/stock-management/StockManagement";
import StaffPage from "./pages/staff/StaffPage";
import Reports from "./pages/reports-sales/Reports";
import Home from "./pages/main/Home";

function App() {
  const { isAuthenticate } = useSelector((state) => state.loadUser);
  const dispatch = useDispatch();

  console.log("this app", isAuthenticate)

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />

        {/* //protected Routes */}
        <Route path="/dashboard" element={<AdminDashboard />}>
          <Route path="" element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="generateInvoice" element={<GenerateInvoice />} />
          <Route path="manageInvoice" element={<ManageInvoice />} />

          <Route path="createKhata" element={<CreateKhata />} />
          <Route path="manageKhata" element={<ManageKhata />} />

          <Route path="newStock" element={<AddNewStock />} />
          <Route path="manageStock" element={<StockManagement />} />

          <Route path="staff" element={<StaffPage />} />

          <Route path="salesReports" element={<Reports />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
