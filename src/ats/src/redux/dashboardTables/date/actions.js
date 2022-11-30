import {GET_DATE_SUBMISSION_REQUEST, SET_DATE_SUBMISSION_REQUEST,
        GET_DATE_INTERVIEW_REQUEST,  SET_DATE_INTERVIEW_REQUEST,
        GET_DATE_OFFER_REQUEST,  SET_DATE_OFFER_REQUEST,
        GET_DATE_HIRE_REQUEST,  SET_DATE_HIRE_REQUEST,
      } from './constants';


export const getDateSubmissionList =(username)=>({
  type:GET_DATE_SUBMISSION_REQUEST,
  username:username
})

export const setDateSubmission = ( datesubmission ) => ( {
  type: SET_DATE_SUBMISSION_REQUEST,
  payload: datesubmission
} );
export const getDateInterviewList =(username)=>({
  type:GET_DATE_INTERVIEW_REQUEST,
  username:username
})

export const setDateInterview = ( dateinterview ) => ( {
  type: SET_DATE_INTERVIEW_REQUEST,
  payload: dateinterview
} );

export const getDateOfferList =(username)=>({
  type:GET_DATE_OFFER_REQUEST,
  username:username
})

export const setDateOffer = ( dateoffer ) => ( {
  type: SET_DATE_OFFER_REQUEST,
  payload: dateoffer
} );
export const getDateHireList =(username)=>({
  type:GET_DATE_HIRE_REQUEST,
  username:username
})

export const setDateHire = ( datehire ) => ( {
  type: SET_DATE_HIRE_REQUEST,
  payload: datehire
} );