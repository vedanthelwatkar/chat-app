import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoints, appconfig } from "../../../appConfig";

export const sendInvite = createAsyncThunk(
  "sendInvite",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${appconfig.BASE_URL}${ApiEndPoints.INVITE}`,
        data: data,
      });
      return response.data;
    } catch (e) {
      console.error("sendInvite error:", e);
      return rejectWithValue(e);
    }
  }
);

export const getInvitations = createAsyncThunk(
  "getInvitations",
  async ({ username }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${appconfig.BASE_URL}${ApiEndPoints.GET_INVITATIONS}`,
        data: { username },
      });
      return response.data;
    } catch (e) {
      console.error("getInvitations error:", e);
      return rejectWithValue(e);
    }
  }
);

export const acceptRequest = createAsyncThunk(
  "acceptRequest",
  async ({ invitation_id, accept }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${appconfig.BASE_URL}${ApiEndPoints.ACCEPT}`,
        data: { invitation_id, accept },
      });
      return response.data;
    } catch (e) {
      console.error("acceptRequest error:", e);
      return rejectWithValue(e);
    }
  }
);

const invUser = createSlice({
  name: "invUser",
  initialState: {
    data: null,
    invitationSent: [],
    totalInvitations: [],
    inviteError: null,
    inviteLoading: false,
  },
  reducers: {
    resetState: (state) => {
      state.data = null;
      state.invitationSent = [];
      state.inviteError = null;
      state.inviteLoading = false;
      state.totalInvitations = [];
      state.totalError = null;
      state.totalLoading = false;
      state.acceptInvitations = [];
      state.acceptError = null;
      state.acceptLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendInvite.pending, (state) => {
        state.inviteLoading = true;
      })
      .addCase(sendInvite.fulfilled, (state, action) => {
        state.inviteLoading = false;
        state.invitationSent = action.payload;
        state.inviteError = false;
      })
      .addCase(sendInvite.rejected, (state, action) => {
        state.inviteLoading = false;
        state.inviteError = true;
        state.invitationSent = action.payload;
      })
      .addCase(getInvitations.pending, (state) => {
        state.totalLoading = true;
      })
      .addCase(getInvitations.fulfilled, (state, action) => {
        state.totalLoading = false;
        state.totalInvitations = action.payload;
        state.totalError = false;
      })
      .addCase(getInvitations.rejected, (state, action) => {
        state.totalLoading = false;
        state.totalError = true;
        state.totalInvitations = action.payload;
      })
      .addCase(acceptRequest.pending, (state) => {
        state.totalLoading = true;
      })
      .addCase(acceptRequest.fulfilled, (state, action) => {
        state.totalLoading = false;
        state.totalInvitations = action.payload;
        state.totalError = false;
      })
      .addCase(acceptRequest.rejected, (state, action) => {
        state.totalLoading = false;
        state.totalError = true;
        state.totalInvitations = action.payload;
      });
  },
});

export default invUser.reducer;
