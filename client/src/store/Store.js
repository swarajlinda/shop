import {configureStore}  from "@reduxjs/toolkit"
import { loginReducer } from "../reducer/LoginReducer"
import { logoutReducer } from "../reducer/LogoutReducer"
import { loadUserReducer } from "../reducer/LoadUserReducer"


const store = configureStore({
    reducer:{
        login: loginReducer,
        logout: logoutReducer,
        loadUser: loadUserReducer
    }
})

export default store  