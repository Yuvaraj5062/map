import {GET_WEEK_SUBMISSION_REQUEST, SET_WEEK_SUBMISSION_REQUEST,
        GET_WEEK_INTERVIEW_REQUEST,  SET_WEEK_INTERVIEW_REQUEST,
        GET_WEEK_OFFER_REQUEST,  SET_WEEK_OFFER_REQUEST,
        GET_WEEK_HIRE_REQUEST,  SET_WEEK_HIRE_REQUEST,
      } from './constants';


export const getWeekSubmissionList =(username)=>({
  type:GET_WEEK_SUBMISSION_REQUEST,
  username:username
})

export const setWeekSubmission = ( weeksubmission ) => ( {
  type: SET_WEEK_SUBMISSION_REQUEST,
  payload: weeksubmission
} );
export const getWeekInterviewList =(username)=>({
  type:GET_WEEK_INTERVIEW_REQUEST,
  username:username
})

export const setWeekInterview = ( weekinterview ) => ( {
  type: SET_WEEK_INTERVIEW_REQUEST,
  payload: weekinterview
} );

export const getWeekOfferList =(username)=>({
  type:GET_WEEK_OFFER_REQUEST,
  username:username
})

export const setWeekOffer = ( weekoffer ) => ( {
  type: SET_WEEK_OFFER_REQUEST,
  payload: weekoffer
} );
export const getWeekHireList =(username)=>({
  type:GET_WEEK_HIRE_REQUEST,
  username:username
})

export const setWeekHire = ( weekhire ) => ( {
  type: SET_WEEK_HIRE_REQUEST,
  payload: weekhire
} );