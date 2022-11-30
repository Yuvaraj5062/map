import {
    GET_DT_LIST_REQUEST,
    SET_DT_LIST_REQUEST,
    GET_TOIN_LIST_REQUEST,
    SET_TOIN_LIST_REQUEST,
    GET_MONOF_LIST_REQUEST,
    SET_MONOF_LIST_REQUEST,
    GET_MONTHJOIN_LIST_REQUEST,
    SET_MONTHJOIN_LIST_REQUEST,
    GET_ATSACTI_LIST_REQUEST,
    SET_ATSACTI_LIST_REQUEST,
    GET_ATSGRAPH_LIST_REQUEST,
    SET_ATSGRAPH_LIST_REQUEST
} from './constants';

//Daily target
export const getDailyTargetList = () => ({
    type: GET_DT_LIST_REQUEST,
});

export const setDailyTargetList = (dailytarget) => ({
    type: SET_DT_LIST_REQUEST,
    payload: dailytarget,
});
//Todays Interview
export const getTodaysInterviewList = () => ({
    type: GET_TOIN_LIST_REQUEST,
});

export const setTodaysInterviewList = (todaysinterview) => ({
    type: SET_TOIN_LIST_REQUEST,
    payload: todaysinterview,
});
//Month Offer
export const getMonthOfferList = () => ({
  type: GET_MONOF_LIST_REQUEST,
});

export const setMonthOfferList = (monthoffer) => ({
  type: SET_MONOF_LIST_REQUEST,
  payload: monthoffer,
});
//Month To Be Join
export const getMonthToBeJoinList = () => ({
  type: GET_MONTHJOIN_LIST_REQUEST,
});

export const setMonthToBeJoinList = (monthtobejoin) => ({
  type: SET_MONTHJOIN_LIST_REQUEST,
  payload: monthtobejoin,
});

//Ats Activity
export const getAtsActivityList = () => ({
  type: GET_ATSACTI_LIST_REQUEST,
});

export const setAtsActivityList = (atsactivity) => ({
  type: SET_ATSACTI_LIST_REQUEST,
  payload: atsactivity,
});

//Get Graph api data
export const getAtsGraphList = (username) => ({
  type: GET_ATSGRAPH_LIST_REQUEST,
  username:username
});

export const setAtsGraphList = (graphlist) => ({
  type: SET_ATSGRAPH_LIST_REQUEST,
  payload: graphlist,
});