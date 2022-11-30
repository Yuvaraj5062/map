import {CREATE_PASS, CREATE_PASS_SUCCESS, } from './constants';



export const createPass = ( createpass ) => ( {
  type: CREATE_PASS,
  payload: createpass
} );
export const createPassSuccess = ( createpass ) => ( {
  type: CREATE_PASS_SUCCESS,
  payload: createpass
} );
