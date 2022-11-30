import { createSlice } from "@reduxjs/toolkit";
// Initial State For Vehicle Master Slice
const initialState = {
  vehicleMasterData:null,
};

// Create Slice For 
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
