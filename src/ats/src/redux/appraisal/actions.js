import {GET_EREIVEW_LIST_REQUEST, 
   SET_EREIVEW_LIST_REQUEST,} from './constants';


export const getEmpReviewList =(getEmpcode)=>({
  type:GET_EREIVEW_LIST_REQUEST,
  getEmpcode:getEmpcode
})

export const setEmpReview = ( empreivew ) => ( {
  type: SET_EREIVEW_LIST_REQUEST,
  payload: empreivew
} );