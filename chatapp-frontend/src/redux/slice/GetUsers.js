import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoints, appconfig } from "../../../appConfig";

export const getAllUser = createAsyncThunk(
  "getAllUser",
  async (username, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${appconfig.BASE_URL}${ApiEndPoints.GET_USERS}`,
        data: username,
      });
      return response.data;
    } catch (e) {
      console.error("getUser error:", e);
      return rejectWithValue(e);
    }
  }
);

export const getStatus = createAsyncThunk(
  "getStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${appconfig.BASE_URL}${ApiEndPoints.STATUS}`,
        data: data,
      });
      return response.data;
    } catch (e) {
      console.error("getStatus error:", e);
      return rejectWithValue(e);
    }
  }
);

const getUsers = createSlice({
  name: "getUsers",
  initialState: {
    data: null,
    allUserData: [],
    getStatusData: [],
    error: null,
    loading: false,
  },
  reducers: {
    resetState: (state) => {
      state.data = null;
      state.allUserData = [];
      state.getStatusData = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.loading = false;
        state.allUserData = action.payload;
        state.error = false;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.allUserData = action.payload;
      })
      .addCase(getStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.getStatusData = action.payload;
        state.error = false;
      })
      .addCase(getStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.getStatusData = action.payload;
      });
  },
});

export default getUsers.reducer;
