import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sentMessages: [],
  receivedMessages: [],
};

const MessageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    storeSentMessage: (state, action) => {
      state.sentMessages.push(action.payload);
    },
    storeReceivedMessage: (state, action) => {
      state.receivedMessages.push(action.payload);
    },
    clearMessages: (state) => {
      state.sentMessages = [];
      state.receivedMessages = [];
    },
  },
});

export const { storeSentMessage, storeReceivedMessage, clearMessages } =
  MessageSlice.actions;
export default MessageSlice.reducer;
