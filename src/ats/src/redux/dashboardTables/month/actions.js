import {GET_MONTH_SUBMISSION_REQUEST, SET_MONTH_SUBMISSION_REQUEST,
        GET_MONTH_INTERVIEW_REQUEST,  SET_MONTH_INTERVIEW_REQUEST,
        GET_MONTH_OFFER_REQUEST,  SET_MONTH_OFFER_REQUEST,
        GET_MONTH_HIRE_REQUEST,  SET_MONTH_HIRE_REQUEST,
      } from './constants';


export const getMonthSubmissionList =(username)=>({
  type:GET_MONTH_SUBMISSION_REQUEST,
  username:username
})

export const setMonthSubmission = ( monthsubmission ) => ( {
  type: SET_MONTH_SUBMISSION_REQUEST,
  payload: monthsubmission
} );
export const getMonthInterviewList =(username)=>({
  type:GET_MONTH_INTERVIEW_REQUEST,
  username:username
})

export const setMonthInterview = ( monthinterview ) => ( {
  type: SET_MONTH_INTERVIEW_REQUEST,
  payload: monthinterview
} );

export const getMonthOfferList =(username)=>({
  type:GET_MONTH_OFFER_REQUEST,
  username:username
})

export const setMonthOffer = ( monthoffer ) => ( {
  type: SET_MONTH_OFFER_REQUEST,
  payload: monthoffer
} );
export const getMonthHireList =(username)=>({
  type:GET_MONTH_HIRE_REQUEST,
  username:username
})

export const setMonthHire = ( monthhire ) => ( {
  type: SET_MONTH_HIRE_REQUEST,
  payload: monthhire
} );