
import * as requestFromServer from "./roleMasterCrud";
import { roleMasterSlice } from "./roleMasterSlice";

const { actions } = roleMasterSlice;

   /**
 * @type {Function}
 * @return array of objects
 * for setting  data in slice
 */

export const getAllRole = () => (dispatch:any) => {
  return requestFromServer
    .getAllRole()
    .then((response) => {
      if (response.status === 200) {
        dispatch(actions.setRoleMaster(response.data.responseData));
        return response.data;
      } else if (response.status === 204) {
        dispatch(actions.setRoleMaster([]));
        return [];
      } else {
        return null;
      }
    })
    .catch((error) => {
      
      return error;
    });
};





