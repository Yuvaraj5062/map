import { AnyRecord } from "dns";
import { Dispatch } from "redux";
import * as requestFromServer from "./adminCrud";
import { adminSlice } from "./adminSlice";

const { actions } = adminSlice;
/**
 * @type {Function}
 * @param {any} body a body 
 * @return array of objects
 * for setting data in slice
 */

export const userLogin = (body:any) =>(dispatch:any) => {
  return requestFromServer
    .userLogin(body)
    .then((response) => {
      if (response.status === 200) {
        setTimeout(function () {
          dispatch(actions.getUser(response.data));
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



