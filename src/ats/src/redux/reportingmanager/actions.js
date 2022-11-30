import {GET_REPORTING_MAN_LIST_REQUEST, 
   SET_REPORTING_MAN_LIST_REQUEST,} from './constants';


export const getReportingManList =()=>({
  type:GET_REPORTING_MAN_LIST_REQUEST
})

export const setReportingMan = ( reportingmanager ) => ( {
  type: SET_REPORTING_MAN_LIST_REQUEST,
  payload: reportingmanager
} );