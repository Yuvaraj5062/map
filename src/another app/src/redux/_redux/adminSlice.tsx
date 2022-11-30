import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  User:null,
};

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
