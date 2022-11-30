import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  RoleMasterData:null,
};

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
