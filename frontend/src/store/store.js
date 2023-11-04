// store.js
// import { createStore, combineReducers } from 'redux';
import { combineReducers, createStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer'; // Import your auth reducer here

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers if needed
});

const store = createStore(rootReducer);

export default store;
