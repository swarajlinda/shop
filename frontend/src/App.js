import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
// import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from ".";
import Khata from "./pages/Khata";
import Order from "./pages/Order";
import Invoice from "./pages/Invoice";
import SideNavbar from "./components/navbar/SideNavbar";
import Dashboard from "./pages/Dashboard";
import Stock from "./pages/Stock";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch()
  // const navigate =useNavigate()
  const {token} = useSelector((state)=>state.auth)

  useEffect(()=>{
    const localToken = localStorage.getItem("token")
    if(localToken){
      dispatch({
        type:"login",
        payload: localToken
      })
    }
  },[])
  


  useEffect(() => {
    // setLoading(true);
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Router>
      <div>
        <Header />
      </div>
      <div className="flex">
        <div className="w-auto">
          {token && <SideNavbar />}
        </div>
        <div className="">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/khata" element={<Khata />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/order" element={<Order />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Signin />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
