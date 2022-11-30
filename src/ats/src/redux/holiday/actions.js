import {ADD_HOLIDAY, GET_HOLIDAY_LIST_REQUEST, 
   SET_HOLIDAY_LIST_REQUEST,ADD_HOLIDAY_REQUEST} from './constants';


export const getHolidayList =()=>({
  type:GET_HOLIDAY_LIST_REQUEST
})

export const getHoliday = ( holidays ) => ( {
  type: SET_HOLIDAY_LIST_REQUEST,
  payload: holidays
} );

export const setHoliday = ( holiday ) => ( {
  type: ADD_HOLIDAY,
  payload: holiday
} );

export const setHolidayRquest = ( holiday ) => ( {
  type: ADD_HOLIDAY_REQUEST,
  payload: holiday
} );