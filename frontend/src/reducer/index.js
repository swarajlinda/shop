import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice.js'; 
import profileReducer from '../slices/authSlice.js'; 

const rootReducer = combineReducers({
  auth: authReducer, 
  profile: profileReducer
});

export default rootReducer;