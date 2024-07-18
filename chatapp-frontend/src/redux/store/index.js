import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../slice/AuthSlice";
import GetUsers from "../slice/GetUsers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import MessageSlice from "../slice/MessageSlice";
import InviteUserSlice from "../slice/InviteUserSlice";

export const reducer = {
  AuthSlice: AuthSlice,
  GetUsers: GetUsers,
  MessageSlice: MessageSlice,
  InviteUserSlice: InviteUserSlice,
};

const rootReducer = combineReducers(reducer);

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // Add middleware here if necessary
});

export const persistor = persistStore(store);
