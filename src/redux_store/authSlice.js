import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: null,
};

const authSlice = createSlice({
  name: "authication",
  initialState: initialAuthState,
  reducers: {
    onTokenReceive(state, action) {
        console.log(`inside redux`)
      state.token = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
