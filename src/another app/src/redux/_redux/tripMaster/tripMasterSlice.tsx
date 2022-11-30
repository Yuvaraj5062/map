import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  TripMasterData:null,
  MapData:null,
};

export const tripMasterSlice = createSlice({
  name: "tripMaster",
  initialState: initialState,
  reducers: {
    setTripMaster: (state, action) => {
      
      state.TripMasterData = action.payload;
    },
    setMapData:(state,action)=>{
    
      state.MapData = action.payload;
    },
   

    clearState: (state) => {
      state.TripMasterData = null;
    },
  },
});
