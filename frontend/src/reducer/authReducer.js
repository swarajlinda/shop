import {createReducer} from "@reduxjs/toolkit"


const initialState ={
    loading:false,
    isAuthenticated:false,
    token:localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")) : null,
   
}


export const authReducer = createReducer(initialState,{
    login:(state, action) =>{
       state.isAuthenticated = true
       state.loading = true
       state.token = action.payload
    },

    logout:(state)=>{
        state.isAuthenticated = false
        state.token = null
    },

   
})