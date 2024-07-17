import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../slice/AuthSlice";
import GetUsers from "../slice/GetUsers";

export const reducer = {
  AuthSlice: AuthSlice,
  GetUsers: GetUsers,
};

const rootReducer = combineReducers(reducer);

export const store = configureStore({
  reducer: rootReducer,
  // Add middleware here if necessary
});
