import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../slice/AuthSlice";

export const reducer = {
  AuthSlice: AuthSlice,
};

const rootReducer = combineReducers(reducer);

export const store = configureStore({
  reducer: rootReducer,
  // Add middleware here if necessary
});
