import {GET_YESTERDAY_SUBMISSION_REQUEST, SET_YESTERDAY_SUBMISSION_REQUEST,
        GET_YESTERDAY_INTERVIEW_REQUEST,  SET_YESTERDAY_INTERVIEW_REQUEST,
        GET_YESTERDAY_OFFER_REQUEST,  SET_YESTERDAY_OFFER_REQUEST,
        GET_YESTERDAY_HIRE_REQUEST,  SET_YESTERDAY_HIRE_REQUEST,
      } from './constants';


export const getYesterdaySubmissionList =(username)=>({
  type:GET_YESTERDAY_SUBMISSION_REQUEST,
  username:username
})

export const setYesterdaySubmission = ( yesterdaysubmission ) => ( {
  type: SET_YESTERDAY_SUBMISSION_REQUEST,
  payload: yesterdaysubmission
} );
export const getYesterdayInterviewList =(username)=>({
  type:GET_YESTERDAY_INTERVIEW_REQUEST,
  username:username
})

export const setYesterdayInterview = ( yesterdayinterview ) => ( {
  type: SET_YESTERDAY_INTERVIEW_REQUEST,
  payload: yesterdayinterview
} );

export const getYesterdayOfferList =(username)=>({
  type:GET_YESTERDAY_OFFER_REQUEST,
  username:username
})

export const setYesterdayOffer = ( yesterdayoffer ) => ( {
  type: SET_YESTERDAY_OFFER_REQUEST,
  payload: yesterdayoffer
} );
export const getYesterdayHireList =(username)=>({
  type:GET_YESTERDAY_HIRE_REQUEST,
  username:username
})

export const setYesterdayHire = ( yesterdayhire ) => ( {
  type: SET_YESTERDAY_HIRE_REQUEST,
  payload: yesterdayhire
} );