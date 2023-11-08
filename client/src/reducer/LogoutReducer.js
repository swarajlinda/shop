import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    loading:false 
}

export const  logoutReducer = createReducer(initialState,{

    "LOGOUT_REQUEST":(state)=>{
        state.loading = false
    },

    "LOGOUT_SUCCESS":(state, action)=>{
        state.loading = false
        state.isAuthenticate = false 
        state.user = null
        state.message = action.payload 
    },

    "LOGOUT_FAILURE":(state, action)=>{
        state.isAuthenticate = true
        state.loading = false 
        state.error = action.payload
    },

})