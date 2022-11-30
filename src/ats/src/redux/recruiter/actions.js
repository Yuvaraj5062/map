import {GET_RECRUITER_LIST_REQUEST, 
   SET_RECRUITER_LIST_REQUEST,} from './constants';

   
export const getRecruiterList =()=>({
  type:GET_RECRUITER_LIST_REQUEST
})

export const setRecruiter = ( recruiters ) => ( {
  type: SET_RECRUITER_LIST_REQUEST,
  payload: recruiters
} );