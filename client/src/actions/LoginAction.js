import axios from "axios";
import {server} from ".."

export const login = (email, password) => async (dispatch) => {
  // const navigate = useNavigate()
  try {
    dispatch({
      type: "LOGIN_REQUEST",
    });

    //LOGIN
    const { data } = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // navigate("../dashboard")

    dispatch({
        type:"LOGIN_SUCCESS",
        payload: data.message 
    })

  } catch (error) {
    dispatch({
        type: "LOGIN_FAILURE",
        payload: error.response.message 
    })
  }

  // return <div></div>
};
