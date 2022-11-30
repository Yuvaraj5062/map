
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
      //Response For All Trips
      if (response.status === 200) {
        // If getting status 200 then it's success call
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
      //Error Message For Axios
      return error;
    });
};





