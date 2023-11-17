import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { server } from "../..";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Logout = () => {
  const navigate = useNavigate();
  const {user } = useSelector((state) => state.loadUser);


    console.log(user)


  const handleLogout = async (e) => {
    e.preventDefault();
    // setLoading(true)
    try {
      const { data } = await axios.get(
        `${server}/users/logout `,

        {
          withCredentials: true,
        }
      );

      console.log("Request was successful:", data);

      const { success, message } = data;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Handle conflict-specific logic here
        handleError(error.response);
        console.error("Conflict detected. Please resolve the conflict.");
      } else {
        // Handle other errors
        handleError(error.message);
        console.error("An error occurred:", error.message);
      }
    }
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  return (
    <div>
      <div>
        <ToastContainer />
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
          {/* <img
            className="w-full"
            src="https://via.placeholder.com/300"
            alt="Profile"
          /> */}
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 uppercase">{user.name}</div>
            <p className="text-gray-700 text-sm">{user.email}</p>
          </div>
          <div className="px-6 py-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
