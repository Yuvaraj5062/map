import {CREATE_CWS, CREATE_CWS_SUCCESS, GET_CWS_LIST_REQUEST, 
   SET_CWS_LIST_REQUEST,} from './constants';


export const getCwsList =()=>({
  type:GET_CWS_LIST_REQUEST
})

export const setCwsList = ( cws ) => ( {
  type: SET_CWS_LIST_REQUEST,
  payload: cws
} );

export const createCws = ( cws ) => ( {
  type: CREATE_CWS,
  payload: cws
} );
export const createCwsSuccess = ( createcws ) => ( {
  type: CREATE_CWS_SUCCESS,
  payload: createcws
} );