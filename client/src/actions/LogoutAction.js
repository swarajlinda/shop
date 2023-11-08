import axios from "axios";
import { server } from "..";

export const logout = () => async (dispatch) => {
    try {
      dispatch({
        type: "LOGOUT_REQUEST",
      });
  
      //LOGIN
      const { data } = await axios.get(`${server}/users/logout`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
  
      dispatch({
        type: "LOGOUT_SUCCESS",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "LOGOUT_FAILURE",
        payload: error.response.message,
      });
    }
  };
  