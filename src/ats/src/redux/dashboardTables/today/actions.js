import {GET_TODAY_SUBMISSION_REQUEST, SET_TODAY_SUBMISSION_REQUEST,
        GET_TODAY_INTERVIEW_REQUEST,  SET_TODAY_INTERVIEW_REQUEST,
        GET_TODAY_OFFER_REQUEST,  SET_TODAY_OFFER_REQUEST,
        GET_TODAY_HIRE_REQUEST,  SET_TODAY_HIRE_REQUEST,
      } from './constants';


export const getTodaySubmissionList =(username)=>({
  type:GET_TODAY_SUBMISSION_REQUEST,
  username:username
})

export const setTodaySubmission = ( todaysubmission ) => ( {
  type: SET_TODAY_SUBMISSION_REQUEST,
  payload: todaysubmission
} );
export const getTodayInterviewList =(username)=>({
  type:GET_TODAY_INTERVIEW_REQUEST,
  username:username
})

export const setTodayInterview = ( todayinterview ) => ( {
  type: SET_TODAY_INTERVIEW_REQUEST,
  payload: todayinterview
} );

export const getTodayOfferList =(username)=>({
  type:GET_TODAY_OFFER_REQUEST,
  username:username
})

export const setTodayOffer = ( todayoffer ) => ( {
  type: SET_TODAY_OFFER_REQUEST,
  payload: todayoffer
} );
export const getTodayHireList =(username)=>({
  type:GET_TODAY_HIRE_REQUEST,
  username:username
})

export const setTodayHire = ( todayhire ) => ( {
  type: SET_TODAY_HIRE_REQUEST,
  payload: todayhire
} );