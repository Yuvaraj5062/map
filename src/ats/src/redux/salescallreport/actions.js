
import {GET_CALL_LIST_REQUEST, 
   SET_CALL_LIST_REQUEST, ADD_CALL, ADD_CALL_REQUEST, GET_ERROR} from './constants';


export const getCallList =(username)=>({
  type:GET_CALL_LIST_REQUEST,
  username:username
  
})
export const getCall = ( calls ) => ( {

  type: SET_CALL_LIST_REQUEST,
  payload: calls,
} );

export const setCall = ( call ) => ( {
  type: ADD_CALL,
  payload: call
} );
export const setCallRquest = ( call ) => ( {
  type: ADD_CALL_REQUEST,
  payload: call
} );
export const getError = ( error ) => ( {
  type: GET_ERROR,
  payload: error
} );