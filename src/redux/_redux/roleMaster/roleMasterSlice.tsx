import { createSlice } from "@reduxjs/toolkit";
//Slice of Role Master Initial State/State
const initialState = {
  RoleMasterData:null,
};
//Role Master Slice
export const roleMasterSlice = createSlice({
  name: "roleMaster",
  initialState: initialState,
  reducers: {
    setRoleMaster: (state, action) => {
      state.RoleMasterData = action.payload;
    },

    clearState: (state) => {
      state.RoleMasterData = null;
    },
  },
});
