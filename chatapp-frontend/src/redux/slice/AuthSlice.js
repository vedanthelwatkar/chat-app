import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoints, appconfig } from "../../../appConfig";

// Async Thunks for API Calls
export const getUser = createAsyncThunk(
  "getUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${appconfig.BASE_URL}`,
      });
      return response.data;
    } catch (e) {
      console.error("getUser error:", e);
      return rejectWithValue(e);
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${appconfig.BASE_URL}${ApiEndPoints.LOGIN}`,
        data: data,
      });
      return response.data;
    } catch (e) {
      console.error("loginUser error:", e);
      return rejectWithValue(e);
    }
  }
);

export const signupUser = createAsyncThunk(
  "signupUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${appconfig.BASE_URL}${ApiEndPoints.SIGNUP}`,
        data: data,
      });
      return response.data;
    } catch (e) {
      console.error("signupUser error:", e);
      return rejectWithValue(e);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "logoutUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${appconfig.BASE_URL}${ApiEndPoints.LOGOUT}`,
      });
      return response.data;
    } catch (e) {
      console.error("logoutUser error:", e);
      return rejectWithValue(e);
    }
  }
);

// Initial State
const initialState = {
  data: null,
  userData: [],
  loginData: [],
  signupData: [],
  logoutSuccess: false,
  logoutError: false,
  error: null,
  loading: false,
};

// Redux Slice
const authUser = createSlice({
  name: "authUser",
  initialState: initialState,
  reducers: {
    resetState: (state) => {
      state.data = null;
      state.userData = [];
      state.loginData = [];
      state.signupData = [];
      state.logoutSuccess = false;
      state.logoutError = false;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.error = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.userData = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loginData = action.payload;
        state.error = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.loginData = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.signupData = action.payload;
        state.error = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.signupData = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.logoutError = false;
        state.logoutSuccess = true;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
        state.logoutError = true;
        state.logoutSuccess = false;
      });
  },
});

// Export Actions and Reducer
export const { resetState } = authUser.actions;
export default authUser.reducer;
