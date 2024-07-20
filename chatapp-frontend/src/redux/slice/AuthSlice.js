import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoints, appconfig } from "../../../appConfig";

export const getUser = createAsyncThunk(
  "getUser",
  async (username, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${appconfig.BASE_URL}`,
        data: username,
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

export const adminPage = createAsyncThunk(
  "adminPage",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${appconfig.BASE_URL}${ApiEndPoints.ADMIN}`,
      });
      return response.data;
    } catch (e) {
      console.error("adminPage error:", e);
      return rejectWithValue(e);
    }
  }
);

const authUser = createSlice({
  name: "authUser",
  initialState: {
    data: null,
    userData: [],
    loginData: [],
    signupData: [],
    logoutSuccess: false,
    logoutError: false,
    loginError: null,
    signUpError: null,
    loading: false,
  },
  reducers: {
    resetState: (state) => {
      state.data = null;
      state.userData = [];
      state.loginData = [];
      state.loginSuccess = false;
      state.signUpSuccess = false;
      state.signupData = [];
      state.logoutSuccess = false;
      state.logoutError = false;
      state.loginError = null;
      state.signUpError = null;
      state.loading = false;
    },
    resetLoginError: (state) => {
      state.loginError = null;
    },
    resetSignupError: (state) => {
      state.signUpError = null;
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
        state.error = action.payload;
        state.userData = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.loginSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loginData = action.payload;
        state.loginSuccess = true;
        state.error = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
        state.loginSuccess = false;
        state.loginData = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.signUpSuccess = false;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.signupData = action.payload;
        state.signUpSuccess = true;
        state.error = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.signUpError = action.payload;
        state.signupData = action.payload;
        state.signUpSuccess = false;
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

export const { resetState, resetLoginError, resetSignupError } =
  authUser.actions;
export default authUser.reducer;
