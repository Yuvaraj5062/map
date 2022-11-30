import { createSlice } from "@reduxjs/toolkit";
// Initial State Of Admin Slice
const initialState = {
  User:null,
};
// Create Sllice for Admin
export const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    getUser: (state, action) => {
      state.User = action.payload;
    },

    clearState: (state) => {
      state.User = null;
    },
  },
});
