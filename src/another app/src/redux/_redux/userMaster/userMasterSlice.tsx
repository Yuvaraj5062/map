import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  UserMasterData:null,
};

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
