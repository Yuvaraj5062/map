import {GET_SALESUSER_LIST_REQUEST, 
   SET_SALESUSER_LIST_REQUEST,} from './constants';

   
export const getSalesUserList =()=>({
  type:GET_SALESUSER_LIST_REQUEST
})

export const setSalesUser = ( salesuser ) => ( {
  type: SET_SALESUSER_LIST_REQUEST,
  payload: salesuser
} );