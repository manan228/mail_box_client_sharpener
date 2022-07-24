import { createSlice } from "@reduxjs/toolkit";

const initialSentState = {
  emails: {},
};

const sentSlice = createSlice({
  name: "sent",
  initialState: initialSentState,
  reducers: {
    onEmailSend(state, action) {
      console.log(`on email send called`, action.payload);
      state.emails = action.payload
    },
  },
});

export const sentActions = sentSlice.actions;
export default sentSlice;
