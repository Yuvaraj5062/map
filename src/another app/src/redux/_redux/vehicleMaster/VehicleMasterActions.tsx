import { Dispatch } from "redux";
import * as requestFromServer from "./VehicleMasterCrud";
import { vehicleMasterSlice } from "./VehicleMasterSlice";

const { actions } = vehicleMasterSlice;
/**
 * @type {Function}
 * @return array of objects
 * for setting data in slice
 */
export const getAllVehicle = () => (dispatch:any) => {
  return requestFromServer
    .getAllVehicle()
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.setvehicleMaster(response.data.responseData));
        return response.data;
      } else if (response.status === 204) {
        dispatch(actions.setvehicleMaster([]));
        return [];
      } else {
        return null;
      }
    })
    .catch((error) => {
    
      return error;
    });
};



export const addVehicleMaster = (body:any) =>(dispatch:Dispatch) => {
  return requestFromServer
    .addVehicleMaster(body)
    .then((response) => {
      if (response.status === 200) {
        setTimeout(function () {
          dispatch(actions.setvehicleMaster(response.data));
         }, 2000);
        
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      
      return error;
    });
};



