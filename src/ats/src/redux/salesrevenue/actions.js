
import {GET_REVENUE_LIST_REQUEST, 
   SET_REVENUE_LIST_REQUEST, ADD_REVENUE, ADD_REVENUE_REQUEST, GET_ERROR} from './constants';


export const getRevenueList =()=>({
  type:GET_REVENUE_LIST_REQUEST,
  
})

export const getRevenue = ( revenues ) => ( {
  type: SET_REVENUE_LIST_REQUEST,
  payload: revenues
} );

export const setRevenue = ( revenue ) => ( {
  type: ADD_REVENUE,
  payload: revenue
} );
export const setRevenueRquest = ( revenue ) => ( {
  type: ADD_REVENUE_REQUEST,
  payload: revenue
} );
export const getError = ( error ) => ( {
  type: GET_ERROR,
  payload: error
} );