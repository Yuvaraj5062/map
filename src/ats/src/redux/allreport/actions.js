import {GET_RPR_LIST_REQUEST, 
   SET_RPR_LIST_REQUEST,GET_DATEWISE_LIST_REQUEST, SET_DATEWISE_LIST_REQUEST, GET_MONTHCOUNT_LIST_REQUEST, SET_MONTHCOUNT_LIST_REQUEST,
  GET_TODAY_LIST_REQUEST, SET_TODAY_LIST_REQUEST, GET_REVENU_LIST_REQUEST, SET_REVENU_LIST_REQUEST} from './constants';



//date wise report
export const getDatewiseReportList =(username,startdate,enddate,clientId)=>({
  type:GET_DATEWISE_LIST_REQUEST,
  username:username,
  startdate:startdate,
  enddate:enddate,
  clientId: clientId
});
export const setDatewiseReport = ( datewsiereport ) => ( {
  type: SET_DATEWISE_LIST_REQUEST,
  payload: datewsiereport,
} );

//Month count report
export const getMonthCountReportList =(username)=>({
  type:GET_MONTHCOUNT_LIST_REQUEST,
  username:username
});
export const setMonthCountReport = ( monthcountreport ) => ( {
  type: SET_MONTHCOUNT_LIST_REQUEST,
  payload: monthcountreport
} );

//Today report
export const getTodayReportList =(username)=>({
  type:GET_TODAY_LIST_REQUEST,
  username:username
});
export const setTodayReport = ( todayrepoert ) => ( {
  type: SET_TODAY_LIST_REQUEST,
  payload: todayrepoert
} );

//Revenu report
export const getRevenuReportList =(username,startdate,enddate)=>({
  type:GET_REVENU_LIST_REQUEST,
  username:username,
  startdate:startdate,
  enddate:enddate
})

export const setRevenuReport = ( revenureport ) => ( {
  type: SET_REVENU_LIST_REQUEST,
  payload: revenureport
} );

//requirement report
export const getReqReportList =()=>({
  type:GET_RPR_LIST_REQUEST
});
export const setReqReport = ( reqreport ) => ( {
  type: SET_RPR_LIST_REQUEST,
  payload: reqreport
} );