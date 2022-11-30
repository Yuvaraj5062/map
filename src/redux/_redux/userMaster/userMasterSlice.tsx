import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  UserMasterData:null,
};
// User Master Slice For Redux
export const userMasterSlice = createSlice({
  name: "userMaster",
  initialState: initialState,
  reducers: {
    setUserMaster: (state, action) => {
      state.UserMasterData = action.payload;
    },
    clearState: (state) => {
      state.UserMasterData = null;
    },
  },
});
