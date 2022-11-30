
import * as requestFromServer from "./tripMasterCrud";
import { tripMasterSlice } from "./tripMasterSlice";

const { actions } = tripMasterSlice;

/**
 * @type {Function}
 * @return array of objects
 * for setting data in  slice
 */

export const getAllTrips = () => (dispatch:any) => {
  return requestFromServer
    .getAllTrips()
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.setTripMaster(response.data.responseData));
        return response.data;
      } else if (response.status === 204) {
        dispatch(actions.setTripMaster([]));
        return [];
      } else {
        return null;
      }
    })
    .catch((error) => {
  
      return error;
    });
};





