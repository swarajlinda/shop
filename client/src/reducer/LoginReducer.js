import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    loading : false 
}

export const loginReducer =  createReducer(initialState, {
    "LOGIN_REQUEST":(state)=>{
        state.loading = false
        state.isAuthenticate = false
    },

    "LOGIN_SUCCESS":(state, action)=>{
        state.loading = false
        state.isAuthenticate = true
        state.message = action.payload 
    },

    "LOGIN_FAILURE":(state, action)=>{
        state.isAuthenticate = false
        state.loading = false 
        state.error = action.payload
    },

    "CLEAR_ERROR":(state)=>{
        state.error = null 
    },

    "CLEAR_MESSAGE":(state)=>{
        state.message = null 
    }

})