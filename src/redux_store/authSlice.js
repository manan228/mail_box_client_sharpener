import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: null,
  loggedInEmail: null,
};

const authSlice = createSlice({
  name: "authication",
  initialState: initialAuthState,
  reducers: {
    onTokenReceive(state, action) {
      state.token = action.payload.token;
      state.loggedInEmail = action.payload.loginEmail;
      // console.log(state.email)
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
