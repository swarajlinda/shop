import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/LoginAction";
import { loadUser } from "../../actions/LoadUserAction";
import logo from "../../assets/logo.png";
import BIRDS from "vanta/dist/vanta.birds.min";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../component/utilities/Loading";

const Login = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticate, user } = useSelector((state) => state.loadUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);





  useEffect(() => {
    // Navigate to the dashboard if the user is authenticated
    if (isAuthenticate) {
      toast.success(`Welcome back ${user.name}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("../dashboard");
    }
  }, [isAuthenticate, user, navigate]);


  //vanta start
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRDS({
          el: myRef.current,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  //vanta end

  //login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)

    
    if (!email) {
      toast.error("Please Enter Email", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (!password) {
      toast.error("Please Enter Password", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
   
    try {
      // You can add your login logic here
     await dispatch(login(email, password)).then(() => dispatch(loadUser()));
      setLoading(false)
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false)
    }
  };

  // //  if user is exist then
  // if (isAuthenticate) {
  //   toast.success(`Welcome back ${user.name}`, {
  //     position: toast.POSITION.TOP_RIGHT,
  //   });
  //   navigate("../dashboard");
  // }

  return (
    <div ref={myRef}>
      
      {loading ? <Loading /> : ( <div className="grid grid-rows-1 opacity-95">
        {/* brand panel  */}
        {/* <div className="col-span-1 ">
          <div className="flex justify-center items-center mx-auto h-screen">
            <img src={logo} alt="logo" className="w-1/2" />
          </div>
        </div> */}

        {/* login panel */}
        <div className="col-span-1">
          <div className="min-h-screen min-w-fit flex items-center justify-center">
            <form
              onSubmit={handleLogin}
              className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4 w-64"
            >
              <div className="text-center mb-3">
                {/* <span className="font-bold text-xl uppercase ">Sign In</span> */}
                <div className="flex justify-center items-center mx-auto ">
                  <img src={logo} alt="logo" className="w-1/2" />
                </div>
              </div>
              <hr className="mb-2" />
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between w-full ">
                <button
                  className="bg-green-900 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg   focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>)}

      <ToastContainer />

     
    </div>
  );
};

export default Login;
