import { Dispatch } from "redux";
import * as requestFromServer from "./userMasterCrud";
import { userMasterSlice } from "./userMasterSlice";

const { actions } = userMasterSlice;
/**
 * @type {Function}
 * @return array of objects
 * for setting data in slice
 */
export const getAllUsers = () => (dispatch:any) => {
  return requestFromServer
    .getAllUsers()
    .then((response) => {
      //Response of Axios
      if (response.status === 200) {
        //Success Response for Axios
        dispatch(actions.setUserMaster(response.data.responseData));
        return response.data;
      } else if (response.status === 204) {
        dispatch(actions.setUserMaster([]));
        return [];
      } else {
        return null;
      }
    })
    .catch((error) => {
      return error;  // Error Return
    });
};

export const addUserMaster = (body:any) =>(dispatch:Dispatch) => {
  return requestFromServer
    .addUserMaster(body)
    .then((response) => {
      if (response.status === 200) {
        //Set Timeout function for user master
        setTimeout(function () {
          dispatch(actions.setUserMaster(response.data));
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