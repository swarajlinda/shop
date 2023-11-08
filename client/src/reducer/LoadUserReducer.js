import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
}

export const  loadUserReducer = createReducer(initialState,{
    "LOAD_USER_REQUEST":(state)=>{
        state.loading = false
        state.isAuthenticate = false
    },

    "LOAD_USER_SUCCESS":(state, action)=>{
        state.loading = false
        state.isAuthenticate = true
        state.user = action.payload 
    },

    "LOAD_USER_FAILURE":(state, action)=>{
        state.isAuthenticate = false
        state.loading = false 
        state.error = action.payload
    },

    "CLEAR_ERROR":(state)=>{
        state.error = null 
    },
})