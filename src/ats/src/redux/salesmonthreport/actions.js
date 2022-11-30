
import {GET_MONTH_LIST_REQUEST, 
   SET_MONTH_LIST_REQUEST, ADD_MONTH, ADD_MONTH_REQUEST, GET_ERROR} from './constants';


export const getMonthList =()=>({
  type:GET_MONTH_LIST_REQUEST,
  
})

export const getMonth = ( months ) => ( {
  type: SET_MONTH_LIST_REQUEST,
  payload: months
} );

export const setMonth = ( month ) => ( {
  type: ADD_MONTH,
  payload: month
} );
export const setMonthRquest = ( month ) => ( {
  type: ADD_MONTH_REQUEST,
  payload: month
} );
export const getError = ( error ) => ( {
  type: GET_ERROR,
  payload: error
} );