import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vehicleMasterData:null,
};

export const vehicleMasterSlice = createSlice({
  name: "vehicleMaster",
  initialState: initialState,
  reducers: {
   
    setvehicleMaster: (state, action) => {
      state.vehicleMasterData = action.payload;
    },

    clearState: (state) => {
      state.vehicleMasterData = null;
    },
  },
});
