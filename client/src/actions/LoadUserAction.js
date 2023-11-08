import axios from "axios";
import { server } from "..";

export const loadUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "LOAD_USER_REQUEST",
      });
  
      //LOGIN
      const { data } = await axios.get(`${server}/users/me`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const {success} = data
      if(success){
        dispatch({
            type: "LOAD_USER_SUCCESS",
            payload: data.user,
          });
      }
    } catch (error) {
      dispatch({
        type: "LOAD_USER_FAILURE",
        payload: error,
      });
    }
  };